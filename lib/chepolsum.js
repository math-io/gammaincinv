'use strict';

// CHEPOLSUM //

/**
* FUNCTION chepolsum( n, t, ak )
*	Computes the sum of a Chebyshev polynomial.
*
* @param {Number} n - degree of polynomial
* @param {Number} t - input value
* @param {Array} ak - coefficients of the Chebyshev polynomial
* @returns {Number} Chebyshev sum
*/
function chepolsum( n, t, ak) {
	var u0 = 0;
	var u1 = 0;
	var u2;
	var k = n;
	var tt = t + t;
	do {
		u2 = u1;
		u1 = u0;
		u0 = tt*u1 - u2 + ak[ k ];
		k = k - 1;
	} while ( k >= 0 );
	return ( u0 - u2 ) / 2;
} // end FUNCTION chepolsum()


// EXPORTS //

module.exports = chepolsum;
