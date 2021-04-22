import goalSeek, { IsNanError, FailedToConvergeError, InvalidInputsError } from '../src';

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
    const fn = (_x: number): number => Math.log(-1);
    const fnParams = [x];

    try {
      const _result = goalSeek({
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
      const _result = goalSeek({
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

  test('throws an invalid inputs', done => {
    let x = 10;
    const fn = (x: number): number => x * x;
    const fnParams = [x];

    try {
      const _result = goalSeek({
        fn,
        fnParams,
        maxIterations: 10,
        maxStep: 10,
        goal: -1,
        independentVariableIdx: 0
      })

      done.fail('expected to throw') 
    } catch(e) {
      expect(e).toEqual(InvalidInputsError);
      done()
    }
  })

  test('custom tolerance function', done => {
    let x = 6
    const fn = (x: number, y: number, z: number) => x * y * z;
    const fnParams = [4,5,x];
    const customToleranceFn = (x: number): boolean => {
      return x < 1
    }

    try {
      const result = goalSeek({
        fn,
        fnParams,
        customToleranceFn,
        maxIterations: 1000,
        maxStep: 0.1,
        goal: 0.5,
        independentVariableIdx: 0
      })

      expect(result).toBeLessThan(1);
      done()
    } catch(e) {
      console.error(e)
      done.fail("expected not to throw")
    }
  })
});
