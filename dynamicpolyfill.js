function dynamicPolyfill(tocheck, scriptToPolyfill, functionToRunonLoad) {
    var polyfillReq = [];
    if(Array.isArray(tocheck)) {
        tocheck.forEach(
            function(tocheck) {
                polyfillReq.push(checking(tocheck))
            }
        )
    } else {
        polyfillReq.push(checking(tocheck))
    }
    polyfillReq =
        polyfillReq
        .filter(
            function(p) {
                return p !== undefined
            }
        )
        .join(' ');
    loadPolyfill(polyfillReq, scriptToPolyfill, functionToRunonLoad);
}

function checking(check) {
    var splitChars = '.';
    var split = check.split(splitChars);
    var firstWord = window[split[0]];
    var lastWord = new Object(split[split.length - 1]);
    if (check in window == false || check in this == false) {
        if (check.indexOf(splitChars) >= 1) {
            if (lastWord in firstWord == false) {
                return check
            }
        } else {
            return check
        }
    }
}

function loadPolyfill(url, scriptToPolyfill, functionToRunonLoad) {
	if(url !== "") {
		var polyfill = document.createElement('script');
		polyfill.src = ('https://polyfill.io/v3/polyfill.min.js?features='+encodeURIComponent(url));
		polyfill.onerror = function(response) {
			console.error("Loading the polyfill(s) failed!", response);
		} 
		polyfill.onload = function() {
			loadMyScript(scriptToPolyfill, functionToRunonLoad)
		}
        document.body.appendChild(polyfill);
	} else {
	    loadMyScript(scriptToPolyfill, functionToRunonLoad)
	}
}

function loadMyScript(url, functionToRunonLoad) {
    if (Array.isArray(url)) {
        var promises = [];
        url.forEach(
            function(url) {
                promises.push(nonblankURL(url))
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
    } else if (!Array.isArray(url) && url !== null && url !== '') {
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
    return new Promise (
        function(resolve,reject) {
            var thescript = document.createElement('script');
            thescript.src = encodeURI(uri);
            thescript.onerror = function(response) {
                return reject('Loading the script failed!', response)
            }
            thescript.onload = function() {
                return resolve(uri)
            }
            document.body.appendChild(thescript)
        }
    )
}

function initialiseMyScript(functionToRunonLoad) {
    if (Array.isArray(functionToRunonLoad)) {
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
            var run = new Function(fn);
	        run()
        }
        catch (err) {
            console.error('There was an error: ', err, err.name, err.stack)
        }
    }
}
