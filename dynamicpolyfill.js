const polyfillio = "https://polyfill.io/v3/polyfill.min.js?features=";

function dynamicPolyfill(tocheck, scriptToPolyfill, functionToRunonLoad) {
    if(typeof Promise !== "undefined" || window.hasOwnProperty("Promise")) {
        var polyfillReq = [];
        if(Array.isArray(tocheck)) {
            tocheck.forEach(
                function(tocheck) {
                    polyfillReq.push(checking(tocheck));
                }
            );
        } else {
            polyfillReq.push(checking(tocheck));
        }
        polyfillReq = polyfillReq.filter(
            function(p) {
                return p !== undefined;
            }
        ).join(",");
        loadPolyfill(polyfillReq, scriptToPolyfill, functionToRunonLoad);
    } else {
        promiFill(tocheck, scriptToPolyfill, functionToRunonLoad);
    }
}

function promiFill(tocheck, scriptToPolyfill, functionToRunonLoad) {
    var promPolyfill = document.createElement("script");
    promPolyfill.src = polyfillio + "Promise";
    document.body.appendChild(promPolyfill);
    promPolyfill.onerror = function(response) {
        console.error("Polyfilling Promise failed", response);
    };
    promPolyfill.onload = function() {
        dynamicPolyfill(tocheck, scriptToPolyfill, functionToRunonLoad);
    };
}

function checking(check) {
    var splitChars = ".";
    if(window.hasOwnProperty(check)!== true || (typeof this.check !== 'function') !== true || (check in this) !== true) {
        if (check.indexOf(splitChars) >= 1) {
            var split = check.split(".");
            var firstWord = (split[0] === "window" ? split[0] : window[split[0]]);
            var lastWord = new Object(split[split.length - 1]);
            if ((firstWord.prototype.hasOwnProperty(lastWord) !== true) && (firstWord.hasOwnProperty(lastWord) !== true) && (lastWord in firstWord !== true)) {
                return check;
            }
        } else {
            return check;
        }
    }
}

function loadPolyfill(url, scriptToPolyfill, functionToRunonLoad) {
    if(url !== "") {
        var polyfill = document.createElement("script");
        polyfill.src = polyfillio + encodeURIComponent(url);
        polyfill.onerror = function(response) {
            console.error("Loading the polyfill(s) failed!", response);
        };
        polyfill.onload = function() {
            loadMyScript(scriptToPolyfill, functionToRunonLoad);
        };
        document.body.appendChild(polyfill);
    } else {
        loadMyScript(scriptToPolyfill, functionToRunonLoad);
    }
}

function loadMyScript(url, functionToRunonLoad) {
    if(Array.isArray(url)) {
        var promises = [];
        url.forEach(
            function(url) {
                promises.push(nonblankURL(url));
            }
        );
        Promise.all(promises).then(
            function() {
                initialiseMyScript(functionToRunonLoad);
            }
        ).catch(function(error) {return error;});
    } else if(!Array.isArray(url) && url !== null && url !== "") {
        nonblankURL(url).then(
            function() {
                initialiseMyScript(functionToRunonLoad);
            }
        ).catch(function(error) {return error;});
    } else {
        initialiseMyScript(functionToRunonLoad);
    }
}

function nonblankURL(uri) {
    return new Promise(
        function(resolve, reject) {
            var thescript = document.createElement("script");
            thescript.src = encodeURI(uri);
            thescript.onerror = function(response) {
                return reject("Loading the script failed!", response);
            };
            thescript.onload = function() {
                return resolve(uri);
            };
            document.body.appendChild(thescript);
        }
    );
}

function initialiseMyScript(functionToRunonLoad) {
    if(Array.isArray(functionToRunonLoad)) {
        functionToRunonLoad.forEach(
            function(functionToRunonLoad) {
                initScript(functionToRunonLoad);
            }
        );
    } else {
        initScript(functionToRunonLoad);
    }

    function initScript(fn) {
        try {
            var run = new Function(fn);
            run();
        } catch(err) {
            console.error("There was an error: ", err, err.name, err.stack);
        }
    }
}

module.exports = dynamicPolyfill;
