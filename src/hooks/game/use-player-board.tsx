import { Board } from "@/types/game/board.type";
import { Position } from "@/types/game/board/position.type";
import { PlayerBoardCellCode } from "@/types/game/player-board/player-board-cell-code.enum";
import { PlayerBoard } from "@/types/game/player-board/player-board.type";
import {
  detectPlayerBoardIssues,
  PlayerBoardIssues,
} from "@/utils/board/player-board/detect-player-board-issues.util";
import { useEffect, useState } from "react";

type Options = {
  board: Board;
};

export const usePlayerBoard = ({ board: gameBoard }: Options) => {
  const [board, setBoard] = useState<PlayerBoard>(
    generateEmptyBoardFromGameBoard(gameBoard)
  );
  const [issues, setIssues] = useState<PlayerBoardIssues>(
    generateEmptyIssuesBoard(gameBoard)
  );

  useEffect(() => {
    setIssues([
      ...detectPlayerBoardIssues({ board: gameBoard, playerBoard: board }),
    ]);
  }, [board, gameBoard]);

  // Board state management
  const updateCell = ({ x, y }: Position, value: PlayerBoardCellCode) => {
    board[x][y] = value;
    setBoard({ ...board });
  };

  const interactWithCell = ({ x, y }: Position) => {
    const cell = board[x][y];

    let newCode: PlayerBoardCellCode;
    switch (cell) {
      case PlayerBoardCellCode.EMPTY:
        newCode = PlayerBoardCellCode.MARKED;
        break;
      case PlayerBoardCellCode.MARKED:
        newCode = PlayerBoardCellCode.QUEEN;
        break;
      case PlayerBoardCellCode.QUEEN:
        newCode = PlayerBoardCellCode.EMPTY;
        break;
    }

    updateCell({ x, y }, newCode);
  };

  return {
    board,
    setBoard,
    interactWithCell,
    updatePosition: updateCell,
    issues,
    setIssues,
  };
};

export type UsePlayerBoard = ReturnType<typeof usePlayerBoard>;

const generateEmptyBoardFromGameBoard = (board: Board) =>
  board.map((row) => row.map(() => PlayerBoardCellCode.EMPTY));

const generateEmptyIssuesBoard = (board: Board): PlayerBoardIssues =>
  board.map((row) => row.map(() => false));
