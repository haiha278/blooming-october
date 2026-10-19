
import {
  useEffect,
  useState,
  type CSSProperties,
} from "react";
import { useNavigate } from "react-router-dom";

import LoveEnvelope from "../../components/LoveEnvelope/LoveEnvelope";
import "./Celebrate.css";

type CelebrateStage = "envelope" | "fading" | "content";
type FireworkStage = "none" | "big" | "small";

type Firework = {
  x: string;
  y: string;
  color: string;
  delay: string;
};

const TITLE = "Happy Vietnam Women's Day";

const MESSAGE =
  "Nhân ngày Phụ nữ Việt Nam 20/10, xin gửi những lời chúc " +
  "tốt đẹp nhất đến tất cả những người phụ nữ tuyệt vời! " +
  "Chúc mọi người luôn mạnh khỏe, hạnh phúc, tự tin và " +
  "rạng rỡ theo cách riêng của mình. " +
  "Mong rằng mỗi ngày đều mang đến thật nhiều niềm vui, " +
  "sự bình yên và những cơ hội để thực hiện ước mơ. " +
  "Cảm ơn vì tất cả những yêu thương, sự kiên cường " +
  "và những điều tốt đẹp mà mọi người mang đến cho cuộc sống. " +
  "Chúc một ngày 20/10 thật trọn vẹn và đáng nhớ! 🌷";

const BIG_FIREWORKS: Firework[] = [
  { x: "12%", y: "20%", color: "#ff4f9a", delay: "0s" },
  { x: "85%", y: "22%", color: "#ffd43b", delay: "0.15s" },
  { x: "50%", y: "15%", color: "#ff75d8", delay: "0.3s" },
  { x: "20%", y: "60%", color: "#60d8ff", delay: "0.45s" },
  { x: "80%", y: "65%", color: "#ff8c42", delay: "0.6s" },
  { x: "50%", y: "78%", color: "#b78aff", delay: "0.3s" },
];

const SMALL_FIREWORKS: Firework[] = [
  { x: "15%", y: "20%", color: "#ff6fa2", delay: "0s" },
  { x: "80%", y: "25%", color: "#ffc14d", delay: "0.3s" },
  { x: "12%", y: "60%", color: "#ff95b8", delay: "0.6s" },
  { x: "85%", y: "65%", color: "#8fd3ff", delay: "0.2s" },
  { x: "35%", y: "15%", color: "#ff87c5", delay: "0.8s" },
];

function useTypewriter(
  text: string,
  enabled: boolean,
  speed = 32
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setCount(0);
      return;
    }

    if (count >= text.length) return;

    const timer = window.setTimeout(() => {
      setCount((prev) => Math.min(prev + 1, text.length));
    }, speed);

    return () => window.clearTimeout(timer);
  }, [text, enabled, speed, count]);

  return text.slice(0, count);
}

function CelebrateFireworks({
  stage,
}: {
  stage: FireworkStage;
}) {
  if (stage === "none") return null;

  const isBig = stage === "big";
  const fireworks = isBig
    ? BIG_FIREWORKS
    : SMALL_FIREWORKS;
  const count = isBig ? 24 : 12;

  return (
    <div className="celebrate-fireworks-layer" aria-hidden="true">
      {fireworks.map((firework, index) => (
        <div
          key={`${stage}-${index}`}
          className={`celebrate-firework ${
            isBig
              ? "celebrate-firework-big"
              : "celebrate-firework-small"
          }`}
          style={
            {
              top: firework.y,
              left: firework.x,
              "--fw-color": firework.color,
              "--fw-delay": firework.delay,
            } as CSSProperties
          }
        >
          {Array.from({ length: count }).map((_, i) => (
            <span
              key={i}
              className="celebrate-particle"
              style={
                {
                  "--fw-angle": `${
                    i * (360 / count)
                  }deg`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Celebrate() {
  const navigate = useNavigate();

  const [stage, setStage] =
    useState<CelebrateStage>("envelope");
  const [opened, setOpened] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [fireworkStage, setFireworkStage] =
    useState<FireworkStage>("none");

  const typedMessage = useTypewriter(
    MESSAGE,
    startTyping,
    32
  );

  const messageFinished =
    startTyping && typedMessage.length === MESSAGE.length;

  const handleOpenEnvelope = () => {
    if (opened) return;
    setOpened(true);
  };

  // Mở phong thư
  useEffect(() => {
    if (!opened) return;

    const timer = window.setTimeout(() => {
      setStage("fading");
    }, 1300);

    return () => window.clearTimeout(timer);
  }, [opened]);

  // Phong thư mờ dần
  useEffect(() => {
    if (stage !== "fading") return;

    const timer = window.setTimeout(() => {
      setStage("content");
    }, 800);

    return () => window.clearTimeout(timer);
  }, [stage]);

  // Bắt đầu typing sau khi phong thư mất
  useEffect(() => {
    if (stage !== "content") return;

    const timer = window.setTimeout(() => {
      setStartTyping(true);
    }, 650);

    return () => window.clearTimeout(timer);
  }, [stage]);

  // Pháo hoa lớn
  useEffect(() => {
    if (!messageFinished) return;

    const timer = window.setTimeout(() => {
      setFireworkStage("big");
    }, 350);

    return () => window.clearTimeout(timer);
  }, [messageFinished]);

  // Pháo hoa nhỏ
  useEffect(() => {
    if (fireworkStage !== "big") return;

    const timer = window.setTimeout(() => {
      setFireworkStage("small");
    }, 2300);

    return () => window.clearTimeout(timer);
  }, [fireworkStage]);

  return (
    <main className="celebrate-page">
      <CelebrateFireworks stage={fireworkStage} />

      <button
        type="button"
        className="celebrate-back-home"
        onClick={() => navigate("/")}
      >
        <span aria-hidden="true">←</span>
        <span>Welcome</span>
      </button>

      {stage !== "content" ? (
        <div
          className={`celebrate-envelope ${
            stage === "fading" ? "is-fading" : ""
          }`}
        >
          <LoveEnvelope
            isOpened={opened}
            onClick={handleOpenEnvelope}
          />

          <p className="celebrate-letter-instruction">
            Tap the letter ✨
          </p>
        </div>
      ) : (
        <section className="celebrate-content">
          <div className="celebrate-flower" aria-hidden="true">
            🌷
          </div>

          <header className="celebrate-hero">
            <span className="celebrate-decoration">
              ✨ 🌸 ✨
            </span>

            <h1>{TITLE}</h1>

            <div className="celebrate-flag-line">
              <svg
                viewBox="0 0 300 200"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Cờ Việt Nam"
                className="celebrate-flag"
              >
                <rect width="300" height="200" fill="#DA251D" />
                <polygon
                  points="150,48 162.2,85.9 202.1,85.9 169.9,109.3 182.1,147.2 150,123.8 117.9,147.2 130.1,109.3 97.9,85.9 137.8,85.9"
                  fill="#FFFF00"
                />
              </svg>
            </div>
          </header>

          <div className="celebrate-message">
            <h2>
              Gửi đến tất cả những người phụ nữ tuyệt vời 💗
            </h2>

            <p>
              {typedMessage}

              {startTyping && !messageFinished && (
                <span className="celebrate-cursor">|</span>
              )}
            </p>
          </div>

          {messageFinished && (
            <div className="celebrate-ending">
              <span>🌸</span>
              <span>Chúc mừng ngày 20/10!</span>
              <span>🌷</span>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default Celebrate;
