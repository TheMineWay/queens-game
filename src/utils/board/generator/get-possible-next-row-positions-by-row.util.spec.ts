import { getPossibleNextRowPositionsByRow } from "@/utils/board/generator/get-possible-next-row-positions-by-row.util";

describe("getPossibleNextRowPositionsByRow(row, possiblePositions) should return", () => {
  it("no positions when given no possible positions", () => {
    expect(
      getPossibleNextRowPositionsByRow([null, null, 0, null, null], [])
    ).toEqual([]);
  });

  describe("valid positions given", () => {
    const TEST_CASES = [
      {
        row: [null, null, null, null, 0],
        possiblePositions: [1, 2, 3],
        expect: [1, 2],
      },
      {
        row: [null, null, 0, null, null],
        possiblePositions: [3, 4],
        expect: [4],
      },
      {
        row: [null, null, null, null, 0],
        expect: [0, 1, 2],
      },
      {
        row: [null, 0, null, null, null],
        expect: [3, 4],
      },
    ];

    TEST_CASES.forEach(
      ({ row, possiblePositions, expect: expectPositions }) => {
        it(`${JSON.stringify(row.map((x) => (x === null ? "-" : "x")))}${
          possiblePositions
            ? ` and possible positions ${JSON.stringify(possiblePositions)}`
            : ""
        }`, () => {
          expect(
            getPossibleNextRowPositionsByRow(row, possiblePositions)
          ).toEqual(expectPositions);
        });
      }
    );
  });
});
