# Dynamically polyfill features for a script

A little script that allows you to only polyfill when absolutely necessary - no wasted requests on browsers that have native support! 😆🤓

This script is about 2.9KB **un**minified _(1.1KB **un**minified and gzipped)_ or 1.2KB minified _(580B minified and gzipped)_, so it's fairly lightweight. :smile:

## Getting Started

See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you know what features your script is reliant on and polyfill those not natively supported on the browsers you support (you can check https://caniuse.com/).

## Deployment

Deployment steps:

1. Copy the contents of [dynamicpolyfill.js](dynamicpolyfill.js).
2. Paste at the bottom of your existing .js file (if you have one).
3. Amend the top two variables to list the features that you may need to polyfill, and the script you want to use.

## Built With

* Vanilla Javascript - no framework dependencies!

## Versioning

For the versions available, see the [tags on this repository](https://github.com/willstocks-tech/dynamically-polyfill-features-for-a-script/tags). 

## Authors

* **Will Stocks** - *Initial work* - [willstocks-tech](https://github.com/willstocks-tech)

See also the list of [contributors](https://github.com/willstocks-tech/dynamically-polyfill-features-for-a-script/contributors) who have participated in this little nugget!

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on the code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [PurpleBooth](https://gist.github.com/PurpleBooth) for this awesome README template!

