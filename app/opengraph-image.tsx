import { ImageResponse } from "next/og";

export const alt = "ATS5E — Intelligence Applied";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          color: "#ffffff",
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(circle at 80% 15%, rgba(20,139,230,0.45), transparent 55%), radial-gradient(circle at 10% 100%, rgba(20,139,230,0.18), transparent 50%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 10, color: "#a1a1aa" }}>ATS5E</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 124, fontWeight: 900, lineHeight: 0.92, letterSpacing: -5 }}>
          <div style={{ display: "flex" }}>INTELLIGENCE.</div>
          <div style={{ display: "flex", color: "#148be6" }}>APPLIED.</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa", maxWidth: 900 }}>
          Specialist execution partner for enterprise transformation across the GCC &amp; South Pacific.
        </div>
      </div>
    ),
    size,
  );
}
