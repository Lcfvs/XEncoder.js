XEncoder.js
===========

An universal data encoder/decoder<br />
This project is under MIT License.


Simple usage :
--------------

```JavaScript
var encoded,
    decoded;

encoded = XEncoder.encode('Hello world!'); // 04W0PG1i06m0Rm0W07S0Rm1o06m0P00X=65536=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_=
decoded = XEncoder.decode(encoded); // Hello world!
```


Specify your own encoding/delimiter :
-------------------------------------

```JavaScript
var encoded,
    decoded;

encoded = XEncoder.encode('Hello world!', '0123456789', '#'); // 0004400031200154000660003360004000073400336001620006600031000041#65536#0123456789#
decoded = XEncoder.decode(encoded); // Hello world!
```
