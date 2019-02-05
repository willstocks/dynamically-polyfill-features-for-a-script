//This file includes a bunch of console.log()/console.error()/console.warn() messages. Aides with troubleshooting, but is also a little fun if someone happens to come across them. They're not necessary at all tho'!
function dynamicPolyfill (features, scriptURL, initFunction) {
	var polyfillFeatures = features;
	var scriptToPolyfill = scriptURL;
	var functionToRunonLoad = initFunction;
	return pageLoaded(polyfillFeatures, scriptToPolyfill, functionToRunonLoad);
}

function pageLoaded(polyfillFeatures, scriptToPolyfill, functionToRunonLoad) {
	Promise.all([checkNativeSupport(polyfillFeatures), loadMyScript(scriptToPolyfill)])
		.then( 
			function() {
				console.log("As the script is ready, let's initialise it...");
				initialiseMyScript(functionToRunonLoad)
			}
		).catch(function(error){return error})
	,function () {
		console.error("There was an issue polyfilling",mayneedpolyfill," which means that I can't preload future pages for you. Sorry! :(");
		console.warn("If you want this to work, I'd recommend upgrading to a browser that supports",mayneedpolyfill,"natively. You can find out which browsers do by visting: https://caniuse.com/");
	}
}

function checkNativeSupport(tocheck) {
	var polen = tocheck.length; //cache value out of the for loop
	var polyfillNeeded = []; //we'll need this later to know if/what to polyfill
	for (var p = 0; p < polen; p++) { //iterate through array
		var pol = tocheck[p]; //cache this outside of if
		var splitChars = '.'; //values to check for within array strings to know where to split
		var split = pol.split(splitChars); //split string based on splitChars (in this case, a dot)
		var firstWord = window[split[0]]; //cache outside of if - the first word (array item 0)
		var lastWord = new Object(split[split.length - 1]); //cache outside of if - last word (last array value)
		if (typeof (window.pol) !== 'undefined' || pol in window || (pol.indexOf(splitChars) >= 1 && lastWord in firstWord) || pol in this) {
			console.log(pol,'has native support');
		} else {
			console.warn("Ahhh, your browser doesn't support",pol,". I'm gonna have to polyfill it so stuff works.");
			polyfillNeeded.push(pol);
		}
	}
	if (polyfillNeeded.length > 0) { //this is where we "push" values and check whether we need to polyfill or not
		console.warn('Right, we need to polyfill',polyfillNeeded);
		return loadPolyfill(polyfillNeeded);
	}
}

function loadMyScript(url) {
	if(Array.isArray(url)) { //cater for array
		var urlen = url.length; //cache value out of the for loop
		for (var u = 0; u < urlen; u++) {
			var uri = url[u]; //cache value out of if
			if(uri !== null && uri !== '') { //handle blank or null values
				return new Promise(
					function(resolve, reject) {
						var thescript = document.createElement('script');
						thescript.src = encodeURI(uri);
						console.log('Loading ',uri);
						document.body.appendChild(thescript);
						thescript.onerror = function(response) {
							console.error("Loading the script failed!);
							return reject("Loading the script failed!", response);
						} 
						thescript.onload = function() {
							console.log("Script setup andready for use!");
							return resolve("Script setup and ready to load!");
						} 
					}
				)
			} else { //blank or null values
				return new Promise(
					function(resolve, reject) {
						console.log("No script to load");
						return resolve ("No script to load");
					}
				)
			}
		}
	} else { //if not array
		if(url !== null && url !== '') { //handle blank or null values
			return new Promise(
				function(resolve, reject) {
					var thescript = document.createElement('script');
					thescript.src = encodeURI(url);
					console.log("Loading ",url);
					document.body.appendChild(thescript);
					thescript.onerror = function(response) {
						console.error("Loading the script failed");
						return reject("Loading the script failed!", response);
					} 
					thescript.onload = function() {
						console.log("Script setup andready for use!");
						return resolve("Script setup and ready to load!");
					} 
				}
			)
		} else { //blank or null values
			return new Promise(
				function(resolve, reject) {
					console.log("No script to load!");
					return resolve ("No script to load");
				}
			)
		}
	}
}

function initialiseMyScript(functionToRunonLoad) {
	if(Array.isArray(functionToRunonLoad)) { //cater for array
		var fnlen = functionToRunonLoad.length; //cache outside of for loop
		for (var f = 0; f < fnlen; f++) {
			var fn = new Function(functionToRunonLoad[f]); //convert the strings to functions
			try { 
				fn(); //execute the functions
				console.log(functionToRunonLoad[f], 'initialised successfully'); //confirm execution
			} 
			catch(err) {
				console.error('There was an error: ', err.name, err.stack)
			}
		}			
	} else { //if not array	
		console.log("The following script will now be initialised:", functionToRunonLoad);
		return new Function(functionToRunonLoad); //convert string to function and execute
	}
}

function loadPolyfill(url) {
	return new Promise(
		function(resolve, reject) {
			var polyfill = document.createElement('script');
			polyfill.src = ('https://polyfill.io/v3/polyfill.min.js?features='+encodeURIComponent(url));
			console.log('Grabbing',url,'polyfill from: ',polyfill.src);
			document.body.appendChild(polyfill);
			polyfill.onerror = function(response) {
				console.error("Loading the polyfill(s) failed!");
				return reject("Loading the polyfill(s) failed!", response);
			} 
			polyfill.onload = function() {
				console.log("Polyfill(s) loaded and ready for use!");
				return resolve("Polyfill(s) loaded!");
			}
		}
	)
}
