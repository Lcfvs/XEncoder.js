/*
Copyright 2014 Lcf.vs
Released under the MIT license
https://github.com/Lcfvs/XEncoder.js
*/
var XEncoder;

XEncoder = (function () {
    'use strict';

    var defaultChars,
        defaultDelimiter,
        charsetLength,
        XEncoder,
        toString,
        toCharCodes,
        toBinary;

    defaultChars = '0123456789'
        + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        + 'abcdefghijklmnopqrstuvwxyz'
        + '-_';
        
    defaultDelimiter = '=';

    XEncoder = {
        encode: function (data, chars, delimiter) {
            var charString,
                delimiterString,
                suffix,
                binaries,
                encoded,
                iterator,
                charCodes,
                binCharsetLength,
                blockLength,
                binLength,
                start,
                charIndex;
            
            charString = chars
            || defaultChars;

            delimiterString = delimiter
            || defaultDelimiter;
            
            suffix = ['', charsetLength, charString, '']
                .join(delimiterString);
                
            binaries = '';
            encoded = '';
            iterator = 0;
            charCodes = toCharCodes(data);
            binCharsetLength = toBinary(charsetLength).length - 1;
            blockLength = toBinary(charString.length).length - 1;
            
            for (; iterator < charCodes.length; iterator += 1) {
                binaries += toBinary(charCodes[iterator], binCharsetLength);
            }

            iterator = 0;
            binLength = binaries.length;
            
            for (; iterator < binLength;) {
                start = iterator;
                iterator += blockLength;
                charIndex = parseInt(binaries.substring(start, iterator), 2);
                encoded += charString[charIndex];
            }
            
            encoded += suffix;

            return encoded;
        },
        decode: function decode(data) {
            var delimiter,
                parts,
                encoded,
                charString,
                binaries,
                charCodes,
                iterator,
                encodedLength,
                binCharsetLength,
                blockLength,
                charIndex,
                binLength,
                start,
                charCode;
            
            delimiter = data[data.length - 1];
            parts = data.split(delimiter);
            
            if (parts.length !== 4) {
                throw new Error('Invalid data');
            }
            
            if (+parts[1] !== charsetLength) {
                throw new Error('Incompatible charset');
            }
            
            encoded = parts[0];
            charString = parts[2];
            binaries = '';
            charCodes = [];
            iterator = 0;
            encodedLength = encoded.length;
            binCharsetLength = toBinary(charsetLength).length - 1;
            blockLength = toBinary(charString.length).length - 1;

            for (; iterator < encodedLength; iterator += 1) {
                charIndex = charString.indexOf(encoded[iterator]);
                binaries += toBinary(charIndex, blockLength);
            }
            
            iterator = 0;
            binLength = binaries.length;
            
            for (; iterator < binLength;) {
                start = iterator;
                iterator += binCharsetLength;
                charCode = parseInt(binaries.substring(start, iterator), 2);
                charCodes.push(charCode);
            }
            
            return toString(charCodes);
        }
    };
    
    toString = (function () {
        var fromCharCode,
            toStr,
            toString;

        fromCharCode = String.fromCharCode;

        toStr = fromCharCode.apply.bind(fromCharCode, String);

        toString = function toString(data) {
            var isArray,
                charCodes,
                str;

            isArray = data instanceof Array;

            charCodes = isArray
                ? data
                : arguments;

            str = toStr(charCodes);

            return str;
        };

        return toString;
    }());

    toCharCodes = (function () {
        var charCodeAt,
            toCharCode,
            toCharCodes;

        charCodeAt = String.prototype.charCodeAt;
        toCharCode = charCodeAt.call.bind(charCodeAt);

        toCharCodes = function toCharCodes(str) {
            var iterator,
                charCodes,
                length,
                charCode;

            iterator = 0;
            charCodes = [];
            length = str.length;

            for (; iterator < length; iterator += 1) {
                charCode = toCharCode(str, iterator);

                charCodes.push(charCode);
            }

            return charCodes;
        };

        return toCharCodes;
    }());

    toBinary = function toBinary(value, length) {
        var binary;
        
        binary = value.toString(2);
        
        if (!length) {
            return binary;
        }
        
        while (binary.length < length) {
            binary = '0' + binary;
        }
        
        return binary;
    };
    
    (function detectCharsetLength() {
        var firstChar;

        charsetLength = 1;
        firstChar = toString([0]);

        for (; toString([charsetLength]) !== firstChar; charsetLength += 1);
    }());

    return XEncoder;
}());
