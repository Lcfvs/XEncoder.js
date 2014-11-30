XEncoder.js
===========

An universal data encoder/decoder
This project is under MIT License.


Usage :
-------

```JavaScript
var translator,
    encoded,
    decoded;

translator = new XEncoder(/* [string chars] */);

encoded = translator.encode('Hello world!'); // +/6+/Z+/g+/g+/j++U+/r+/j+/m+/g+/Y++V=65536=
decoded = translator.decode(encoded); // Hello world!
```
