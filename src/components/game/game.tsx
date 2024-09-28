"use client";

import Board from "@/components/game/board/board";
import Timer from "@/components/game/timer/timer";
import { useTimer } from "@/hooks/utils/use-timer";
import boardColors from "@/constants/colors/board-colors.json";
import { useGame } from "@/hooks/game/use-game";

export default function Game() {
  const timer = useTimer();
  const game = useGame({ boardSize: 10 });

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <Timer timer={timer} />
      <Board game={game} colors={boardColors} />
    </div>
  );
}
