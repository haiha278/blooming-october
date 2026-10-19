
import {
  useEffect,
  useState,
  type CSSProperties,
} from "react";

import LoveEnvelope from "../../components/LoveEnvelope/LoveEnvelope";
import "./Special.css";

// ==========================================
// TYPES
// ==========================================

type Stage = "envelope" | "fading" | "memories";

type FireworkStage = "none" | "big" | "small";

interface FireworkConfig {
  x: string;
  y: string;
  color: string;
  delay: string;
}

// ==========================================
// CONFIGURATION
// ==========================================

// Danh sách ảnh kỷ niệm
// Có thể thêm bao nhiêu ảnh tùy thích
const PHOTOS = [
  "/images/memories/photo-1.jpg",
  "/images/memories/photo-2.jpg",
  "/images/memories/photo-3.jpg",
  "/images/memories/photo-4.jpg",
];

// Tiêu đề lời chúc
const TITLE = "Happy 20/10, [Tên bạn] 🌷";

// Nội dung lời chúc
const MESSAGE =
  "Chúc bạn một ngày thật nhẹ nhàng và nhiều nụ cười. " +
  "Cảm ơn vì đã luôn là người khiến những ngày bình thường " +
  "trở nên dễ chịu hơn. Mong mọi điều tốt đẹp nhất sẽ đến với bạn, " +
  "và nhớ rằng bạn rất đặc biệt nhé.";

// Chữ ký
const SIGNATURE = "— [Tên mình] 🌸";

// Ảnh mặt PNG nền trong suốt
const FACE_IMAGE = "/images/me-face.png";

// ==========================================
// ANIMATION CONFIG
// ==========================================

// Thời gian mở phong thư
const ENVELOPE_OPEN_DURATION = 1300;

// Thời gian phong thư biến mất
const ENVELOPE_FADE_DURATION = 800;

// Khoảng cách giữa các ảnh xuất hiện
const PHOTO_APPEAR_INTERVAL = 450;

// Chờ trước khi gõ lời chúc
const TYPING_START_DELAY = 650;

// Thời gian chuyển pháo hoa lớn sang nhỏ
const BIG_FIREWORK_DURATION = 2300;

// ==========================================
// FIREWORKS
// ==========================================

// Pháo hoa lớn: Bắn một đợt
const BIG_FIREWORKS: FireworkConfig[] = [
  { x: "15%", y: "25%", color: "#ff4f9a", delay: "0s" },
  { x: "85%", y: "22%", color: "#ffd43b", delay: "0.15s" },
  { x: "50%", y: "35%", color: "#ff75d8", delay: "0.3s" },
  { x: "25%", y: "65%", color: "#60d8ff", delay: "0.45s" },
  { x: "78%", y: "68%", color: "#ff8c42", delay: "0.6s" },
  { x: "50%", y: "12%", color: "#b78aff", delay: "0.75s" },
  { x: "10%", y: "48%", color: "#ff718d", delay: "0.2s" },
  { x: "90%", y: "45%", color: "#7be8b5", delay: "0.5s" },
];

// Pháo hoa nhỏ: Bắn liên tục
const SMALL_FIREWORKS: FireworkConfig[] = [
  { x: "15%", y: "20%", color: "#ff6fa2", delay: "0s" },
  { x: "80%", y: "25%", color: "#ffc14d", delay: "0.3s" },
  { x: "12%", y: "60%", color: "#ff95b8", delay: "0.6s" },
  { x: "85%", y: "65%", color: "#8fd3ff", delay: "0.2s" },
  { x: "35%", y: "15%", color: "#ff87c5", delay: "0.8s" },
  { x: "70%", y: "80%", color: "#ffd86b", delay: "0.5s" },
];

// ==========================================
// TYPEWRITER HOOK
// ==========================================

function useTypewriter(
  text: string,
  enabled: boolean,
  speed: number = 45
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setCount(0);
      return;
    }

    if (count >= text.length) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCount((prev) => Math.min(prev + 1, text.length));
    }, speed);

    return () => {
      window.clearTimeout(timer);
    };
  }, [text, enabled, speed, count]);

  return text.slice(0, count);
}

// ==========================================
// FIREWORK COMPONENT
// ==========================================

interface FireworksProps {
  stage: FireworkStage;
}

function Fireworks({ stage }: FireworksProps) {
  if (stage === "none") {
    return null;
  }

  const isBig = stage === "big";

  const fireworks = isBig
    ? BIG_FIREWORKS
    : SMALL_FIREWORKS;

  const particleCount = isBig ? 24 : 12;

  return (
    <div className="fireworks-layer" aria-hidden="true">
      {fireworks.map((firework, index) => (
        <div
          key={`${stage}-${index}`}
          className={`firework ${
            isBig ? "firework-big" : "firework-small"
          }`}
          style={
            {
              top: firework.y,
              left: firework.x,
              "--firework-color": firework.color,
              "--firework-delay": firework.delay,
            } as CSSProperties
          }
        >
          {Array.from({ length: particleCount }).map(
            (_, particleIndex) => (
              <span
                key={particleIndex}
                className="firework-particle"
                style={
                  {
                    "--angle": `${
                      particleIndex * (360 / particleCount)
                    }deg`,
                  } as CSSProperties
                }
              />
            )
          )}
        </div>
      ))}
    </div>
  );
}

