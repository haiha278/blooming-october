// import { useEffect, useState, type CSSProperties } from "react";

// import LoveEnvelope from "../../components/LoveEnvelope/LoveEnvelope";
// import "./Special.css";

// // ========================================
// // TYPES
// // ========================================

// type Stage = "envelope" | "fading" | "memories";
// type FireworkStage = "none" | "big" | "small";

// interface FireworkConfig {
//   x: string;
//   y: string;
//   color: string;
//   delay: string;
// }

// // ========================================
// // CONTENT CONFIG
// // ========================================

// // Tiêu đề nằm trên các bức ảnh
// const PAGE_TITLE = "Happy Vietnam Women's Day 🌷";

// // Tên người nhận, được gõ sau khi ảnh xuất hiện
// const RECEIVER_TITLE = "To Chang";

// // Lời chúc
// const MESSAGE =
//   "Chúc mừng ngày Phụ nữ Việt Nam nhé. " +
//   "Ở bên Hà Lan, chúc mọi điều tốt đẹp và may mắn nhất sẽ đến với mày. " +
//   "Mà nhỡ nếu có không gặp may mắn hay vấn đề gì thì cứ tích cực lên, " +
//   "chuyện gì cũng xong được. " +
//   "Nếu cần thì có thể share với người bạn Việt Nam này, " +
//   "biết đâu lại giúp được gì đấy =))). " +
//   "Sớm về chơi cuối năm và về hẳn Việt Nam nhé!! " +
//   "Nếu về đây mà có gì khó khăn thì tao sẽ support hết mình. 🛬🏡";

// // Chữ ký
// const SIGNATURE = "— Hai Ha —";

// // Ảnh mặt đã tách nền
// const FACE_IMAGE = "/images/me-face.png";

// // Ảnh kỷ niệm
// // Thay hoặc thêm đường dẫn ảnh của mày ở đây
// const PHOTOS = [
//   "/images/memories/ava1.jpg",
//   "/images/memories/ava2.jpg",
//   "/images/memories/ava3.jpg",
//   "/images/memories/ava4.jpg",
// ];

// // ========================================
// // TIMING CONFIG (milliseconds)
// // ========================================

// const ENVELOPE_OPEN_DURATION = 1300;
// const ENVELOPE_FADE_DURATION = 800;
// const PHOTO_APPEAR_INTERVAL = 450;
// const PHOTO_FADE_DURATION = 850;
// const TYPING_START_DELAY = 500;

// const BIG_FIREWORK_DURATION = 2300;

// // ========================================
// // FIREWORK CONFIG
// // ========================================

// const BIG_FIREWORKS: FireworkConfig[] = [
//   { x: "15%", y: "25%", color: "#ff4f9a", delay: "0s" },
//   { x: "85%", y: "22%", color: "#ffd43b", delay: "0.15s" },
//   { x: "50%", y: "35%", color: "#ff75d8", delay: "0.3s" },
//   { x: "25%", y: "65%", color: "#60d8ff", delay: "0.45s" },
//   { x: "78%", y: "68%", color: "#ff8c42", delay: "0.6s" },
//   { x: "50%", y: "12%", color: "#b78aff", delay: "0.75s" },
//   { x: "10%", y: "48%", color: "#ff718d", delay: "0.2s" },
//   { x: "90%", y: "45%", color: "#7be8b5", delay: "0.5s" },
// ];

// const SMALL_FIREWORKS: FireworkConfig[] = [
//   { x: "15%", y: "20%", color: "#ff6fa2", delay: "0s" },
//   { x: "80%", y: "25%", color: "#ffc14d", delay: "0.3s" },
//   { x: "12%", y: "60%", color: "#ff95b8", delay: "0.6s" },
//   { x: "85%", y: "65%", color: "#8fd3ff", delay: "0.2s" },
//   { x: "35%", y: "15%", color: "#ff87c5", delay: "0.8s" },
//   { x: "70%", y: "80%", color: "#ffd86b", delay: "0.5s" },
// ];

// // ========================================
// // TYPEWRITER HOOK
// // ========================================

// function useTypewriter(text: string, enabled: boolean, speed = 45) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!enabled) {
//       setCount(0);
//       return;
//     }

//     if (count >= text.length) return;

//     const timer = window.setTimeout(() => {
//       setCount((prev) => Math.min(prev + 1, text.length));
//     }, speed);

//     return () => window.clearTimeout(timer);
//   }, [text, enabled, speed, count]);

//   return text.slice(0, count);
// }

// // ========================================
// // FIREWORKS COMPONENT
// // ========================================

// function Fireworks({ stage }: { stage: FireworkStage }) {
//   if (stage === "none") return null;

//   const isBig = stage === "big";
//   const fireworks = isBig ? BIG_FIREWORKS : SMALL_FIREWORKS;

