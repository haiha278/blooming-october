
import { useEffect, useRef, useState } from "react";
import "./BackgroundMusic.css";

function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  // Đánh dấu người dùng đã chủ động điều khiển nhạc
  const userControlledRef = useRef(false);

  // Đánh dấu nhạc đã được phát thành công
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;

    // Thử phát ngay khi vào website
    const tryAutoPlay = async () => {
      if (userControlledRef.current) return;

      try {
        await audio.play();

        hasPlayedRef.current = true;
      } catch {
        // Browser chặn autoplay
      }
    };

    void tryAutoPlay();

    // Chỉ tự kích hoạt ở lần tương tác đầu,
    // không được bật lại khi người dùng đã tắt
    const startOnInteraction = () => {
      if (
        userControlledRef.current ||
        hasPlayedRef.current
      ) {
        return;
      }

      void audio.play()
        .then(() => {
          hasPlayedRef.current = true;
        })
        .catch(() => {
          // Chưa được phép phát
        });
    };

    document.addEventListener(
      "pointerdown",
      startOnInteraction
    );

    document.addEventListener(
      "keydown",
      startOnInteraction
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        startOnInteraction
      );

      document.removeEventListener(
        "keydown",
        startOnInteraction
      );
    };
  }, []);

  // ==================================
  // USER CONTROL
  // ==================================

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Đánh dấu từ đây nhạc chỉ được
    // điều khiển bằng nút loa
    userControlledRef.current = true;

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();

      hasPlayedRef.current = true;
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/music.mp3"
        loop
        preload="auto"
        onPlay={() => {
          hasPlayedRef.current = true;
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        className="music-toggle"
        onClick={toggleMusic}
        aria-label={
          isPlaying
            ? "Pause music"
            : "Play music"
        }
        aria-pressed={isPlaying}
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>
    </>
  );
}

export default BackgroundMusic;
