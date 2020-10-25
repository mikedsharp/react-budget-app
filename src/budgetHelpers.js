export function calculateSum(values) {
  if (values.length === 0) {
    return 0;
  }
  if (values.length === 1) {
    return values[0].amount;
  }
  return values.reduce((prev, curr) => prev.amount + curr.amount);
}