//   const particleCount = isBig ? 24 : 12;

//   return (
//     <div className="fireworks-layer" aria-hidden="true">
//       {fireworks.map((firework, index) => (
//         <div
//           key={`${stage}-${index}`}
//           className={`firework ${isBig ? "firework-big" : "firework-small"}`}
//           style={
//             {
//               top: firework.y,
//               left: firework.x,
//               "--firework-color": firework.color,
//               "--firework-delay": firework.delay,
//             } as CSSProperties
//           }
//         >
//           {Array.from({
//             length: particleCount,
//           }).map((_, particleIndex) => (
//             <span
//               key={particleIndex}
//               className="firework-particle"
//               style={
//                 {
//                   "--angle": `${particleIndex * (360 / particleCount)}deg`,
//                 } as CSSProperties
//               }
//             />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// // ========================================
// // SPECIAL PAGE
// // ========================================

// function Special() {
//   const [stage, setStage] = useState<Stage>("envelope");
//   const [opened, setOpened] = useState(false);

//   const [visiblePhotos, setVisiblePhotos] = useState(0);
//   const [startTyping, setStartTyping] = useState(false);

//   const [fireworkStage, setFireworkStage] = useState<FireworkStage>("none");

//   // ======================================
//   // TYPEWRITER
//   // ======================================

//   const typedReceiver = useTypewriter(RECEIVER_TITLE, startTyping, 65);

//   const receiverFinished =
//     startTyping && typedReceiver.length === RECEIVER_TITLE.length;

//   const typedMessage = useTypewriter(MESSAGE, receiverFinished, 32);

//   const messageFinished =
//     receiverFinished && typedMessage.length === MESSAGE.length;

//   // ======================================
//   // 1. OPEN ENVELOPE
//   // ======================================

//   const handleOpen = () => {
//     if (opened) return;
//     setOpened(true);
//   };

//   useEffect(() => {
//     if (!opened) return;

//     const timer = window.setTimeout(() => {
//       setStage("fading");
//     }, ENVELOPE_OPEN_DURATION);

//     return () => window.clearTimeout(timer);
//   }, [opened]);

//   // ======================================
//   // 2. FADE OUT ENVELOPE
//   // ======================================

//   useEffect(() => {
//     if (stage !== "fading") return;

//     const timer = window.setTimeout(() => {
//       setStage("memories");
//     }, ENVELOPE_FADE_DURATION);

//     return () => window.clearTimeout(timer);
//   }, [stage]);

//   // ======================================
//   // 3. SHOW MEMORIES ONE BY ONE
//   // ======================================

//   useEffect(() => {
//     if (stage !== "memories") return;

//     if (visiblePhotos >= PHOTOS.length) {
//       const timer = window.setTimeout(() => {
//         setStartTyping(true);
//       }, PHOTO_FADE_DURATION + TYPING_START_DELAY);

//       return () => window.clearTimeout(timer);
//     }

//     const timer = window.setTimeout(() => {
//       setVisiblePhotos((prev) => prev + 1);
//     }, PHOTO_APPEAR_INTERVAL);

//     return () => window.clearTimeout(timer);
//   }, [stage, visiblePhotos]);

//   // ======================================
//   // 4. BIG FIREWORKS ONCE
//   // ======================================

//   useEffect(() => {
//     if (!messageFinished) return;

//     const timer = window.setTimeout(() => {
//       setFireworkStage("big");
//     }, 350);

//     return () => window.clearTimeout(timer);
//   }, [messageFinished]);

//   // ======================================
//   // 5. SMALL FIREWORKS CONTINUOUSLY
//   // ======================================

//   useEffect(() => {
//     if (fireworkStage !== "big") return;

//     const timer = window.setTimeout(() => {
//       setFireworkStage("small");
//     }, BIG_FIREWORK_DURATION);

//     return () => window.clearTimeout(timer);
//   }, [fireworkStage]);

//   // ======================================
//   // RENDER
//   // ======================================

//   return (
//     <main className="special-page">
//       <Fireworks stage={fireworkStage} />

//       {stage !== "memories" ? (
//         <div
//           className={`special-envelope ${
//             stage === "fading" ? "is-fading" : ""
//           }`}
//         >
//           <LoveEnvelope isOpened={opened} onClick={handleOpen} />

//           <p className="letter-instruction">Tap the letter ✨</p>
//         </div>
//       ) : (
//         <section className="memories-section">
//           {/* ==================================
//               MAIN HEADING ABOVE PHOTOS
//           ================================== */}

//           <header className="special-hero">
//             <span className="special-hero-decoration" aria-hidden="true">
//               ✨ 🌸 ✨
//             </span>

//             <h1 className="special-hero-title">{PAGE_TITLE}</h1>

