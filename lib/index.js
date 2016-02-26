'use strict';

// MODULES //

var abs = require( 'math-abs' );
var exp = require( 'math-exp' );
var erfcinv = require( 'math-erfcinv' );
var gamma = require( 'math-gamma' );
var gammaln = require( 'math-gammaln' );
var gammainc = require( 'math-gammainc' );
var ln = require( 'math-ln' );
var pow = require( 'math-power' );
var sqrt = require( 'math-sqrt' );


// FUNCTIONS //

var eps1 = require( './eps1.js' );
var eps2 = require( './eps2.js' );
var eps3 = require( './eps3.js' );
var gamstar = require( './gamstar.js' );
var lambdaeta = require( './lambdaeta.js' );


// CONSTANTS //

var SMALLEST_FLOAT32 = require( 'const-smallest-float32' ).VALUE;
var MAX_FLOAT32 = require( 'const-max-float32' );
var PINF = require( 'const-pinf-float64' );
var PI = require( 'const-pi' );
var SQRT_TWO_PI = sqrt( 2 * PI );


// INVERSE INCOMPLETE GAMMA FUNCTION //

/*
Translated from the Fortran module by
! ----------------------------------------------------------------------
! Authors:
!  Amparo Gil    (U. Cantabria, Santander, Spain)
!                 e-mail: amparo.gil@unican.es
!  Javier Segura (U. Cantabria, Santander, Spain)
!                 e-mail: javier.segura@unican.es
!  Nico M. Temme (CWI, Amsterdam, The Netherlands)
!                 e-mail: nico.temme@cwi.nl
! ---------------------------------------------------------------------
!  References:
!  1. A. Gil, J. Segura and N.M. Temme, GammaCHI: a package
!     for the inversion and computation of the gamma and
!     chi-square distribution functions (central and noncentral).
!     Computer Physics Commun
!  2. A. Gil, J. Segura and N.M. Temme. Efficient and accurate
!     algorithms for the computation and inversion
!     of the incomplete gamma function ratios. SIAM J Sci Comput.
!     (2012) 34(6), A2965-A2981
! ----------------------------------------------------------------------
! The claimed accuracy obtained using this inversion routine is near
! 1.e-12.
! ----------------------------------------------------------------------
!           METHODS OF COMPUTATION
! ----------------------------------------------------------------------
! The present code uses different methods of computation
! depending on the values of the input values: Taylor, asymptotic
! expansions and high-order Newton methods.
*/

/**
* FUNCTION gammaincinv( a, p )
*	Inverts the lower gamma function, i.e. computes xr such that P(a,xr)=p.
*
* @param {Number} p - probability value
* @param {Number} a - scale parameter
* @param {Boolean} [upper=false] - boolean indicating if the function should invert the upper tail of the incomplete gamma function instead, i.e. compute xr such that Q(a,xr)=p.
* @returns {Number} function value of the inverse
*/
function gammaincinv( p, a, upper ) {
	if ( a !== a || p !== p ) {
		return NaN;
	}
	if ( a < SMALLEST_FLOAT32 ) {
		return NaN;
	}
	if ( ( p > 1 ) || ( p < 0 ) ) {
		return NaN;
	}
	if ( upper === true ) {
		// Case: Invert upper gamma function...
		if ( p === 0 ) {
			return PINF;
		} else if ( p === 1 ) {
			return 0;
		}
		return compute( a, 1 - p, p );
	}
	// Default: Invert lower gamma function
	if ( p === 0 ) {
		return 0;
	} else if ( p === 1 ) {
		return PINF;
	}
	return compute( a, p, 1 - p );
} // end FUNCTION gammaincinv()


