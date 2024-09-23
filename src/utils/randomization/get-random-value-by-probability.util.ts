export interface ProbabilityItem<T> {
  value: T;
  probability: number;
}

export const getRandomValueByProbability = <T>(
  items: ProbabilityItem<T>[]
): T => {
  // Calculate the total probability
  const totalProbability = items.reduce(
    (sum, item) => sum + item.probability,
    0
  );

  // Generate a random number between 0 and totalProbability
  const random = Math.random() * totalProbability;

  // Iterate through the items and select one based on probability
  let cumulativeProbability = 0;
  for (const item of items) {
    cumulativeProbability += item.probability;
    if (random < cumulativeProbability) {
      return item.value;
    }
  }

  if (items.length <= 0) throw new Error();
  return items[0].value;
};
