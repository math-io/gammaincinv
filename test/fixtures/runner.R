options( digits = 16 );
library( jsonlite );

p = seq( 0, 1, 0.05 )
k = seq( 1, 100, 1 )
y = qchisq( p, k * 2 ) / 2

cat( y, sep = ",\n" )

write( toJSON( p, digits = 16, auto_unbox = TRUE ), "./test/fixtures/arg1.json" )
write( toJSON( k, digits = 16, auto_unbox = TRUE ), "./test/fixtures/arg2.json" )
write( toJSON( y, digits = 16, auto_unbox = TRUE ), "./test/fixtures/expected.json" )
