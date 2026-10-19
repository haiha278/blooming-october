
import { useEffect, useRef, useState } from "react";
import "./BackgroundMusic.css";

function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;

    // Thử phát ngay khi vào website
    const tryAutoPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Trình duyệt chặn autoplay
        setIsPlaying(false);
      }
    };

    void tryAutoPlay();

    // Nếu autoplay bị chặn, phát ở lần tương tác đầu
    const startOnInteraction = () => {
      if (audio.paused) {
        void audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
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

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/music.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        className="music-toggle"
        onClick={toggleMusic}
        aria-label={
          isPlaying ? "Pause music" : "Play music"
        }
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>
    </>
  );
}

export default BackgroundMusic;
