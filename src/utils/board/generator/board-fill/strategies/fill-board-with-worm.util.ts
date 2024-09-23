import { BoardBuilder } from "@/utils/board/generator/board-builder.util";

type Options = {
  lazyWorms?: boolean;
  maxStepSize?: number;
};

export const fillBoardWithWorm = (
  b: BoardBuilder,
  { lazyWorms = false, maxStepSize = 1 }: Options = {}
): BoardBuilder => {
  const board = new BoardBuilder(structuredClone(b.getBoard()));

  let safe = 0;

  const codesToMove = board.findAllDistinctCodes();
  while (!board.isInitialized()) {
    if (!shouldMoveWorm(lazyWorms)) continue;

    safe++;
    if (safe >= 500) {
      console.log("Safe exit activated [!]");
      break;
    }
  }

  return board;
};

// Worm ID stands for the code number of each cell
const moveWorm = (wormId: number, options: Options) => {};

const shouldMoveWorm = (isLazy: boolean) => {
  if (!isLazy) return true;

  return true;
};