/**
* FUNCTION: compute( a, p, q )
*	This routine computes xr in the equations P(a,xr)=p
*	and Q(a,xr)=q with a as a given positive parameter;
*	p and q satisfy p+q=1. The equation is inverted with min(p,q).
*
* @private
* @param {Number} a - scale value of incomplete gamma function
* @param {Number} p - probability value
* @param {Number} q - probability value
* @returns {Number} solution of the equations P(a,xr)=p and Q(a,xr)=q
* with a as a given positive parameter.
*/
function compute( a, p, q ) {
	var porq, s, p2, p3, p4, p5,p6, dlnr, logr, r,
		a2, a3, a4, ap1, ap12, ap13, ap14, ap2, ap22, ap3,
		ainv, ap1inv, x0, b, eta, L, L2, L3, L4, b2, b3, x,
		x2, t, px, qx, y, vmin, vgam, lgama, fp, invfp, xini,
		k, n, m, i, pcase, xr, warning;
	var ck = new Array( 5 );
	if ( p < 0.5) {
		pcase = true;
		porq = p;
		s = -1;
	} else {
		pcase = false;
		porq = q;
		s = 1;
	}
	k = 0;
	if ( abs( a - 1 ) < 1e-4 ) {
		m = 0;
		if ( pcase ) {
			if ( p < 1e-3 ) {
				p2 = p * p;
				p3 = p2 * p;
				p4 = p3 * p;
				p5 = p4 * p;
				p6 = p5 * p;
				x0 = p + p2 * 0.5 + p3 * (1/3) + p4 * 0.25 + p5 * 0.2 + p6 * (1/6);
			} else {
				x0 = - ln( 1 - p );
			}
		} else {
			x0 = - ln( q );
		}
		if ( a === 1 ) {
			k = 2;
			xr = x0;
		} else {
			lgama = gammaln( a );
			k = 1;
		}
	}
	if ( q < 1e-30 && a < 0.5 ) {
		m = 0;
		x0 = - ln( q * gamma(a) ) + ( a - 1 ) * ln( -ln( q * gamma(a) ) );
		k = 1;
		lgama = gammaln( a );
	}
	if ( a > 1 && a < 500 && p < 1e-80 ) {
		m = 0;
		ainv = 1 / a;
		ap1inv = 1 / ( a + 1 );
		x0 = ( gammaln( a + 1 )+ ln( p ) ) * ainv;
		x0 = exp( x0 );
		xini = x0;
		for ( i = 0; i < 10; i++ ) {
			x0 = xini * exp( x0 * ainv ) * pow( 1.0 - x0 * ap1inv, ainv );
		}
		k = 1;
		lgama = gammaln( a );
	}

	logr = (1/a) * ( ln(p) + gammaln( a + 1 ) );

	if ( ( logr < ln( 0.2 * ( 1 + a ) ) ) && ( k === 0 ) ) {
		r = exp( logr );
		m = 0;
		a2 = a * a;
		a3 = a2 * a;
		a4 = a3 * a;
		ap1 = a + 1;
		ap12 = ap1 * ap1;
		ap13 = ap1 * ap12;
		ap14 = ap12 * ap12;
		ap2 = a + 2;
		ap22 = ap2 * ap2;
		ap3 = a + 3;
		ck[ 0 ] = 1;
		ck[ 1 ] = 1 / ap1;
		ck[ 2 ] = 0.5 * ( 3 * a + 5 ) / ( ap12 * ap2 );
		ck[ 3 ] = (1/3) * ( 31 + 8 * a2 + 33 * a ) / ( ap13 * ap2 * ap3 );
		ck[ 4 ] = 0.0416666666666666666666666666667 *( 2888 + 1179 * a3 + 125 * a4 + 3971 * a2 + 5661 * a ) / ( ap14 * ap22 * ap3 * ( a + 4 ) );
		x0 = r * ( 1 + r * ( ck[ 1 ] + r * ( ck[ 2 ] + r * ( ck[ 3 ] + r * ck[ 4 ] ) ) ) );
		lgama = gammaln( a );
		k = 1;
	}

	if ( ( a < 10 ) && ( k === 0 ) ) {
		vgam = sqrt( a ) / ( gamstar(a) * SQRT_TWO_PI );
		vmin = Math.min( 0.02, vgam );
		if ( q < vmin ) {
			m = 0;
			b = 1 - a;
			b2 = b * b;
			b3 = b2 * b;
			eta = sqrt( -2/a * ln( q / vgam ) );
			x0 = a * lambdaeta(eta);
			L = ln( x0 );
			if ( x0 > 5 ) {
				L2 = L * L;
				L3 = L2 * L;
				L4 = L3 * L;
				r = 1 / x0;
				ck[ 0 ] = L - 1;
				ck[ 1 ] = ( 3 * b - 2 * b * L + L2 - 2 * L + 2 ) * 0.5;
				ck[ 2 ] =(24*b*L-11*b2-24*b-6*L2+12*L-12-9*b*L2+6*b2*L+2*L3)*
					0.166666666666666666666666666667;
				ck[ 3 ] =(-12*b3*L+84*b*L2-114*b2*L+72+36*L2+3*L4-
					72*L+162*b-168*b*L-12*L3+25*b3-
					22*b*L3+36*b2*L2+120*b2)*0.0833333333333333333333333333333;
				x0 = x0 - L + b * r * ( ck[ 0 ] + r * ( ck[ 1 ] + r * ( ck[ 2 ] + r * ck[ 3 ] ) ) );
			} else {
				r = 1 / x0;
				L2 = L * L;
				ck[ 0 ] = L - 1;
				if ( ( L - b * r * ck[ 0 ] ) < x0 ) {
					x0 = x0 - L + b * r * ck[ 0 ];
				}
			}
			lgama = gammaln( a );
			k = 1;
		}
	}
	if ( ( abs( porq - 0.5 ) < 1e-5 ) && ( k === 0 ) ) {
		m = 0;
		ainv = 1 / a;
		x0 = a - (1/3) + (0.0197530864197530864197530864198 + 0.00721144424848128551832255535959 * ainv) * ainv;
		lgama = gammaln( a );
		k = 1;
	}
	if ( ( a < 1 ) && ( k === 0 ) ) {
		m = 0;
		if (pcase) {
			x0 = exp( (1/a) * ( ln(porq) + gammaln(a+1) ) );
		} else {
			x0 = exp( (1/a) * ( ln(1-porq) + gammaln(a+1) ) );
		}
		lgama = gammaln( a );
		k = 1;
	}
	if ( k === 0 ) {
		m = 1;
		ainv = 1 / a;
		r = erfcinv( 2 * porq );
		eta = s * r / sqrt( a * 0.5 );
		if ( r < MAX_FLOAT32 ) {
			eta = eta + ( eps1(eta)+(eps2(eta)+eps3(eta)*ainv ) * ainv ) * ainv;
			x0 = a * lambdaeta(eta);
			y = eta;
			fp = - sqrt( a / (2*Math.PI) ) * exp( -0.5*a*y*y ) / ( gamstar(a) );
			invfp = 1 / fp;
		} else {
			warning = 'Warning: Overflow problems in one or more steps of the computation.';
			console.log( warning );
			return NaN;
		}
	}
	x = x0;
	if ( k < 2 ) {
		t = 1;
		n = 1;
		a2 = a * a;
		a3 = a2 * a;
		xini = x0;
		// Implementation of the high order Newton-like method
		do {
			x = x0;
			x2 = x * x;
			if ( m === 0 ) {
				dlnr = ( 1 - a ) * ln( x ) + x + lgama;
				if ( dlnr > ln( MAX_FLOAT32 ) ) {
					warning = 'Warning: overflow problems in one or more steps of the computation.';
					warning += 'The initial approximation to the root is returned.';
					console.log( warning );
					return xini;
				} else {
					r = exp( dlnr );
				}
			} else {
				r = - invfp * x;
			}
			if ( pcase ) {
				// gammainc( x, s[, regularized = true ][, upper = false ] )
				px = gammainc( x, a, true, false );
				ck[ 0 ] = - r * ( px - p );
			} else {
				// gammainc( x, s[, regularized = true ][, upper = true ] )
				qx = gammainc( x, a, true, true );
				ck[ 0 ] = r * ( qx - q );
			}
			r = ck[ 0 ];
			if ( ( p > 1e-120 ) || ( n > 1 ) ) {
				ck[ 1 ] = 0.5 * ( x - a + 1 ) / x;
				ck[ 2 ] = 0.166666666666666666666666666667 *
					(2*x2-4*x*a+4*x+2*a2-3*a+1) / x2;
				x0 = x + r * ( 1 + r * ( ck[ 1 ] + r * ck[ 2 ] ) );
			} else {
				x0 = x + r;
			}
			t = abs( x/x0 - 1 );
			n = n + 1;
			x = x0;
			if ( x < 0 ) {
				x = xini;
				n = 100;
			}
		} while ( ( ( t > 2e-14 ) && ( n < 35 ) ) );
		if ( ( t > 2e-14 ) || ( n > 99 ) ) {
			warning = 'Warning: the number of iterations in the Newton method reached the upper limit N=35.\n';
			warning += 'The last value obtained for the root is given as output.';
			console.log( warning );
		}
		xr = x || 0;
	}
	return xr;
} // end FUNCTION compute()


// EXPORTS //

module.exports = gammaincinv;
