import { formatSeconds } from "@/utils/timer/format-seconds";

describe("formatSeconds(seconds) should", () => {
  it("format seconds", () => {
    (
      [
        [0, "00:00"],
        [15, "00:15"],
        [45, "00:45"],
        [60, "01:00"],
        [65, "01:05"],
        [120, "02:00"],
        [140, "02:20"],
      ] as const
    ).forEach(([seconds, text]) => {
      expect(formatSeconds(seconds)).toEqual(text);
    });
  });
});
