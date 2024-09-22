"use client";

import Board from "@/components/game/board/board";
import Timer from "@/components/game/timer/timer";
import { useTimer } from "@/hooks/utils/use-timer";
import { generateBoard } from "@/utils/board/generator/generate-board.util";
import { useState } from "react";

export default function Game() {
  const timer = useTimer();
  const [board] = useState(generateBoard({ size: 8 }));

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <Timer timer={timer} />
      <Board
        board={{
          board: board,
          colors: [
            "FF0000",
            "00FF00",
            "0000FF",
            "FF00FF",
            "FFFF00",
            "00FFFF",
            "A9A9A9",
            "16BA16",
            "BABA16",
            "BA16BA",
          ],
        }}
      />
    </div>
  );
}
