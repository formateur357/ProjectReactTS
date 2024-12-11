export const heavyComputation = (num: number): number => {
  let result = 0;
  for (let i = 0; i < 1e7; i++) {
    result += i;
  }
  return result + num;
};
