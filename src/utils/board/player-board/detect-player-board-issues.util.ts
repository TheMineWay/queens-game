import { Board } from "@/types/game/board.type";
import { Position } from "@/types/game/board/position.type";
import { PlayerBoardCellCode } from "@/types/game/player-board/player-board-cell-code.enum";
import { PlayerBoard } from "@/types/game/player-board/player-board.type";
import { BoardManager } from "@/utils/board/board-manager.util";

type DetectPlayerBoardIssuesOptions = {
  playerBoard: PlayerBoard;
  board: Board;
};

export const detectPlayerBoardIssues = ({
  board,
  playerBoard,
}: DetectPlayerBoardIssuesOptions): PlayerBoardIssues => {
  const manager = new BoardManager(board);
  const queens = findQueensByPlayerBoard(playerBoard);
  const issues: PlayerBoardIssues = [];

  addSameColorIssues(queens, manager, issues);

  return issues;
};

export type PlayerBoardIssues = boolean[][];

const findQueensByPlayerBoard = (pb: PlayerBoard) => {
  const queens: Position[] = [];

  for (let x = 0; x < pb.length; x++) {
    const row = pb[x];
    for (let y = 0; y < pb.length; y++) {
      if (row[y] === PlayerBoardCellCode.QUEEN) queens.push({ x, y });
    }
  }

  return queens;
};

// Issues

const addSameColorIssues = (
  queens: Position[],
  manager: BoardManager,
  issues: PlayerBoardIssues
) => {
  for (const color of manager.findAllDistinctCodes()) {
    const positions = manager.findAllPositionsByCode(color);

    const queensInColor: Position[] = [];
    for (const queen of queens) {
      for (const position of positions) {
        if (queen.x === position.x && queen.y === position.y)
          queensInColor.push(queen);
      }
    }

    if (queensInColor.length > 1) {
      // Issue
      for (const queen of queensInColor) {
        issues[queen.x][queen.y] = true;
      }
    }
  }
};
