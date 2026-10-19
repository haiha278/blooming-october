
// import {
//   useCallback,
//   useRef,
//   useState,
//   type CSSProperties,
// } from "react";

// import { useNavigate } from "react-router-dom";
// import PasswordModal from "../../components/PasswordModal/PasswordModal";
// import "./Welcome.css";

// type Position = {
//   x: number;
//   y: number;
// };

// function Welcome() {
//   const navigate = useNavigate();

//   const [showPasswordModal, setShowPasswordModal] = useState(false);
//   const [isBlooming, setIsBlooming] = useState(false);

//   // Vị trí nút Normal friend
//   const [normalPosition, setNormalPosition] =
//     useState<Position | null>(null);

//   const normalButtonRef = useRef<HTMLButtonElement>(null);

//   const closePasswordModal = useCallback(() => {
//     setShowPasswordModal(false);
//     setIsBlooming(false);
//   }, []);

//   const handlePasswordSuccess = () => {
//     setShowPasswordModal(false);
//     navigate("/special");
//   };

//   // Random vị trí mới cho nút Normal
//   const moveNormalButton = () => {
//     const button = normalButtonRef.current;
//     if (!button) return;

//     const rect = button.getBoundingClientRect();

//     const buttonWidth = rect.width;
//     const buttonHeight = rect.height;

//     const padding = 25;

//     const maxX = Math.max(
//       padding,
//       window.innerWidth - buttonWidth - padding
//     );

//     const maxY = Math.max(
//       padding,
//       window.innerHeight - buttonHeight - padding
//     );

//     let newX = padding;
//     let newY = padding;

//     // Tránh nhảy đến quá gần vị trí cũ
//     for (let i = 0; i < 20; i++) {
//       const x = padding + Math.random() * (maxX - padding);
//       const y = padding + Math.random() * (maxY - padding);

//       const distance = Math.hypot(
//         x - rect.left,
//         y - rect.top
//       );

//       if (distance > 180 || i === 19) {
//         newX = x;
//         newY = y;
//         break;
//       }
//     }

//     setNormalPosition({
//       x: newX,
//       y: newY,
//     });
//   };

//   return (
//     <main className="welcome-page">
//       <div
//         className={`welcome-content ${
//           showPasswordModal ? "welcome-hidden" : ""
//         }`}
//       >
//         {/* Bông tulip có hiệu ứng nở */}
//         <div
//           className={`welcome-tulip ${
//             isBlooming ? "tulip-blooming" : ""
//           }`}
//           aria-hidden="true"
//         >
//           <span className="tulip-glow" />

//           <span className="tulip-petal petal-left">🌷</span>
//           <span className="tulip-petal petal-right">🌷</span>

//           <span className="tulip-emoji">🌷</span>

//           <span className="bloom-sparkle sparkle-left">
//             ✨
//           </span>

//           <span className="bloom-sparkle sparkle-right">
//             ✨
//           </span>
//         </div>

//         <h1>Happy 20/10!</h1>

//         <p>Pick one to continue</p>

//         <div className="welcome-buttons">
//           {/* Giữ chỗ của nút Normal */}
//           <div className="normal-button-slot">
//             <button
//               ref={normalButtonRef}
//               type="button"
//               className={`btn-friend normal-running-button ${
//                 normalPosition ? "is-escaping" : ""
//               }`}
//               style={
//                 normalPosition
//                   ? ({
//                       left: `${normalPosition.x}px`,
//                       top: `${normalPosition.y}px`,
//                     } as CSSProperties)
//                   : undefined
//               }
//               onPointerEnter={(event) => {
//                 // Chỉ chạy trốn khi hover bằng chuột
//                 if (event.pointerType === "mouse") {
//                   moveNormalButton();
//                 }
//               }}
//               onClick={(event) => {
//                 event.preventDefault();
//                 moveNormalButton();
//               }}
//             >
//               Normal friend
//             </button>
//           </div>

//           <button
//             className="btn-special"
//             onMouseEnter={() => setIsBlooming(true)}
//             onMouseLeave={() => setIsBlooming(false)}
//             onFocus={() => setIsBlooming(true)}
//             onBlur={() => setIsBlooming(false)}
//             onClick={() => setShowPasswordModal(true)}
//           >
//             Really special
//           </button>
//         </div>
//       </div>

//       <PasswordModal
//         isOpen={showPasswordModal}
//         onClose={closePasswordModal}
//         onSuccess={handlePasswordSuccess}
//       />
//     </main>
//   );
// }

// export default Welcome;


import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useNavigate } from "react-router-dom";

import PasswordModal from "../../components/PasswordModal/PasswordModal";
import "./Welcome.css";

type Position = {
  x: number;
  y: number;
};

