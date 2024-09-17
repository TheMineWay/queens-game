"use client";

import { BoardDefinition } from "@/types/game/board-definition.interface";
import styles from "./board.module.css";

type Props = { board: BoardDefinition };

export default function Board({ board: boardDefinition }: Props) {
  const { board, colors } = boardDefinition;

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
              backgroundColor: `#${colors[col]}`,
            }}
            className={styles.square}
          ></div>
        ))
      )}
    </div>
  );
}
