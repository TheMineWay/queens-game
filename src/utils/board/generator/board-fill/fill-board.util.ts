import { BoardManager } from "@/utils/board/board-manager.util";
import { fillBoardWithWorm } from "@/utils/board/generator/board-fill/strategies/fill-board-with-worm.util";

export const fillBoard = (board: BoardManager): BoardManager => {
  return fillBoardWithWorm(board);
};
