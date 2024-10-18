import { Board } from "@/types/game/board.type";
import { BoardBuilder } from "@/utils/board/generator/board-builder.util";

import { Position } from "@/types/game/board/position.type";

export class BoardManager {
  constructor(protected readonly board: Board) {}

  public getBoard = () => this.board;

  public getPosition = ({ x, y }: Position) => this.getBoard()[x][y];
  public setPosition = ({ x, y }: Position, value: number | null) =>
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

  public findAllDistinctCodes = ({
    onlyInitialized = true,
  }: { onlyInitialized?: boolean } = {}) => {
    const codes = [...new Set(this.getBoard().flat())];

    if (onlyInitialized)
      return codes.filter(BoardBuilder.isCellValueInitialized);
    return codes;
  };

  public findEmptyAdjacentCellsByCode = (code: Board[number][number]) => {
    const board = this.getBoard();
    const positions: Position[] = [];

    const testPosition = (position: Position) => {
      if (
        !positions.find(({ x, y }) => position.x === x && position.y === y) &&
        !BoardBuilder.isCellValueInitialized(this.getPosition(position))
      )
        positions.push(position);
    };

    for (const position of this.findAllPositionsByCode(code)) {
      const toTest = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
      ];

      for (const [x, y] of toTest) {
        const newPos = {
          x: x + position.x,
          y: y + position.y,
        };

        if (
          newPos.x < 0 ||
          newPos.y < 0 ||
          newPos.x >= board.length ||
          newPos.y >= board[newPos.x].length
        )
          continue;

        testPosition(newPos);
      }
    }

    return positions;
  };

  public isPositionInitialized = (position: Position) =>
    BoardBuilder.isCellValueInitialized(this.getPosition(position));

  // State checker
  public isInitialized = () => BoardBuilder.isBoardInitialized(this.getBoard());
}

export class BoardManager2 {
  constructor(protected readonly board: Board) {}

  public getBoard = () => this.board;

  public getPosition = ({ x, y }: Position) => this.getBoard()[x][y];
  public setPosition = ({ x, y }: Position, value: number | null) =>
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

  public findAllDistinctCodes = ({
    onlyInitialized = true,
  }: { onlyInitialized?: boolean } = {}) => {
    const codes = [...new Set(this.getBoard().flat())];

    if (onlyInitialized)
      return codes.filter(BoardBuilder.isCellValueInitialized);
    return codes;
  };

  public findEmptyAdjacentCellsByCode = (code: Board[number][number]) => {
    const board = this.getBoard();
    const positions: Position[] = [];

    const testPosition = (position: Position) => {
      if (
        !positions.find(({ x, y }) => position.x === x && position.y === y) &&
        !BoardBuilder.isCellValueInitialized(this.getPosition(position))
      )
        positions.push(position);
    };

    for (const position of this.findAllPositionsByCode(code)) {
      const toTest = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
      ];

      for (const [x, y] of toTest) {
        const newPos = {
          x: x + position.x,
          y: y + position.y,
        };

        if (
          newPos.x < 0 ||
          newPos.y < 0 ||
          newPos.x >= board.length ||
          newPos.y >= board[newPos.x].length
        )
          continue;

        testPosition(newPos);
      }
    }

    return positions;
  };

  public isPositionInitialized = (position: Position) =>
    BoardBuilder.isCellValueInitialized(this.getPosition(position));

  // State checker
  public isInitialized = () => BoardBuilder.isBoardInitialized(this.getBoard());
}
