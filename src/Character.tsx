import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface CharacterProps {
  expression?: "happy" | "thinking" | "talking" | "idle";
  className?: string;
}

export default function Character({ expression = "idle", className }: CharacterProps) {
  return (
    <div className={cn("relative w-64 h-64 flex items-center justify-center", className)}>
      {/* Learna Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-aura-primary/30 blur-3xl rounded-full"
      />

      {/* 3D-ish Character Placeholder (Using SVG + Motion for now) */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-48 h-48"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
          {/* Body */}
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            fill="url(#bodyGrad)"
            animate={expression === "talking" ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.2, repeat: Infinity }}
          />

          {/* Arms */}
          <motion.g
            animate={expression === "talking" ? { 
              rotate: [0, 5, -5, 0],
              y: [0, -2, 2, 0]
            } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {/* Left Arm */}
            <motion.rect
              x="10"
              y="90"
              width="30"
              height="15"
              rx="7.5"
              fill="#8b5cf6"
              animate={expression === "happy" ? { rotate: [-30, -50, -30] } : { rotate: [-10, -20, -10] }}
              style={{ originX: "40px", originY: "97.5px" }}
            />
            {/* Right Arm */}
            <motion.rect
              x="160"
              y="90"
              width="30"
              height="15"
              rx="7.5"
              fill="#ec4899"
              animate={expression === "happy" ? { rotate: [30, 50, 30] } : { rotate: [10, 20, 10] }}
              style={{ originX: "160px", originY: "97.5px" }}
            />
          </motion.g>

          {/* Eyes */}
          <motion.g
            animate={expression === "thinking" ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <circle cx="70" cy="85" r="12" fill="white" />
            <circle cx="130" cy="85" r="12" fill="white" />
            
            <motion.circle
              cx="70"
              cy="85"
              r="6"
              fill="#0a0502"
              animate={{ x: expression === "thinking" ? [0, 4, -4, 0] : 0 }}
            />
            <motion.circle
              cx="130"
              cy="85"
              r="6"
              fill="#0a0502"
              animate={{ x: expression === "thinking" ? [0, 4, -4, 0] : 0 }}
            />
          </motion.g>

          {/* Mouth */}
          <motion.path
            d={expression === "happy" ? "M 70 130 Q 100 160 130 130" : "M 80 140 Q 100 140 120 140"}
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            animate={expression === "talking" ? { d: ["M 80 140 Q 100 160 120 140", "M 80 140 Q 100 130 120 140"] } : {}}
            transition={{ duration: 0.15, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full blur-[1px]"
          animate={{
            x: [0, (i - 2) * 40, 0],
            y: [0, (i - 2) * -40, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
