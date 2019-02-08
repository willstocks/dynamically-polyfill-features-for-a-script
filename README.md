[![](https://data.jsdelivr.com/v1/package/gh/willstocks-tech/dynamically-polyfill-features-for-a-script/badge?style=rounded)](https://www.jsdelivr.com/package/gh/willstocks-tech/dynamically-polyfill-features-for-a-script) 
![](https://img.shields.io/github/release/willstocks-tech/dynamically-polyfill-features-for-a-script.svg?label=latest%20release) 
![](https://img.shields.io/github/release-pre/willstocks-tech/dynamically-polyfill-features-for-a-script.svg?label=latest%20beta) 
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/willstocks-tech/dynamically-polyfill-features-for-a-script/issues) 
![](https://img.shields.io/github/languages/top/willstocks-tech/dynamically-polyfill-features-for-a-script.svg?label=javascript&logo=languages&colorB=f1e05a) 
[![Maintainability](https://api.codeclimate.com/v1/badges/8d00c9006111c5360102/maintainability)](https://codeclimate.com/github/willstocks-tech/dynamically-polyfill-features-for-a-script/maintainability) 
![](https://img.shields.io/github/license/willstocks-tech/dynamically-polyfill-features-for-a-script.svg) 

# Dynamically polyfill features for a script

A little script that allows you to only polyfill a feature when absolutely necessary - no wasted requests on browsers that have native support! 😆🤓

This script is ~4.76KB **un**minified (with comments!) _(1.52KB **un**minified and gzipped)_ or ~1.15KB minified _(520B minified and gzipped)_, so it's _fairly_ light. :smile:

## Getting Started

See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you know what features your script is reliant on and polyfill those not natively supported on the browsers you support (you can check https://caniuse.com/).

## Deployment
	
### Loading from CDN:
1. Add a `<script></script>` tag linking to this script
	1. Example: `<script src='https://cdn.jsdelivr.net/gh/willstocks-tech/dynamically-polyfill-features-for-a-script@master/dynamicpolyfill.min.js'></script>`
2. Add an `onLoad` attribute to the tag calling the `dynamicPolyfill()` function and passing your parameters
	1. Note: the first parameter is the feature polyfills you want to pass. This is expected as an array.
	1. Note: the second paramter is the URL of the script you want to use. This is expected as a either a `string` or an `array`, but can be blank (`''`) or `null` if you're not loading a third party script.
	1. Note: the third parameter is the function that you would run once the script has loaded. This is expected as a `string` or an `array` .
	1. Note: the 4th parameter has now been deprecated.

#### CDN example script tag
##### String variables:
```
<script
	src='https://cdn.jsdelivr.net/gh/willstocks-tech/dynamically-polyfill-features-for-a-script@master/dynamicpolyfill.min.js' 
	onload='dynamicPolyfill( ["IntersectionObserver", "Object.assign"], 'https://cdn.jsdelivr.net/npm/quicklink@1.0.0/dist/quicklink.umd.js', 'quicklink();')'>
</script>
```

##### Array variables:
```
<script
	src='https://cdn.jsdelivr.net/gh/willstocks-tech/dynamically-polyfill-features-for-a-script@master/dynamicpolyfill.min.js' 
	onload='dynamicPolyfill( ["IntersectionObserver", "Object.assign"], ['https://cdn.jsdelivr.net/npm/quicklink@1.0.0/dist/quicklink.umd.js', 'https://other.cdn.net/script.js'], ['quicklink();', 'otherFunction();'] )'>
</script>
```

Note: You need to ensure that before you call the `dynamicPolyfill()` function that the actual script itself has loaded. If you're going to host the script yourself (rather than calling out to a CDN), make sure you include the script code first, then call the function. You can do this in the same manner as above, but replace the CDN URL with the path to your own JS file! An example of this would be: `dynamicPolyfill(["IntersectionObserver", "Object.assign"], 'https://cdn.jsdelivr.net/npm/quicklink@1.0.0/dist/quicklink.umd.js', 'quicklink();');`.

## Built With

* Vanilla Javascript - no framework dependencies!
* [Polyfill.io](https://github.com/Financial-Times/polyfill-library) - for the actual polyfills!

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
* [Polyfill.io](https://github.com/Financial-Times/polyfill-library) for the awesome polyfill service!
