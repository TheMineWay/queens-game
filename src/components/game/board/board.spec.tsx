import { render } from "@testing-library/react";
import Board from "./board";
import type { Board as BoardType } from "@/types/game/board.type";
import { Color } from "@/utils/colors/color";

const BOARD_MOCKS = [
  [
    ["FF0000", "FF0000", "FF00FF", "FF00FF"],
    ["FF0000", "FF0000", "FF00FF", "00FF00"],
    ["FF0000", "FF0000", "FF00FF", "00FF00"],
    ["0000FF", "0000FF", "0000FF", "00FF00"],
  ],
];

const renderComponent = (board: BoardType = BOARD_MOCKS[0]) =>
  render(<Board board={board} />);

describe("<Board/>", () => {
  it("should render a board with corresponding background color", () => {
    BOARD_MOCKS.forEach((board) => {
      const { container } = renderComponent(board);
      const table = container.querySelector("table");

      for (let i = 0; i < board.length; i++) {
        const tr = table?.querySelectorAll("tr")[i];
        for (let l = 0; l < board[i].length; l++) {
          const td = tr?.querySelectorAll("td")[l];

          expect(Color.toHex(td?.style.backgroundColor ?? null)).toEqual(
            Color.toHex(board[i][l])
          );
        }
      }
    });
  });
});
