//This file includes a bunch of console.log()/console.error()/console.warn() messages. Aides with troubleshooting, but is also a little fun if someone happens to come across them. They're not necessary at all tho'!
function dynamicPolyfill (features, scriptURL, initFunction) {
		let polyfillFeatures = features;
		let scriptToPolyfill = scriptURL;
		let functionToRunonLoad = initFunction;
		return pageLoaded(polyfillFeatures, scriptToPolyfill, functionToRunonLoad);
}

function pageLoaded(polyfillFeatures, scriptToPolyfill, functionToRunonLoad) {
	Promise.all([checkNativeSupport(polyfillFeatures)])
		.then( 
		function() {
			loadMyScript(scriptToPolyfill)
				.then( 
					console.log("As the script is ready, let's initialise it...");
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
	let num = tocheck.length; //cache value out of the for loop
	let polyfillNeeded = [];
	for (let i = 0; i < num; i++) {
		let pol = tocheck[i];
		let splitChars = '.';
		let split = pol.split(splitChars);
		let firstWord = window[split[0]];
		let lastWord = new Object(split[split.length - 1]);
		if (typeof (window.pol) !== 'undefined' || pol in window || (pol.indexOf(splitChars) >= 1 && lastWord in firstWord) || pol in this) {
			console.log(pol,'has native support');
		} else {
			console.warn("Ahhh, your browser doesn't support",pol,". I'm gonna have to polyfill it so stuff works. Hang on one sec!");
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
				let thescript = document.createElement('script');
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
	} else {
		return new Promise(
			function(resolve, reject) {
				console.log("No script to load!");
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
			let polyfill = document.createElement('script');
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
