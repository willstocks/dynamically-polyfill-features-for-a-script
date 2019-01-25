# Dynamically polyfill features for a script

A little script that allows you to only polyfill when absolutely necessary - no wasted requests on browsers that have native support! 😆🤓

This script is about 2.9KB **un**minified _(1.1KB **un**minified and gzipped)_ or 1.2KB minified _(580B minified and gzipped)_, so it's fairly lightweight. :smile:

## Getting Started

See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you know what features your script is reliant on and polyfill those not natively supported on the browsers you support (you can check https://caniuse.com/).

## Deployment

Deployment steps:

1. Copy the contents of [dynamicpolyfill.js](dynamicpolyfill.js) (or [dynamicpolyfill.min.js](dynamicpolyfill.min.js)).
2. Paste at the bottom of your existing .js file (if you have one).
3. Amend the first three "variables" to list the features that you may need to polyfill, the URL to the script you want to use and the function to kick off usage of that script.
	1. `var mayneedpolyfill` (`var n` in .min.js) - this is an array of features that may need polyfilling. Some examples are: `IntersectionObserver` or `Object.assign` which I use for implementing [quicklink](https://github.com/GoogleChromeLabs/quicklink) on my site.
	2. `var scriptiwanttouse` (`var e` in .min.js) - this is the actual script that you want to use. Sometimes third party, sometimes self-hosted, doesn't matter either way!
	3. `function initialiseMyScript()` (`function t()` in .min.js) - this is where the script (ii) actually gets run. Using my own implementation of this as an example, I have `function initialiseMyScript() {quicklink();}`. The only bit that needs changing is the function within the `{ }`!

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

