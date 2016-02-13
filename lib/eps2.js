'use strict';

// MODULES //

var evalrational = require( 'math-evalrational' );
var ln = require( 'math-ln' );


// CONSTANTS //

// Polynomical coefficients:

var ak1 = new Array( 5 );
var bk1 = new Array( 5 );
ak1[0]= -1.72847633523e-2;  bk1[0] =1.00000000000e+0;
ak1[1]= -1.59372646475e-2;  bk1[1] = 7.64050615669e-1;
ak1[2]= -4.64910887221e-3;  bk1[2]= 2.97143406325e-1;
ak1[3]= -6.06834887760e-4;  bk1[3]= 5.79490176079e-2;
ak1[4]= -6.14830384279e-6;  bk1[4]= 5.74558524851e-3;

var ak2 = new Array( 5 );
var bk2 = new Array( 5 );
ak2[0]=-1.72839517431e-2;  bk2[0]= 1.00000000000e+0;
ak2[1]=-1.46362417966e-2;  bk2[1]= 6.90560400696e-1;
ak2[2]=-3.57406772616e-3;  bk2[2]= 2.49962384741e-1;
ak2[3]=-3.91032032692e-4;  bk2[3]= 4.43843438769e-2;
ak2[4]=2.49634036069e-6;   bk2[4]= 4.24073217211e-3;

var ak3 = new Array( 5 );
var bk3 = new Array( 5 );
ak3[0]= 9.99944669480e-1;  bk3[0]= 1.00000000000e+0;
ak3[1]= 1.04649839762e+2;  bk3[1]= 1.04526456943e+2;
ak3[2]= 8.57204033806e+2;  bk3[2]= 8.23313447808e+2;
ak3[3]= 7.31901559577e+2;  bk3[3]= 3.11993802124e+3;
ak3[4]= 4.55174411671e+1;  bk3[4]= 3.97003311219e+3;


// FUNCTIONS //

var rational1 = evalrational.factory( ak1, bk1 );
var rational2 = evalrational.factory( ak2, bk2 );
var rational3 = evalrational.factory( ak3, bk3 );


// EPS2 //

/**
* FUNCTION eps2( eta )
*
* @private
* @param {Number} eta - eta value
* @returns {Number} function value
*/
function eps2( eta ) {
	var x;
	var lnmeta;
	if ( eta < -5.0 ) {
		x = eta * eta;
		lnmeta = ln( -eta );
		return ( 12 - x - 6 * ( lnmeta*lnmeta ) ) / ( 12 * x * eta );
	}
	else if ( eta < -2.0 ) {
		return rational1( eta );
	} else if ( eta < 2.0 ) {
		return rational2( eta );
	} else if ( eta < 1000.0 ) {
		x = 1 / eta;
		return rational3( eta ) / ( -12.0 * eta );
	} else {
		return -1.0 / ( 12.0 * eta );
	}
} // end FUNCTION eps2()


// EXPORTS //

module.exports = eps2;
