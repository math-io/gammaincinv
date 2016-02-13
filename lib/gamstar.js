'use strict';

// MODULES //

var exp = require( 'math-exp' );
var gamma = require( 'math-gamma' );
var ln = require( 'math-ln' );
var sqrt = require( 'math-sqrt' );


// FUNCTIONS //

var stirling = require( './stirling.js' );


// CONSTANTS //

var MAX_FLOAT32 = require( 'compute-const-max-float32' );
var PI = require( 'const-pi' );
var SQRT_TWO_PI = sqrt( 2 * PI );


// GAMSTAR //

/**
* FUNCTION gamstar( x )
*	Computes the regulated gamma function.
*
* @private
* @param {Number} x - input value
* @returns {Number} function value
*/
function gamstar(x) {
	if ( x >= 3.0 ) {
		return exp( stirling(x) );
	}
	else if (x > 0 ) {
		return gamma(x) / ( exp( -x + ( x - 0.5 ) * ln(x) ) * SQRT_TWO_PI );
	} else {
		return MAX_FLOAT32;
	}
} // end FUNCTION gamstar()


// EXPORTS //

module.exports = gamstar;
