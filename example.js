var encoded,
    decoded;

encoded = XEncoder.encode('Hello world!');
decoded = XEncoder.decode(encoded);

console.log('encoded : %s', encoded); // 04W0PG1i06m0Rm0W07S0Rm1o06m0P00X=65536=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_=
console.log('decoded : %s', decoded); // Hello world!

console.log('--------------------------');

encoded = XEncoder.encode('Hello world!', '0123456789', '#');
decoded = XEncoder.decode(encoded);

console.log('encoded : %s', encoded); // 0004400031200154000660003360004000073400336001620006600031000041#65536#0123456789#
console.log('decoded : %s', decoded); // Hello world!
