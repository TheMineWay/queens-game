"use client";

import Board from "@/components/game/board/board";
import Timer from "@/components/game/timer/timer";
import { useTimer } from "@/hooks/utils/use-timer";
import { generateBoard } from "@/utils/board/generator/generate-board.util";
import { useState } from "react";
import boardColors from "@/constants/colors/board-colors.json";

export default function Game() {
  const timer = useTimer();
  const [board] = useState(generateBoard({ size: 10 }));

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <Timer timer={timer} />
      <Board
        board={{
          board: board,
          colors: boardColors,
        }}
      />
    </div>
  );
}
