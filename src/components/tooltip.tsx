"use client";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useState } from "react";

export const Tooltip = ({ children, tooltip }: { children: React.ReactNode; tooltip: string }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  return (
    <div
      className="relative flex items-center justify-center text-center m-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence mode="popLayout">
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 10,
              },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            style={{
              translateX: translateX,
              rotate: rotate,
              whiteSpace: "nowrap",
            }}
            className="absolute m-0 -top-12 -left-1/2 translate-x-1/2 flex text-sm items-center justify-center rounded-md bg-foreground text-background z-50 shadow-xl px-4 py-2"
          >
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};
