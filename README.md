[![Build Status](https://travis-ci.com/adam-hanna/goal-seek.svg?branch=develop)](https://travis-ci.com/adam-hanna/goal-seek)
[![Coverage Status](https://coveralls.io/repos/github/adam-hanna/goal-seek/badge.svg?branch=develop)](https://coveralls.io/github/adam-hanna/goal-seek?branch=develop)

# goal-seek

goal-seek is a javascript library that can be used to solve for the value of an independent variable: "x"; of a function: "f(x)"; such that f(x) equals some defined goal. In other words: do you know the desired output of a function but not the input to yield such an output? If so, then use this goal seek!

Currently, this goal seek uses [Steffensen's Method](http://en.wikipedia.org/wiki/Steffensen%27s_method) to find the root of the error. 

## Installation

`goal-seek` is an [npm package](https://www.npmjs.com/package/goal-seek), so installation is as easy as:

`$ npm install --save goal-seek`

## Usage

The package exports two error types, the function parameter type and one function, `goalSeek` as a default export:

```typescript
export const IsNanError = TypeError('resulted in NaN');
export const FailedToConvergeError = Error('failed to converge');

export type Params = {
  fn: (...inputs: any[]) => number;
  fnParams: any[];
  percentTolerance: number;
  maxIterations: number;
  maxStep: number;
  goal: number;
  independentVariableIdx: number;
};

const goalSeek = ({
  fn,
  fnParams,
  percentTolerance,
  maxIterations,
  maxStep,
  goal,
  independentVariableIdx,
}: Params): number => {
  ...
}

export default goalSeek;
```

The `goalSeek` function takes one object argument with the following keys:

1. `fn` - the function, "f(x)" that is being evaluated.
2. `fnParams` - an array of parameters that are to be used as inputs to `fn`.
3. `percentTolerance` - the acceptable error range to the stated goal. For example, if `goal: 100` and `percentTolerance: 1`, then any values in the range [99, 101] will be accepted as correct (± 1% of 100).
4. `maxIterations` - the maximum number of attempts to make.
5. `maxStep` - the maximum magnitude step size to move the independent variable `x` for the next guess.
6. `goal` - the desired output of the `fn`.
7. `independentVariableIdx` - the index position of the independent variable `x` in the `fnParams` array.

To use the function, for example, with a simple linear equeation:

```javascript
  let x = 10;
  const fn = (x: number): number => x + 2;
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
  
    // result => 98
  } catch(e) {

  }
```

## Errors

This library will throw one of two errors: `IsNanError` or `FailedToConvergeError`.

### IsNanError

`IsNanError` is thrown whenever the result of `fn` returns a value that is not a number. For example, if `fn` is `Math.log`, and the value `-1` is input `goalSeek` with throw `IsNanError`.

### FailedToConvergeError

`FailedToConvergeError` is thrown when no acceptable independent variable can be found. For example, if `fn` is `x * x` and goal is `-1` the library will fail to converge and throw `FailedToConvergeError`.


## Examples
  
```javascript
import goalSeek from 'goal-seek';

const fn = (x,y,z) => x * y * z;
const fnParams = [4,5,6];

try {
  const result = goalSeek({
    fn,
    fnParams,
    percentTolerance: 1,
    maxIterations: 1000,
    maxStep: 1,
    goal: 140,
    independentVariableIdx: 2
  });

  console.log(`result: ${result}`);
} catch (e) {
  console.log('error', e);
}

// result: 7
```

## Licenses:

This work is [licensed](LICENSE) under MIT.

```
The MIT License (MIT)

Copyright (c) 2020 Adam Hanna

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
