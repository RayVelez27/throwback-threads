"use client";

import { useEffect, useState } from "react";

interface RopeLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "light" | "dark";
  animated?: boolean;
}

// Full SVG Rope Logo with texture
export default function RopeLogo({ className = "", size = "md", variant = "dark", animated = false }: RopeLogoProps) {
  const sizes = {
    sm: { width: 140, height: 55 },
    md: { width: 200, height: 80 },
    lg: { width: 300, height: 120 },
    xl: { width: 400, height: 160 },
  };

  const { width, height } = sizes[size];
  const mainColor = variant === "dark" ? "#141414" : "#ffffff";
  const secondaryColor = variant === "dark" ? "#3d3d3d" : "#e5e5e5";
  const highlightColor = variant === "dark" ? "#666666" : "#ffffff";

  // Animation styles
  const animationStyles = animated ? `
    @keyframes drawRope {
      0% {
        stroke-dashoffset: 1000;
      }
      100% {
        stroke-dashoffset: 0;
      }
    }
    @keyframes drawLoop {
      0% {
        stroke-dashoffset: 200;
      }
      100% {
        stroke-dashoffset: 0;
      }
    }
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    .rope-draw {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      animation: drawRope 2s ease-out forwards;
    }
    .rope-draw-delay-1 {
      animation-delay: 0.3s;
    }
    .rope-draw-delay-2 {
      animation-delay: 0.6s;
    }
    .loop-draw {
      stroke-dasharray: 200;
      stroke-dashoffset: 200;
      animation: drawLoop 0.8s ease-out forwards;
    }
    .tail-draw {
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: drawRope 0.5s ease-out forwards;
      animation-delay: 2s;
    }
    .pattern-fade {
      opacity: 0;
      animation: fadeIn 0.5s ease-out forwards;
      animation-delay: 2.2s;
    }
  ` : "";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {animated && <style>{animationStyles}</style>}

      <defs>
        {/* Rope twist pattern - diagonal lines */}
        <pattern id={`ropePattern-${variant}`} patternUnits="userSpaceOnUse" width="4" height="8" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="8" stroke={secondaryColor} strokeWidth="1.5" />
        </pattern>

        {/* Rope texture pattern - cross hatch for 3D effect */}
        <pattern id={`ropeTexture-${variant}`} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="3" x2="6" y2="3" stroke={highlightColor} strokeWidth="0.5" strokeOpacity="0.3" />
        </pattern>

        {/* Gradient for rope depth */}
        <linearGradient id={`ropeGradient-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={highlightColor} stopOpacity="0.2" />
          <stop offset="50%" stopColor={mainColor} stopOpacity="0" />
          <stop offset="100%" stopColor={mainColor} stopOpacity="0.3" />
        </linearGradient>

        {/* Drop shadow filter */}
        <filter id={`ropeShadow-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor={mainColor} floodOpacity="0.3"/>
        </filter>
      </defs>

      {/* Decorative lasso loop at top */}
      <g filter={`url(#ropeShadow-${variant})`}>
        <path
          d="M 35 25 Q 20 8 40 5 Q 65 2 75 18 Q 80 28 70 32 Q 62 35 58 30"
          fill="none"
          stroke={mainColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? "loop-draw" : ""}
        />
        <path
          d="M 35 25 Q 20 8 40 5 Q 65 2 75 18 Q 80 28 70 32 Q 62 35 58 30"
          fill="none"
          stroke={`url(#ropePattern-${variant})`}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? "pattern-fade" : ""}
        />
        {/* Highlight line on rope loop */}
        <path
          d="M 36 23 Q 22 9 41 6 Q 64 4 73 18"
          fill="none"
          stroke={highlightColor}
          strokeWidth="1"
          strokeLinecap="round"
          strokeOpacity="0.4"
          className={animated ? "pattern-fade" : ""}
        />
      </g>

      {/* "Throwback" text with rope effect */}
      <g filter={`url(#ropeShadow-${variant})`}>
        {/* Outer stroke - main rope body */}
        <text
          x="20"
          y="75"
          fontFamily="'Pacifico', cursive"
          fontSize="52"
          fill="none"
          stroke={mainColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? "rope-draw rope-draw-delay-1" : ""}
        >
          Throwback
        </text>

        {/* Rope pattern overlay */}
        <text
          x="20"
          y="75"
          fontFamily="'Pacifico', cursive"
          fontSize="52"
          fill="none"
          stroke={`url(#ropePattern-${variant})`}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? "pattern-fade" : ""}
        >
          Throwback
        </text>

        {/* Inner highlight stroke */}
        <text
          x="20"
          y="75"
          fontFamily="'Pacifico', cursive"
          fontSize="52"
          fill="none"
          stroke={highlightColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.5"
          className={animated ? "pattern-fade" : ""}
        >
          Throwback
        </text>

        {/* Center line for rope twist effect */}
        <text
          x="20"
          y="75"
          fontFamily="'Pacifico', cursive"
          fontSize="52"
          fill="none"
          stroke={mainColor}
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeDasharray="3 3"
          strokeOpacity="0.6"
          className={animated ? "pattern-fade" : ""}
        >
          Throwback
        </text>
      </g>

      {/* "Threads" text with rope effect */}
      <g filter={`url(#ropeShadow-${variant})`}>
        {/* Outer stroke - main rope body */}
        <text
          x="100"
          y="135"
          fontFamily="'Pacifico', cursive"
          fontSize="52"
          fill="none"
          stroke={mainColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? "rope-draw rope-draw-delay-2" : ""}
        >
          Threads
        </text>

        {/* Rope pattern overlay */}
        <text
          x="100"
          y="135"
          fontFamily="'Pacifico', cursive"
          fontSize="52"
          fill="none"
          stroke={`url(#ropePattern-${variant})`}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animated ? "pattern-fade" : ""}
        >
          Threads
        </text>

        {/* Inner highlight stroke */}
        <text
          x="100"
          y="135"
          fontFamily="'Pacifico', cursive"
          fontSize="52"
          fill="none"
          stroke={highlightColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.5"
          className={animated ? "pattern-fade" : ""}
        >
          Threads
        </text>

        {/* Center line for rope twist effect */}
        <text
          x="100"
          y="135"
          fontFamily="'Pacifico', cursive"
          fontSize="52"
          fill="none"
          stroke={mainColor}
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeDasharray="3 3"
          strokeOpacity="0.6"
          className={animated ? "pattern-fade" : ""}
        >
          Threads
        </text>
      </g>

      {/* Small rope tail coming off the 's' */}
      <path
        d="M 355 140 Q 365 145 375 140 Q 385 135 380 125"
        fill="none"
        stroke={mainColor}
        strokeWidth="4"
        strokeLinecap="round"
        className={animated ? "tail-draw" : ""}
      />
      <path
        d="M 355 140 Q 365 145 375 140 Q 385 135 380 125"
        fill="none"
        stroke={`url(#ropePattern-${variant})`}
        strokeWidth="4"
        strokeLinecap="round"
        className={animated ? "pattern-fade" : ""}
      />
    </svg>
  );
}

