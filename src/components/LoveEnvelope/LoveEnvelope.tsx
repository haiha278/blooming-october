
import "./LoveEnvelope.css";

interface LoveEnvelopeProps {
  isOpened: boolean;
  onClick: () => void;
}

function LoveEnvelope({
  isOpened,
  onClick,
}: LoveEnvelopeProps) {
  return (
    <button
      type="button"
      className={`letter-button ${
        isOpened ? "letter-opened" : ""
      }`}
      onClick={onClick}
      aria-label="Open your special letter"
    >
      <span className="letter-glow" />

      <span className="letter-sparkle sparkle-1">✦</span>
      <span className="letter-sparkle sparkle-2">✧</span>
      <span className="letter-sparkle sparkle-3">✦</span>
      <span className="letter-sparkle sparkle-4">✧</span>

      <span className="letter-art">
        <span className="letter-shadow" />

        <span className="envelope">
          <span className="envelope-back" />

          <span className="letter-paper">
            <span className="paper-heart">♥</span>
            <span className="paper-line" />
            <span className="paper-line short" />
          </span>

          <span className="envelope-flap" />
          <span className="envelope-front" />

          <span className="envelope-ribbon">
            <span className="ribbon-left" />
            <span className="ribbon-right" />
            <span className="ribbon-tail-left" />
            <span className="ribbon-tail-right" />
            <span className="ribbon-heart">♥</span>
          </span>
        </span>

        <span className="letter-flower flower-left">🌸</span>
        <span className="letter-flower flower-right">🌸</span>
      </span>
    </button>
  );
}

export default LoveEnvelope;
