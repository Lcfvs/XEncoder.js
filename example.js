var translator,
    encoded,
    decoded;

translator = XEncoder('01236456789');

encoded = translator.encode('Hello world!');
console.log(encoded);// 000550008200088000880009100029000980009100096000880008100030=65536=

decoded = translator.decode(encoded);
console.log(decoded.toString());//'Hello world!'

translator = XEncoder();

encoded = translator.encode('Hello world!');
console.log(encoded);// +/6+/Z+/g+/g+/j++U+/r+/j+/m+/g+/Y++V=65536=

decoded = translator.decode(encoded);
console.log(decoded.toString());//'Hello world!'
