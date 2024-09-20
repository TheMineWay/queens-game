import { BoardBuilder } from "@/utils/board/board-builder.util";

describe("BoardBuilder util", () => {
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
