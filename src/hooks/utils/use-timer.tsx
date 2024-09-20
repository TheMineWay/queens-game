import { useEffect, useState } from "react";

type Options = {
  startAt?: number;
  countBackwards?: boolean;
  autoPlay?: boolean;
};

export const useTimer = ({
  startAt = 0,
  countBackwards = false,
  autoPlay = false,
}: Options = {}) => {
  const [isPlaying, setPlaying] = useState(autoPlay);
  const [timer, setTimer] = useState(startAt);

  useEffect(() => {
    if (!isPlaying) return;

    setTimeout(() => {
      const increased = (timer + 1) * (countBackwards ? -1 : 1);

      setTimer(increased);
      if (increased <= 0) setPlaying(false);
    }, 1000);
  }, [isPlaying, timer, countBackwards]);

  const pause = () => setPlaying(false);
  const play = () => setPlaying(true);
  const toggle = () => (isPlaying ? pause() : play());
  const reset = () => setTimer(startAt);

  return {
    // States
    isPlaying,
    setPlaying,
    timer,
    setTimer,

    // Utils
    pause,
    play,
    toggle,
    reset,
  };
};

export type UseTimer = ReturnType<typeof useTimer>;
