'use strict';

// MODULES //

var tape = require( 'tape' );
var isfinite = require( 'validate.io-finite' );
var isnan = require( 'validate.io-nan' );
var abs = require( 'math-abs' );
var gammaincinv = require( './../lib' );


// FIXTURES //

var arg1 = require( './fixtures/arg1.json' );
var arg2 = require( './fixtures/arg2.json' );
var expected = require( './fixtures/expected.json' );
var i;
var v;
for ( i = 0; i < expected.length; i++ ) {
	v = expected[ i ];
	if ( v === 'Inf' ) {
		expected[ i ] = Number.POSITIVE_INFINITY;
	}
	else if ( v === 'NaN' ) {
		expected[ i ] = NaN;
	}
}


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof beta === 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `NaN` if provided a `NaN`', function test( t ) {
	var val = gammaincinv( NaN, 2 );
	t.notOk( val === val, 'returns NaN' );
	val = gammaincinv( 0.5, NaN );
	t.notOk( val === val, 'returns NaN' );
	t.end();
});


tape( 'the function inverts the incomplete gamma function', function test( t ) {
	var actual;
	var b1;
	var b2;
	var i;
	for ( i = 0; i < arg1.length; i++ ) {
		actual = gammaincinv( arg1[ i ], arg2[ i ] );

		b1 = isfinite( actual );
		b2 = isfinite( expected[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b2) ? 'finite' : 'not finite' ) );

		b1 = isnan( actual );
		b2 = isnan( expected[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b1) ? '' : 'not' ) + ' NaN' );
		if ( !b1 ) {
			t.ok( abs( actual - expected[ i ] ) < 1e-14, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected[ i ] + '.' );
		}
	}
	t.end();
});
