gammincinv
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Inverse of [incomplete gamma function][incomplete-gamma-function].

Computes the inverse of the lower [incomplete gamma function][incomplete-gamma-function]

<div class="equation" align="center" data-raw-text="P( x, a ) = \frac{\gamma(a,x)}{\Gamma(a)} = \frac{1}{\Gamma(a)} \int_0^x t^{a-1} e^{-t} \; dt" data-equation="eq:lower_incomplete_gamma">
	<img src="https://cdn.rawgit.com/math-io/gammaincinv/ac44a1c4f7f939036d3d13ee8b046e4013c007e8/docs/img/eqn1.svg" alt="Equation for the regularized lower incomplete gamma function.">
	<br>
</div>

Specifically, for given `p` and `a` it finds the `x` such that `p =  P(x, a)`.

The function can also be used to invert the upper incomplete gamma function, which is defined as follows:  

<div class="equation" align="center" data-raw-text="Q( x, a ) = \frac{\Gamma(a,x)}{\Gamma(a)} = \frac{1}{\Gamma(a)} \int_x^\infty t^{a-1} e^{-t} \; dt" data-equation="eq:upper_incomplete_gamma">
	<img src="https://cdn.rawgit.com/math-io/gammaincinv/ac44a1c4f7f939036d3d13ee8b046e4013c007e8/docs/img/eqn2.svg" alt="Equation for the regularized upper incomplete gamma function.">
	<br>
</div>

Again, for given `p` and `a` the function returns the `x` which satisfies `p = Q(x, a)`.

## Installation

``` bash
$ npm install math-gammaincinv
```


## Usage

``` javascript
var gammaincinv = require( 'math-gammaincinv' );
```


#### gammaincinv( x, s[, upper = false ] )

Inverts element-wise the regularized incomplete gamma function. Contrary to the more commonly used definition, in this implementation the first argument is the probability `p` and the second argument is the scale factor `a`. By default, the function inverts the *lower* regularized incomplete gamma function, `P(x,a)`. To invert the *upper* function instead, i.e. `Q(x,a)`, set the `upper` argument to `true`.

``` javascript
var val;

val = gammaincinv( 0.5, 2 );
// returns ~1.678

val = gammaincinv( 0.1, 10 );
// returns ~6.221

val = gammaincinv( 0.75, 3 );
// returns ~3.92

val = gammaincinv( 0.75, 3, true );
// returns ~1.727
```

## Implementation

The code used to calculate the inverse incomplete gamma function has been translated from the Fortran module `GammaCHI` by Amparo Gil, Javier Segura and
Nico M. Temme. It uses different methods of computation depending on the values of the input values: Taylor series, asymptotic
expansions and high-order Newton methods.

### References

1. A. Gil, J. Segura and N.M. Temme, GammaCHI: a package for the inversion and computation of the gamma and chi-square distribution functions (central and noncentral). Computer Physics Commun
2. A. Gil, J. Segura and N.M. Temme. Efficient and accurate algorithms for the computation and inversion of the incomplete gamma function ratios. SIAM J Sci Comput. (2012) 34(6), A2965-A2981

## Examples

``` javascript
var gammaincinv = require( 'math-gammaincinv' );
var incrspace = require( 'compute-incrspace' );
var linspace = require( 'compute-linspace' );

var p = incrspace( 0, 1, 0.05 );
var a = linspace( 0, 50, 100 );

for ( var i = 0; i < p.length; i++ ) {
	for ( var j = 0; j < a.length; j++ ) {
		console.log( 'p: %d, \t a: %d, \t P^(-1)(p, a): %d', p[ i ], a[ j ], gammaincinv( p[ i ], a[ j ] ) );
	}
}

```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [Compute.io][compute-io] Authors.


[npm-image]: http://img.shields.io/npm/v/math-gammaincinv.svg
[npm-url]: https://npmjs.org/package/math-gammaincinv

[build-image]: http://img.shields.io/travis/math-io/gammaincinv/master.svg
[build-url]: https://travis-ci.org/math-io/gammaincinv

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/gammaincinv/master.svg
[coverage-url]: https://codecov.io/github/math-io/gammaincinv?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/gammaincinv.svg
[dependencies-url]: https://david-dm.org/math-io/gammaincinv

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/gammaincinv.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/gammaincinv

[github-issues-image]: http://img.shields.io/github/issues/math-io/gammaincinv.svg
[github-issues-url]: https://github.com/math-io/gammaincinv/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[compute-io]: https://github.com/compute-io/
[incomplete-gamma-function]: https://en.wikipedia.org/wiki/Incomplete_gamma_function
