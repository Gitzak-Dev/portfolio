// "use client";

// import { useEffect, useRef } from "react";

// export default function BackgroundMusic() {
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const hasStartedRef = useRef(false);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     audio.volume = 0.18;
//     audio.loop = true;

//     const startMusic = async () => {
//       if (hasStartedRef.current) return;

//       try {
//         await audio.play();
//         hasStartedRef.current = true;

//         window.removeEventListener("click", startMusic);
//         window.removeEventListener("pointerdown", startMusic);
//         window.removeEventListener("touchstart", startMusic);
//         window.removeEventListener("keydown", startMusic);
//         window.removeEventListener("scroll", startMusic);
//       } catch {
//         hasStartedRef.current = false;
//       }
//     };

//     startMusic();

//     window.addEventListener("click", startMusic, { once: true });
//     window.addEventListener("pointerdown", startMusic, { once: true });
//     window.addEventListener("touchstart", startMusic, { once: true });
//     window.addEventListener("keydown", startMusic, { once: true });
//     window.addEventListener("scroll", startMusic, { once: true });

//     return () => {
//       audio.pause();

//       window.removeEventListener("click", startMusic);
//       window.removeEventListener("pointerdown", startMusic);
//       window.removeEventListener("touchstart", startMusic);
//       window.removeEventListener("keydown", startMusic);
//       window.removeEventListener("scroll", startMusic);
//     };
//   }, []);

//   return (
//     <audio
//       ref={audioRef}
//       src="/background-music.mp3"
//       preload="auto"
//       loop
//     />
//   );
// }
// 


"use client";

import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.18;
    audio.loop = true;
    audio.preload = "auto";

    const tryStartMusic = () => {
      if (startedRef.current) return;

      audio
        .play()
        .then(() => {
          startedRef.current = true;

          document.removeEventListener("click", tryStartMusic, true);
          document.removeEventListener("pointerdown", tryStartMusic, true);
          document.removeEventListener("touchstart", tryStartMusic, true);
          document.removeEventListener("keydown", tryStartMusic, true);
          document.removeEventListener("wheel", tryStartMusic, true);
        })
        .catch((error) => {
          console.log("Music play blocked or failed:", error);
        });
    };

    audio.load();

    // Page load par direct try
    tryStartMusic();

    // Agar browser block kare, first real user interaction par start hoga
    document.addEventListener("click", tryStartMusic, true);
    document.addEventListener("pointerdown", tryStartMusic, true);
    document.addEventListener("touchstart", tryStartMusic, true);
    document.addEventListener("keydown", tryStartMusic, true);
    document.addEventListener("wheel", tryStartMusic, true);

    return () => {
      audio.pause();

      document.removeEventListener("click", tryStartMusic, true);
      document.removeEventListener("pointerdown", tryStartMusic, true);
      document.removeEventListener("touchstart", tryStartMusic, true);
      document.removeEventListener("keydown", tryStartMusic, true);
      document.removeEventListener("wheel", tryStartMusic, true);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/background-music.mp3"
      preload="auto"
      loop
      playsInline
    />
  );
}