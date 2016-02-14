'use strict';

// MODULES //

var tape = require( 'tape' );
var incrspace = require( 'compute-incrspace' );
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

var small_arg1 = require( './fixtures/small_arg1.json' );
var small_arg2 = require( './fixtures/small_arg2.json' );
var small_expected = require( './fixtures/small_expected.json' );
var i;
var v;
for ( i = 0; i < small_expected.length; i++ ) {
	v = small_expected[ i ];
	if ( v === 'Inf' ) {
		small_expected[ i ] = Number.POSITIVE_INFINITY;
	}
	else if ( v === 'NaN' ) {
		small_expected[ i ] = NaN;
	}
}

var large_arg1 = require( './fixtures/large_arg1.json' );
var large_arg2 = require( './fixtures/large_arg2.json' );
var large_expected = require( './fixtures/large_expected.json' );
var i;
var v;
for ( i = 0; i < large_expected.length; i++ ) {
	v = large_expected[ i ];
	if ( v === 'Inf' ) {
		large_expected[ i ] = Number.POSITIVE_INFINITY;
	}
	else if ( v === 'NaN' ) {
		large_expected[ i ] = NaN;
	}
}

var upper_arg1 = require( './fixtures/upper_arg1.json' );
var upper_arg2 = require( './fixtures/upper_arg2.json' );
var upper_expected = require( './fixtures/upper_expected.json' );
var i;
var v;
for ( i = 0; i < upper_expected.length; i++ ) {
	v = upper_expected[ i ];
	if ( v === 'Inf' ) {
		upper_expected[ i ] = Number.POSITIVE_INFINITY;
	}
	else if ( v === 'NaN' ) {
		upper_expected[ i ] = NaN;
	}
}

// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof gammaincinv === 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `NaN` if provided a `NaN`', function test( t ) {
	var val = gammaincinv( NaN, 2 );
	t.notOk( val === val, 'returns NaN' );
	val = gammaincinv( 0.5, NaN );
	t.notOk( val === val, 'returns NaN' );
	t.end();
});

tape( 'the function returns `NaN` if provided `p` outside the interval `[0,1]`', function test( t ) {
	var val = gammaincinv( 1.2, 2 );
	t.notOk( val === val, 'returns NaN' );
	val = gammaincinv( -0.1, 2 );
	t.notOk( val === val, 'returns NaN' );
	t.end();
});


tape( 'the function returns `0` if provided `p = 1`', function test( t ) {
	var i;
	var a = incrspace( 0, 100, 10 );
	for ( i = 0; i < a.length; i++ ) {
		var val = gammaincinv( 1, a[ i ] );
		t.notOk( val === 0, 'returns 0' );
	}
	t.end();
});

tape( 'the function returns `+Infinity` if provided `p = 0`', function test( t ) {
	var i;
	var a = incrspace( 0, 100, 10 );
	for ( i = 0; i < a.length; i++ ) {
		var val = gammaincinv( 0, a[ i ] );
		t.notOk( val === Number.POSITIVE_INFINITY, 'returns +Infinity' );
	}
	t.end();
});

tape( 'the function returns `0` if provided `p = 0` when `upper = true`', function test( t ) {
	var i;
	var a = incrspace( 0, 100, 10 );
	for ( i = 0; i < a.length; i++ ) {
		var val = gammaincinv( 0, a[ i ], true );
		t.notOk( val === 0, 'returns 0' );
	}
	t.end();
});

tape( 'the function returns `+Infinity` if provided `p = 1` when `upper = true`', function test( t ) {
	var i;
	var a = incrspace( 0, 100, 10 );
	for ( i = 0; i < a.length; i++ ) {
		var val = gammaincinv( 1, a[ i ], true );
		t.notOk( val === Number.POSITIVE_INFINITY, 'returns +Infinity' );
	}
	t.end();
});

tape( 'the function inverts the lower incomplete gamma function', function test( t ) {
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
		if ( !b1 || !b2 ) {
			t.ok( abs( actual - expected[ i ] ) < 1e-12, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected[ i ] + '.' );
		}
	}
	t.end();
});

tape( 'the function inverts the upper incomplete gamma function when `upper=true`', function test( t ) {
	var actual;
	var b1;
	var b2;
	var i;
	for ( i = 0; i < arg1.length; i++ ) {
		actual = gammaincinv( upper_arg1[ i ], upper_arg2[ i ], true );

		b1 = isfinite( actual );
		b2 = isfinite( upper_expected[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b2) ? 'finite' : 'not finite' ) );

		b1 = isnan( actual );
		b2 = isnan( expected[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b1) ? '' : 'not' ) + ' NaN' );
		if ( !b1 || !b2 ) {
			t.ok( abs( actual - upper_expected[ i ] ) < 1e-12, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + upper_expected[ i ] + '.' );
		}
	}
	t.end();
});

tape( 'the function inverts the lower incomplete gamma function for `p` smaller than `1e-4`', function test( t ) {
	var actual;
	var b1;
	var b2;
	var i;
	for ( i = 0; i < small_arg1.length; i++ ) {
		actual = gammaincinv( small_arg1[ i ], small_arg2[ i ] );

		b1 = isfinite( actual );
		b2 = isfinite( small_expected[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b2) ? 'finite' : 'not finite' ) );

		b1 = isnan( actual );
		b2 = isnan( small_expected[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b1) ? '' : 'not' ) + ' NaN' );
		if ( !b1 || !b2 ) {
			t.ok( abs( actual - small_expected[ i ] ) < 1e-11, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + small_expected[ i ] + '.' );
		}
	}
	t.end();
});

tape( 'the function inverts the lower incomplete gamma function for `p` larger than `0.9`', function test( t ) {
	var actual;
	var b1;
	var b2;
	var i;
	for ( i = 0; i < large_arg1.length; i++ ) {
		actual = gammaincinv( large_arg1[ i ], large_arg2[ i ] );

		b1 = isfinite( actual );
		b2 = isfinite( large_expected[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b2) ? 'finite' : 'not finite' ) );

		b1 = isnan( actual );
		b2 = isnan( large_expected[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b1) ? '' : 'not' ) + ' NaN' );
		if ( !b1 || !b2 ) {
			t.ok( abs( actual - large_expected[ i ] ) < 1e-11, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + large_expected[ i ] + '.' );
		}
	}
	t.end();
});
