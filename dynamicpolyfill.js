function dynamicPolyfill (features, scriptURL, initFunction) {
	var polyfillFeatures = features; //these are the features that may need polyfilling depending on browser support
	var scriptToPolyfill = scriptURL; //this is the script(s) that need to be used to execute a function and is dependent on certain feature support
	var functionToRunonLoad = initFunction; //this is the function(s) that need to be executed, dependent on the above script(s)
	return pageLoaded(polyfillFeatures, scriptToPolyfill, functionToRunonLoad); //Let's do it...
}

function pageLoaded(polyfillFeatures, scriptToPolyfill, functionToRunonLoad) {
	checkNativeSupport(polyfillFeatures) //check whether we need to polyfill anything
		.then( //if we do or don't, then...
			loadMyScript(scriptToPolyfill, functionToRunonLoad) //load the scripts and execute their dependent functions
	).catch( //report any errors during promise
        function(error){
            return error
        }
    ) 
}

function checkNativeSupport(tocheck) {
	var polen = tocheck.length; //cache value out of the for loop
	var polyfillNeeded = [];
	for (var p = 0; p < polen; p++) { //swap out for Array.forEach or leave as-is?
		var pol = tocheck[p];
		var splitChars = '.';
		var split = pol.split(splitChars);
		var firstWord = window[split[0]];
		var lastWord = new Object(split[split.length - 1]);
		if (typeof (window.pol) !== 'undefined' || pol in window || (pol.indexOf(splitChars) >= 1 && lastWord in firstWord) || pol in this) {
			console.log(pol,'has native support');
		} else {
			polyfillNeeded.push(pol);
		}
	}
	if (polyfillNeeded.length > 0) {
		return loadPolyfill(polyfillNeeded);
	}
}

function loadPolyfill(url) {
	return new Promise( //Need to return a promise response
		function(resolve, reject) { //can resolve or reject, depending on load success or failure
			var polyfill = document.createElement('script'); //create script element
			polyfill.src = ('https://polyfill.io/v3/polyfill.min.js?features='+encodeURIComponent(url)); //add the polyfill src value to the aforementioned new script element
			document.body.appendChild(polyfill); //add the new script to the end of the body tag
			polyfill.onerror = function(response) { //if the script errors when loading...
				return reject("Loading the polyfill(s) failed!", response); //... return Promise.reject response
			} 
			polyfill.onload = function() { //if the script loads successfully...
				return resolve("Polyfill(s) loaded!"); //... return Promise.resolve response
			}
		}
	)
}

function loadMyScript(url, functionToRunonLoad) {
	if(Array.isArray(url)) { //Check whether array is being passed or just string
		var promises = []; //Gotta catch 'em all... as an array
		url.forEach( //iterate through the array using Array.forEach()
				function(url){ //pass each item in the array through to the "get script" function
					promises.push(nonblankURL(url)); //push the resolve/reject into the promises array
				}
		);
		Promise.all(promises) //Make sure that all promises that are returned come back as resolved
				.then( 
					() => initialiseMyScript(functionToRunonLoad) //run the init function!
			).catch(function(error){return error}) //report any errors during promise
	} else if (!Array.isArray(url) && url !== null && url !== '') { //if not an array and not blank values
		nonblankURL(url) //resolve or reject getting the script
			.then( 
				() => initialiseMyScript(functionToRunonLoad) //run the init function!
			).catch(function(error){return error}) //report any errors during promise
	} else { //not array, blank values
		return initialiseMyScript(functionToRunonLoad) //straight to init because no dependency (blank)
	}
}

function nonblankURL(uri){
	return new Promise( //Need to return a promise response
		function(resolve, reject) { //can resolve or reject, depending on load success or failure
			var thescript = document.createElement('script'); //create script element
			thescript.src = encodeURI(uri); //add the src value to the aforementioned new script element
			document.body.appendChild(thescript); //add the new script to the end of the body tag
			thescript.onerror = function(response) { //if the script errors when loading...
				return reject("Loading the script failed!", response); //... return Promise.reject response
			} 
			thescript.onload = function() { //if the script loads successfully...
				return resolve(uri); //... return Promise.resolve response
			} 
		}
	)
}

function initialiseMyScript(functionToRunonLoad) {
	if(Array.isArray(functionToRunonLoad)) { //Check whether array is being passed or just string
		functionToRunonLoad.forEach( //iterate through the array using Array.forEach()
			function(functionToRunonLoad){ //pass each item in the array through to the "get script" function
				try { //attempt to load - using try means we can catch any errors
					new Function(functionToRunonLoad)(); //convert string to function then execute
				} catch(err) { //catch any errors trying to run the init function
					console.error('There was an error: ', err.name, err.stack); //report error to console
				}
			}
		)
    } else { //not an array, just a string
		try { //attempt to load - using try means we can catch any errors
			new Function(functionToRunonLoad)(); //convert string to function then execute
		} catch(err) { //catch any errors trying to run the init function
			console.error('There was an error: ', err.name, err.stack); //report error to console
		}
	}
}
