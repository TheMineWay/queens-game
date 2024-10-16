import { render } from "@testing-library/react";
import Board from "./board";
import { Color } from "@/utils/colors/color";
import { UseGame } from "@/hooks/game/use-game";

const playerBoard: UseGame["playerBoard"] = {
  board: [],
  setBoard: () => {},
  interactWithCell: () => {},
  updatePosition: () => {},
};

interface BoardDefinition {
  game: UseGame;
  colors: string[];
}

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
      game: {
        board: [
          [0, 0, 1, 1],
          [0, 0, 1, 2],
          [0, 0, 1, 2],
          [3, 3, 3, 2],
        ],
        playerBoard,
      },
      colors: ["FF0000", "FF00FF", "00FF00", "0000FF"],
    },
  },
  {
    colorMap: [
      ["ACDE12", "FFFFFF", "FFFFFF", "FFFFFF", "991199"],
      ["ACDE12", "ACDE12", "FFFFFF", "000000", "991199"],
      ["ACDE12", "ACDE12", "FFFFFF", "000000", "991199"],
      ["151515", "BABABA", "000000", "000000", "991199"],
      ["BABABA", "BABABA", "000000", "000000", "991199"],
    ],
    boardDefinition: {
      game: {
        board: [
          [0, 3, 3, 3, 5],
          [0, 0, 3, 4, 5],
          [0, 0, 3, 4, 5],
          [2, 1, 4, 4, 5],
          [1, 1, 4, 4, 5],
        ],
        playerBoard,
      },
      colors: ["ACDE12", "BABABA", "151515", "FFF", "000", "991199"],
    },
  },
];

const renderComponent = (
  board: BoardDefinition = BOARD_MOCKS[0].boardDefinition
) => render(<Board game={board.game} colors={board.colors} />);

describe("<Board/>", () => {
  it("should render a board with corresponding background color", () => {
    BOARD_MOCKS.forEach(({ boardDefinition, colorMap }) => {
      const { container } = renderComponent(boardDefinition);
      const cells = container.querySelectorAll<HTMLElement>(
        'div[aria-label="board container"] > div'
      );

      for (let i = 0; i < boardDefinition.game.board.length; i++) {
        for (let l = 0; l < boardDefinition.game.board[i].length; l++) {
          const cell = cells[i * boardDefinition.game.board.length + l];
          expect(Color.toHex(cell?.style.backgroundColor ?? null)).toEqual(
            Color.toHex(colorMap[i][l])
          );
        }
      }
    });
  });
});
