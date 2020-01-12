import goalSeek, { IsNanError, FailedToConvergeError } from '../src';

describe('goalSeek', () => {
  test('a simple linear equation', () => {
    let x = 10;
    const fn = (x: number): number => x + 2;
    const fnParams = [x];

    const result = goalSeek({
      fn,
      fnParams,
      percentTolerance: 1,
      maxIterations: 1000,
      maxStep: 10,
      goal: 100,
      independentVariableIdx: 0
    })
    expect(result).toBeGreaterThanOrEqual(97);
    expect(result).toBeLessThanOrEqual(99);
  })

  test('a simple polynomial', () => {
    let x = 90;
    const fn = (x: number): number => x * x;
    const fnParams = [x];

    const result = goalSeek({
      fn,
      fnParams,
      percentTolerance: 1,
      maxIterations: 1000,
      maxStep: 1,
      goal: 10000,
      independentVariableIdx: 0
    })
    expect(result).toBeGreaterThanOrEqual(99);
    expect(result).toBeLessThanOrEqual(101);
  })

  test('throws on NaN', done => {
    let x = 10;
    const fn = (x: number): number => Math.log(-1);
    const fnParams = [x];

    try {
      const result = goalSeek({
        fn,
        fnParams,
        percentTolerance: 1,
        maxIterations: 1000,
        maxStep: 10,
        goal: 100,
        independentVariableIdx: 0
      })

      done.fail('expected to throw') 
    } catch(e) {
      expect(e).toEqual(IsNanError);
      done()
    }
  })

  test('throws on convergence failure', done => {
    let x = 10;
    const fn = (x: number): number => x * x;
    const fnParams = [x];

    try {
      const result = goalSeek({
        fn,
        fnParams,
        percentTolerance: 1,
        maxIterations: 10,
        maxStep: 10,
        goal: -1,
        independentVariableIdx: 0
      })

      done.fail('expected to throw') 
    } catch(e) {
      expect(e).toEqual(FailedToConvergeError);
      done()
    }
  })
});
