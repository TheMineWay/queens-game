import { Board } from "@/types/game/board.type";
import { BoardBuilder } from "@/utils/board/generator/board-builder.util";

export const getPossibleNextRowPositionsByRow = (
  row: Board[number],
  possiblePositions?: Board[number]
) => {
  const positions =
    possiblePositions || Array.from({ length: row.length }, (_, i) => i);
  const validPositions: number[] = [];

  for (const pos of positions) {
    // Check pos type & if position is already valid
    if (typeof pos !== "number" || validPositions.includes(pos)) continue;

    // If position is out of scope, it gets discarted
    if (row.length <= pos) continue;

    // Generate array of positions to check
    const positionsToCheck = [pos - 1, pos, pos + 1].filter(
      (p) => p >= 0 && p < row.length
    );

    // If any position is initialized, the position is valid. Otherwise, it is not.
    if (
      positionsToCheck.every(
        (p) => !BoardBuilder.isCellValueInitialized(row[p])
      )
    ) {
      validPositions.push(pos);
    }
  }

  return validPositions;
};
