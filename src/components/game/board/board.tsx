"use client";

import { BoardDefinition } from "@/types/game/board-definition.interface";

type Props = { board: BoardDefinition };

export default function Board({ board: boardDefinition }: Props) {
  const { board, colors } = boardDefinition;

  return (
    <table>
      <tbody>
        {board.map((row, i) => (
          <tr key={i}>
            {row.map((cell, l) => (
              <td
                className="w-12 h-12"
                key={l}
                style={{ backgroundColor: `#${colors[cell]}` }}
              ></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
