import { Board } from "@/types/game/board.type";
import { PlayerBoardCellCode } from "@/types/game/player-board/player-board-cell-code.enum";
import { PlayerBoard } from "@/types/game/player-board/player-board.type";
import {
  detectPlayerBoardIssues,
  PlayerBoardIssues,
} from "@/utils/board/player-board/detect-player-board-issues.util";

type TestCase = {
  pb: PlayerBoard;
  board: Board;
  expect: PlayerBoardIssues;
  message: string;
};

const M = PlayerBoardCellCode.MARKED;
const E = PlayerBoardCellCode.EMPTY;
const Q = PlayerBoardCellCode.QUEEN;

const NO_ERRORS_ROW = [false, false, false, false];

const BOARDS: Board[] = [
  [
    [0, 0, 1, 1],
    [0, 0, 1, 1],
    [3, 1, 1, 2],
    [3, 3, 2, 2],
  ],
];

describe("detectPlayerBoardIssues(options) should", () => {
  describe("not return any errors when", () => {
    const CASES: Omit<TestCase, "expect">[] = [
      {
        pb: [
          [E, E, E, E],
          [E, E, E, E],
          [E, E, E, E],
          [E, E, E, E],
        ],
        board: BOARDS[0],
        message: "there is no interaction trace",
      },
      {
        pb: [
          [E, Q, E, E],
          [E, E, E, Q],
          [Q, E, E, E],
          [E, E, Q, E],
        ],
        board: BOARDS[0],
        message: "all queens are placed",
      },
      {
        pb: [
          [E, Q, E, E],
          [E, E, E, Q],
          [Q, E, E, E],
          [E, E, E, E],
        ],
        board: BOARDS[0],
        message: "some queens are placed",
      },
    ];

    it.each(CASES)("$message", ({ pb }) => {
      expect(detectPlayerBoardIssues({ playerBoard: pb })).toEqual([]);
    });
  });

  describe("return errors", () => {
    const CASES: TestCase[] = [
      {
        pb: [
          [E, Q, Q, E],
          [E, E, E, E],
          [Q, E, E, E],
          [M, E, E, Q],
        ],
        expect: [
          [false, true, true, false],
          NO_ERRORS_ROW,
          NO_ERRORS_ROW,
          NO_ERRORS_ROW,
        ],
        board: BOARDS[0],
        message: "more than one queen is placed in the same row",
      },
      {
        pb: [
          [E, E, E, Q],
          [E, E, E, E],
          [Q, E, E, E],
          [E, E, E, Q],
        ],
        expect: [
          [false, false, false, true],
          NO_ERRORS_ROW,
          NO_ERRORS_ROW,
          [false, false, false, true],
        ],
        board: BOARDS[0],
        message: "more than one queen is placed in the same col",
      },
      {
        pb: [
          [Q, Q, E, E],
          [E, E, E, E],
          [E, E, E, E],
          [E, E, E, Q],
        ],
        expect: [
          [true, true, false, false],
          NO_ERRORS_ROW,
          NO_ERRORS_ROW,
          NO_ERRORS_ROW,
        ],
        board: BOARDS[0],
        message: "more than one queen is placed in the same color",
      },
    ];

    it.each(CASES)("$message", ({ pb, expect: expectObj }) => {
      expect(detectPlayerBoardIssues({ playerBoard: pb })).toEqual(expectObj);
    });
  });
});
