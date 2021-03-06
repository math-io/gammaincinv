options( digits = 16 );
library( jsonlite );

p = seq( 0.05, 0.95, 0.05 )
k = seq( 0.5, 1000, 0.5 )
y = qchisq( p, k * 2 ) / 2

cat( y, sep = ",\n" )

write( toJSON( p, digits = 16, auto_unbox = TRUE ), "./test/fixtures/arg1.json" )
write( toJSON( k, digits = 16, auto_unbox = TRUE ), "./test/fixtures/arg2.json" )
write( toJSON( y, digits = 16, auto_unbox = TRUE ), "./test/fixtures/expected.json" )


p = seq( 1e-80, 1e-4, by = 1e-7 )
k = seq( 0.01, 10, 0.01 )
y = qchisq( p, k * 2 ) / 2

cat( y, sep = ",\n" )

write( toJSON( p, digits = 16, auto_unbox = TRUE ), "./test/fixtures/small_arg1.json" )
write( toJSON( k, digits = 16, auto_unbox = TRUE ), "./test/fixtures/small_arg2.json" )
write( toJSON( y, digits = 16, auto_unbox = TRUE ), "./test/fixtures/small_expected.json" )



p = seq( 0.9, 0.999, by = 0.0001 )
k = seq( 0.001, 10, 0.01 )
y = qchisq( p, k * 2 ) / 2

cat( y, sep = ",\n" )

write( toJSON( p, digits = 16, auto_unbox = TRUE ), "./test/fixtures/large_arg1.json" )
write( toJSON( k, digits = 16, auto_unbox = TRUE ), "./test/fixtures/large_arg2.json" )
write( toJSON( y, digits = 16, auto_unbox = TRUE ), "./test/fixtures/large_expected.json" )


p = seq( 0.001, 0.999, 0.001 )
k = seq( 0.05, 10000, 0.5 )
y = qchisq( 1-p, k * 2 ) / 2

cat( y, sep = ",\n" )

write( toJSON( p, digits = 16, auto_unbox = TRUE ), "./test/fixtures/upper_arg1.json" )
write( toJSON( k, digits = 16, auto_unbox = TRUE ), "./test/fixtures/upper_arg2.json" )
write( toJSON( y, digits = 16, auto_unbox = TRUE ), "./test/fixtures/upper_expected.json" )
