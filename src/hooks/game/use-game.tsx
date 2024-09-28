import { usePlayerBoard } from "@/hooks/game/use-player-board";
import { generateBoard } from "@/utils/board/generator/generate-board.util";
import { useState } from "react";

type Options = {
  boardSize: number;
};

export const useGame = ({ boardSize }: Options) => {
  const [board] = useState(generateBoard({ size: boardSize }));
  const playerBoard = usePlayerBoard({ board });

  return {
    board,
    playerBoard,
  };
};

export type UseGame = ReturnType<typeof useGame>;