// ==========================================
// SPECIAL PAGE
// ==========================================

function Special() {
  // Điều khiển phong thư
  const [stage, setStage] = useState<Stage>("envelope");

  const [opened, setOpened] = useState(false);

  // Điều khiển ảnh kỷ niệm
  const [visiblePhotos, setVisiblePhotos] = useState(0);

  // Điều khiển typing
  const [startTyping, setStartTyping] = useState(false);

  // Điều khiển pháo hoa
  const [fireworkStage, setFireworkStage] =
    useState<FireworkStage>("none");

  // ========================================
  // TYPEWRITER
  // ========================================

  const typedTitle = useTypewriter(
    TITLE,
    startTyping,
    65
  );

  const titleFinished =
    startTyping && typedTitle.length === TITLE.length;

  const typedMessage = useTypewriter(
    MESSAGE,
    titleFinished,
    32
  );

  const messageFinished =
    titleFinished && typedMessage.length === MESSAGE.length;

  // ========================================
  // STEP 1: OPEN ENVELOPE
  // ========================================

  const handleOpen = () => {
    if (opened) return;

    setOpened(true);
  };

  useEffect(() => {
    if (!opened) return;

    const timer = window.setTimeout(() => {
      setStage("fading");
    }, ENVELOPE_OPEN_DURATION);

    return () => window.clearTimeout(timer);
  }, [opened]);

  // ========================================
  // STEP 2: FADE OUT ENVELOPE
  // ========================================

  useEffect(() => {
    if (stage !== "fading") return;

    const timer = window.setTimeout(() => {
      setStage("memories");
    }, ENVELOPE_FADE_DURATION);

    return () => window.clearTimeout(timer);
  }, [stage]);

  // ========================================
  // STEP 3: SHOW PHOTOS ONE BY ONE
  // ========================================

  useEffect(() => {
    if (stage !== "memories") return;

    if (visiblePhotos >= PHOTOS.length) {
      const timer = window.setTimeout(() => {
        setStartTyping(true);
      }, TYPING_START_DELAY);

      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setVisiblePhotos((prev) => prev + 1);
    }, PHOTO_APPEAR_INTERVAL);

    return () => window.clearTimeout(timer);
  }, [stage, visiblePhotos]);

  // ========================================
  // STEP 4: BIG FIREWORKS
  // ========================================

  useEffect(() => {
    if (!messageFinished) return;

    const timer = window.setTimeout(() => {
      setFireworkStage("big");
    }, 350);

    return () => window.clearTimeout(timer);
  }, [messageFinished]);

  // ========================================
  // STEP 5: SMALL FIREWORKS
  // ========================================

  useEffect(() => {
    if (fireworkStage !== "big") return;

    const timer = window.setTimeout(() => {
      setFireworkStage("small");
    }, BIG_FIREWORK_DURATION);

    return () => window.clearTimeout(timer);
  }, [fireworkStage]);

  // ========================================
  // RENDER
  // ========================================

  return (
    <main className="special-page">
      {/* Hiệu ứng pháo hoa */}
      <Fireworks stage={fireworkStage} />

      {stage !== "memories" ? (
        // ====================================
        // ENVELOPE SCREEN
        // ====================================

        <div
          className={`special-envelope ${
            stage === "fading" ? "is-fading" : ""
          }`}
        >
          <LoveEnvelope
            isOpened={opened}
            onClick={handleOpen}
          />

          <p className="letter-instruction">
            Tap the letter ✨
          </p>
        </div>
      ) : (
        // ====================================
        // MEMORIES SCREEN
        // ====================================

        <section className="memories-section">
          {/* ẢNH KỶ NIỆM */}
          <div className="memories-grid">
            {PHOTOS.map((photo, index) => (
              <div
                key={`${photo}-${index}`}
                className={`memory-photo ${
                  index < visiblePhotos
                    ? "is-visible"
                    : ""
                }`}
                style={
                  {
                    "--photo-rotation": `${
                      index % 2 === 0 ? -3 : 3
                    }deg`,
                  } as CSSProperties
                }
              >
                <img
                  src={photo}
                  alt={`Kỷ niệm ${index + 1}`}
                  loading="eager"
                />
              </div>
            ))}
          </div>

          {/* LỜI CHÚC */}
          <div className="memories-message">
            <h1>
              {typedTitle}

              {startTyping && !titleFinished && (
                <span className="typing-cursor">
                  |
                </span>
              )}
            </h1>

            <p>
              {typedMessage}

              {titleFinished && !messageFinished && (
                <span className="typing-cursor">
                  |
                </span>
              )}
            </p>

            {/* CHỮ KÝ + ẢNH MẶT */}
            {messageFinished && (
              <div className="memories-signature">
                <span className="signature-text">
                  {SIGNATURE}
                </span>

                <img
                  src={FACE_IMAGE}
                  alt="Ảnh của mình"
                  className="signature-face"
                />
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

export default Special;