//             <div className="special-hero-line">
//               <svg
//                 className="vietnam-flag"
//                 viewBox="0 0 300 200"
//                 xmlns="http://www.w3.org/2000/svg"
//                 role="img"
//                 aria-label="Cờ Việt Nam"
//               >
//                 <rect width="300" height="200" fill="#DA251D" />
//                 <polygon
//                   points="150,48 162.2,85.9 202.1,85.9 169.9,109.3 182.1,147.2 150,123.8 117.9,147.2 130.1,109.3 97.9,85.9 137.8,85.9"
//                   fill="#FFFF00"
//                 />
//               </svg>
//             </div>
//           </header>

//           {/* ==================================
//               PHOTO GALLERY
//           ================================== */}

//           <div className="memories-grid">
//             {PHOTOS.map((photo, index) => (
//               <div
//                 key={`${photo}-${index}`}
//                 className={`memory-photo ${
//                   index < visiblePhotos ? "is-visible" : ""
//                 }`}
//                 style={
//                   {
//                     "--photo-rotation": `${index % 2 === 0 ? -3 : 3}deg`,
//                   } as CSSProperties
//                 }
//               >
//                 <img src={photo} alt={`Kỷ niệm ${index + 1}`} loading="eager" />
//               </div>
//             ))}
//           </div>

//           {/* ==================================
//               TYPING MESSAGE
//           ================================== */}

//           <div className="memories-message">
//             <h2 className="receiver-title">
//               {typedReceiver}

//               {startTyping && !receiverFinished && (
//                 <span className="typing-cursor">|</span>
//               )}
//             </h2>

//             <p>
//               {typedMessage}

//               {receiverFinished && !messageFinished && (
//                 <span className="typing-cursor">|</span>
//               )}
//             </p>

//             {/* ==================================
//                 SIGNATURE AND FACE
//             ================================== */}

//             {messageFinished && (
//               <div className="memories-signature">
//                 <span className="signature-text">{SIGNATURE}</span>

//                 <img
//                   src={FACE_IMAGE}
//                   alt="Ảnh của mình"
//                   className="signature-face"
//                 />
//               </div>
//             )}
//           </div>
//         </section>
//       )}
//     </main>
//   );
// }

// export default Special;


import {
  useEffect,
  useState,
  type CSSProperties,
} from "react";

import { useNavigate } from "react-router-dom";
import LoveEnvelope from "../../components/LoveEnvelope/LoveEnvelope";
import "./Special.css";

// ========================================
// TYPES
// ========================================

type Stage = "envelope" | "fading" | "memories";
type FireworkStage = "none" | "big" | "small";

interface FireworkConfig {
  x: string;
  y: string;
  color: string;
  delay: string;
}

// ========================================
// CONTENT CONFIG
// ========================================

const PAGE_TITLE = "Happy Vietnam Women's Day 🌷";

const RECEIVER_TITLE = "To Chang";

const MESSAGE =
  "Chúc mừng ngày Phụ nữ Việt Nam nhé. " +
  "Ở bên Hà Lan, chúc mọi điều tốt đẹp và may mắn nhất sẽ đến với mày. " +
  "Mà nhỡ nếu có không gặp may mắn hay vấn đề gì thì cứ tích cực lên, " +
  "chuyện gì cũng xong được. " +
  "Nếu cần thì có thể share với người bạn Việt Nam này, " +
  "biết đâu lại giúp được gì đấy =))). " +
  "Sớm về chơi cuối năm và về hẳn Việt Nam nhé!! " +
  "Nếu về đây mà có gì khó khăn thì tao sẽ support hết mình. 😄";

const SIGNATURE = "— Hai Ha —";

const FACE_IMAGE = "/images/me-face.png";

const PHOTOS = [
  "/images/memories/ava1.jpg",
  "/images/memories/ava2.jpg",
  "/images/memories/ava3.jpg",
  "/images/memories/ava4.jpg",
];

// ========================================
// TIMING
// ========================================

const ENVELOPE_OPEN_DURATION = 1300;
const ENVELOPE_FADE_DURATION = 800;
const PHOTO_APPEAR_INTERVAL = 450;
const PHOTO_FADE_DURATION = 850;
const TYPING_START_DELAY = 500;
const BIG_FIREWORK_DURATION = 2300;

// ========================================
// FIREWORKS
// ========================================

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

const SMALL_FIREWORKS: FireworkConfig[] = [
  { x: "15%", y: "20%", color: "#ff6fa2", delay: "0s" },
  { x: "80%", y: "25%", color: "#ffc14d", delay: "0.3s" },
  { x: "12%", y: "60%", color: "#ff95b8", delay: "0.6s" },
  { x: "85%", y: "65%", color: "#8fd3ff", delay: "0.2s" },
  { x: "35%", y: "15%", color: "#ff87c5", delay: "0.8s" },
  { x: "70%", y: "80%", color: "#ffd86b", delay: "0.5s" },
];

