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
        for (var _i = 0; _i < compositions.length; _i++) {
            var compositionCharArrays = compositions[_i];
            var toCharacter = getCompositionCharacters(compositionCharArrays, to.characterCodes)[0];
            if (toCharacter) {
                var fromCharacters = getCompositionCharacters(compositionCharArrays, from.characterCodes);
                for (var _a = 0; _a < fromCharacters.length; _a++) {
                    var fromChar = fromCharacters[_a];
                    maxWidth = Math.max(maxWidth, fromChar.length);
                    if (!(fromChar in mapper)) {
                        mapper[fromChar] = toCharacter;
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
    function getCompositionCharacters(compositionCharArrays, codes) {
        var characters = [];
        var toCharCodes = null;
        for (var _i = 0; _i < compositionCharArrays.length; _i++) {
            var compositionChar = compositionCharArrays[_i];
            var isValid = true;
            var charCodes = [];
            for (var _a = 0; _a < compositionChar.length; _a++) {
                var code = compositionChar[_a];
                var toCode = codes[code];
                if (toCode) {
                    charCodes.push(toCode);
                }
                else {
                    isValid = false;
                }
            }
            if (isValid) {
                characters.push(getCharFromUnicode.apply(void 0, charCodes));
            }
        }
        return characters;
    }
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
    PunjabiMappings.anmolMapping = (_a = {},
        _a[1 /* AO1 */] = 0x3c,
        _a[2 /* AO2 */] = 0x3e,
        _a[3 /* Uੳ */] = 0x61,
        _a[6 /* Oਓ */] = 0x45,
        _a[7 /* Aਅ */] = 0x41,
        _a[11 /* Eੲ */] = 0x65,
        _a[15 /* Sਸ */] = 0x73,
        _a[16 /* Hਹ */] = 0x68,
        _a[17 /* Kਕ */] = 0x6b,
        _a[18 /* Kਖ */] = 0x4b,
        _a[19 /* Gਗ */] = 0x67,
        _a[20 /* Gਘ */] = 0x47,
        _a[21 /* Nਙ */] = 0x7c,
        _a[22 /* Cਚ */] = 0x63,
        _a[23 /* Cਛ */] = 0x43,
        _a[24 /* Jਜ */] = 0x6a,
        _a[25 /* Jਝ */] = 0x4a,
        _a[26 /* Nਞ */] = 0x5c,
        _a[27 /* Tਟ */] = 0x74,
        _a[28 /* Tਠ */] = 0x54,
        _a[29 /* Dਡ */] = 0x66,
        _a[30 /* Dਢ */] = 0x46,
        _a[31 /* Nਣ */] = 0x78,
        _a[32 /* Tਤ */] = 0x71,
        _a[33 /* Tਥ */] = 0x51,
        _a[34 /* Dਦ */] = 0x64,
        _a[35 /* Dਧ */] = 0x44,
        _a[36 /* Nਨ */] = 0x6e,
        _a[37 /* Pਪ */] = 0x70,
        _a[38 /* Fਫ */] = 0x50,
        _a[39 /* Bਬ */] = 0x62,
        _a[40 /* Bਭ */] = 0x42,
        _a[41 /* Mਮ */] = 0x6d,
        _a[42 /* Yਯ */] = 0x58,
        _a[43 /* Rਰ */] = 0x72,
        _a[44 /* Lਲ */] = 0x6c,
        _a[45 /* Vਵ */] = 0x76,
        _a[46 /* Rੜ */] = 0x56,
        _a[47 /* SPairiBindiਸ਼ */] = 0x53,
        _a[48 /* KPairiBindiਖ਼ */] = 0x5e,
        _a[50 /* JPairiBindiਜ਼ */] = 0x7a,
        _a[51 /* FPairiBindiਫ਼ */] = 0x26,
        _a[52 /* LPairiBindiਲ਼ */] = 0x4c,
        _a[53 /* PairiBindi */] = 0xe6,
        _a[55 /* Dot */] = 0x2e,
        _a[56 /* PairiHaha */] = 0x48,
        _a[57 /* PairiRara */] = 0x52,
        _a[58 /* Tippi */] = 0x4d,
        _a[62 /* Addak */] = 0x60,
        _a[63 /* Addak2 */] = 0x7e,
        _a[64 /* AdakBindi */] = 0x0A01,
        _a[60 /* Bindi */] = 0x4e,
        _a[66 /* Kana */] = 0x77,
        _a[67 /* KanaBindi */] = 0x57,
        _a[68 /* Sihari */] = 0x69,
        _a[69 /* Bihari */] = 0x49,
        _a[70 /* Aunkar */] = 0x75,
        _a[71 /* Dulainkar */] = 0x55,
        _a[72 /* Lavan */] = 0x79,
        _a[73 /* Dulavan */] = 0x59,
        _a[74 /* Hora */] = 0x6f,
        _a[75 /* Kanaura */] = 0x4f,
        _a[76 /* Virama */] = 0x40,
        _a[78 /* Danda */] = 0x5b,
        _a[81 /* DoubleDanda */] = 0x5d,
        _a[83 /* Zero */] = 0x30,
        _a[84 /* One */] = 0x31,
        _a[85 /* Two */] = 0x32,
        _a[86 /* Three */] = 0x33,
        _a[87 /* Four */] = 0x34,
        _a[88 /* Five */] = 0x35,
        _a[89 /* Six */] = 0x36,
        _a[90 /* Seven */] = 0x37,
        _a[91 /* Eight */] = 0x38,
        _a[92 /* Nine */] = 0x39,
        _a
    );
    var _a;
})(PunjabiMappings || (PunjabiMappings = {}));
var PunjabiMappings;
(function (PunjabiMappings) {
    PunjabiMappings.drChatrikMappings = (_a = {},
        _a[1 /* AO1 */] = 0xc3,
        _a[2 /* AO2 */] = 0xc4,
        _a[3 /* Uੳ */] = 0x41,
        _a[7 /* Aਅ */] = 0x61,
        _a[11 /* Eੲ */] = 0x65,
        _a[15 /* Sਸ */] = 0x73,
        _a[16 /* Hਹ */] = 0x68,
        _a[17 /* Kਕ */] = 0x6b,
        _a[18 /* Kਖ */] = 0x4b,
        _a[19 /* Gਗ */] = 0x67,
        _a[20 /* Gਘ */] = 0x47,
        _a[21 /* Nਙ */] = 0xd5,
        _a[22 /* Cਚ */] = 0x63,
        _a[23 /* Cਛ */] = 0x43,
        _a[24 /* Jਜ */] = 0x6a,
        _a[25 /* Jਝ */] = 0x4a,
        _a[26 /* Nਞ */] = 0xd6,
        _a[27 /* Tਟ */] = 0x74,
        _a[28 /* Tਠ */] = 0x54,
        _a[29 /* Dਡ */] = 0x7a,
        _a[30 /* Dਢ */] = 0x5a,
        _a[31 /* Nਣ */] = 0x78,
        _a[32 /* Tਤ */] = 0x71,
        _a[33 /* Tਥ */] = 0x51,
        _a[34 /* Dਦ */] = 0x64,
        _a[35 /* Dਧ */] = 0x44,
        _a[36 /* Nਨ */] = 0x6e,
        _a[37 /* Pਪ */] = 0x70,
        _a[38 /* Fਫ */] = 0x50,
        _a[39 /* Bਬ */] = 0x62,
        _a[40 /* Bਭ */] = 0x42,
        _a[41 /* Mਮ */] = 0x6d,
        _a[42 /* Yਯ */] = 0x58,
        _a[43 /* Rਰ */] = 0x72,
        _a[44 /* Lਲ */] = 0x6c,
        _a[45 /* Vਵ */] = 0x76,
        _a[46 /* Rੜ */] = 0x56,
        _a[47 /* SPairiBindiਸ਼ */] = 0xc8,
        _a[48 /* KPairiBindiਖ਼ */] = 0xc9,
        _a[49 /* GPairiBindiਗ਼ */] = 0xca,
        _a[50 /* JPairiBindiਜ਼ */] = 0xcb,
        _a[51 /* FPairiBindiਫ਼ */] = 0xcc,
        _a[52 /* LPairiBindiਲ਼ */] = 0xdc,
        _a[53 /* PairiBindi */] = 0xe6,
        _a[53 /* PairiBindi */] = 0xe6,
        _a[54 /* PairiBindi2 */] = 0x4c,
        _a[55 /* Dot */] = 0x5b,
        _a[56 /* PairiHaha */] = 0x48,
        _a[57 /* PairiRara */] = 0x52,
        _a[58 /* Tippi */] = 0x4d,
        _a[59 /* Tippi2 */] = 0x53,
        _a[60 /* Bindi */] = 0x4e,
        _a[62 /* Addak */] = 0x57,
        _a[63 /* Addak2 */] = 0x77,
        _a[64 /* AdakBindi */] = 0x0A01,
        _a[66 /* Kana */] = 0x66,
        _a[67 /* KanaBindi */] = 0x46,
        _a[68 /* Sihari */] = 0x69,
        _a[69 /* Bihari */] = 0x49,
        _a[70 /* Aunkar */] = 0x75,
        _a[71 /* Dulainkar */] = 0x55,
        _a[72 /* Lavan */] = 0x79,
        _a[73 /* Dulavan */] = 0x59,
        _a[74 /* Hora */] = 0x6f,
        _a[75 /* Kanaura */] = 0x4f,
        _a[76 /* Virama */] = 0xd9,
        _a[78 /* Danda */] = 0x2e,
        _a[79 /* Danda2 */] = 0x7c,
        _a[80 /* Danda3 */] = 0xbb,
        _a[81 /* DoubleDanda */] = 0x5d,
        _a[82 /* DoubleDanda2 */] = 0xab,
        _a[83 /* Zero */] = 0x30,
        _a[84 /* One */] = 0x31,
        _a[85 /* Two */] = 0x32,
        _a[86 /* Three */] = 0x33,
        _a[87 /* Four */] = 0x34,
        _a[88 /* Five */] = 0x35,
        _a[89 /* Six */] = 0x36,
        _a[90 /* Seven */] = 0x37,
        _a[91 /* Eight */] = 0x38,
        _a[92 /* Nine */] = 0x39,
        _a
    );
    var _a;
})(PunjabiMappings || (PunjabiMappings = {}));
var PunjabiMappings;
(function (PunjabiMappings) {
    PunjabiMappings.unicodeMapping = (_a = {},
        _a[0 /* ੴ */] = 0x0A74,
        _a[3 /* Uੳ */] = 0x0A73,
        _a[4 /* Uਉ */] = 0x0A09,
        _a[5 /* Uਊ */] = 0x0A0A,
        _a[6 /* Oਓ */] = 0x0A13,
        _a[7 /* Aਅ */] = 0x0A05,
        _a[8 /* Aਆ */] = 0x0A06,
        _a[9 /* Aਐ */] = 0x0A10,
        _a[10 /* Oਔ */] = 0x0A14,
        _a[11 /* Eੲ */] = 0x0A72,
        _a[12 /* Eਇ */] = 0x0A07,
        _a[13 /* Eਈ */] = 0x0A08,
        _a[14 /* Eਏ */] = 0x0A0F,
        _a[15 /* Sਸ */] = 0x0A38,
        _a[16 /* Hਹ */] = 0x0A39,
        _a[17 /* Kਕ */] = 0x0A15,
        _a[18 /* Kਖ */] = 0x0A16,
        _a[19 /* Gਗ */] = 0x0A17,
        _a[20 /* Gਘ */] = 0x0A18,
        _a[21 /* Nਙ */] = 0x0A19,
        _a[22 /* Cਚ */] = 0x0A1A,
        _a[23 /* Cਛ */] = 0x0A1B,
        _a[24 /* Jਜ */] = 0x0A1C,
        _a[25 /* Jਝ */] = 0x0A1D,
        _a[26 /* Nਞ */] = 0x0A1E,
        _a[27 /* Tਟ */] = 0x0A1F,
        _a[28 /* Tਠ */] = 0x0A20,
        _a[29 /* Dਡ */] = 0x0A21,
        _a[30 /* Dਢ */] = 0x0A22,
        _a[31 /* Nਣ */] = 0x0A23,
        _a[32 /* Tਤ */] = 0x0A24,
        _a[33 /* Tਥ */] = 0x0A25,
        _a[34 /* Dਦ */] = 0x0A26,
        _a[35 /* Dਧ */] = 0x0A27,
        _a[36 /* Nਨ */] = 0x0A28,
        _a[37 /* Pਪ */] = 0x0A2A,
        _a[38 /* Fਫ */] = 0x0A2B,
        _a[39 /* Bਬ */] = 0x0A2C,
        _a[40 /* Bਭ */] = 0x0A2D,
        _a[41 /* Mਮ */] = 0x0A2E,
        _a[42 /* Yਯ */] = 0x0A2F,
        _a[43 /* Rਰ */] = 0x0A30,
        _a[44 /* Lਲ */] = 0x0A32,
        _a[45 /* Vਵ */] = 0x0A35,
        _a[46 /* Rੜ */] = 0x0A5C,
        _a[47 /* SPairiBindiਸ਼ */] = 0x0A36,
        _a[48 /* KPairiBindiਖ਼ */] = 0x0A59,
        _a[49 /* GPairiBindiਗ਼ */] = 0x0A5A,
        _a[50 /* JPairiBindiਜ਼ */] = 0x0A5B,
        _a[51 /* FPairiBindiਫ਼ */] = 0x0A5E,
        _a[52 /* LPairiBindiਲ਼ */] = 0x0A33,
        _a[53 /* PairiBindi */] = 0x0A3C,
        _a[58 /* Tippi */] = 0x0A70,
        _a[60 /* Bindi */] = 0x0A02,
        _a[61 /* Visagra */] = 0x0A03,
        _a[62 /* Addak */] = 0x0A71,
        _a[64 /* AdakBindi */] = 0x0A01,
        _a[65 /* Yakash */] = 0x0A75,
        _a[66 /* Kana */] = 0x0A3E,
        _a[68 /* Sihari */] = 0x0A3F,
        _a[69 /* Bihari */] = 0x0A40,
        _a[70 /* Aunkar */] = 0x0A41,
        _a[71 /* Dulainkar */] = 0x0A42,
        _a[72 /* Lavan */] = 0x0A47,
        _a[73 /* Dulavan */] = 0x0A48,
        _a[74 /* Hora */] = 0x0A4B,
        _a[75 /* Kanaura */] = 0x0A4C,
        _a[76 /* Virama */] = 0x0A4D,
        _a[77 /* Udaat */] = 0x0A51,
        _a[78 /* Danda */] = 0x0964,
        _a[81 /* DoubleDanda */] = 0x0965,
        _a[83 /* Zero */] = 0x0A66,
        _a[84 /* One */] = 0x0A67,
        _a[85 /* Two */] = 0x0A68,
        _a[86 /* Three */] = 0x0A69,
        _a[87 /* Four */] = 0x0A6A,
        _a[88 /* Five */] = 0x0A6B,
        _a[89 /* Six */] = 0x0A6C,
        _a[90 /* Seven */] = 0x0A6D,
        _a[91 /* Eight */] = 0x0A6E,
        _a[92 /* Nine */] = 0x0A6F,
        _a
    );
    var _a;
})(PunjabiMappings || (PunjabiMappings = {}));
///<reference path="./anmolFontMappings" />
///<reference path="./unicodeFontMappings" />
///<reference path="./drChatrikFontMappings" />
var PunjabiMappings;
(function (PunjabiMappings) {
    PunjabiMappings.fontConvertorConfigs = {
        "Unicode": {
            moveRightCharacters: [68 /* Sihari */],
            characterCodes: makeArray(PunjabiMappings.unicodeMapping)
        },
        "AnmolLipi": {
            moveRightCharacters: [],
            characterCodes: makeArray(PunjabiMappings.anmolMapping)
        },
        "DrChatrikWeb": {
            moveRightCharacters: [],
            characterCodes: makeArray(PunjabiMappings.drChatrikMappings)
        }
    };
    PunjabiMappings.compositions = [
        [[64 /* AdakBindi */], [62 /* Addak */, 60 /* Bindi */]],
        [[8 /* Aਆ */], [7 /* Aਅ */, 66 /* Kana */]],
        [[8 /* Aਆ */, 60 /* Bindi */], [7 /* Aਅ */, 67 /* KanaBindi */]],
        [[12 /* Eਇ */], [68 /* Sihari */, 11 /* Eੲ */]],
        [[13 /* Eਈ */], [11 /* Eੲ */, 69 /* Bihari */]],
        [[4 /* Uਉ */], [3 /* Uੳ */, 70 /* Aunkar */]],
        [[5 /* Uਊ */], [3 /* Uੳ */, 71 /* Dulainkar */]],
        [[14 /* Eਏ */], [11 /* Eੲ */, 72 /* Lavan */]],
        [[9 /* Aਐ */], [7 /* Aਅ */, 73 /* Dulavan */]],
        [[10 /* Oਔ */], [7 /* Aਅ */, 70 /* Aunkar */]],
        [[52 /* LPairiBindiਲ਼ */], [44 /* Lਲ */, 53 /* PairiBindi */]],
        [[47 /* SPairiBindiਸ਼ */], [15 /* Sਸ */, 53 /* PairiBindi */]],
        [[48 /* KPairiBindiਖ਼ */], [18 /* Kਖ */, 53 /* PairiBindi */]],
        [[49 /* GPairiBindiਗ਼ */], [19 /* Gਗ */, 53 /* PairiBindi */]],
        [[50 /* JPairiBindiਜ਼ */], [24 /* Jਜ */, 53 /* PairiBindi */]],
        [[51 /* FPairiBindiਫ਼ */], [38 /* Fਫ */, 53 /* PairiBindi */]],
        [[81 /* DoubleDanda */], [78 /* Danda */, 78 /* Danda */], [82 /* DoubleDanda2 */]],
        [[78 /* Danda */], [79 /* Danda2 */], [80 /* Danda3 */]],
        [[67 /* KanaBindi */], [66 /* Kana */, 60 /* Bindi */]],
        [[56 /* PairiHaha */], [76 /* Virama */, 16 /* Hਹ */]],
        [[57 /* PairiRara */], [76 /* Virama */, 43 /* Rਰ */]],
        [[63 /* Addak2 */], [62 /* Addak */]],
        [[0 /* ੴ */], [1 /* AO1 */, 2 /* AO2 */], [1 /* AO1 */]],
        [[53 /* PairiBindi */], [54 /* PairiBindi2 */]],
        [[58 /* Tippi */], [59 /* Tippi2 */]],
    ];
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
})(PunjabiMappings || (PunjabiMappings = {}));
