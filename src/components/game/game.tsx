import Board from "@/components/game/board/board";

export default function Game() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Board
        board={{
          board: [
            [1, 0, 1, 0],
            [0, 1, 0, 1],
            [1, 0, 1, 0],
            [0, 1, 0, 1],
          ],
          colors: ["FF00FF", "12BA12"],
        }}
      />
    </div>
  );
}
