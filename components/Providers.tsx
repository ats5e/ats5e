"use client";

import { MotionConfig } from "framer-motion";

// reducedMotion="user" makes every framer-motion animation honour the visitor's
// OS-level "reduce motion" setting (transforms are skipped, opacity fades remain).
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
