function dynamicPolyfill(tocheck, scriptToPolyfill, functionToRunonLoad) {
	var checkPromises = [];
	if(Array.isArray(tocheck)) {
		tocheck.forEach(
            function(tocheck) {
			    checkPromises.push(checking(tocheck))
		    }
        )
	} else {
		checkPromises.push(checking(tocheck))
	}
	Promise.all(checkPromises)
    .then(
        function() {
            loadMyScript(scriptToPolyfill, functionToRunonLoad)
        }
    )
    .catch(
        function(error) {
            return error
        }
    )
}

function checking(check) {
	var splitChars = '.';
	var split = check.split(splitChars);
	var firstWord = window[split[0]];
	var lastWord = new Object(split[split.length - 1]);
	if(typeof (window.check) == 'undefined' || !check in window || (check.indexOf(splitChars) >= 1 && !lastWord in firstWord) || !check in this) {
		loadPolyfill(check);
	}
}

function loadPolyfill(url) {
	return new Promise(
        function(resolve, reject) {
            var polyfill = document.createElement('script');
            polyfill.src = ('https://polyfill.io/v3/polyfill.min.js?features=' + encodeURIComponent(url));
            document.body.appendChild(polyfill);
            polyfill.onerror = function(response) {
                return reject("Loading the polyfill(s) failed!", response)
            }
            polyfill.onload = function() {
                return resolve
            }
	    }
    )
}

function loadMyScript(url, functionToRunonLoad) {
	if(Array.isArray(url)) {
		var promises = [];
		url.forEach(
            function(url) {
			    promises.push(nonblankURL(url))
		    }
        );
		Promise.all(promises)
        .then(
            function() {
                initialiseMyScript(functionToRunonLoad)
            }
        )
        .catch(
            function(error) {
                return error
            }
        )
	}
	else if (!Array.isArray(url) && url !== null && url !== '') {
		nonblankURL(url)
        .then(
            function() {
                initialiseMyScript(functionToRunonLoad)
            }
        )
        .catch(
            function(error) {
                return error
            }
        )
	} else {
		initialiseMyScript(functionToRunonLoad)
	}
}

function nonblankURL(uri) {
	return new Promise(
        function(resolve, reject) {
            var thescript = document.createElement('script');
            thescript.src = encodeURI(uri);
            document.body.appendChild(thescript);
            thescript.onerror = function(response) {
                return reject("Loading the script failed!", response)
            }
            thescript.onload = function() {
                return resolve(uri)
            }
	    }
    )
}

function initialiseMyScript(functionToRunonLoad) {
	if(Array.isArray(functionToRunonLoad)) {
		functionToRunonLoad.forEach(
            function(functionToRunonLoad) {
			    initScript(functionToRunonLoad)
		    }
        )
	} else {
		initScript(functionToRunonLoad)
	}
	function initScript(fn) {
		try {
			window[fn]
		}
		catch (err) {
			console.error('There was an error: ', err, err.name, err.stack)
		}
	}
}
