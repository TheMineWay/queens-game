import { Board } from "@/types/game/board.type";
import { BoardBuilder } from "@/utils/board/generator/board-builder.util";

type Options = {
  size: number; // Min should be 5
};

export const generateBoard = ({ size }: Options): Board => {
  const builder = seedPrimordialColors(new BoardBuilder(size));

  return builder.getBoard();
};

const seedPrimordialColors = (boardBuilder: BoardBuilder): BoardBuilder => {
  const deepSeed = ({
    available,
    builder,
  }: {
    available: number[];
    builder: BoardBuilder;
  }) => {};

  return boardBuilder;
};

const getRandomPosition = <T>(arr: T[]) => {
  if (arr.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};
