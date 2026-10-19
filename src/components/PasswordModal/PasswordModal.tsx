
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import "../PasswordModal/PaswordModal.css";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SECRET_PASSWORD = "20102026";

function PasswordModal({
  isOpen,
  onClose,
  onSuccess,
}: PasswordModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    // Delay nhẹ để tránh mở bàn phím ngay
    // trong lúc popup đang animate trên mobile
    const focusTimer = window.setTimeout(() => {
      if (
        window.matchMedia("(pointer: fine)").matches
      ) {
        inputRef.current?.focus();
      }
    }, 100);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeRef.current();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen]);

  const handleClose = () => {
    setPassword("");
    setError("");
    onClose();
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!password.trim()) {
      setError("Please enter the password");
      return;
    }

    if (password !== SECRET_PASSWORD) {
      setError("Incorrect password. Try again! 🌸");
      return;
    }

    setPassword("");
    setError("");
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div
      className="password-overlay"
      onPointerDown={(event) => {
        // Chỉ đóng khi chạm trực tiếp lớp nền
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="password-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="password-title"
      >
        <div className="password-lock">🔐</div>

        <h2 id="password-title">
          Please enter password
        </h2>

        <p className="password-hint">
          Hint: Ask Me =)))
        </p>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="password"
            className="password-input"
            value={password}
            placeholder="••••"
            autoComplete="off"
            aria-label="Secret password"
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
          />

          {error && (
            <p
              className="password-error"
              role="alert"
            >
              {error}
            </p>
          )}

          <div className="password-actions">
            <button
              type="button"
              className="password-back"
              onClick={handleClose}
            >
              Back
            </button>

            <button
              type="submit"
              className="password-enter"
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordModal;
