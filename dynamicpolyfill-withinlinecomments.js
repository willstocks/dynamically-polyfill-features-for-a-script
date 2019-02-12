function dynamicPolyfill(tocheck, scriptToPolyfill, functionToRunonLoad) {
    var polyfillReq = []; //Create an array where we'll store the items we need to polyfill
    if(Array.isArray(tocheck)) { //if the tocheck parameter is an array
        tocheck.forEach( //iterate through each item in the array
            function(tocheck) { //pass the array item through
                polyfillReq.push(checking(tocheck)) //check whether we need to polyfill the feature and append the response to the polyfillReq array
            }
        )
    } else { //if the tocheck parameter is NOT an array
        polyfillReq.push(checking(tocheck)) //check whether we need to polyfill the feature and append the response to the polyfillReq array
    }
    polyfillReq = //we need to make sure all of the array values are valid
        polyfillReq
        .filter( //we're going to filter through each item in the array
            function(p) {
                return p !== undefined //and we're going to strip out the 'undefined' or 'null' values
            }
        )
        .join(' '); //we're also going to replace the comma separator with a space as we'll use the values in a URL later
    loadPolyfill(polyfillReq, scriptToPolyfill, functionToRunonLoad); //we're done here, move on to load the polyfills if necessary
}

function checking(check) {
    var splitChars = '.'; //we might need to check whether a feature exists within something else, based on the FeatureParent.Feature (Feature in FeatureParent)
    var split = check.split(splitChars); //we'll cache any values that can be split based on the splitChars here
    var firstWord = window[split[0]]; //get the first word from the split
    var lastWord = new Object(split[split.length - 1]); //get the last word from the split
    if (check in window == false || check in this == false) { //check whether the feature is natively supported
        if (check.indexOf(splitChars) >= 1) { //check whether there are any .'s in what we're checking
            if (lastWord in firstWord == false) { //if there is, check whether Feature in FeatureParent is natively supported
                return check //if Feature in FeatureParent is not natively supported, we return the value so we know we need to polyfill
            }
        } else {
            return check //if the feature is not natively supported, we return the value so we know we need to polyfill
        }
    }
}

function loadPolyfill(url, scriptToPolyfill, functionToRunonLoad) {
	if(url !== "") { //if the url being passed isn't a blank value
		var polyfill = document.createElement('script'); //create a script element
		polyfill.src = ('https://polyfill.io/v3/polyfill.min.js?features='+encodeURIComponent(url)); //add the src value and encode the url as a URI component (converts spaces to the relevant URI component)
		polyfill.onerror = function(response) { //create an onError value for the script element, so we know if loading the polyfill fails
			console.error("Loading the polyfill(s) failed!", response); //log an error to the console
		} 
		polyfill.onload = function() { //create an onLoad value for the script element, so we know if loading the polyfill succeeds
			loadMyScript(scriptToPolyfill, functionToRunonLoad) //call the loadMyScript function to begin loading the script we want to use
		}
        document.body.appendChild(polyfill); //append the new script element to the end of the body
	} else { //if the url being passed is a blank value
	    loadMyScript(scriptToPolyfill, functionToRunonLoad) //jump straight to loading my script, as there's no polyfill to load!
	}
}

function loadMyScript(url, functionToRunonLoad) {
    if (Array.isArray(url)) { //if the url parameter is an array
        var promises = []; //create an array to store the promise responses
        url.forEach( //iterate through each item in the array
            function(url) { //pass the array item through
                promises.push(nonblankURL(url)) //set up the script that we want to use and store the promise response in the array we just created
            }
        );
        Promise.all(promises) //make sure all scripts load
            .then( //wait for the Promise.all to resolve
                function() {
                    initialiseMyScript(functionToRunonLoad) //now we initialise the script
                }
            )
            .catch( //if there is an error
                function(error) { //pass the error through
                    return error //display the error (in the console)
                }
            )
    } else if (!Array.isArray(url) && url !== null && url !== '') { //if the url parameter is not an array and is not blank or null
        nonblankURL(url) //set up the script that we want to use and store the promise response in the array we just created
            .then( //wait for the resolve response from nonblankURL
                function() {
                    initialiseMyScript(functionToRunonLoad) //now we initialise the script
                }
            )
            .catch( //if there is an error
                function(error) { //pass the error through
                    return error //display the error (in the console)
                }
            )
    } else { //if the url parameter is not an array and is blank
        initialiseMyScript(functionToRunonLoad) //we can initialise the script immediately because there's no dependency
    }
}

function nonblankURL(uri) {
    return new Promise ( //we need to return a promise response, as the init will be dependent on this having loaded
        function(resolve,reject) { //we're either going to resolve or reject
            var thescript = document.createElement('script'); //create a script element
            thescript.src = encodeURI(uri); //add the src value and encode the uri being passed as a URI (so it actually loads!)
            thescript.onerror = function(response) { //create an onError value for the script element, so we know if loading the script fails
                return reject('Loading the script failed!', response) //return a reject response to the promise to halt everything
            }
            thescript.onload = function() { //create an onLoad value for the script element, so we know if loading the polyfill succeeds
                return resolve(uri) //return a resolve response to the promise so we know we can continue
            }
            document.body.appendChild(thescript) //append the new script element to the end of the body
        }
    )
}

function initialiseMyScript(functionToRunonLoad) { //the final step
    if (Array.isArray(functionToRunonLoad)) { //check whether we're being passed an array of init functions
        functionToRunonLoad.forEach( //if yes, iterate through each
            function(functionToRunonLoad) { //pass the array item through 
                initScript(functionToRunonLoad) //call initScript to execute the item
            }
        )
    } else { //not an array
        initScript(functionToRunonLoad) //call initScript to execute parameter
    }
    function initScript(fn) { //de-dupes code as a helper
        try { //try to execute the function
            var run = new Function(fn); //convert the string value to an actual function
	        run() //execute the new function! And we're done!
        }
        catch (err) { //if trying fails, catch the error and report
            console.error('There was an error: ', err, err.name, err.stack) //log the error to the console
        }
    }
}
