var XEncoder;

XEncoder = (function (global) {
    'use strict';
    
    var defaultChars,
        charsetLength,
        XEncoder,
        getEncodingLength,
        encode,
        decode,
        toString,
        toCharCodes,
        validateString,
        validateCharCodes;

    defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        + 'abcdefghijklmnopqrstuvwxyz'
        + '0123456789'
        + '+/';
    
    XEncoder = function XEncoder(chars, delimiter) {
        var charString,
            delimiter,
            patternString,
            pattern,
            context;
        
        charString = chars
        || defaultChars;
        
        delimiter = '='
            + charsetLength
            + '=';
        
        patternString = '^(['
            + charString
            + ']+)=(\\d+)=$';
        
        pattern = new RegExp(patternString);
        
        context = {
            chars: charString,
            delimiter: delimiter,
            pattern: pattern,
            encodingLength: getEncodingLength(charString.length)
        };
        
        return {
            encode: encode.bind(
                context,
                validateCharCodes.bind(context)
            ),
            decode: decode.bind(
                context,
                validateString.bind(context)
            )
        };
    };
    
    getEncodingLength = function getEncodingLength(charsLength) {
        var encodingLength,
            charCode;
            
        encodingLength = 0;
        
        charCode = charsetLength;
        
        for (; charCode !== 0; encodingLength += 1) {
            charCode = (charCode - charCode % charsLength) / charsLength;
        }

        return encodingLength;
    };
    
    encode = function encode(validate, data) {
        var chars,
            delimiter,
            encodingLength,
            charsLength,
            encodedData,
            dataIndex,
            dataLength,
            charCodes,
            charCode,
            encodedChar,
            rest;
        
        chars = this.chars;
        delimiter = this.delimiter;
        encodingLength = this.encodingLength;
        charsLength = chars.length;
        encodedData = '';
        dataIndex = 0;
        dataLength = data.length;
        
        charCodes = data instanceof Array
            ? [].concat(data)
            : toCharCodes(data);
        
        validate(charCodes);
        
        for (; dataIndex < dataLength; dataIndex += 1) {
            charCode = charCodes[dataIndex];
            encodedChar = '';
            
            while (encodedChar.length < encodingLength) {
                rest = charCode % 64;
                charCode = (charCode - rest) / 64;
                encodedChar += chars.charAt(rest);
            }
            
            encodedData += encodedChar;
        }
        
        encodedData += delimiter;
        
        return encodedData;
    };
    
    decode = function decode(validate, data) {
        var charcodes,
            chars,
            delimiter,
            encodingLength,
            charsLength,
            decodedData,
            dataIndex,
            dataLength,
            charCode,
            charIndex,
            encodedChar,
            rest;
        
        validate(data);
        
        chars = this.chars;
        delimiter = this.delimiter;
        encodingLength = this.encodingLength;
        charsLength = chars.length;
        decodedData = [];
        dataIndex = 0;
        dataLength = data.length - delimiter.length;
        
        for (; dataIndex < dataLength; dataIndex += encodingLength) {
            charCode = 0;
            charIndex = 0;
            
            encodedChar = data.substr(
                dataIndex,
                encodingLength
            );
            
            for (; charIndex < encodingLength; charIndex += 1) {
                rest = chars.indexOf(encodedChar[charIndex]);
                
                charCode += rest * Math.pow(
                    charsLength,
                    charIndex
                );
            }
            
            decodedData.push(charCode);
        }

        decodedData.toString = toString.bind(
            global,
            decodedData
        );
        
        return decodedData;
    };
    
    toString = (function () {
        var fromCharCode,
            toStr,
            toString;

        fromCharCode = String.fromCharCode;
        
        toStr = fromCharCode.apply.bind(
            fromCharCode,
            String
        );

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
                charCode = toCharCode(
                    str,
                    iterator
                );
                
                charCodes.push(charCode);
            }

            return charCodes;
        };

        return toCharCodes;
    }());

    validateString = function validateString(data) {
        var delimiter,
            pattern,
            encodingLength,
            lastIndex,
            isValid,
            hasSameCharsetLength;
        
        delimiter = this.delimiter;
        pattern = this.pattern;
        encodingLength = this.encodingLength;
        lastIndex = data.length - delimiter.length;

        isValid = data === ''
        || data.indexOf(delimiter) === lastIndex
        && lastIndex % encodingLength === 0;
        
        if (!isValid) {
            throw new Error(
                'Invalid XEncoder string: '
                + data
            );
        }
        
        hasSameCharsetLength = + data.match(pattern)[2] === charsetLength;
        
        if (hasSameCharsetLength) {
            return true;
        }
        
        throw new Error(
            'Invalid XEncoder charset: '
            + data
        );
    };
    
    validateCharCodes = function validateCharCodes(data) {
        var chars,
            dataLength,
            charCodeIndex,
            isValid;
        
        chars = this.chars;
        dataLength = data.length;
        charCodeIndex = 0;
        isValid = true;
        
        for (; isValid && charCodeIndex < dataLength; charCodeIndex += 1) {
            isValid = data[charCodeIndex] < charsetLength;
        }
        
        if (isValid) {
            return true;
        }
        
        throw new Error(
            'Invalid XEncoder data: '
            + data
        );
    };
    
    (function detectCharsetLength() {
        var firstChar;
            
        charsetLength = 1;
        firstChar = toString([0]);
        
        for (; toString([charsetLength]) !== firstChar; charsetLength += 1);
    }());
    
    return XEncoder;
}(this));
