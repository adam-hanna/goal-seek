export type Params = {
  fn: (...inputs: any[]) => number;
  fnParams: any[];
  percentTolerance: number;
  maxIterations: number;
  maxStep: number;
  goal: number;
  independentVariableIdx: number;
};

export const IsNanError = TypeError('resulted in NaN');
export const FailedToConvergeError = Error('failed to converge');

const goalSeek = ({
  fn,
  fnParams,
  percentTolerance,
  maxIterations,
  maxStep,
  goal,
  independentVariableIdx,
}: Params): number => {
  let g: number;
  let y: number;
  let y1: number;
  let oldGuess: number;
  let newGuess: number;

  const absoluteTolerance = (percentTolerance / 100) * goal;

  // iterate through the guesses
  for (let i = 0; i < maxIterations; i++) {
    // define the root of the function as the error
    y = fn.apply(null, fnParams) - goal;
    if (isNaN(y)) throw IsNanError;

    // was our initial guess a good one?
    if (Math.abs(y) <= Math.abs(absoluteTolerance)) return fnParams[independentVariableIdx];

    // set the new guess, correcting for maxStep
    oldGuess = fnParams[independentVariableIdx];
    newGuess = oldGuess + y;
    if (Math.abs(newGuess - oldGuess) > maxStep) {
      if (newGuess > oldGuess) {
        newGuess = oldGuess + maxStep;
      } else {
        newGuess = oldGuess - maxStep;
      }
    }

    fnParams[independentVariableIdx] = newGuess;

    // re-run the fn with the new guess
    y1 = fn.apply(null, fnParams) - goal;
    if (isNaN(y1)) throw IsNanError;

    // calculate the error
    g = (y1 - y) / y;
    if (g === 0) g = 0.0001;

    // set the new guess based on the error, correcting for maxStep
    newGuess = oldGuess - y / g;
    if (maxStep && Math.abs(newGuess - oldGuess) > maxStep) {
      if (newGuess > oldGuess) {
        newGuess = oldGuess + maxStep;
      } else {
        newGuess = oldGuess - maxStep;
      }
    }

    fnParams[independentVariableIdx] = newGuess;
  }

  // done with iterations, and we failed to converge
  throw FailedToConvergeError;
};

export default goalSeek;
