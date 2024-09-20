import { Board } from "@/types/game/board.type";

type Position = { x: number; y: number };

export class BoardBuilder {
  private readonly board: Board;

  constructor(size: number) {
    this.board = BoardBuilder.generateEmptyBoard(size);
  }

  public getBoard = () => this.board;

  // Position accessors
  public getPosition = ({ x, y }: Position) => this.getBoard()[x][y];
  public isPositionInitialized = (position: Position) =>
    BoardBuilder.isCellValueInitialized(this.getPosition(position));

  // State checker
  public isInitialized = () => BoardBuilder.isBoardInitialized(this.getBoard());

  // Internal utils
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
