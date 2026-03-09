"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface InteractiveHeroImageProps {
    imageSrc: string;
    dotGap?: number;
    dotSize?: number;
    staticBrightness?: number;
    hoverBrightness?: number;
    hoverRadius?: number;
    tiltAmount?: number;
    tiltSpeed?: number;
    parallaxStrength?: number;
}

// Custom shader for the points to handle depth, color, and hover effects
const pointVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHoverRadius;
  uniform float uHoverBrightness;
  uniform float uStaticBrightness;
  uniform float uParallaxStrength;
  
  attribute vec3 color;
  attribute float size;
  attribute float originalZ;
  
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    vColor = color;
    
    // Position
    vec3 pos = position;
    
    // Wave animation based on original position and time
    float wave = sin(pos.x * 0.05 + uTime * 0.5) * cos(pos.y * 0.05 + uTime * 0.4) * 5.0;
    pos.z += wave;
    
    // Model view position
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Mouse interaction in screen space approximation
    // To do this accurately, we project mouse to world, but for a simple effect we can use distance in XY
    vec2 screenPos = vec2(pos.x, pos.y);
    float dist = distance(screenPos, uMouse);
    
    float hoverEffect = 1.0 - smoothstep(0.0, uHoverRadius, dist);
    
    // Make hovered points pop forward slightly
    pos.z += hoverEffect * 20.0;
    
    // Parallax
    pos.x += uMouse.x * uParallaxStrength * (pos.z / 100.0);
    pos.y += uMouse.y * uParallaxStrength * (pos.z / 100.0);
    
    // Re-calculate model view with new position
    mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    gl_PointSize = size * (1000.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    
    // Brightness and alpha
    float brightness = mix(uStaticBrightness, uStaticBrightness + uHoverBrightness, hoverEffect);
    vColor = color * brightness;
    
    // Alpha falloff based on Z depth
    vAlpha = smoothstep(-50.0, 50.0, pos.z + 50.0);
  }
`;

const pointFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    // Make points circular
    vec2 xy = gl_PointCoord.xy - vec2(0.5);
    float ll = length(xy);
    if(ll > 0.5) discard;
    
    // Soft edge
    float alpha = smoothstep(0.5, 0.4, ll) * vAlpha;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

const Particles = ({
    imageSrc,
    dotGap,
    dotSize,
    staticBrightness,
    hoverBrightness,
    hoverRadius,
    parallaxStrength,
    tiltAmount,
}: InteractiveHeroImageProps) => {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const [particlesData, setParticlesData] = useState<{ positions: Float32Array, colors: Float32Array, sizes: Float32Array } | null>(null);

    const targetRotation = useRef({ x: 0, y: 0 });
    const currentRotation = useRef({ x: 0, y: 0 });
    const mousePos = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse coordinates roughly mapped to world space
            // Assuming camera looks at origin, width is roughly 800 units wide
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;

            targetRotation.current.x = y * (tiltAmount || 0.2);
            targetRotation.current.y = x * (tiltAmount || 0.2);

            mousePos.current.x = x * 400; // rough world scale mapping
            mousePos.current.y = y * 400;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [tiltAmount]);

    useEffect(() => {
        const img = new Image();
        img.src = imageSrc;
        img.crossOrigin = "anonymous";
        img.onload = () => {
            // We read the image and create a 3D terrain
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;


            // Target around 200px wide for processing
            const maxDim = 200;
            let width = img.width;
            let height = img.height;
            if (width > maxDim || height > maxDim) {
                const ratio = Math.min(maxDim / width, maxDim / height);
                width = Math.floor(width * ratio);
                height = Math.floor(height * ratio);
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            const data = ctx.getImageData(0, 0, width, height).data;

            const positions = [];
            const colors = [];
            const sizes = [];

            // Base scale for world space
            const scaleX = 800 / width;
            const scaleY = 800 / height;

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const index = (y * width + x) * 4;
                    const r = data[index] / 255;
                    const g = data[index + 1] / 255;
                    const b = data[index + 2] / 255;
                    const alpha = data[index + 3] / 255;

                    const brightness = (r + g + b) / 3;

                    // Only add particles for non-transparent areas
                    if (alpha > 0.05 && brightness > 0.05) {
                        // World coordinates centered
                        const px = (x - width / 2) * scaleX;
                        const py = -(y - height / 2) * scaleY;

                        // Extrude Z based on brightness to create a 3D volume
                        const pz = brightness * 150 - 50 + (Math.random() * 20 - 10);

                        positions.push(px, py, pz);
                        colors.push(r, g, b);

                        // Randomly vary sizes slightly
                        sizes.push((dotSize || 2.2) * (0.8 + Math.random() * 0.4) * 2.0);
                    }
                }
            }

            setParticlesData({
                positions: new Float32Array(positions),
                colors: new Float32Array(colors),
                sizes: new Float32Array(sizes)
            });
        };
    }, [imageSrc, dotGap, dotSize]);

    useFrame((state) => {
        if (!pointsRef.current || !materialRef.current) return;

        // Smoothly interpolate rotation
        currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05;
        currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05;

        pointsRef.current.rotation.x = currentRotation.current.x;
        pointsRef.current.rotation.y = currentRotation.current.y;

        // Update uniforms
        materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        materialRef.current.uniforms.uMouse.value.set(mousePos.current.x, mousePos.current.y);
    });

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(-1000, -1000) },
        uHoverRadius: { value: hoverRadius || 300 },
        uHoverBrightness: { value: hoverBrightness || 3.0 },
        uStaticBrightness: { value: staticBrightness || 2.8 },
        uParallaxStrength: { value: (parallaxStrength || 25) * 0.01 },
    }), [hoverRadius, hoverBrightness, staticBrightness, parallaxStrength]);

    if (!particlesData) return null;

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesData.positions.length / 3}
                    array={particlesData.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particlesData.colors.length / 3}
                    array={particlesData.colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={particlesData.sizes.length}
                    array={particlesData.sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                vertexShader={pointVertexShader}
                fragmentShader={pointFragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export function InteractiveHeroImage(props: InteractiveHeroImageProps) {
    return (
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(10,50,90,0.1), transparent 70%)" }}>
            <Canvas
                camera={{ position: [0, 0, 500], fov: 60 }}
                style={{ pointerEvents: 'none' }}
                dpr={[1, 2]}
            >
                <Particles {...props} />
            </Canvas>
        </div>
    );
}
