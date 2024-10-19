import { Board } from "@/types/game/board.type";
import { BoardManager } from "@/utils/board/board-manager.util";

const DEMO_BOARDS = [
  [
    [0, 0, 1, 1],
    [2, 2, 2, 1],
    [2, 3, 3, 3],
    [4, 4, 4, 3],
  ],
  [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 5, 5, 3],
    [4, 5, 5, 3],
  ],
];

const mapBoard = (
  board: (typeof DEMO_BOARDS)[0],
  fn: (cell: Board[number][number]) => Board[number][number]
) => {
  return structuredClone(board).map((row) => row.map(fn));
};

describe("BoardManager util", () => {
  describe("findAllPositionsByCode(code) should return", () => {
    it("an empty array when no positions are found", () => {
      const builder = new BoardManager(DEMO_BOARDS[0]);

      const POSITIONS = [5, 6, -1, null, NaN];
      POSITIONS.forEach((pos) =>
        expect(builder.findAllPositionsByCode(pos)).toEqual([])
      );
    });

    it("the position of present codes", () => {
      const builder = new BoardManager(DEMO_BOARDS[0]);

      const CASES = [
        [
          0,
          [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
          ],
          1,
          [
            { x: 0, y: 2 },
            { x: 0, y: 3 },
          ],
          2,
          [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 },
            { x: 2, y: 0 },
          ],
        ],
      ] as const;
      CASES.forEach(([code, positions]) =>
        expect(builder.findAllPositionsByCode(code)).toEqual(positions)
      );
    });
  });

  describe("findEmptyAdjacentCellsByCode(code) should return", () => {
    describe("an empty array when given", () => {
      it("an unexisting code", () => {
        expect(
          new BoardManager(DEMO_BOARDS[0]).findEmptyAdjacentCellsByCode(5)
        ).toEqual([]);
      });

      it("a code that is not surrounded by any empty cell", () => {
        expect(
          new BoardManager(DEMO_BOARDS[0]).findEmptyAdjacentCellsByCode(1)
        ).toEqual([]);
      });
    });

    it("an array containing adjecent positions of a given code", () => {
      const TEST_CASES = [
        {
          code: 1,
          board: mapBoard(DEMO_BOARDS[0], (cell) => (cell === 1 ? 1 : null)),
          adjecent: [
            [0, 1],
            [1, 2],
            [2, 3],
          ],
        },
        {
          code: 2,
          board: mapBoard(DEMO_BOARDS[0], (cell) => (cell === 2 ? 2 : null)),
          adjecent: [
            [0, 0],
            [0, 1],
            [2, 1],
            [1, 3],
            [0, 2],
            [2, 2],
            [3, 0],
          ],
        },
        {
          code: 0,
          board: mapBoard(DEMO_BOARDS[1], (cell) => (cell === 0 ? 0 : null)),
          adjecent: [
            [1, 0],
            [0, 1],
            [2, 1],
            [0, 2],
            [2, 2],
            [0, 3],
            [2, 3],
          ],
        },
        {
          code: 0,
          board: mapBoard(DEMO_BOARDS[1], (cell) =>
            cell === 0 ? 0 : cell === 1 ? 1 : null
          ),
          adjecent: [
            [2, 1],
            [2, 2],
            [2, 3],
          ],
        },
      ];

      TEST_CASES.forEach(({ code, board, adjecent }) =>
        expect(
          new BoardManager(board).findEmptyAdjacentCellsByCode(code)
        ).toEqual(adjecent.map(([x, y]) => ({ x, y })))
      );
    });
  });

  describe("findAllDistinctCodes() should return", () => {
    it("all unique codes present in the board", () => {
      const TEST_CASES = [
        { board: DEMO_BOARDS[0], codes: [0, 1, 2, 3, 4] },
        { board: DEMO_BOARDS[1], codes: [1, 0, 5, 3, 4] },
      ];

      TEST_CASES.forEach(({ board, codes }) =>
        expect(new BoardManager(board).findAllDistinctCodes()).toEqual(codes)
      );
    });
  });

  describe("isBoardInitialized(board) should return", () => {
    const TEST_CASES = {
      true: [
        [
          [1, 1, 2, 2],
          [3, 3, 3, 4],
          [4, 4, 4, 4],
          [5, 5, 5, 5],
        ],
        [
          [1, 1, 2, 2, 3, 3],
          [1, 1, 2, 2, 3, 3],
          [1, 1, 2, 2, 3, 3],
          [1, 1, 2, 2, 3, 3],
          [1, 1, 2, 2, 3, 3],
          [1, 1, 2, 2, 3, 3],
        ],
      ],
      false: [
        [
          [1, 1, null, 2],
          [3, 3, 3, 4],
          [4, 4, 4, 4],
          [5, 5, 5, 5],
        ],
        [
          [1, NaN, 2, 2, 3, 3],
          [1, 1, 2, 2, 3, 3],
          [1, 1, 2, 2, 3, 3],
          [1, 1, 2, 2, 3, 3],
          [1, 1, 2, 2, 3, 3],
          [1, 1, 2, 2, 3, 3],
        ],
      ],
    };

    Object.entries(TEST_CASES).forEach(([k, tests]) => {
      describe(k, () => {
        tests.forEach((testData) => {
          const expectedReturn = k === "true";
          it(`when given ${
            expectedReturn ? "an " : "a non "
          }fully initialized ${testData.length}x${
            testData.length
          } board`, () => {
            expect(BoardManager.isBoardInitialized(testData)).toEqual(
              expectedReturn
            );
          });
        });
      });
    });
  });

  describe("generateEmptyBoard(size) should return an empty board of", () => {
    const TEST_CASES = [
      {
        name: "2x2",
        size: 2,
        expect: [
          [null, null],
          [null, null],
        ],
      },
      {
        name: "4x4",
        size: 4,
        expect: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      {
        name: "6x6",
        size: 6,
        expect: [
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
        ],
      },
    ];

    it.each(TEST_CASES)("$name", ({ size, expect: expectObj }) => {
      expect(BoardManager.generateEmptyBoard(size)).toEqual(expectObj);
    });
  });

  describe("isCellValueInitialized(cellValue) should return", () => {
    it("false when given non initialized values", () => {
      const values = [null, NaN, undefined];
      for (const value of values)
        expect(BoardManager.isCellValueInitialized(value)).toBeFalsy();
    });

    it("true when given initialized values", () => {
      const values = [1, -1, 0, 5, -12];
      for (const value of values)
        expect(BoardManager.isCellValueInitialized(value)).toBeTruthy();
    });
  });
});
