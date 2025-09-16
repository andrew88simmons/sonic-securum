import { useEffect, useState } from "react";

interface WaveformAnimationProps {
  bars?: number;
  className?: string;
}

export const WaveformAnimation = ({ bars = 50, className = "" }: WaveformAnimationProps) => {
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    // Initialize with random heights
    setHeights(Array.from({ length: bars }, () => Math.random() * 40 + 10));

    // Animate the bars
    const interval = setInterval(() => {
      setHeights(prev => 
        prev.map((_, index) => {
          // Create wave-like pattern
          const time = Date.now() / 1000;
          const waveHeight = Math.sin(time * 2 + index * 0.3) * 20 + 25;
          const randomVariation = Math.random() * 15 + 5;
          return Math.max(10, waveHeight + randomVariation);
        })
      );
    }, 150);

    return () => clearInterval(interval);
  }, [bars]);

  return (
    <div className={`flex items-end justify-center gap-1 ${className}`}>
      {heights.map((height, index) => (
        <div
          key={index}
          className="waveform-bar w-1.5 transition-all duration-150 ease-out"
          style={{
            height: `${height}px`,
            animationDelay: `${index * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
};