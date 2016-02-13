'use strict';

// MODULES //

var abs = require( 'math-abs' );
var evalrational = require( 'math-evalrational' );
var ln = require( 'math-ln' );


// CONSTANTS //

// Polynomical coefficients:

var ak = new Array(5);
var bk = new Array(5);
ak[ 0 ] =-3.333333333438e-1;  bk[ 0 ] = 1.000000000000e+0;
ak[ 1 ] =-2.070740359969e-1;  bk[ 1 ] = 7.045554412463e-1;
ak[ 2 ] =-5.041806657154e-2;  bk[ 2 ] = 2.118190062224e-1;
ak[ 3 ] =-4.923635739372e-3;  bk[ 3 ] = 3.048648397436e-2;
ak[ 4 ] =-4.293658292782e-5;  bk[ 4 ] = 1.605037988091e-3;


// FUNCTIONS //

var lambdaeta = require( './lambdatea.js' );
var rational = evalrational.factory( ak, bk );


// EPS1 //

/**
* FUNCTION eps1( eta )
*
* @private
* @param {Number} eta - eta value
* @returns {Number} function value
*/
function eps1(eta) {
	var la;
	if ( abs( eta ) < 1.0 ) {
		return rational( eta );
	} else {
		la = lambdaeta( eta );
		return ln( eta / ( la - 1.0 ) ) / eta;
	}
} // end FUNCTION eps1()


// EXPORTS //

module.exports = eps1;
