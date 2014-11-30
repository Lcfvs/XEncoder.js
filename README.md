XEncoder.js
===========

An universal data encoder/decoder<br />
This project is under MIT License.


Usage :
-------

```JavaScript
var encoded,
    decoded;

encoded = XEncoder.encode('Hello world!'); // 04W0PG1i06m0Rm0W07S0Rm1o06m0P00X=65536=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_=
decoded = XEncoder.decode(encoded); // Hello world!
```
