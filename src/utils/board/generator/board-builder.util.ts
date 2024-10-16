import { Board } from "@/types/game/board.type";
import { BoardManager } from "@/utils/board/board-manager.util";

export class BoardBuilder extends BoardManager {
  constructor(board: Board) {
    super(board);
  }

  static fromSize(size: number) {
    return new BoardBuilder(BoardBuilder.generateEmptyBoard(size));
  }

  static isBoardInitialized = (board: Board) => {
    for (const row of board) {
      for (const cell of row) {
        if (!BoardBuilder.isCellValueInitialized(cell)) return false;
      }
    }
    return true;
  };
  static isCellValueInitialized = (cellValue?: number | null) =>
    typeof cellValue === "number" && !Number.isNaN(cellValue);
  static generateEmptyBoard = (size: number) => {
    const board: Board = [];

    for (let i = 0; i < size; i++) {
      board.push([]);
      for (let l = 0; l < size; l++) {
        board[i].push(null);
      }
    }

    return board;
  };
}
