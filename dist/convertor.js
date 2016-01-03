var Convertor;
(function (Convertor) {
    function convertString(mapperConfig, stringToConvert) {
        var mapper = mapperConfig.mapper, maxWidth = mapperConfig.maxWidth, moveRightChars = mapperConfig.moveRightChars, moveLeftChars = mapperConfig.moveLeftChars;
        var output = [];
        var charToAddOnRight = "";
        for (var i = 0; i < stringToConvert.length; i++) {
            var j = maxWidth + 1;
            var matchFound = false;
            var charToMatch = "";
            while (matchFound === false && j--) {
                charToMatch = stringToConvert.substr(i, j);
                if (charToMatch in mapper) {
                    matchFound = true;
                    i = i + (j - 1);
                }
            }
            var charToAdd = void 0;
            if (matchFound) {
                charToAdd = mapper[charToMatch];
            }
            else {
                charToAdd = stringToConvert[i];
            }
            if (charToAddOnRight) {
                output.push(charToAdd, charToAddOnRight);
                charToAddOnRight = null;
            }
            else if (moveRightChars.indexOf(charToAdd) > -1) {
                charToAddOnRight = charToAdd;
            }
            else if (moveLeftChars.indexOf(charToAdd) > -1 && output.length) {
                var lastChar = output.pop();
                output.push(charToAdd, lastChar);
            }
            else {
                output.push(charToAdd);
            }
        }
        if (charToAddOnRight) {
            output.push(charToAddOnRight);
        }
        return output.join("");
    }
    Convertor.convertString = convertString;
    function getMapper(to, from, compositions) {
        var mappingLength = Math.max(to.characterCodes.length, from.characterCodes.length);
        var mapper = {};
        for (var i = 0; i < mappingLength; i++) {
            var fromChar = from.characterCodes[i];
            var toChar = to.characterCodes[i];
            if (fromChar && toChar) {
                mapper[getCharFromUnicode(fromChar)] = getCharFromUnicode(toChar);
            }
        }
        var maxWidth = 0;
        for (var c in compositions) {
            if (compositions.hasOwnProperty(c)) {
                var compositionChar = compositions[c];
                maxWidth = Math.max(maxWidth, compositionChar.length);
                var toCharCodes = [];
                if (to.characterCodes[c]) {
                    toCharCodes = [to.characterCodes[c]];
                }
                else {
                    for (var _i = 0; _i < compositionChar.length; _i++) {
                        var code = compositionChar[_i];
                        var toCode = to.characterCodes[code];
                        if (toCode) {
                            toCharCodes.push(toCode);
                        }
                        else {
                        }
                    }
                }
                var toMulipleChar = getCharFromUnicode.apply(void 0, toCharCodes);
                var fromCompositeCharCode = from.characterCodes[c];
                if (fromCompositeCharCode && !(fromCompositeCharCode in mapper)) {
                    mapper[getCharFromUnicode(fromCompositeCharCode)] = toMulipleChar;
                }
                var fromCharCodes = [];
                var invalid = false;
                for (var _a = 0; _a < compositionChar.length; _a++) {
                    var code = compositionChar[_a];
                    var fromCode = from.characterCodes[code];
                    if (fromCode) {
                        fromCharCodes.push(fromCode);
                    }
                    else {
                        invalid = true;
                    }
                }
                if (!invalid) {
                    var fromSingleChars = getCharFromUnicode.apply(void 0, fromCharCodes);
                    if (!(fromSingleChars in mapper)) {
                        mapper[fromSingleChars] = toMulipleChar;
                    }
                }
            }
        }
        var moveLeftCharIndexes = from.moveRightCharacters.filter(function (a) { return to.moveRightCharacters.indexOf(a) === -1; });
        var moveRightCharIndexes = to.moveRightCharacters.filter(function (a) { return from.moveRightCharacters.indexOf(a) === -1; });
        return {
            mapper: mapper,
            maxWidth: maxWidth,
            moveLeftChars: moveLeftCharIndexes.map(function (c) { return getCharFromUnicode(to.characterCodes[c]); }),
            moveRightChars: moveRightCharIndexes.map(function (c) { return getCharFromUnicode(to.characterCodes[c]); })
        };
    }
    Convertor.getMapper = getMapper;
    function getCharFromUnicode() {
        var unicodes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            unicodes[_i - 0] = arguments[_i];
        }
        return unicodes.map(function (c) { return String.fromCharCode(c); }).join("");
    }
})(Convertor || (Convertor = {}));
var PunjabiMappings;
(function (PunjabiMappings) {
    PunjabiMappings.compositions = (_a = {},
        _a[0 /* AdakBindi */] = [77 /* Addak */, 1 /* Bindi */],
        _a[4 /* Aਆ */] = [3 /* Aਅ */, 47 /* Kana */],
        _a[5 /* Eਇ */] = [48 /* Sihari */, 79 /* Eੲ */],
        _a[6 /* Eਈ */] = [79 /* Eੲ */, 49 /* Bihari */],
        _a[7 /* Uਉ */] = [80 /* Uੳ */, 50 /* Aunkar */],
        _a[8 /* Uਊ */] = [80 /* Uੳ */, 51 /* Dulainkar */],
        _a[9 /* Eਏ */] = [79 /* Eੲ */, 52 /* Lavan */],
        _a[10 /* Aਐ */] = [3 /* Aਅ */, 53 /* Dulavan */],
        _a[12 /* Oਔ */] = [3 /* Aਅ */, 50 /* Aunkar */],
        _a[41 /* LPairiBindiਲ਼ */] = [40 /* Lਲ */, 46 /* PairiBindi */],
        _a[43 /* SPairiBindiਸ਼ */] = [44 /* Sਸ */, 46 /* PairiBindi */],
        _a[59 /* KPairiBindiਖ਼ */] = [14 /* Kਖ */, 46 /* PairiBindi */],
        _a[60 /* GPairiBindiਗ਼ */] = [15 /* Gਗ */, 46 /* PairiBindi */],
        _a[61 /* JPairiBindiਜ਼ */] = [20 /* Jਜ */, 46 /* PairiBindi */],
        _a[63 /* FPairiBindiਫ਼ */] = [34 /* Fਫ */, 46 /* PairiBindi */],
        _a[65 /* DoubleDanda */] = [64 /* Danda */, 64 /* Danda */],
        _a[85 /* KanaBindi */] = [47 /* Kana */, 1 /* Bindi */],
        _a[86 /* PairiHaha */] = [56 /* Virama */, 45 /* Hਹ */],
        _a[57 /* PairiRara */] = [56 /* Virama */, 39 /* Rਰ */],
        _a[78 /* Addak2 */] = [77 /* Addak */],
        _a[82 /* AੴPart1 */] = [81 /* Aੴ */],
        _a[81 /* Aੴ */] = [82 /* AੴPart1 */, 83 /* AੴPart2 */],
        _a
    );
    var unicodeMapping = (_b = {},
        _b[0 /* AdakBindi */] = 0x0A01,
        _b[1 /* Bindi */] = 0x0A02,
        _b[2 /* Visagra */] = 0x0A03,
        _b[3 /* Aਅ */] = 0x0A05,
        _b[4 /* Aਆ */] = 0x0A06,
        _b[5 /* Eਇ */] = 0x0A07,
        _b[6 /* Eਈ */] = 0x0A08,
        _b[7 /* Uਉ */] = 0x0A09,
        _b[8 /* Uਊ */] = 0x0A0A,
        _b[9 /* Eਏ */] = 0x0A0F,
        _b[10 /* Aਐ */] = 0x0A10,
        _b[11 /* Oਓ */] = 0x0A13,
        _b[12 /* Oਔ */] = 0x0A14,
        _b[13 /* Kਕ */] = 0x0A15,
        _b[14 /* Kਖ */] = 0x0A16,
        _b[15 /* Gਗ */] = 0x0A17,
        _b[16 /* Gਘ */] = 0x0A18,
        _b[17 /* Nਙ */] = 0x0A19,
        _b[18 /* Cਚ */] = 0x0A1A,
        _b[19 /* Cਛ */] = 0x0A1B,
        _b[20 /* Jਜ */] = 0x0A1C,
        _b[21 /* Jਝ */] = 0x0A1D,
        _b[22 /* Nਞ */] = 0x0A1E,
        _b[23 /* Tਟ */] = 0x0A1F,
        _b[24 /* Tਠ */] = 0x0A20,
        _b[25 /* Dਡ */] = 0x0A21,
        _b[26 /* Dਢ */] = 0x0A22,
        _b[27 /* Nਣ */] = 0x0A23,
        _b[28 /* Tਤ */] = 0x0A24,
        _b[29 /* Tਥ */] = 0x0A25,
        _b[30 /* Dਦ */] = 0x0A26,
        _b[31 /* Dਧ */] = 0x0A27,
        _b[32 /* Nਨ */] = 0x0A28,
        _b[33 /* Pਪ */] = 0x0A2A,
        _b[34 /* Fਫ */] = 0x0A2B,
        _b[35 /* Bਬ */] = 0x0A2C,
        _b[36 /* Bਭ */] = 0x0A2D,
        _b[37 /* Mਮ */] = 0x0A2E,
        _b[38 /* Yਯ */] = 0x0A2F,
        _b[39 /* Rਰ */] = 0x0A30,
        _b[40 /* Lਲ */] = 0x0A32,
        _b[41 /* LPairiBindiਲ਼ */] = 0x0A33,
        _b[42 /* Vਵ */] = 0x0A35,
        _b[43 /* SPairiBindiਸ਼ */] = 0x0A36,
        _b[44 /* Sਸ */] = 0x0A38,
        _b[45 /* Hਹ */] = 0x0A39,
        _b[46 /* PairiBindi */] = 0x0A3C,
        _b[47 /* Kana */] = 0x0A3E,
        _b[48 /* Sihari */] = 0x0A3F,
        _b[49 /* Bihari */] = 0x0A40,
        _b[50 /* Aunkar */] = 0x0A41,
        _b[51 /* Dulainkar */] = 0x0A42,
        _b[52 /* Lavan */] = 0x0A47,
        _b[53 /* Dulavan */] = 0x0A48,
        _b[54 /* Hora */] = 0x0A4B,
        _b[55 /* Kanaura */] = 0x0A4C,
        _b[56 /* Virama */] = 0x0A4D,
        _b[58 /* Udaat */] = 0x0A51,
        _b[59 /* KPairiBindiਖ਼ */] = 0x0A59,
        _b[60 /* GPairiBindiਗ਼ */] = 0x0A5A,
        _b[61 /* JPairiBindiਜ਼ */] = 0x0A5B,
        _b[62 /* Rੜ */] = 0x0A5C,
        _b[63 /* FPairiBindiਫ਼ */] = 0x0A5E,
        _b[64 /* Danda */] = 0x0964,
        _b[65 /* DoubleDanda */] = 0x0965,
        _b[66 /* Zero */] = 0x0A66,
        _b[67 /* One */] = 0x0A67,
        _b[68 /* Two */] = 0x0A68,
        _b[69 /* Three */] = 0x0A69,
        _b[70 /* Four */] = 0x0A6A,
        _b[71 /* Five */] = 0x0A6B,
        _b[72 /* Six */] = 0x0A6C,
        _b[73 /* Seven */] = 0x0A6D,
        _b[74 /* Eight */] = 0x0A6E,
        _b[75 /* Nine */] = 0x0A6F,
        _b[76 /* Tippi */] = 0x0A70,
        _b[77 /* Addak */] = 0x0A71,
        _b[79 /* Eੲ */] = 0x0A72,
        _b[80 /* Uੳ */] = 0x0A73,
        _b[81 /* Aੴ */] = 0x0A74,
        _b[84 /* Yakash */] = 0x0A75,
        _b
    );
    var anmolMapping = (_c = {},
        _c[0 /* AdakBindi */] = 0x0A01,
        _c[1 /* Bindi */] = 0x4e,
        _c[3 /* Aਅ */] = 0x41,
        _c[11 /* Oਓ */] = 0x45,
        _c[13 /* Kਕ */] = 0x6b,
        _c[14 /* Kਖ */] = 0x4b,
        _c[15 /* Gਗ */] = 0x67,
        _c[16 /* Gਘ */] = 0x47,
        //[Char.Nਙ]:   ,
        _c[18 /* Cਚ */] = 0x63,
        _c[19 /* Cਛ */] = 0x43,
        _c[20 /* Jਜ */] = 0x6a,
        _c[21 /* Jਝ */] = 0x4a,
        //[Char.Nਞ]:  0x ,
        _c[23 /* Tਟ */] = 0x74,
        _c[24 /* Tਠ */] = 0x54,
        _c[25 /* Dਡ */] = 0x66,
        _c[26 /* Dਢ */] = 0x46,
        _c[27 /* Nਣ */] = 0x78,
        _c[28 /* Tਤ */] = 0x71,
        _c[29 /* Tਥ */] = 0x51,
        _c[30 /* Dਦ */] = 0x64,
        _c[31 /* Dਧ */] = 0x44,
        _c[32 /* Nਨ */] = 0x6e,
        _c[33 /* Pਪ */] = 0x70,
        _c[34 /* Fਫ */] = 0x50,
        _c[35 /* Bਬ */] = 0x62,
        _c[36 /* Bਭ */] = 0x42,
        _c[37 /* Mਮ */] = 0x6d,
        _c[38 /* Yਯ */] = 0x58,
        _c[39 /* Rਰ */] = 0x72,
        _c[40 /* Lਲ */] = 0x6c,
        _c[41 /* LPairiBindiਲ਼ */] = 0x4c,
        _c[42 /* Vਵ */] = 0x76,
        _c[43 /* SPairiBindiਸ਼ */] = 0x53,
        _c[44 /* Sਸ */] = 0x73,
        _c[45 /* Hਹ */] = 0x68,
        _c[46 /* PairiBindi */] = 0x01,
        _c[47 /* Kana */] = 0x77,
        _c[48 /* Sihari */] = 0x69,
        _c[49 /* Bihari */] = 0x49,
        _c[50 /* Aunkar */] = 0x75,
        _c[51 /* Dulainkar */] = 0x55,
        _c[52 /* Lavan */] = 0x79,
        _c[53 /* Dulavan */] = 0x59,
        _c[54 /* Hora */] = 0x6f,
        _c[55 /* Kanaura */] = 0x4f,
        _c[57 /* PairiRara */] = 0x52,
        _c[61 /* JPairiBindiਜ਼ */] = 0x7a,
        _c[62 /* Rੜ */] = 0x56,
        _c[64 /* Danda */] = 0x5b,
        _c[65 /* DoubleDanda */] = 0x5d,
        _c[66 /* Zero */] = 0x30,
        _c[67 /* One */] = 0x31,
        _c[68 /* Two */] = 0x32,
        _c[69 /* Three */] = 0x33,
        _c[70 /* Four */] = 0x34,
        _c[71 /* Five */] = 0x35,
        _c[72 /* Six */] = 0x36,
        _c[73 /* Seven */] = 0x37,
        _c[74 /* Eight */] = 0x38,
        _c[75 /* Nine */] = 0x39,
        _c[76 /* Tippi */] = 0x4d,
        _c[77 /* Addak */] = 0x60,
        _c[79 /* Eੲ */] = 0x65,
        _c[80 /* Uੳ */] = 0x61,
        _c[85 /* KanaBindi */] = 0x57,
        _c[86 /* PairiHaha */] = 0x48,
        _c[78 /* Addak2 */] = 0x7e,
        _c[82 /* AੴPart1 */] = 0x3c,
        _c[83 /* AੴPart2 */] = 0x3e,
        _c
    );
    function makeArray() {
        var configs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            configs[_i - 0] = arguments[_i];
        }
        var c = [];
        for (var _a = 0; _a < configs.length; _a++) {
            var a = configs[_a];
            for (var x in a) {
                if (a.hasOwnProperty(x)) {
                    c[x] = a[x];
                }
            }
        }
        return c;
    }
    PunjabiMappings.fontConvertorConfigs = {
        "Unicode": {
            moveRightCharacters: [48 /* Sihari */],
            characterCodes: makeArray(unicodeMapping)
        },
        "AnmolLipi": {
            moveRightCharacters: [],
            characterCodes: makeArray(anmolMapping)
        }
    };
    var _a, _b, _c;
})(PunjabiMappings || (PunjabiMappings = {}));
