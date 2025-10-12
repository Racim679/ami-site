import React, { useState, CSSProperties } from 'react';

interface AuditButtonProps {
  text?: string;
  width?: number | string;
  height?: number;
  fontSize?: number;
  fontFamily?: string;
  textColor?: string;
  blurAmount?: number;
  borderRadius?: number;
  shineDuration?: number;
  shineOpacity?: number;
  glowColor?: string;
  glowIntensity?: number;
  strokeWidth?: number;
  strokeColor?: string;
  strokeColorHover?: string;
  enableFontScaling?: boolean;
  link?: string;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  showArrow?: boolean;
}

export default function AuditButton({
  text = "Évaluation Gratuite",
  width = 380,
  height = 60,
  fontSize = 16,
  fontFamily = "Inter, Arial, sans-serif",
  textColor = "#c5b078",
  blurAmount = 8,
  borderRadius = 30,
  shineDuration = 3,
  shineOpacity = 0.3,
  glowColor = "#c5b078",
  glowIntensity = 0.8,
  strokeWidth = 2,
  strokeColor = "#c5b078",
  strokeColorHover = "#a08960",
  enableFontScaling = false,
  link,
  onClick,
  className = "",
  style = {},
  showArrow = false,
}: AuditButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    console.log("Button clicked!");

    if (link && typeof window !== "undefined") {
      window.open(link, "_blank");
    }

    if (onClick) {
      onClick();
    }
  };

  const buttonStyle: CSSProperties = {
    position: "relative",
    width: typeof width === 'string' ? width : `${width}px`,
    height: `${height}px`,
    background: isHovered 
      ? "rgba(197, 176, 120, 0.03)" 
      : "rgba(255, 255, 255, 0.7)",
    backdropFilter: `blur(${blurAmount}px)`,
    WebkitBackdropFilter: `blur(${blurAmount}px)`,
    border: `${strokeWidth}px solid ${isHovered ? strokeColorHover : strokeColor}`,
    borderRadius: `${borderRadius}px`,
    fontSize: `${fontSize}px`,
    fontFamily: fontFamily,
    fontWeight: isHovered ? 700 : 600,
    color: isHovered ? "#a08960" : textColor,
    cursor: "pointer",
    overflow: "hidden",
    textShadow: isHovered
      ? "0 2px 4px rgba(197, 176, 120, 0.3)"
      : "none",
    letterSpacing: isHovered ? "0.5px" : "0.3px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 30px",
    userSelect: "none",
    outline: "none",
    zIndex: 1,
    boxShadow: isHovered
      ? `0 8px 25px rgba(197, 176, 120, 0.25), 
         0 4px 12px rgba(0, 0, 0, 0.08),
         inset 0 1px 0 rgba(255, 255, 255, 0.5)`
      : `0 4px 15px rgba(0, 0, 0, 0.05), 
         inset 0 1px 0 rgba(255, 255, 255, 0.9)`,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: isPressed ? "scale(0.98)" : isHovered ? "scale(1.02)" : "scale(1)",
    willChange: "transform, box-shadow",
    ...style,
  };

  const shineStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "60px",
    height: "100%",
    background: `linear-gradient(
      90deg,
      transparent,
      rgba(197, 176, 120, ${shineOpacity * 0.4}),
      rgba(255, 255, 255, ${shineOpacity}),
      rgba(197, 176, 120, ${shineOpacity * 0.4}),
      transparent
    )`,
    transform: "skewX(-15deg)",
    pointerEvents: "none",
    zIndex: 1,
    animation: `shine ${shineDuration}s ease-in-out infinite`,
  };

  const overlayStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: isHovered
      ? "linear-gradient(135deg, rgba(197, 176, 120, 0.05) 0%, rgba(197, 176, 120, 0.1) 100%)"
      : "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%)",
    opacity: isHovered ? 1 : 0.6,
    borderRadius: `${borderRadius}px`,
    pointerEvents: "none",
    zIndex: 0,
    transition: "all 0.3s ease-out",
  };

  return (
    <>
      <style>{`
        @keyframes shine {
          0% {
            left: -150px;
          }
          50% {
            left: calc(100% + 150px);
          }
          100% {
            left: calc(100% + 150px);
          }
        }
      `}</style>
      
      <button
        className={className}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        style={buttonStyle}
      >
        {/* Text */}
        <span
          style={{
            position: "relative",
            zIndex: 2,
            pointerEvents: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {text}
          {showArrow && (
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{
                transition: "transform 0.3s ease",
                transform: isHovered ? "translateX(4px)" : "translateX(0)",
              }}
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          )}
        </span>

        {/* Shine effect */}
        <div style={shineStyle} />

        {/* Hover overlay */}
        <div style={overlayStyle} />
      </button>
    </>
  );
}
