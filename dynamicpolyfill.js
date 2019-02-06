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
	var polyfillNeeded = [];
	for (var p = 0; p < polen; p++) {
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

function loadMyScript(url) {
	if(Array.isArray(url)) {
		var urlen = url.length;
		for (var u = 0; u < urlen; u++) {
			var uri = url[u];
			if(uri !== null && uri !== '') {
				return new Promise(
					function(resolve, reject) {
						var thescript = document.createElement('script');
						thescript.src = encodeURI(uri);
						document.body.appendChild(thescript);
						thescript.onerror = function(response) {
							return reject("Loading the script failed!", response);
						} 
						thescript.onload = function() {
							return resolve("Script setup and ready to load!");
						} 
					}
				)
			} else {
				return new Promise(
					function(resolve, reject) {
						return resolve ("No script to load");
					}
				)
			}
		}
	} else {
		if(url !== null && url !== '') {
			return new Promise(
				function(resolve, reject) {
					var thescript = document.createElement('script');
					thescript.src = encodeURI(url);
					document.body.appendChild(thescript);
					thescript.onerror = function(response) {
						return reject("Loading the script failed!", response);
					} 
					thescript.onload = function() {
						return resolve("Script setup and ready to load!");
					} 
				}
			)
		} else {
			return new Promise(
				function(resolve, reject) {
					return resolve ("No script to load");
				}
			)
		}
	}
}

function initialiseMyScript(functionToRunonLoad) {
	if(Array.isArray(functionToRunonLoad)) {
		var fnlen = functionToRunonLoad.length;
		for (var f = 0; f < fnlen; f++) {
			var fn = new Function(functionToRunonLoad[f]);
			try {fn();console.log(functionToRunonLoad[f], 'initialised successfully');} catch(err) {console.error('There was an error: ', err.name, err.stack)}
		}			
	} else {	
		var fn = new Function(functionToRunonLoad);
		try {fn();console.log(functionToRunonLoad, 'initialised successfully');} catch(err) {console.error('There was an error: ', err.name, err.stack)}
	}
}

function loadPolyfill(url) {
	return new Promise(
		function(resolve, reject) {
			var polyfill = document.createElement('script');
			polyfill.src = ('https://polyfill.io/v3/polyfill.min.js?features='+encodeURIComponent(url));
			document.body.appendChild(polyfill);
			polyfill.onerror = function(response) {
				return reject("Loading the polyfill(s) failed!", response);
			} 
			polyfill.onload = function() {
				return resolve("Polyfill(s) loaded!");
			}
		}
	)
}
