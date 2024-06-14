type AnimationFunction = (percentage: number) => number;

function linear(min: number, max: number, percentage: number) {
  const dif = max - min;
  const difPer = (percentage / 100) * dif;
  return min + difPer;
}

function cutomizedAnimation(
  min: number,
  max: number,
  linearPercentage: number,
  animationFunction: AnimationFunction,
): number {
  return min + (animationFunction(linearPercentage) / 100) * (max - min);
}
