function dynamicPolyfill (features, scriptURL, initFunction) {
	var polyfillFeatures = features;
	var scriptToPolyfill = scriptURL;
	var functionToRunonLoad = initFunction;
	return pageLoaded(polyfillFeatures, scriptToPolyfill, functionToRunonLoad);
}

function pageLoaded(polyfillFeatures, scriptToPolyfill, functionToRunonLoad) {
	Promise.all([checkNativeSupport(polyfillFeatures)])
		.then( 
		function() {
			loadMyScript(scriptToPolyfill)
				.then( 
					initialiseMyScript(functionToRunonLoad)
			).catch(function(error){return error})
		}
	).catch(function(error){return error})
		,function () {
		console.error("There was an issue polyfilling",mayneedpolyfill," which means that I can't preload future pages for you. Sorry! :(");
		console.warn("If you want this to work, I'd recommend upgrading to a browser that supports",mayneedpolyfill,"natively. You can find out which browsers do by visting: https://caniuse.com/");
	}
}

function checkNativeSupport(tocheck) {
	var num = tocheck.length; //cache value out of the for loop
	var polyfillNeeded = [];
	for (var i = 0; i < num; i++) {
		var pol = tocheck[i];
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
	if(url !== null && url !== '') {
		return new Promise(
			function(resolve, reject) {
				var thescript = document.createElement('script');
				thescript.src = encodeURI(url);
				document.getElementsByTagName('body')[0].appendChild(thescript);
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

function initialiseMyScript(functionToRunonLoad) {
	console.log("The following script will now be initialised:", functionToRunonLoad);
	return new Function(functionToRunonLoad);
}

function loadPolyfill(url) {
	return new Promise(
		function(resolve, reject) {
			var polyfill = document.createElement('script');
			polyfill.src = ('https://polyfill.io/v3/polyfill.min.js?features='+encodeURIComponent(url));
			document.getElementsByTagName('body')[0].appendChild(polyfill);
			polyfill.onerror = function(response) {
				return reject("Loading the polyfill(s) failed!", response);
			} 
			polyfill.onload = function() {
				return resolve("Polyfill(s) loaded!");
			}
		}
	)
}
