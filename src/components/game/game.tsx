"use client";

import Board from "@/components/game/board/board";
import Timer from "@/components/game/timer/timer";
import { useTimer } from "@/hooks/utils/use-timer";

export default function Game() {
  const timer = useTimer();

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <Timer timer={timer} />
      <Board
        board={{
          board: [
            [1, 0, 1, 0],
            [0, 1, 0, 1],
            [1, 0, 1, 0],
            [0, 1, 0, 1],
          ],
          colors: ["FF00FF", "12BA12"],
        }}
      />
    </div>
  );
}
