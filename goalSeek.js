function goalSeek(Func, aFuncParams, oFuncArgTarget, Goal, Tol, maxIter) {
	var g, Y, Y1, OldTarget;

	Tol = (Tol || 0.01 * Goal);
	maxIter = (maxIter || 1000);

	//is the independent variable within an object?
	if (oFuncArgTarget.propStr) {
		//Iterate through the guesses
		for (var i = 0; i < maxIter; i++) {
			//define the root of the function as the error
			Y = Func.apply(null, aFuncParams) - Goal;
			
			//was our initial guess a good one?
			if (Math.abs(Y) < Tol) {
				return getObjVal(aFuncParams[oFuncArgTarget.Position], oFuncArgTarget.propStr);
			} else {
				OldTarget = getObjVal(aFuncParams[oFuncArgTarget.Position], oFuncArgTarget.propStr);
				setObjVal(aFuncParams[oFuncArgTarget.Position], oFuncArgTarget.propStr, OldTarget + Y);
				Y1 = Func.apply(null, aFuncParams) - Goal;
				g = (Y1 - Y) / Y;

				if (g === 0) {
					g = 0.0001;
				};

				setObjVal(aFuncParams[oFuncArgTarget.Position], oFuncArgTarget.propStr, OldTarget - Y / g);
			};

		};
		if (Math.abs(Y) > Tol) {
			return null;
		};
	} else {
		//Iterate through the guesses
		for (var i = 0; i < maxIter; i++) {
			//define the root of the function as the error
			Y = Func.apply(null, aFuncParams) - Goal;
			
			//was our initial guess a good one?
			if (Math.abs(Y) < Tol) {
				return aFuncParams[oFuncArgTarget.Position];
			} else {
				OldTarget = aFuncParams[oFuncArgTarget.Position];
				aFuncParams[oFuncArgTarget.Position] = OldTarget + Y;
				Y1 = Func.apply(null, aFuncParams) - Goal;
				g = (Y1 - Y) / Y;

				if (g === 0) {
					g = 0.0001;
				};

				aFuncParams[oFuncArgTarget.Position] = OldTarget - Y / g;
			};

		};
		if (Math.abs(Y) > Tol) {
			return null;
		};
	};
};

//source (modified from original): http://stackoverflow.com/questions/18936915/dynamically-set-property-of-nested-object
//answerer: bpmason1; questioner: John B.
//answerer url: http://stackoverflow.com/users/2736119/bpmason1
//license: http://creativecommons.org/licenses/by-sa/3.0/legalcode
function setObjVal(Obj, propStr, Value) {
    var Schema = Obj;  // a moving reference to internal objects within obj
    var pList = propStr.split('.');
    var Len = pList.length;

    for(var i = 0; i < Len-1; i++) {
        var Elem = pList[i];
        if( !Schema[Elem] ) Schema[Elem] = {}
        Schema = Schema[Elem];
    };

    Schema[pList[Len-1]] = Value;
};

//source (modified from original): http://stackoverflow.com/questions/4343028/in-javascript-test-for-property-deeply-nested-in-object-graph
//answerer: Zach; questioner: thisismyname
//answerer url: http://stackoverflow.com/users/230892/zach
//license: http://creativecommons.org/licenses/by-sa/3.0/legalcode
function getObjVal(Obj, propStr) {
    var Parts = propStr.split(".");
    var Cur = Obj;

    for (var i=0; i<Parts.length; i++) {
        Cur = Cur[Parts[i]];
    };

    return Cur;
};