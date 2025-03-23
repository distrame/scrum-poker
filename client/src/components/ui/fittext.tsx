import { useState, useRef, useEffect, ReactNode, HTMLAttributes } from "react";

interface FitTextProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  minFontSize?: number;
  maxFontSize?: number;
}

export function FitText({
  children,
  minFontSize = 10,
  maxFontSize = 100,
  className = "",
  ...props
}: FitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(maxFontSize);

  useEffect(() => {
    const adjustFontSize = () => {
      if (!containerRef.current || !textRef.current) return;

      let currentFontSize = maxFontSize;
      textRef.current.style.fontSize = `${currentFontSize}px`;

      while (
        textRef.current.scrollWidth > containerRef.current.clientWidth &&
        currentFontSize > minFontSize
      ) {
        currentFontSize -= 1;
        textRef.current.style.fontSize = `${currentFontSize}px`;
      }

      setFontSize(currentFontSize);
    };

    // Initial adjustment and update on window resize
    adjustFontSize();
    window.addEventListener("resize", adjustFontSize);
    return () => window.removeEventListener("resize", adjustFontSize);
  }, [children, maxFontSize, minFontSize]);

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden ${className}`}
      {...props}
    >
      <span
        ref={textRef}
        className="inline-block whitespace-nowrap"
        style={{ fontSize: `${fontSize}px` }}
      >
        {children}
      </span>
    </div>
  );
}
