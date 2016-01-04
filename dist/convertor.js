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
    PunjabiMappings.compositions = [
        [[65 /* AdakBindi */], [63 /* Addak */, 61 /* Bindi */]],
        [[8 /* Aਆ */], [7 /* Aਅ */, 67 /* Kana */]],
        [[9 /* AਆBindi */], [8 /* Aਆ */, 61 /* Bindi */], [7 /* Aਅ */, 68 /* KanaBindi */]],
        [[13 /* Eਇ */], [69 /* Sihari */, 12 /* Eੲ */]],
        [[14 /* Eਈ */], [12 /* Eੲ */, 70 /* Bihari */]],
        [[4 /* Uਉ */], [3 /* Uੳ */, 71 /* Aunkar */]],
        [[5 /* Uਊ */], [3 /* Uੳ */, 72 /* Dulainkar */]],
        [[15 /* Eਏ */], [12 /* Eੲ */, 73 /* Lavan */]],
        [[10 /* Aਐ */], [7 /* Aਅ */, 74 /* Dulavan */]],
        [[11 /* Oਔ */], [7 /* Aਅ */, 71 /* Aunkar */]],
        [[53 /* LPairiBindiਲ਼ */], [45 /* Lਲ */, 54 /* PairiBindi */]],
        [[48 /* SPairiBindiਸ਼ */], [16 /* Sਸ */, 54 /* PairiBindi */]],
        [[49 /* KPairiBindiਖ਼ */], [19 /* Kਖ */, 54 /* PairiBindi */]],
        [[50 /* GPairiBindiਗ਼ */], [20 /* Gਗ */, 54 /* PairiBindi */]],
        [[51 /* JPairiBindiਜ਼ */], [25 /* Jਜ */, 54 /* PairiBindi */]],
        [[52 /* FPairiBindiਫ਼ */], [39 /* Fਫ */, 54 /* PairiBindi */]],
        [[82 /* DoubleDanda */], [79 /* Danda */, 79 /* Danda */], [83 /* DoubleDanda2 */]],
        [[79 /* Danda */], [80 /* Danda2 */], [81 /* Danda3 */]],
        [[68 /* KanaBindi */], [67 /* Kana */, 61 /* Bindi */]],
        [[57 /* PairiHaha */], [77 /* Virama */, 17 /* Hਹ */]],
        [[58 /* PairiRara */], [77 /* Virama */, 44 /* Rਰ */]],
        [[64 /* Addak2 */], [63 /* Addak */]],
        [[0 /* ੴ */], [1 /* AO1 */, 2 /* AO2 */], [1 /* AO1 */]],
        [[54 /* PairiBindi */], [55 /* PairiBindi2 */]],
        [[59 /* Tippi */], [60 /* Tippi2 */]],
    ];
    var unicodeMapping = (_a = {},
        _a[0 /* ੴ */] = 0x0A74,
        _a[3 /* Uੳ */] = 0x0A73,
        _a[4 /* Uਉ */] = 0x0A09,
        _a[5 /* Uਊ */] = 0x0A0A,
        _a[6 /* Oਓ */] = 0x0A13,
        _a[7 /* Aਅ */] = 0x0A05,
        _a[8 /* Aਆ */] = 0x0A06,
        _a[10 /* Aਐ */] = 0x0A10,
        _a[11 /* Oਔ */] = 0x0A14,
        _a[12 /* Eੲ */] = 0x0A72,
        _a[13 /* Eਇ */] = 0x0A07,
        _a[14 /* Eਈ */] = 0x0A08,
        _a[15 /* Eਏ */] = 0x0A0F,
        _a[16 /* Sਸ */] = 0x0A38,
        _a[17 /* Hਹ */] = 0x0A39,
        _a[18 /* Kਕ */] = 0x0A15,
        _a[19 /* Kਖ */] = 0x0A16,
        _a[20 /* Gਗ */] = 0x0A17,
        _a[21 /* Gਘ */] = 0x0A18,
        _a[22 /* Nਙ */] = 0x0A19,
        _a[23 /* Cਚ */] = 0x0A1A,
        _a[24 /* Cਛ */] = 0x0A1B,
        _a[25 /* Jਜ */] = 0x0A1C,
        _a[26 /* Jਝ */] = 0x0A1D,
        _a[27 /* Nਞ */] = 0x0A1E,
        _a[28 /* Tਟ */] = 0x0A1F,
        _a[29 /* Tਠ */] = 0x0A20,
        _a[30 /* Dਡ */] = 0x0A21,
        _a[31 /* Dਢ */] = 0x0A22,
        _a[32 /* Nਣ */] = 0x0A23,
        _a[33 /* Tਤ */] = 0x0A24,
        _a[34 /* Tਥ */] = 0x0A25,
        _a[35 /* Dਦ */] = 0x0A26,
        _a[36 /* Dਧ */] = 0x0A27,
        _a[37 /* Nਨ */] = 0x0A28,
        _a[38 /* Pਪ */] = 0x0A2A,
        _a[39 /* Fਫ */] = 0x0A2B,
        _a[40 /* Bਬ */] = 0x0A2C,
        _a[41 /* Bਭ */] = 0x0A2D,
        _a[42 /* Mਮ */] = 0x0A2E,
        _a[43 /* Yਯ */] = 0x0A2F,
        _a[44 /* Rਰ */] = 0x0A30,
        _a[45 /* Lਲ */] = 0x0A32,
        _a[46 /* Vਵ */] = 0x0A35,
        _a[47 /* Rੜ */] = 0x0A5C,
        _a[48 /* SPairiBindiਸ਼ */] = 0x0A36,
        _a[49 /* KPairiBindiਖ਼ */] = 0x0A59,
        _a[50 /* GPairiBindiਗ਼ */] = 0x0A5A,
        _a[51 /* JPairiBindiਜ਼ */] = 0x0A5B,
        _a[52 /* FPairiBindiਫ਼ */] = 0x0A5E,
        _a[53 /* LPairiBindiਲ਼ */] = 0x0A33,
        _a[54 /* PairiBindi */] = 0x0A3C,
        _a[59 /* Tippi */] = 0x0A70,
        _a[61 /* Bindi */] = 0x0A02,
        _a[62 /* Visagra */] = 0x0A03,
        _a[63 /* Addak */] = 0x0A71,
        _a[65 /* AdakBindi */] = 0x0A01,
        _a[66 /* Yakash */] = 0x0A75,
        _a[67 /* Kana */] = 0x0A3E,
        _a[69 /* Sihari */] = 0x0A3F,
        _a[70 /* Bihari */] = 0x0A40,
        _a[71 /* Aunkar */] = 0x0A41,
        _a[72 /* Dulainkar */] = 0x0A42,
        _a[73 /* Lavan */] = 0x0A47,
        _a[74 /* Dulavan */] = 0x0A48,
        _a[75 /* Hora */] = 0x0A4B,
        _a[76 /* Kanaura */] = 0x0A4C,
        _a[77 /* Virama */] = 0x0A4D,
        _a[78 /* Udaat */] = 0x0A51,
        _a[79 /* Danda */] = 0x0964,
        _a[82 /* DoubleDanda */] = 0x0965,
        _a[84 /* Zero */] = 0x0A66,
        _a[85 /* One */] = 0x0A67,
        _a[86 /* Two */] = 0x0A68,
        _a[87 /* Three */] = 0x0A69,
        _a[88 /* Four */] = 0x0A6A,
        _a[89 /* Five */] = 0x0A6B,
        _a[90 /* Six */] = 0x0A6C,
        _a[91 /* Seven */] = 0x0A6D,
        _a[92 /* Eight */] = 0x0A6E,
        _a[93 /* Nine */] = 0x0A6F,
        _a
    );
    var anmolMapping = (_b = {},
        _b[1 /* AO1 */] = 0x3c,
        _b[2 /* AO2 */] = 0x3e,
        _b[3 /* Uੳ */] = 0x61,
        _b[6 /* Oਓ */] = 0x45,
        _b[7 /* Aਅ */] = 0x41,
        _b[12 /* Eੲ */] = 0x65,
        _b[16 /* Sਸ */] = 0x73,
        _b[17 /* Hਹ */] = 0x68,
        _b[18 /* Kਕ */] = 0x6b,
        _b[19 /* Kਖ */] = 0x4b,
        _b[20 /* Gਗ */] = 0x67,
        _b[21 /* Gਘ */] = 0x47,
        _b[22 /* Nਙ */] = 0x7c,
        _b[23 /* Cਚ */] = 0x63,
        _b[24 /* Cਛ */] = 0x43,
        _b[25 /* Jਜ */] = 0x6a,
        _b[26 /* Jਝ */] = 0x4a,
        _b[27 /* Nਞ */] = 0x5c,
        _b[28 /* Tਟ */] = 0x74,
        _b[29 /* Tਠ */] = 0x54,
        _b[30 /* Dਡ */] = 0x66,
        _b[31 /* Dਢ */] = 0x46,
        _b[32 /* Nਣ */] = 0x78,
        _b[33 /* Tਤ */] = 0x71,
        _b[34 /* Tਥ */] = 0x51,
        _b[35 /* Dਦ */] = 0x64,
        _b[36 /* Dਧ */] = 0x44,
        _b[37 /* Nਨ */] = 0x6e,
        _b[38 /* Pਪ */] = 0x70,
        _b[39 /* Fਫ */] = 0x50,
        _b[40 /* Bਬ */] = 0x62,
        _b[41 /* Bਭ */] = 0x42,
        _b[42 /* Mਮ */] = 0x6d,
        _b[43 /* Yਯ */] = 0x58,
        _b[44 /* Rਰ */] = 0x72,
        _b[45 /* Lਲ */] = 0x6c,
        _b[46 /* Vਵ */] = 0x76,
        _b[47 /* Rੜ */] = 0x56,
        _b[48 /* SPairiBindiਸ਼ */] = 0x53,
        _b[49 /* KPairiBindiਖ਼ */] = 0x5e,
        _b[51 /* JPairiBindiਜ਼ */] = 0x7a,
        _b[52 /* FPairiBindiਫ਼ */] = 0x26,
        _b[53 /* LPairiBindiਲ਼ */] = 0x4c,
        _b[54 /* PairiBindi */] = 0xe6,
        _b[56 /* Dot */] = 0x2e,
        _b[57 /* PairiHaha */] = 0x48,
        _b[58 /* PairiRara */] = 0x52,
        _b[59 /* Tippi */] = 0x4d,
        _b[63 /* Addak */] = 0x60,
        _b[64 /* Addak2 */] = 0x7e,
        _b[65 /* AdakBindi */] = 0x0A01,
        _b[61 /* Bindi */] = 0x4e,
        _b[67 /* Kana */] = 0x77,
        _b[68 /* KanaBindi */] = 0x57,
        _b[69 /* Sihari */] = 0x69,
        _b[70 /* Bihari */] = 0x49,
        _b[71 /* Aunkar */] = 0x75,
        _b[72 /* Dulainkar */] = 0x55,
        _b[73 /* Lavan */] = 0x79,
        _b[74 /* Dulavan */] = 0x59,
        _b[75 /* Hora */] = 0x6f,
        _b[76 /* Kanaura */] = 0x4f,
        _b[77 /* Virama */] = 0x40,
        _b[79 /* Danda */] = 0x5b,
        _b[82 /* DoubleDanda */] = 0x5d,
        _b[84 /* Zero */] = 0x30,
        _b[85 /* One */] = 0x31,
        _b[86 /* Two */] = 0x32,
        _b[87 /* Three */] = 0x33,
        _b[88 /* Four */] = 0x34,
        _b[89 /* Five */] = 0x35,
        _b[90 /* Six */] = 0x36,
        _b[91 /* Seven */] = 0x37,
        _b[92 /* Eight */] = 0x38,
        _b[93 /* Nine */] = 0x39,
        _b
    );
    var drChatrikMappings = (_c = {},
        _c[1 /* AO1 */] = 0xc3,
        _c[2 /* AO2 */] = 0xc4,
        _c[3 /* Uੳ */] = 0x41,
        _c[7 /* Aਅ */] = 0x61,
        _c[12 /* Eੲ */] = 0x65,
        _c[16 /* Sਸ */] = 0x73,
        _c[17 /* Hਹ */] = 0x68,
        _c[18 /* Kਕ */] = 0x6b,
        _c[19 /* Kਖ */] = 0x4b,
        _c[20 /* Gਗ */] = 0x67,
        _c[21 /* Gਘ */] = 0x47,
        _c[22 /* Nਙ */] = 0xd5,
        _c[23 /* Cਚ */] = 0x63,
        _c[24 /* Cਛ */] = 0x43,
        _c[25 /* Jਜ */] = 0x6a,
        _c[26 /* Jਝ */] = 0x4a,
        _c[27 /* Nਞ */] = 0xd6,
        _c[28 /* Tਟ */] = 0x74,
        _c[29 /* Tਠ */] = 0x54,
        _c[30 /* Dਡ */] = 0x7a,
        _c[31 /* Dਢ */] = 0x5a,
        _c[32 /* Nਣ */] = 0x78,
        _c[33 /* Tਤ */] = 0x71,
        _c[34 /* Tਥ */] = 0x51,
        _c[35 /* Dਦ */] = 0x64,
        _c[36 /* Dਧ */] = 0x44,
        _c[37 /* Nਨ */] = 0x6e,
        _c[38 /* Pਪ */] = 0x70,
        _c[39 /* Fਫ */] = 0x50,
        _c[40 /* Bਬ */] = 0x62,
        _c[41 /* Bਭ */] = 0x42,
        _c[42 /* Mਮ */] = 0x6d,
        _c[43 /* Yਯ */] = 0x58,
        _c[44 /* Rਰ */] = 0x72,
        _c[45 /* Lਲ */] = 0x6c,
        _c[46 /* Vਵ */] = 0x76,
        _c[47 /* Rੜ */] = 0x56,
        _c[48 /* SPairiBindiਸ਼ */] = 0xc8,
        _c[49 /* KPairiBindiਖ਼ */] = 0xc9,
        _c[50 /* GPairiBindiਗ਼ */] = 0xca,
        _c[51 /* JPairiBindiਜ਼ */] = 0xcb,
        _c[52 /* FPairiBindiਫ਼ */] = 0xcc,
        _c[53 /* LPairiBindiਲ਼ */] = 0xdc,
        _c[54 /* PairiBindi */] = 0xe6,
        _c[54 /* PairiBindi */] = 0xe6,
        _c[55 /* PairiBindi2 */] = 0x4c,
        _c[56 /* Dot */] = 0x5b,
        _c[57 /* PairiHaha */] = 0x48,
        _c[58 /* PairiRara */] = 0x52,
        _c[59 /* Tippi */] = 0x4d,
        _c[60 /* Tippi2 */] = 0x53,
        _c[61 /* Bindi */] = 0x4e,
        _c[63 /* Addak */] = 0x57,
        _c[64 /* Addak2 */] = 0x77,
        _c[65 /* AdakBindi */] = 0x0A01,
        _c[67 /* Kana */] = 0x66,
        _c[68 /* KanaBindi */] = 0x46,
        _c[69 /* Sihari */] = 0x69,
        _c[70 /* Bihari */] = 0x49,
        _c[71 /* Aunkar */] = 0x75,
        _c[72 /* Dulainkar */] = 0x55,
        _c[73 /* Lavan */] = 0x79,
        _c[74 /* Dulavan */] = 0x59,
        _c[75 /* Hora */] = 0x6f,
        _c[76 /* Kanaura */] = 0x4f,
        _c[77 /* Virama */] = 0xd9,
        _c[79 /* Danda */] = 0x2e,
        _c[80 /* Danda2 */] = 0x7c,
        _c[81 /* Danda3 */] = 0xbb,
        _c[82 /* DoubleDanda */] = 0x5d,
        _c[83 /* DoubleDanda2 */] = 0xab,
        _c[84 /* Zero */] = 0x30,
        _c[85 /* One */] = 0x31,
        _c[86 /* Two */] = 0x32,
        _c[87 /* Three */] = 0x33,
        _c[88 /* Four */] = 0x34,
        _c[89 /* Five */] = 0x35,
        _c[90 /* Six */] = 0x36,
        _c[91 /* Seven */] = 0x37,
        _c[92 /* Eight */] = 0x38,
        _c[93 /* Nine */] = 0x39,
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
            moveRightCharacters: [69 /* Sihari */],
            characterCodes: makeArray(unicodeMapping)
        },
        "AnmolLipi": {
            moveRightCharacters: [],
            characterCodes: makeArray(anmolMapping)
        },
        "DrChatrikWeb": {
            moveRightCharacters: [],
            characterCodes: makeArray(drChatrikMappings)
        }
    };
    var _a, _b, _c;
})(PunjabiMappings || (PunjabiMappings = {}));
