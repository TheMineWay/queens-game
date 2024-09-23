import { Board } from "@/types/game/board.type";

type Position = { x: number; y: number };

export class BoardBuilder {
  constructor(private readonly board: Board) {}

  static fromSize(size: number) {
    return new BoardBuilder(BoardBuilder.generateEmptyBoard(size));
  }

  public getBoard = () => this.board;

  // Position accessors
  public getPosition = ({ x, y }: Position) => this.getBoard()[x][y];
  public setPosition = ({ x, y, value }: Position & { value: number | null }) =>
    (this.board[x][y] = value);
  public findAllPositionsByCode = (code: Board[number][number]) => {
    const positions: Position[] = [];

    const board = this.getBoard();
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        if (board[x][y] === code) positions.push({ x, y });
      }
    }

    return positions;
  };
  public findFirstPositionByCode = (code: Board[number][number]) =>
    this.findAllPositionsByCode(code)?.[0] || null;

  public findAllDistinctCodes = () => [...new Set(this.getBoard().flat())];

  public isPositionInitialized = (position: Position) =>
    BoardBuilder.isCellValueInitialized(this.getPosition(position));

  // State checker
  public isInitialized = () => BoardBuilder.isBoardInitialized(this.getBoard());

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
