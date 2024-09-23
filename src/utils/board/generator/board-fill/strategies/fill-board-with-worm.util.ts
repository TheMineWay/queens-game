import { Board } from "@/types/game/board.type";
import { BoardBuilder } from "@/utils/board/generator/board-builder.util";
import { shuffleArray } from "@/utils/list/shuffle-array.util";
import {
  getRandomValueByProbability,
  ProbabilityItem,
} from "@/utils/randomization/get-random-value-by-probability.util";

type Options = {
  lazyWorms?: boolean;
  restRounds?: boolean;
  maxStepSize?: number;
};

export const fillBoardWithWorm = (
  b: BoardBuilder,
  { lazyWorms = false, maxStepSize = 1, restRounds = false }: Options = {}
): BoardBuilder => {
  const board = new BoardBuilder(structuredClone(b.getBoard()));
  const wormsToMove = removeLazyWorms(lazyWorms, board.findAllDistinctCodes());

  while (wormsToMove.length > 0) {
    if (!shouldWormRest(restRounds)) continue;

    for (const worm of wormsToMove) {
      moveWorm(board, worm, { maxStepSize });
    }

    wormsToMove.pop(); // Avoid infinite loop
  }

  // No more codes able to move
  // TODO: fill rest of board

  return board;
};

// Worm ID stands for the code number of each cell
const moveWorm = (
  builder: BoardBuilder,
  wormId: Board[number][number],
  options: { maxStepSize?: number | null }
) => {};

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