// ========================================
// TYPEWRITER
// ========================================

function useTypewriter(
  text: string,
  enabled: boolean,
  speed = 45
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

// ========================================
// FIREWORK COMPONENT
// ========================================

function Fireworks({
  stage,
}: {
  stage: FireworkStage;
}) {
  if (stage === "none") return null;

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
          {Array.from({
            length: particleCount,
          }).map((_, particleIndex) => (
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
          ))}
        </div>
      ))}
    </div>
  );
}

// ========================================
// SPECIAL PAGE
// ========================================

function Special() {
  const navigate = useNavigate();

  const [stage, setStage] = useState<Stage>("envelope");
  const [opened, setOpened] = useState(false);

  const [visiblePhotos, setVisiblePhotos] = useState(0);
  const [startTyping, setStartTyping] = useState(false);

  const [fireworkStage, setFireworkStage] =
    useState<FireworkStage>("none");

  // ======================================
  // TYPEWRITER
  // ======================================

  const typedReceiver = useTypewriter(
    RECEIVER_TITLE,
    startTyping,
    65
  );

  const receiverFinished =
    startTyping &&
    typedReceiver.length === RECEIVER_TITLE.length;

  const typedMessage = useTypewriter(
    MESSAGE,
    receiverFinished,
    32
  );

  const messageFinished =
    receiverFinished &&
    typedMessage.length === MESSAGE.length;

  // ======================================
  // STEP 1: OPEN ENVELOPE
  // ======================================

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

  // ======================================
  // STEP 2: FADE ENVELOPE
  // ======================================

  useEffect(() => {
    if (stage !== "fading") return;

    const timer = window.setTimeout(() => {
      setStage("memories");
    }, ENVELOPE_FADE_DURATION);

    return () => window.clearTimeout(timer);
  }, [stage]);

  // ======================================
  // STEP 3: SHOW PHOTOS
  // ======================================

  useEffect(() => {
    if (stage !== "memories") return;

    if (visiblePhotos >= PHOTOS.length) {
      const timer = window.setTimeout(() => {
        setStartTyping(true);
      }, PHOTO_FADE_DURATION + TYPING_START_DELAY);

      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setVisiblePhotos((prev) => prev + 1);
    }, PHOTO_APPEAR_INTERVAL);

    return () => window.clearTimeout(timer);
  }, [stage, visiblePhotos]);

  // ======================================
  // STEP 4: BIG FIREWORKS
  // ======================================

  useEffect(() => {
    if (!messageFinished) return;

    const timer = window.setTimeout(() => {
      setFireworkStage("big");
    }, 350);

    return () => window.clearTimeout(timer);
  }, [messageFinished]);

  // ======================================
  // STEP 5: SMALL FIREWORKS
  // ======================================

  useEffect(() => {
    if (fireworkStage !== "big") return;

    const timer = window.setTimeout(() => {
      setFireworkStage("small");
    }, BIG_FIREWORK_DURATION);

    return () => window.clearTimeout(timer);
  }, [fireworkStage]);

  // ======================================
  // RENDER
  // ======================================

  return (
    <main className="special-page">
      <Fireworks stage={fireworkStage} />

      {/* Nút quay về Welcome */}
      <button
        type="button"
        className="special-back-home"
        onClick={() => navigate("/")}
      >
        <span aria-hidden="true">←</span>
        <span>Welcome</span>
      </button>

      {stage !== "memories" ? (
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
        <section className="memories-section">
          {/* TIÊU ĐỀ TRÊN ẢNH */}

          <header className="special-hero">
            <span
              className="special-hero-decoration"
              aria-hidden="true"
            >
              ✨ 🌸 ✨
            </span>

            <h1 className="special-hero-title">
              {PAGE_TITLE}
            </h1>

            {/* Cờ Việt Nam SVG trực tiếp */}
            <div className="special-hero-line">
              <svg
                className="vietnam-flag"
                viewBox="0 0 300 200"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Cờ Việt Nam"
              >
                <rect
                  width="300"
                  height="200"
                  fill="#DA251D"
                />
                <polygon
                  points="150,48 162.2,85.9 202.1,85.9 169.9,109.3 182.1,147.2 150,123.8 117.9,147.2 130.1,109.3 97.9,85.9 137.8,85.9"
                  fill="#FFFF00"
                />
              </svg>
            </div>
          </header>

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
            <h2 className="receiver-title">
              {typedReceiver}

              {startTyping && !receiverFinished && (
                <span className="typing-cursor">|</span>
              )}
            </h2>

            <p>
              {typedMessage}

              {receiverFinished &&
                !messageFinished && (
                  <span className="typing-cursor">|</span>
                )}
            </p>

            {/* CHỮ KÝ VÀ ẢNH MẶT */}

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
