"use client";
import { UseGame } from "@/hooks/game/use-game";
import { PlayerBoardCellCode } from "@/types/game/player-board/player-board-cell-code.enum";
import { Star, Close } from "@mui/icons-material";

import styles from "./board.module.css";

type Props = { colors: string[]; game: UseGame };

export default function Board({ colors, game }: Readonly<Props>) {
  const { board, playerBoard } = game;

  const size = board[0]?.length ?? 0;

  return (
    <div
      className={styles.board}
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
      }}
      aria-label="board container"
    >
      {board.map((row, i) =>
        row.map((col, l) => (
          <button
            key={`${i}-${l}`}
            style={{
              backgroundColor:
                typeof col === "number" ? `#${colors[col]}` : undefined,
            }}
            className={styles.square}
            onClick={() => playerBoard.interactWithCell({ x: i, y: l })}
          >
            <Marker code={playerBoard.board?.[i]?.[l]} />
          </button>
        ))
      )}
    </div>
  );
}

type MarkerProps = { code: PlayerBoardCellCode };
const Marker = ({ code = PlayerBoardCellCode.EMPTY }: MarkerProps) => {
  switch (code) {
    case PlayerBoardCellCode.MARKED:
      return <Close />;
    case PlayerBoardCellCode.QUEEN:
      return <Star fontSize={"large"} />;
    default:
      return null;
  }
};
