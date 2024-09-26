import { Board } from "@/types/game/board.type";
import { BoardBuilder } from "@/utils/board/generator/board-builder.util";
import { fillBoard } from "@/utils/board/generator/board-fill/fill-board.util";
import { getPossibleNextRowPositionsByRow } from "@/utils/board/generator/get-possible-next-row-positions-by-row.util";
import { shuffleArray } from "@/utils/list/shuffle-array.util";
import { getRandomIndex } from "@/utils/randomization/get-random-index.util";

type Options = {
  size: number; // Min should be 4
};

export const generateBoard = ({ size }: Options): Board => {
  const builder = seedPrimordialColors(BoardBuilder.fromSize(size));

  return fillBoard(builder).getBoard();
};

const seedPrimordialColors = (boardBuilder: BoardBuilder): BoardBuilder => {
  const deepSeed = ({
    depth = 0,
    available,
    board,
  }: {
    depth?: number;
    available?: number[];
    board: Board;
  }): Board => {
    const shuffledPositions = shuffleArray(
      getPossibleNextRowPositionsByRow(board[depth - 1], available)
    );

    for (const positionTry of shuffledPositions) {
      try {
        const bCopy = structuredClone(board);
        bCopy[depth][positionTry] = depth; // Initialize position

        if (depth >= board.length - 1) return bCopy;

        return deepSeed({
          depth: depth + 1,
          board: bCopy,
          available: [...(available ?? [])].filter((a) => a !== positionTry),
        });
      } catch (e) {
        continue;
      }
    }

    throw new Error("Cannot generate board");
  };

  // Pick a random cell from the first row
  const board = boardBuilder.getBoard();
  board[0][getRandomIndex(board[0])] = 0;

  return new BoardBuilder(
    deepSeed({
      depth: 1,
      board,
      available: board[0]
        .map((p, i) => (p === null ? i : NaN))
        .filter((x) => !Number.isNaN(x)),
    })
  );
};
