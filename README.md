XEncoder.js
===========

An universal data encoder/decoder<br />
This project is under MIT License.


Usage :
-------

```JavaScript
var translator,
    encoded,
    decoded;

translator = new XEncoder(/* [string chars] */);

encoded = translator.encode('Hello world!'); // 01801b01i01i01l00W01t01l01o01i01a00X=65536=
decoded = translator.decode(encoded); // Hello world!
```
