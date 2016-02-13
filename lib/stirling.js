'use strict';

// MODULES //

var gammaln = require( 'math-gammaln' );
var ln = require( 'math-ln' );
var sqrt = require( 'math-sqrt' );


// FUNCTIONS //

var chepolsum = require( './chepolsum.js' );


// CONSTANTS //

var SMALLEST_FLOAT32 = require( 'const-smallest-float32' ).VALUE;
var MAX_FLOAT32 = require( 'compute-const-max-float32' );
var PI = require( 'const-pi' );
var SQRT_TWO_PI = sqrt( 2 * PI );
var LN_SQRT_TWO_PI = ln( SQRT_TWO_PI );

// Polyomial coefficients:

var a = new Array( 18 );
a[ 0 ] = 1.996379051590076518221;
a[ 1 ] = -0.17971032528832887213e-2;
a[ 2 ] = 0.131292857963846713e-4;
a[ 3 ] = -0.2340875228178749e-6;
a[ 4 ] = 0.72291210671127e-8;
a[ 5 ] = -0.3280997607821e-9;
a[ 6 ] = 0.198750709010e-10;
a[ 7 ] = -0.15092141830e-11;
a[ 8 ] = 0.1375340084e-12;
a[ 9 ] = -0.145728923e-13;
a[ 10 ] = 0.17532367e-14;
a[ 11 ] = -0.2351465e-15;
a[ 12 ] = 0.346551e-16;
a[ 13 ] = -0.55471e-17;
a[ 14 ] = 0.9548e-18;
a[ 15 ] = -0.1748e-18;
a[ 16 ] = 0.332e-19;
a[ 17 ] = -0.58e-20;

var c = new Array( 7 );
c[ 0 ] = 0.25721014990011306473e-1;
c[ 1 ] = 0.82475966166999631057e-1;
c[ 2 ] = -0.25328157302663562668e-2;
c[ 3 ] = 0.60992926669463371e-3;
c[ 4 ] = -0.33543297638406e-3;
c[ 5 ] = 0.250505279903e-3;
c[ 6 ] = 0.30865217988013567769;


// STIRLING //

/**
* FUNCTION striling( x )
*	Computes the stirling series corresponding with
*	asymptotic series for log(gamma(x))
*	that is:  1/(12x)-1/(360x**3)...; x>= 3}
*
* @private
* @param {Number} x - input value
* @returns {Number} function value
*/
function stirling( x ) {
	var z;
	if ( x < SMALLEST_FLOAT32 ) {
		return MAX_FLOAT32;
	} else if ( x < 1.0 ) {
		return gammaln( x + 1 ) - (x+0.5) * ln(x) + x - LN_SQRT_TWO_PI;
	} else if ( x < 2.0 ) {
		return gammaln( x ) - (x-0.5) * ln(x) + x - LN_SQRT_TWO_PI;
	} else if ( x < 3.0 ) {
		return gammaln( x - 1 ) - (x-0.5) * ln(x) + x - LN_SQRT_TWO_PI + ln(x-1);
	} else if ( x < 12.0 ) {
		z = 18.0 / ( x * x ) - 1.0;
		return chepolsum( 17, z, a) / ( 12.0 * x );
	} else {
		z = 1.0 / ( x * x );
		if ( x < 1000.0 ) {
			return ((((((c[ 5 ]*z+c[ 4 ])*z+c[ 3 ])*z+c[ 2 ])*z+c[ 1 ])*z+c[ 0 ])/(c[ 6 ]+z)/x);
		} else {
			return (((-z*0.000595238095238095238095238095238+
			0.000793650793650793650793650793651)*z-
			0.00277777777777777777777777777778)*z+
			0.0833333333333333333333333333333)/x;
		}
	}
} // end FUNCTION stirling()


// EXPORTS //

module.exports = stirling;
