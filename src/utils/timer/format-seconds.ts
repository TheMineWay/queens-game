const appendZero = (num: number) => `${num < 10 ? "0" : ""}${num}`;

export const formatSeconds = (seconds: number = 0) => {
  const secs = seconds % 60;
  const mins = Math.floor(seconds / 60);

  return `${appendZero(mins)}:${appendZero(secs)}`;
};
