'use strict';

// MODULES //

var evalrational = require( 'math-evalrational' );
var ln = require( 'math-ln' );


// CONSTANTS //

// Polynomical coefficients:

var ak1 = new Array( 5 );
var bk1 = new Array( 5 );
ak1[ 0 ] = 4.95346498136e-2;  bk1[ 0 ]= 1.00000000000e+0;
ak1[ 1 ] = 2.99521337141e-2;  bk1[ 1 ]= 7.59803615283e-1;
ak1[ 2 ] = 6.88296911516e-3;  bk1[ 2 ]= 2.61547111595e-1;
ak1[ 3 ] = 5.12634846317e-4;  bk1[ 3 ]= 4.64854522477e-2;
ak1[ 4 ] = -2.01411722031e-5; bk1[ 4 ]= 4.03751193496e-3;

var ak2 = new Array( 5 );
var bk2 = new Array( 5 );
ak2[ 0 ] = 4.52313583942e-3;  bk2[ 0 ]= 1.00000000000e+0;
ak2[ 1 ] = 1.20744920113e-3;  bk2[ 1 ]= 9.12203410349e-1;
ak2[ 2 ] = -7.89724156582e-5; bk2[ 2 ]= 4.05368773071e-1;
ak2[ 3 ] = -5.04476066942e-5; bk2[ 3 ]= 9.01638932349e-2;
ak2[ 4 ] = -5.35770949796e-6; bk2[ 4 ]= 9.48935714996e-3;

var ak3 = new Array( 5 );
var bk3 = new Array( 5 );
ak3[ 0 ] = 4.39937562904e-3;  bk3[ 0 ]= 1.00000000000e+0;
ak3[ 1 ] = 4.87225670639e-4;  bk3[ 1 ]= 7.94435257415e-1;
ak3[ 2 ] = -1.28470657374e-4; bk3[ 2 ]= 3.33094721709e-1;
ak3[ 3 ] = 5.29110969589e-6;  bk3[ 3 ]= 7.03527806143e-2;
ak3[ 4 ] = 1.57166771750e-7;  bk3[ 4 ]= 8.06110846078e-3;

var ak4 = new Array( 5 );
var bk4 = new Array( 5 );
ak4[ 0 ] = -1.14811912320e-3;  bk4[ 0 ]= 1.00000000000e+0;
ak4[ 1 ] = -1.12850923276e-1;  bk4[ 1 ]= 1.42482206905e+1;
ak4[ 2 ] = 1.51623048511e+0;   bk4[ 2 ]= 6.97360396285e+1;
ak4[ 3 ] = -2.18472031183e-1;  bk4[ 3 ]= 2.18938950816e+2;
ak4[ 4 ] = 7.30002451555e-2;   bk4[ 4 ]= 2.77067027185e+2;

var ak5 = new Array( 5 );
var bk5 = new Array( 5 );
ak5[ 0 ]= -1.45727889667e-4;  bk5[ 0 ]= 1.00000000000e+0;
ak5[ 1 ]= -2.90806748131e-1;  bk5[ 1 ]= 1.39612587808e+2;
ak5[ 2 ]= -1.33085045450e+1;  bk5[ 2 ]= 2.18901116348e+3;
ak5[ 3 ]= 1.99722374056e+2;   bk5[ 3 ]= 7.11524019009e+3;
ak5[ 4 ]= -1.14311378756e+1;  bk5[ 4 ]= 4.55746081453e+4;


// FUNCTIONS //

var rational1 = evalrational.factory( ak1, bk1 );
var rational2 = evalrational.factory( ak2, bk2 );
var rational3 = evalrational.factory( ak3, bk3 );
var rational4 = evalrational.factory( ak4, bk4 );
var rational5 = evalrational.factory( ak5, bk5 );


// EPS3 //

/**
* FUNCTION eps3( eta )
*
* @private
* @param {Number} eta - eta value
* @returns {Number} function value
*/
function eps3( eta ) {
	var eta3;
	var x;
	var y;

	if (eta <-8.0) {
		x = eta * eta;
		y = ln( -eta ) / eta;
		return ( -30.0 + eta * y * ( 6.0 * x * y * y - 12.0 + x ) ) / ( 12.0 * eta * x * x );
	} else if ( eta < -4.0 ) {
		return rational1( eta ) / ( eta * eta );
	} else if ( eta < -2.0 ) {
		return rational2( eta );
	} else if  ( eta < 2.0 ) {
		return rational3( eta );
	} else if (eta < 10.0) {
		x= 1.0 / eta;
		return rational4( x ) / ( eta * eta );
	} else if (eta < 100.0) {
		x= 1.0 / eta;
		return rational5( x ) / ( eta * eta );
	} else {
		eta3 = eta * eta * eta;
		return - ln( eta ) / ( 12 * eta3 );
	}
} // end FUNCTION eps3()


// EXPORTS //

module.exports = eps3;
