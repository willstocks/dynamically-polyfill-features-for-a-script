//This is reliant on Promises. If you want to use this, you'll need to (ironically!) polyfill Promises first... or at least until I can work out how to polyfill promises dynamically

//Example polyfill requirements and 3rd party script
var mayneedpolyfilling = ['IntersectionObserver', 'dialog']; //features that your script relies on
var scriptiwannause = 'https://cdn.jsdelivr.net/npm/quicklink@1.0.0/dist/quicklink.umd.js'; //the script that you want to use

window.onload = function pageLoaded() {
	Promise.all([checkNativeSupport(mayneedpolyfilling)])
		.then( 
		function() {
			loadMyScript(scriptiwannause)
				.then( 
				function() {
					console.log('Aha! your script is now loaded! Initialising...');
					//quicklink();
					console.log("Et voila! You're up and running!");
				}
			).catch(function(error){return error})
		}
	).catch(function(error){return error})
	,function () {
		console.warn("So there was an issue polyfilling",mayneedpolyfilling," which means that I can't preload future pages for you. Sorry! :(");
		console.warn("If you want this to work, I'd recommend upgrading to a browser that supports",mayneedpolyfilling,"natively. You can find out which browsers do by visting: https://caniuse.com/");
	}
}

function checkNativeSupport(tocheck) {
	for (var i = 0; i < tocheck.length; i++) {
		if (tocheck[i] in window) {
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
				return reject("Loading the script shit the bed", response);
			} 
			thescript.onload = function() {
				console.log("YOUR SCRIPT LOADED! OMFG!");
				return resolve("YAAAAAAAASSSSSSSS");
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
				return reject("it shit the bed", response);
			} 
			polyfill.onload = function() {
				console.log("Polyfill(s) loaded");
				return resolve("it loaded");
			}
		}
	)
}
