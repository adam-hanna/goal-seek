# goalSeek.js

goalSeek.js is a javascript library that can be used to solve for an independent variable of a function ("x") such that f(x) equals some defined goal. In other words: do you know the output of a function but not the input to yield such an output? If so, then use this goal seek!

The function in question must use an object as the only input to the function. The object can contain many keys and subdocuments; however, currently, the dependent variable must not be in a subdocument! This will be fixed in a future release.

Currently, this goal seek uses Steffensen's Method to find the root of the error. 
See: http://en.wikipedia.org/wiki/Steffensen%27s_method

## Functions:
<dl>
  <dt><h3>goalSeek(Func, oFuncArgs, sFuncArgsTarget, Goal, Tol, maxIter)</h3>
  <dd><h6>Arguments</h6>
  <ul>
    <li><b>Func</b>: the name of the function in question.</li>
    <li><b>oFuncArgs</b>: the object that is used as the unput to Func. Please note that the this object must contain a guess for the independent variable in question.</li>
    <li><b>sFuncArgsTarget</b>: the key within oFuncArgs that is to be sought. This input must be a string.</li>
    <li><b>Goal</b>: the desired output of the function.</li>
    <li><b>Tol</b>: [OPTIONAL] the magnitude of the tolerance for an acceptable output. e.g. if the desired output is 100, a 0.1 tolerance would accept any output within the inclusive range {99.9: 100.1}. The fefault if not argument is given is the magnitude of 0.1% of the goal.</li>
    <li><b>maxIter</b>: [OPTIONAL] the maximum of iterations to perform. The default if no argument is given is 1,000 iterations.</li>
  </ul>
</dl>

## Examples:
  
```html
<!--HTML-->
<script>
	function fx1(o) {
		return o.x * o.a * o.b;
	};

	function fx2(o) {
		return o["someThing.x"] * o["someThing.a"] * o["anotherThing.b"];
	};

	function fx3(o) {
		return o.x * o.someThing.a * o.anotherThing.b;
	};

	var oFuncArgs3 = {
		x: 2,
		someThing: {
			a:4
		},
		anotherThing: {
			b: 5
		}
	};

	var sFuncArgsTarget3 = "x";

	console.log(goalSeek(fx1, {x:2, a:4, b:5}, "x", 140, 0.01, 1000));
	console.log(goalSeek(fx2, {"someThing.x":2, "someThing.a":4, "anotherThing.b":5}, "someThing.x", 140, 0.01, 1000));
	console.log(goalSeek(fx2, oFuncArgs2, sFuncArgsTarget3, 140, 0.01, 1000));
</script>

<!--Will Return-->
=>7

=>7

=>7
```
## Todo:
<dl>
	<dd>
	<ul>
		<li>Allow dependent variables to be within subdocuments of oFuncArgs.</li>
	</ul>
</dl>

## Licenses:
<dl><dd>This work is licensed under the (included) MIT license.
</dl>

```
The MIT License (MIT)

Copyright (c) 2014 Adam Hanna

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```