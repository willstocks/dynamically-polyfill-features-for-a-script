//This is reliant on Promises. If you want to use this, you'll need to (ironically!) polyfill Promises first... or at least until I can work out how to polyfill promises dynamically

//Example polyfill requirements and 3rd party script
var mayneedpolyfill = ['IntersectionObserver', 'Object.assign']; //features that your script relies on - these two aren't supported in IE for example
var scriptiwanttouse = 'https://cdn.allaroundtheworld.com/packagename/version/scriptname.min.js'; //the script that you want to use

window.onload = function pageLoaded() {
	Promise.all([checkNativeSupport(mayneedpolyfill)])
		.then( 
		function() {
			loadMyScript(scriptiwanttouse)
				.then( 
				function() {
					console.log("As the script is ready, let's initialise it...");
					scriptiwanttouseexamplefunction(); //Initialise the script you want to use here!
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
	var num = tocheck.length //cache value out of the for loop
	for (var i = 0; i < num; i++) {
		if (tocheck[i] in window || 'window.',tocheck[i]) {
			console.log(tocheck[i],'has native support');
		} else {
			console.warn("Ahhh, your browser doesn't support",tocheck[i],". I'm gonna have to polyfill it so stuff works. Hang on one sec!");
			return loadPolyfill(tocheck[i]);	
		}
	}
}

function loadMyScript(url) {
	return new Promise(
		function(resolve, reject) {
			var thescript = document.createElement('script');
			thescript.src = encodeURI(url); //URL here
			//thescript.defer = true;
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
