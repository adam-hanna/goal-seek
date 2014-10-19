function goalSeek(Func, oFuncArgs, sFuncArgsTarget, Goal, Tol, maxIter) {
	var g, Y, Y1, OldTarget;

	Tol = (Tol || 0.001 * Goal);
	maxIter = (maxIter || 1000);

	//Iterate through the guesses
	for (var i = 0; i < maxIter; i++) {
		//define the root of the function as the error
		Y = Func(oFuncArgs) - Goal;
		
		//was our initial guess a good one?
		if (Math.abs(Y) < Tol) {
			return oFuncArgs[sFuncArgsTarget];
		} else {
			OldTarget = oFuncArgs[sFuncArgsTarget];
			oFuncArgs[sFuncArgsTarget] = oFuncArgs[sFuncArgsTarget] + Y;
			Y1 = Func(oFuncArgs) - Goal;
			g = (Y1 - Y) / Y;

			if (g === 0) {
				g = 0.0001;
			};

			oFuncArgs[sFuncArgsTarget] = OldTarget - Y / g;
		};

	};
	if (Math.abs(Y) > Tol) {
		return "Err";
	};
};