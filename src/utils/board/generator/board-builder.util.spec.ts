import { BoardBuilder } from "@/utils/board/generator/board-builder.util";

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

describe("BoardBuilder util", () => {
  describe("findAllPositionsByCode(code) should return", () => {
    it("an empty array when no positions are found", () => {
      const builder = new BoardBuilder(DEMO_BOARDS[0]);

      const POSITIONS = [5, 6, -1, null, NaN];
      POSITIONS.forEach((pos) =>
        expect(builder.findAllPositionsByCode(pos)).toEqual([])
      );
    });

    it("the position of present codes", () => {
      const builder = new BoardBuilder(DEMO_BOARDS[0]);

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

  describe("findAllDistinctCodes() should return", () => {
    it("all unique codes present in the board", () => {
      const TEST_CASES = [
        { board: DEMO_BOARDS[0], codes: [0, 1, 2, 3, 4] },
        { board: DEMO_BOARDS[1], codes: [1, 0, 5, 3, 4] },
      ];

      TEST_CASES.forEach(({ board, codes }) =>
        expect(new BoardBuilder(board).findAllDistinctCodes()).toEqual(codes)
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
            expect(BoardBuilder.isBoardInitialized(testData)).toEqual(
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
      expect(BoardBuilder.generateEmptyBoard(size)).toEqual(expectObj);
    });
  });

  describe("isCellValueInitialized(cellValue) should return", () => {
    it("false when given non initialized values", () => {
      const values = [null, NaN, undefined];
      for (const value of values)
        expect(BoardBuilder.isCellValueInitialized(value)).toBeFalsy();
    });

    it("true when given initialized values", () => {
      const values = [1, -1, 0, 5, -12];
      for (const value of values)
        expect(BoardBuilder.isCellValueInitialized(value)).toBeTruthy();
    });
  });
});
