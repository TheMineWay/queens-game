"use client";

import { UseTimer } from "@/hooks/utils/use-timer";
import { formatSeconds } from "@/utils/timer/format-seconds";

type Props = {
  timer: UseTimer;
};

export default function Timer({ timer }: Props) {
  return (
    <div>
      <p className="text-2xl">{formatSeconds(timer.timer)}</p>
    </div>
  );
}
