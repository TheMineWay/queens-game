import { BoardBuilder } from "@/utils/board/generator/board-builder.util";
import { fillBoardWithWorm } from "@/utils/board/generator/board-fill/strategies/fill-board-with-worm.util";

export const fillBoard = (board: BoardBuilder): BoardBuilder => {
  return fillBoardWithWorm(board);
};
