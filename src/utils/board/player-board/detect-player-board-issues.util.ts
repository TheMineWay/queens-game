import { PlayerBoard } from "@/types/game/player-board/player-board.type";

type DetectPlayerBoardIssuesOptions = { playerBoard: PlayerBoard };

export const detectPlayerBoardIssues =
  ({}: DetectPlayerBoardIssuesOptions): PlayerBoardIssues => {
    return [];
  };

export type PlayerBoardIssues = boolean[][];
