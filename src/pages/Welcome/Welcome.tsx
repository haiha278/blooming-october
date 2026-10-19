import { useCallback, useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import PasswordModal from "../../components/PasswordModal/PasswordModal";

import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  // Popup mật khẩu
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Hiệu ứng hoa nở
  const [isBlooming, setIsBlooming] = useState(false);

  // Timer mở popup trên điện thoại
  const modalTimerRef = useRef<number | null>(null);

  const openingRef = useRef(false);

  // ===================================
  // CLEANUP
  // ===================================

  useEffect(() => {
    return () => {
      if (modalTimerRef.current !== null) {
        window.clearTimeout(modalTimerRef.current);
      }
    };
  }, []);

  // ===================================
  // CLOSE PASSWORD MODAL
  // ===================================

  const closePasswordModal = useCallback(() => {
    setShowPasswordModal(false);
    setIsBlooming(false);
    openingRef.current = false;
  }, []);

  // ===================================
  // OPEN SPECIAL MODAL
  // ===================================

  const openSpecialModal = () => {
    if (openingRef.current || showPasswordModal) {
      return;
    }

    openingRef.current = true;
    setIsBlooming(true);

    // Kiểm tra thiết bị có hỗ trợ hover không
    const hasHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    if (hasHover) {
      // Desktop: mở popup ngay
      setShowPasswordModal(true);
    } else {
      // Mobile: hoa nở trước rồi mới mở popup
      modalTimerRef.current = window.setTimeout(() => {
        setShowPasswordModal(true);
        modalTimerRef.current = null;
      }, 700);
    }
  };

  // ===================================
  // PASSWORD SUCCESS
  // ===================================

  const handlePasswordSuccess = () => {
    setShowPasswordModal(false);
    navigate("/special");
  };

  // ===================================
  // RENDER
  // ===================================

  return (
    <main className="welcome-page">
      <div
        className={`welcome-content ${
          showPasswordModal ? "welcome-hidden" : ""
        }`}
        inert={showPasswordModal}
      >
        {/* ===================================
            TULIP FLOWER
        =================================== */}

        <div
          className={`welcome-tulip ${isBlooming ? "tulip-blooming" : ""}`}
          aria-hidden="true"
        >
          {/* Ánh sáng */}
          <span className="tulip-glow" />

          {/* Cánh hoa */}
          <span className="tulip-petal petal-left">🌷</span>

          <span className="tulip-petal petal-right">🌷</span>

          {/* Hoa chính */}
          <span className="tulip-emoji">🌷</span>

          {/* Sparkles */}
          <span className="bloom-sparkle sparkle-left">✨</span>

          <span className="bloom-sparkle sparkle-right">✨</span>
        </div>

        {/* ===================================
            TITLE
        =================================== */}

        <h1>Happy 20/10!</h1>

        <p>Pick one to continue</p>

        {/* ===================================
            BUTTONS
        =================================== */}

        <div className="welcome-buttons">
          {/* NORMAL FRIEND */}
          <button
            type="button"
            className="btn-friend"
            onClick={() => navigate("/celebrate")}
          >
            For Everyone
          </button>

          {/* REALLY SPECIAL */}
          <button
            type="button"
            className="btn-special"
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse" && !openingRef.current) {
                setIsBlooming(true);
              }
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse" && !openingRef.current) {
                setIsBlooming(false);
              }
            }}
            onFocus={() => {
              setIsBlooming(true);
            }}
            onBlur={() => {
              if (!openingRef.current) {
                setIsBlooming(false);
              }
            }}
            onClick={openSpecialModal}
          >
            Special Friend
          </button>
        </div>
      </div>

      {/* ===================================
          PASSWORD POPUP
      =================================== */}

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={closePasswordModal}
        onSuccess={handlePasswordSuccess}
      />
    </main>
  );
}

export default Welcome;
