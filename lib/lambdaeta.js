'use strict';

// MODULES //

var abs = require( 'math-abs' );
var exp = require( 'math-exp' );
var ln = require( 'math-ln' );
var evalpoly = require( 'math-evalpoly' );


// CONSTANTS //

// Polynomical coefficients:

var ak1 = [
	0,
	1.0,
	1.0,
	1.5,
	2.66666666666666666666666666667,
	5.20833333333333333333333333333,
	10.8
];

var ak2 = [
	1.0,
	1.0,
	0.333333333333333333333333333333,
	0.0277777777777777777777777777778,
	-0.00370370370370370370370370370370,
	0.000231481481481481481481481481481,
	0.0000587889476778365667254556143445
];


// FUNCTIONS //

var poly1 = evalpoly.factory( ak1 );
var poly2 = evalpoly.factory( ak2 );


// LAMBDAETA //

/**
* FUNCTION lambdaeta( eta )
*	lambdaeta is the positive number satisfying
*	eta^2/2=lambda-1-ln(lambda)
*	with sign(lambda-1)=sign(eta);
*
* @param {Number} eta - eta value
* @returns {Number} value satisfying equation
*/
function lambdaeta( eta ) {
	var ak = new Array(6);
	var q, r, s, L, la, L2, L3, L4, L5;

	s = eta * eta * 0.5;
	if ( eta === 0 ) {
		la = 0;
	} else if ( eta < -1 ) {
		r = exp( - 1 - s );
		la = poly1( r );
	} else if ( eta < 1 ) {
		r = eta;
		la = poly2( r );
	} else {
		r = 11 + s;
		L = ln(r);
		la = r + L;
		r = 1 / r;
		L2 = L * L;
		L3 = L2 * L;
		L4 = L3 * L;
		L5 = L4 * L;
		ak[ 0 ] = 1;
		ak[ 1 ] = ( 2 - L ) * 0.5;
		ak[ 2 ] =( -9 * L + 6 + 2 * L2 ) * 0.166666666666666666666666666667;
		ak[ 4 ] =(60+350*L2-300*L-125*L3+12*L4)*0.0166666666666666666666666666667;
		ak[ 3 ] = -(3*L3+36*L-22*L2-12)*0.0833333333333333333333333333333;
		ak[ 5 ] =-(-120-274*L4+900*L-1700*L2+1125*L3+20*L5)*
				0.00833333333333333333333333333333;
		la = la + L*r*( ak[ 0 ] + r * ( ak[ 1 ] + r * ( ak[ 2 ] + r * ( ak[ 3 ] + r * ( ak[ 4 ] + r * ak[ 5 ] ) ) ) ) );
	}
	r = 1;
	if ( ( (eta>-3.5) && (eta<-0.03) ) || ( (eta>0.03) && (eta<40) ) ) {
		r = 1;
		q = la;
		do {
			la = q * ( s + ln(q) ) / ( q - 1 );
			r = abs( q/la - 1 );
			q = la;
		} while ( r > 1e-8 );
	}
	return la;
} // end FUNCTION lambdaeta()


// EXPORTS //

module.exports = lambdaeta;
