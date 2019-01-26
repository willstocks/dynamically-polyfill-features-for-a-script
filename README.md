# Dynamically polyfill features for a script

A little script that allows you to only polyfill when absolutely necessary - no wasted requests on browsers that have native support! 😆🤓

This script is about 2.9KB **un**minified _(1.1KB **un**minified and gzipped)_ or 1.2KB minified _(580B minified and gzipped)_, so it's fairly lightweight. :smile:

## Getting Started

See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you know what features your script is reliant on and polyfill those not natively supported on the browsers you support (you can check https://caniuse.com/).

## Deployment

### Self-hosted:

1. Copy the contents of [dynamicpolyfill.js](dynamicpolyfill.js) (or [dynamicpolyfill.min.js](dynamicpolyfill.min.js)).
2. Paste at the bottom of your existing .js file (if you have one).
3. Change `var staticScript = false;` (`var n=false;` minified) to `var staticScript = true;`.
4. Add `dynamicPolyfill();` to line 4 (or straight after `var n=true;` when using minified).
5. Lines 7, 8 and 9 then need amending to list the features that you may need to polyfill, the URL to the script you want to use and the function to kick off usage of that script.
	1. Line 7: `var polyfillFeatures` (`var i` in .min.js) - this is an array (`[]`) of features that may need polyfilling. Some examples are: `IntersectionObserver` or `Object.assign` which I use for implementing [quicklink](https://github.com/GoogleChromeLabs/quicklink) on my site.
	2. `var scriptToPolyfill` (`var r` in .min.js) - this is the actual script that you want to use. Sometimes third party, sometimes self-hosted, doesn't matter either way!
	3. `function initialiseMyScript()` (`function u()` in .min.js) - this is where the script (ii) actually gets run. Using my own implementation of this as an example, I have `function initialiseMyScript() {quicklink();}`. The only bit that needs changing is the function name within the `{ }`!
	
### Loading from CDN:
1. Add a <script></script> tag linking to this script
	1. Example: `<script src='https://cdn.jsdelivr.net/npm/quicklink@1.0.0/dist/quicklink.umd.js'></script>`
2. Add an `onLoad` attribute to the tag calling the `dynamicPolyfill()` function and passing your parameters
	1. Note: the first parameter is the feature polyfills you want to pass. This is expected as an array.
	1. Note: the second paramter is the URL of the script you want to use. This is expected as a string.
	1. Note: the third parameter is the function that you would run once the script has loaded. This is expected as a string.
	1. Note: there is a 4th parameter, however for CDN usage this is unused.

#### Full CDN example: 
```
<script
	type='text/javascript' 
	src='https://cdn.jsdelivr.net/npm/quicklink@1.0.0/dist/quicklink.umd.js' 
	onload='dynamicPolyfill(["IntersectionObserver"], 'https://cdn.jsdelivr.net/npm/quicklink@1.0.0/dist/quicklink.umd.js', 'quicklink();')'>
</script>
```

## Built With

* Vanilla Javascript - no framework dependencies!

## Versioning

For the versions available, check out the [repo release history](https://github.com/willstocks-tech/dynamically-polyfill-features-for-a-script/releases). I'd recommend sticking to the "latest release" though!

## Authors

* **Will Stocks** - *Initial work* - [willstocks-tech](https://github.com/willstocks-tech)

See also the list of [contributors](https://github.com/willstocks-tech/dynamically-polyfill-features-for-a-script/contributors) who have participated in this little nugget!

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on the code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [PurpleBooth](https://gist.github.com/PurpleBooth) for this awesome README template!