function Welcome() {
  const navigate = useNavigate();

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [isBlooming, setIsBlooming] = useState(false);

  const [normalPosition, setNormalPosition] =
    useState<Position | null>(null);

  const normalButtonRef = useRef<HTMLButtonElement>(null);
  const normalPositionRef = useRef<Position | null>(null);
  const openTimerRef = useRef<number | null>(null);
  const specialOpeningRef = useRef(false);

  const closePasswordModal = useCallback(() => {
    setShowPasswordModal(false);
    setIsBlooming(false);
    specialOpeningRef.current = false;
  }, []);

  // Clear timer khi rời trang
  useEffect(() => {
    return () => {
      if (openTimerRef.current !== null) {
        window.clearTimeout(openTimerRef.current);
      }
    };
  }, []);

  // Giữ nút Normal nằm trong viewport khi xoay màn hình
  useEffect(() => {
    const keepButtonInside = () => {
      const position = normalPositionRef.current;
      const button = normalButtonRef.current;

      if (!position || !button) return;

      const width = button.offsetWidth;
      const height = button.offsetHeight;
      const padding = 12;

      const next = {
        x: Math.max(
          padding,
          Math.min(
            position.x,
            window.innerWidth - width - padding
          )
        ),
        y: Math.max(
          padding,
          Math.min(
            position.y,
            window.innerHeight - height - padding
          )
        ),
      };

      normalPositionRef.current = next;
      setNormalPosition(next);
    };

    window.addEventListener("resize", keepButtonInside);

    return () => {
      window.removeEventListener(
        "resize",
        keepButtonInside
      );
    };
  }, []);

  const moveNormalButton = () => {
    if (showPasswordModal) return;

    const button = normalButtonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();

    const padding = 12;
    const maxX = Math.max(
      padding,
      window.innerWidth - rect.width - padding
    );
    const maxY = Math.max(
      padding,
      window.innerHeight - rect.height - padding
    );

    let newPosition: Position = {
      x: padding,
      y: padding,
    };

    for (let i = 0; i < 30; i++) {
      const candidate = {
        x: padding + Math.random() * (maxX - padding),
        y: padding + Math.random() * (maxY - padding),
      };

      const distance = Math.hypot(
        candidate.x - rect.left,
        candidate.y - rect.top
      );

      newPosition = candidate;

      if (distance > 120) break;
    }

    normalPositionRef.current = newPosition;
    setNormalPosition(newPosition);
  };

  const openSpecialModal = () => {
    if (specialOpeningRef.current || showPasswordModal) {
      return;
    }

    specialOpeningRef.current = true;
    setIsBlooming(true);

    const hasHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (hasHover) {
      setShowPasswordModal(true);
      return;
    }

    // Mobile: cho hoa nở trước khi mở popup
    openTimerRef.current = window.setTimeout(() => {
      setShowPasswordModal(true);
      openTimerRef.current = null;
    }, 700);
  };

  const handlePasswordSuccess = () => {
    setShowPasswordModal(false);
    navigate("/special");
  };

  return (
    <main className="welcome-page">
      <div
        className={`welcome-content ${
          showPasswordModal ? "welcome-hidden" : ""
        }`}
        inert={showPasswordModal}
      >
        {/* Tulip nở khi chọn Really special */}
        <div
          className={`welcome-tulip ${
            isBlooming ? "tulip-blooming" : ""
          }`}
          aria-hidden="true"
        >
          <span className="tulip-glow" />

          <span className="tulip-petal petal-left">
            🌷
          </span>
          <span className="tulip-petal petal-right">
            🌷
          </span>

          <span className="tulip-emoji">🌷</span>

          <span className="bloom-sparkle sparkle-left">
            ✨
          </span>
          <span className="bloom-sparkle sparkle-right">
            ✨
          </span>
        </div>

        <h1>Happy 20/10!</h1>
        <p>Pick one to continue</p>

        <div className="welcome-buttons">
          <div className="normal-button-slot">
            <button
              ref={normalButtonRef}
              type="button"
              className={`btn-friend normal-running-button ${
                normalPosition ? "is-escaping" : ""
              }`}
              style={
                normalPosition
                  ? ({
                      left: `${normalPosition.x}px`,
                      top: `${normalPosition.y}px`,
                    } as CSSProperties)
                  : undefined
              }
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") {
                  moveNormalButton();
                }
              }}
              onClick={(event) => {
                event.preventDefault();
                moveNormalButton();
              }}
            >
              Normal friend
            </button>
          </div>

          <button
            type="button"
            className="btn-special"
            onPointerEnter={(event) => {
              if (
                event.pointerType === "mouse" &&
                !specialOpeningRef.current
              ) {
                setIsBlooming(true);
              }
            }}
            onPointerLeave={(event) => {
              if (
                event.pointerType === "mouse" &&
                !specialOpeningRef.current
              ) {
                setIsBlooming(false);
              }
            }}
            onFocus={() => setIsBlooming(true)}
            onBlur={() => {
              if (!specialOpeningRef.current) {
                setIsBlooming(false);
              }
            }}
            onClick={openSpecialModal}
          >
            Really special
          </button>
        </div>
      </div>

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={closePasswordModal}
        onSuccess={handlePasswordSuccess}
      />
    </main>
  );
}

export default Welcome;
