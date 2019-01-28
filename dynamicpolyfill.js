var staticScript; //CDN usage passes a "false". Set to true if you want direct control via the below variables.

function dynamicPolyfill (features, scriptURL, initFunction, staticScript) {
	if(staticScript == false) {
		var polyfillFeatures = features;
		var scriptToPolyfill = scriptURL;
		function initialiseMyScript() {initFunction}
		return pageLoaded(polyfillFeatures, scriptToPolyfill);
	} else {
		var polyfillFeatures = ["Example.Feature1","ExampleFeature2"]; 
		var scriptToPolyfill = "https://cdn.example.com/packagename/version/scriptname.min.js";
		function initialiseMyScript() {RENAMETOYOURFUNCTION();}
		window.onload = pageLoaded(polyfillFeatures, scriptToPolyfill);
	}
}

function pageLoaded(polyfillFeatures, scriptToPolyfill) {
	Promise.all([checkNativeSupport(polyfillFeatures)])
		.then( 
		function() {
			loadMyScript(scriptToPolyfill)
				.then( 
				function() {
					console.log("As the script is ready, let's initialise it...");
					initialiseMyScript();
					console.log("Et voila! The script is running - wooooo!");
				}
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
		if ((typeof (window.pol) !== 'undefined' || pol in window)) {
			console.log(pol,'has native support');
		} else if (pol.indexOf(splitChars) >= 1 && lastWord in firstWord) {
			console.log(pol,'has native support');
		} else {
			console.warn("Ahhh, your browser doesn't support",tocheck[i],". I'm gonna have to polyfill it so stuff works. Hang on one sec!");
			polyfillNeeded.push(tocheck[i]);
		}
	}
	if (polyfillNeeded.length > 0) {
		return loadPolyfill(polyfillNeeded);
	}
}

function loadMyScript(url) {
	return new Promise(
		function(resolve, reject) {
			var thescript = document.createElement('script');
			thescript.src = encodeURI(url);
			document.getElementsByTagName('body')[0].appendChild(thescript);
			console.log('Loading ',thescript.src,'!');
			thescript.onerror = function(response) {
				console.error ('Loading the script failed!');
				return reject("Loading the script failed!", response);
			} 
			thescript.onload = function() {
				console.log("Script setup and ready to load!");
				return resolve("Script setup and ready to load!");
			} 
		}
	)
}

function loadPolyfill(url) {
	return new Promise(
		function(resolve, reject) {
			var polyfill = document.createElement('script');
			polyfill.src = ('https://polyfill.io/v3/polyfill.min.js?features='+encodeURIComponent(url));
			document.getElementsByTagName('body')[0].appendChild(polyfill);
			console.log('Grabbing',url,'polyfill from: ', polyfill.src);
			polyfill.onerror = function(response) {
				console.error ('Loading the polyfill(s) failed!');
				return reject("Loading the polyfill(s) failed!", response);
			} 
			polyfill.onload = function() {
				console.log("Polyfill(s) loaded!");
				return resolve("Polyfill(s) loaded!");
			}
		}
	)
}
