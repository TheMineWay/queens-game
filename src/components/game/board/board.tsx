"use client";

import type { Board as BoardType } from "@/types/game/board.type";

type Props = { board: BoardType };

export default function Board({ board }: Props) {
  return (
    <table>
      <tbody>
        {board.map((row, i) => (
          <tr key={i}>
            {row.map((cell, l) => (
              <td
                className="w-12 h-12"
                key={l}
                style={{ backgroundColor: `#${cell}` }}
              ></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
