'use strict';

var gammaincinv = require( './../lib' );
var incrspace = require( 'compute-incrspace' );
var linspace = require( 'compute-linspace' );

var p = incrspace( 0, 1, 0.05 );
var a = linspace( 0, 50, 100 );

for ( var i = 0; i < p.length; i++ ) {
	for ( var j = 0; j < a.length; j++ ) {
		console.log( 'p: %d, \t a: %d, \t P^(-1)(p, a): %d', p[ i ], a[ j ], gammaincinv( p[ i ], a[ j ] ) );
	}
}
