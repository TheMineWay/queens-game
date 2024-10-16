"use client";

import { UseGame } from "@/hooks/game/use-game";
import styles from "./board.module.css";

type Props = { colors: string[]; game: UseGame };

export default function Board({ colors, game }: Readonly<Props>) {
  const { board } = game;

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
          <div
            key={`${i}-${l}`}
            style={{
              backgroundColor:
                typeof col === "number" ? `#${colors[col]}` : undefined,
            }}
            className={styles.square}
          ></div>
        ))
      )}
    </div>
  );
}