// Animated Rope Logo that draws itself - standalone component
export function AnimatedRopeLogo({ className = "", size = "lg", variant = "dark" }: Omit<RopeLogoProps, "animated">) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Mark animation as complete
    const completeTimer = setTimeout(() => {
      setHasAnimated(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, []);

  const sizes = {
    sm: { width: 140, height: 55 },
    md: { width: 200, height: 80 },
    lg: { width: 300, height: 120 },
    xl: { width: 400, height: 160 },
  };

  const { width, height } = sizes[size];
  const mainColor = variant === "dark" ? "#141414" : "#ffffff";
  const secondaryColor = variant === "dark" ? "#3d3d3d" : "#e5e5e5";
  const highlightColor = variant === "dark" ? "#666666" : "#ffffff";

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 400 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <style>{`
          @keyframes drawRopeMain {
            0% { stroke-dashoffset: 1200; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes drawLoop {
            0% { stroke-dashoffset: 250; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes drawTail {
            0% { stroke-dashoffset: 150; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes revealTexture {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes pulseGlow {
            0%, 100% { filter: drop-shadow(0 0 2px ${mainColor}); }
            50% { filter: drop-shadow(0 0 8px ${variant === "dark" ? "#f97316" : "#f97316"}); }
          }
          .animate-loop {
            stroke-dasharray: 250;
            stroke-dashoffset: ${isVisible ? 0 : 250};
            transition: stroke-dashoffset 0.8s ease-out;
          }
          .animate-throwback {
            stroke-dasharray: 1200;
            stroke-dashoffset: ${isVisible ? 0 : 1200};
            transition: stroke-dashoffset 1.8s ease-out 0.3s;
          }
          .animate-threads {
            stroke-dasharray: 1000;
            stroke-dashoffset: ${isVisible ? 0 : 1000};
            transition: stroke-dashoffset 1.5s ease-out 0.8s;
          }
          .animate-tail {
            stroke-dasharray: 150;
            stroke-dashoffset: ${isVisible ? 0 : 150};
            transition: stroke-dashoffset 0.5s ease-out 2s;
          }
          .animate-texture {
            opacity: ${hasAnimated ? 1 : 0};
            transition: opacity 0.5s ease-out;
          }
          .rope-glow {
            animation: ${hasAnimated ? 'pulseGlow 3s ease-in-out infinite' : 'none'};
          }
        `}</style>

        <defs>
          <pattern id={`ropePatternAnim-${variant}`} patternUnits="userSpaceOnUse" width="4" height="8" patternTransform="rotate(35)">
            <line x1="0" y1="0" x2="0" y2="8" stroke={secondaryColor} strokeWidth="1.5" />
          </pattern>
          <filter id={`ropeShadowAnim-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor={mainColor} floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* Lasso loop */}
        <g filter={`url(#ropeShadowAnim-${variant})`} className="rope-glow">
          <path
            d="M 35 25 Q 20 8 40 5 Q 65 2 75 18 Q 80 28 70 32 Q 62 35 58 30"
            fill="none"
            stroke={mainColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-loop"
          />
          <path
            d="M 35 25 Q 20 8 40 5 Q 65 2 75 18 Q 80 28 70 32 Q 62 35 58 30"
            fill="none"
            stroke={`url(#ropePatternAnim-${variant})`}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-texture"
          />
          <path
            d="M 36 23 Q 22 9 41 6 Q 64 4 73 18"
            fill="none"
            stroke={highlightColor}
            strokeWidth="1"
            strokeLinecap="round"
            strokeOpacity="0.4"
            className="animate-texture"
          />
        </g>

        {/* Throwback */}
        <g filter={`url(#ropeShadowAnim-${variant})`} className="rope-glow">
          <text
            x="20"
            y="75"
            fontFamily="'Pacifico', cursive"
            fontSize="52"
            fill="none"
            stroke={mainColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-throwback"
          >
            Throwback
          </text>
          <text
            x="20"
            y="75"
            fontFamily="'Pacifico', cursive"
            fontSize="52"
            fill="none"
            stroke={`url(#ropePatternAnim-${variant})`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-texture"
          >
            Throwback
          </text>
          <text
            x="20"
            y="75"
            fontFamily="'Pacifico', cursive"
            fontSize="52"
            fill="none"
            stroke={highlightColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.5"
            className="animate-texture"
          >
            Throwback
          </text>
        </g>

        {/* Threads */}
        <g filter={`url(#ropeShadowAnim-${variant})`} className="rope-glow">
          <text
            x="100"
            y="135"
            fontFamily="'Pacifico', cursive"
            fontSize="52"
            fill="none"
            stroke={mainColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-threads"
          >
            Threads
          </text>
          <text
            x="100"
            y="135"
            fontFamily="'Pacifico', cursive"
            fontSize="52"
            fill="none"
            stroke={`url(#ropePatternAnim-${variant})`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-texture"
          >
            Threads
          </text>
          <text
            x="100"
            y="135"
            fontFamily="'Pacifico', cursive"
            fontSize="52"
            fill="none"
            stroke={highlightColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.5"
            className="animate-texture"
          >
            Threads
          </text>
        </g>

        {/* Rope tail */}
        <path
          d="M 355 140 Q 365 145 375 140 Q 385 135 380 125"
          fill="none"
          stroke={mainColor}
          strokeWidth="4"
          strokeLinecap="round"
          className="animate-tail"
        />
        <path
          d="M 355 140 Q 365 145 375 140 Q 385 135 380 125"
          fill="none"
          stroke={`url(#ropePatternAnim-${variant})`}
          strokeWidth="4"
          strokeLinecap="round"
          className="animate-texture"
        />
      </svg>
    </div>
  );
}

// Simpler text-based rope logo with CSS styling
export function RopeLogoText({ className = "", size = "md", variant = "dark" }: RopeLogoProps) {
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-3xl md:text-4xl",
    lg: "text-5xl md:text-6xl",
    xl: "text-6xl md:text-7xl",
  };

  const colorClass = variant === "dark" ? "text-[#141414]" : "text-white";
  const strokeColor = variant === "dark" ? "#141414" : "#ffffff";
  const shadowColor = variant === "dark" ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)";

  return (
    <div className={`flex flex-col items-start leading-[0.85] ${className}`}>
      <span
        className={`font-rope ${sizeClasses[size]} ${colorClass} tracking-tight`}
        style={{
          fontFamily: "'Pacifico', cursive",
          WebkitTextStroke: `1.5px ${strokeColor}`,
          textShadow: `
            1px 1px 0 ${shadowColor},
            2px 2px 0 ${shadowColor},
            -0.5px -0.5px 0 ${variant === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
          `,
          paintOrder: 'stroke fill',
        }}
      >
        Throwback
      </span>
      <span
        className={`font-rope ${sizeClasses[size]} ${colorClass} tracking-tight ml-6 md:ml-10`}
        style={{
          fontFamily: "'Pacifico', cursive",
          WebkitTextStroke: `1.5px ${strokeColor}`,
          textShadow: `
            1px 1px 0 ${shadowColor},
            2px 2px 0 ${shadowColor},
            -0.5px -0.5px 0 ${variant === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
          `,
          paintOrder: 'stroke fill',
        }}
      >
        Threads
      </span>
    </div>
  );
}

// Compact single-line version
export function RopeLogoCompact({ className = "", variant = "dark" }: Omit<RopeLogoProps, "size">) {
  const colorClass = variant === "dark" ? "text-[#141414]" : "text-white";
  const strokeColor = variant === "dark" ? "#141414" : "#ffffff";

  return (
    <span
      className={`font-rope text-2xl md:text-3xl ${colorClass} tracking-tight ${className}`}
      style={{
        fontFamily: "'Pacifico', cursive",
        WebkitTextStroke: `1px ${strokeColor}`,
        textShadow: `1px 1px 0 ${variant === "dark" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"}`,
        paintOrder: 'stroke fill',
      }}
    >
      Throwback Threads
    </span>
  );
}
