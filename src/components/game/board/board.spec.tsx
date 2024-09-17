import { render } from "@testing-library/react";
import Board from "./board";
import { Color } from "@/utils/colors/color";
import { BoardDefinition } from "@/types/game/board-definition.interface";

const BOARD_MOCKS: {
  colorMap: string[][];
  boardDefinition: BoardDefinition;
}[] = [
  {
    colorMap: [
      ["FF0000", "FF0000", "FF00FF", "FF00FF"],
      ["FF0000", "FF0000", "FF00FF", "00FF00"],
      ["FF0000", "FF0000", "FF00FF", "00FF00"],
      ["0000FF", "0000FF", "0000FF", "00FF00"],
    ],
    boardDefinition: {
      board: [
        [0, 0, 1, 1],
        [0, 0, 1, 2],
        [0, 0, 1, 2],
        [3, 3, 3, 2],
      ],
      colors: ["FF0000", "FF00FF", "00FF00", "0000FF"],
    },
  },
  {
    colorMap: [
      ["ACDE12", "FFFFFF", "FFFFFF", "FFFFFF"],
      ["ACDE12", "ACDE12", "FFFFFF", "000000"],
      ["ACDE12", "ACDE12", "FFFFFF", "000000"],
      ["151515", "BABABA", "000000", "000000"],
      ["BABABA", "BABABA", "000000", "000000"],
    ],
    boardDefinition: {
      board: [
        [0, 3, 3, 3],
        [0, 0, 3, 4],
        [0, 0, 3, 4],
        [2, 1, 4, 4],
        [1, 1, 4, 4],
      ],
      colors: ["ACDE12", "BABABA", "151515", "FFF", "000"],
    },
  },
];

const renderComponent = (
  board: BoardDefinition = BOARD_MOCKS[0].boardDefinition
) => render(<Board board={board} />);

describe("<Board/>", () => {
  it("should render a board with corresponding background color", () => {
    BOARD_MOCKS.forEach(({ boardDefinition, colorMap }) => {
      const { container } = renderComponent(boardDefinition);
      const table = container.querySelector("table");

      for (let i = 0; i < boardDefinition.board.length; i++) {
        const tr = table?.querySelectorAll("tr")[i];
        for (let l = 0; l < boardDefinition.board[i].length; l++) {
          const td = tr?.querySelectorAll("td")[l];

          expect(Color.toHex(td?.style.backgroundColor ?? null)).toEqual(
            Color.toHex(colorMap[i][l])
          );
        }
      }
    });
  });
});
