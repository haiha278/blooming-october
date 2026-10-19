
import { useMemo } from "react";
import "../FallingFlowers/FallingFlower.css";

interface Flower {
  id: number;
  symbol: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  rotation: number;
  opacity: number;
}

const FLOWER_SYMBOLS = ["🌸", "🌷", "🌺", "🌼", "💮"];

const FLOWER_COUNT = 28;

function FallingFlowers() {
  const flowers = useMemo<Flower[]>(() => {
    return Array.from({ length: FLOWER_COUNT }, (_, i) => ({
      id: i,
      symbol: FLOWER_SYMBOLS[
        Math.floor(Math.random() * FLOWER_SYMBOLS.length)
      ],
      left: Math.random() * 100,
      size: 13 + Math.random() * 12,
      duration: 9 + Math.random() * 10,
      delay: -(Math.random() * 20),
      sway: -35 + Math.random() * 70,
      rotation: -180 + Math.random() * 360,
      opacity: 0.45 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <div className="falling-flowers" aria-hidden="true">
      {flowers.map((flower) => (
        <span
          key={flower.id}
          className="falling-flower"
          style={
            {
              left: `${flower.left}%`,
              fontSize: `${flower.size}px`,
              animationDuration: `${flower.duration}s`,
              animationDelay: `${flower.delay}s`,
              opacity: flower.opacity,
              "--sway": `${flower.sway}px`,
              "--rotation": `${flower.rotation}deg`,
            } as React.CSSProperties
          }
        >
          {flower.symbol}
        </span>
      ))}
    </div>
  );
}

export default FallingFlowers;
