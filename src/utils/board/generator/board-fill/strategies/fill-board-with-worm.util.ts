import { Board } from "@/types/game/board.type";
import { BoardManager } from "@/utils/board/board-manager.util";
import { shuffleArray } from "@/utils/list/shuffle-array.util";
import { getRandomIndex } from "@/utils/randomization/get-random-index.util";
import { getRandomValueByProbability } from "@/utils/randomization/get-random-value-by-probability.util";

type Options = {
  lazyWorms?: boolean;
  restRounds?: boolean;
  maxStepSize?: number;
};

export const fillBoardWithWorm = (
  b: BoardManager,
  { lazyWorms = false, maxStepSize = 1, restRounds = false }: Options = {}
): BoardManager => {
  const board = new BoardManager(structuredClone(b.getBoard()));
  const wormsToMove = removeLazyWorms(lazyWorms, board.findAllDistinctCodes());

  // Phase 1: use not lazy worms to generate the board
  while (wormsToMove.length > 0) {
    if (!shouldWormRest(restRounds)) continue;

    for (const worm of wormsToMove) {
      const hasMoved = moveWorm(board, worm, { maxStepSize });

      // If worm cannot keep moving, remove it from the array
      if (!hasMoved) {
        wormsToMove.splice(wormsToMove.indexOf(worm), 1);
      }
    }
  }

  // Phase 2: ensure all board is initialized by extending all codes
  ensureBoardIsInitialized(board);

  return board;
};

export const ensureBoardIsInitialized = (board: BoardManager) => {
  const worms = board.findAllDistinctCodes();
  while (!board.isInitialized()) {
    for (const wormId of worms) {
      const hasMoved = moveWorm(board, wormId, { maxStepSize: 2 });

      // If worm cannot keep moving, remove it from the array
      if (!hasMoved) worms.splice(worms.indexOf(wormId), 1);
    }

    break;
  }
};

// Worm ID stands for the code number of each cell
const moveWorm = (
  builder: BoardManager,
  wormId: Board[number][number],
  { maxStepSize = 1 }: { maxStepSize?: number | null }
): boolean => {
  for (let i = 0; maxStepSize === null || i < maxStepSize; i++) {
    const positions = builder.findEmptyAdjacentCellsByCode(wormId);
    if (positions.length <= 0) return false; // Cannot move

    builder.setPosition(positions[getRandomIndex(positions)], wormId);
  }

  return true;
};

const shouldWormRest = (lazyRounds: boolean) => {
  if (!lazyRounds) return true;

  return getRandomValueByProbability([
    {
      value: true,
      probability: 1,
    },
    {
      value: false,
      probability: 15,
    },
  ]);
};

const removeLazyWorms = (
  lazyWorms: boolean,
  worms: Board[number][number][]
) => {
  let cWorms = [...worms];
  const boardSize = worms.length;
  if (lazyWorms) {
    cWorms = shuffleArray(cWorms);

    let rounds = 1;

    // If the board is considered medium-big it will have more probabilities to have more than one lazy worm
    if (boardSize > 13) rounds++;

    for (let i = 0; i < rounds; i++) {
      // 50% chance of being lazy
      if (Math.random() < 0.5) cWorms.pop();
    }
  }

  return cWorms;
};
