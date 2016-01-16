var Convertor;
(function (Convertor) {
    function convertStringUsingMapper(mapperConfig, stringToConvert) {
        var mapper = mapperConfig.mapper, maxWidth = mapperConfig.maxWidth, moveRightChars = mapperConfig.moveRightChars, moveLeftChars = mapperConfig.moveLeftChars, moveAcrossCharacters = mapperConfig.moveAcrossCharacters;
        var output = [];
        var charToAddOnRight = "";
        var charToMoveRightIndex = 0;
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
                if (charToMoveRightIndex < 1) {
                    charToMoveRightIndex = 1;
                    output.push(charToAdd);
                }
                else if (moveAcrossCharacters.indexOf(charToAdd) > -1) {
                    output.push(charToAdd);
                }
                else {
                    output.push(charToAddOnRight, charToAdd);
                    charToAddOnRight = null;
                    charToMoveRightIndex = 0;
                }
            }
            else if (moveRightChars.indexOf(charToAdd) > -1) {
                charToAddOnRight = charToAdd;
            }
            else if (moveLeftChars.indexOf(charToAdd) > -1 && output.length) {
                insertCharOnLeft(output, moveAcrossCharacters, charToAdd, []);
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
    Convertor.convertStringUsingMapper = convertStringUsingMapper;
    function insertCharOnLeft(chars, moveLeftAcrossChars, characterToAdd, onRightChars) {
        var lastChar = chars.pop();
        if (lastChar) {
            if (moveLeftAcrossChars.indexOf(lastChar) > -1) {
                onRightChars.unshift(lastChar);
                insertCharOnLeft(chars, moveLeftAcrossChars, characterToAdd, onRightChars);
            }
            else {
                chars.push.apply(chars, [characterToAdd, lastChar].concat(onRightChars));
            }
        }
        else {
            chars.push.apply(chars, [characterToAdd].concat(onRightChars));
        }
    }
    function getMapper(to, from, compositions, moveAcrossCharSet) {
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
        var moveAcrossCharacters = moveAcrossCharSet
            .map(function (a) { return getCompositionCharacters(a, to.characterCodes); })
            .reduce(function (a, b) { return a.concat(b); }, []);
        return {
            mapper: mapper,
            maxWidth: maxWidth,
            moveLeftChars: moveLeftCharIndexes.map(function (c) { return getCharFromUnicode(to.characterCodes[c]); }),
            moveAcrossCharacters: moveAcrossCharacters,
            moveRightChars: moveRightCharIndexes.map(function (c) { return getCharFromUnicode(to.characterCodes[c]); })
        };
    }
    Convertor.getMapper = getMapper;
    function getCompositionCharacters(compositionCharArrays, codes) {
        var characters = [];
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
var PunjabiFontConvertor;
(function (PunjabiFontConvertor) {
    PunjabiFontConvertor.anmolMapping = (_a = {},
        _a[1 /* IkOnkarVersion1a */] = 0x3c,
        _a[2 /* IkOnkarVersion1b */] = 0x3e,
        _a[4 /* IkOnkarVersion2a */] = 0xc5,
        _a[5 /* IkOnkarVersion2b */] = 0xc6,
        _a[6 /* IkOnkarVersion3 */] = 0xa1,
        _a[7 /* Uੳ */] = 0x61,
        //[Char.Uਉ]: 0x00,
        //[Char.Uਊ]: 0x00,
        _a[10 /* Oਓ */] = 0x45,
        _a[11 /* Aਅ */] = 0x41,
        //[Char.Aਆ]: 0x00,
        //[Char.Aਐ]: 0x00,
        //[Char.Oਔ]: 0x00,
        _a[15 /* Eੲ */] = 0x65,
        //[Char.Eਇ]: 0x00,
        //[Char.Eਈ]: 0x00,
        //[Char.Eਏ]: 0x00,
        _a[19 /* Sਸ */] = 0x73,
        _a[20 /* Hਹ */] = 0x68,
        _a[21 /* Kਕ */] = 0x6b,
        _a[22 /* Kਖ */] = 0x4b,
        _a[23 /* Gਗ */] = 0x67,
        _a[24 /* Gਘ */] = 0x47,
        _a[25 /* Nਙ */] = 0x7c,
        _a[26 /* Cਚ */] = 0x63,
        _a[27 /* Cਛ */] = 0x43,
        _a[28 /* Jਜ */] = 0x6a,
        _a[29 /* Jਝ */] = 0x4a,
        _a[30 /* Nਞ */] = 0x5c,
        _a[31 /* Tਟ */] = 0x74,
        _a[32 /* Tਠ */] = 0x54,
        _a[33 /* Dਡ */] = 0x66,
        _a[34 /* Dਢ */] = 0x46,
        _a[35 /* Nਣ */] = 0x78,
        _a[36 /* Tਤ */] = 0x71,
        _a[37 /* Tਥ */] = 0x51,
        _a[38 /* Dਦ */] = 0x64,
        _a[39 /* Dਧ */] = 0x44,
        _a[40 /* Nਨ */] = 0x6e,
        _a[41 /* Pਪ */] = 0x70,
        _a[42 /* Fਫ */] = 0x50,
        _a[43 /* Bਬ */] = 0x62,
        _a[44 /* Bਭ */] = 0x42,
        _a[45 /* Mਮ */] = 0x6d,
        _a[46 /* Yਯ */] = 0x58,
        _a[47 /* Rਰ */] = 0x72,
        _a[48 /* Lਲ */] = 0x6c,
        _a[49 /* Vਵ */] = 0x76,
        _a[50 /* Rੜ */] = 0x56,
        _a[51 /* SPairiBindiਸ਼ */] = 0x53,
        _a[52 /* KPairiBindiਖ਼ */] = 0x5e,
        _a[53 /* GPairiBindiਗ਼ */] = 0x5a,
        _a[54 /* JPairiBindiਜ਼ */] = 0x7a,
        _a[55 /* FPairiBindiਫ਼ */] = 0x26,
        _a[56 /* LPairiBindiਲ਼ */] = 0x4c,
        _a[57 /* PairiBindi */] = 0xe6,
        _a[59 /* Dot */] = 0x2e,
        _a[60 /* PairiHaha */] = 0x48,
        _a[61 /* PairiHahaDulainkar */] = 0xa7,
        _a[62 /* PairiRara */] = 0x52,
        _a[63 /* PairiRaraPairiBindi */] = 0xae,
        _a[64 /* PairiChacha */] = 0xe7,
        _a[65 /* PairiTenka */] = 0x2020,
        _a[66 /* PairiVava */] = 0xcd,
        _a[67 /* PairiYaiya */] = 0xcf,
        _a[68 /* PairiTata */] = 0x153,
        _a[69 /* PairiNana */] = 0x2dc,
        _a[70 /* HalfYaiyaRight */] = 0xce,
        _a[72 /* Tippi */] = 0x4d,
        //[Char.Bindi]: 0x00,
        //[Char.Visagra]: 0x00,
        _a[78 /* AddakAbove */] = 0x60,
        _a[79 /* AddakRight */] = 0x7e,
        _a[80 /* AddakRight2 */] = 0xa4,
        _a[81 /* AdakBindi */] = 0x0A01,
        _a[75 /* Bindi */] = 0x4e,
        _a[76 /* Bindi2 */] = 0x2c6,
        //[Char.Yakash]: 0x00,
        _a[83 /* Kana */] = 0x77,
        _a[84 /* KanaBindi */] = 0x57,
        _a[85 /* Sihari */] = 0x69,
        _a[86 /* Bihari */] = 0x49,
        _a[87 /* Aunkar */] = 0x75,
        _a[88 /* Aunkar2 */] = 0xfc,
        _a[89 /* Dulainkar */] = 0x55,
        _a[90 /* Dulainkar2 */] = 0xa8,
        _a[91 /* Lavan */] = 0x79,
        _a[92 /* Dulavan */] = 0x59,
        _a[93 /* Hora */] = 0x6f,
        _a[94 /* Kanaura */] = 0x4f,
        _a[95 /* Virama */] = 0x40,
        //[Char.Udaat]: 0x00,
        _a[97 /* Danda */] = 0x5b,
        _a[101 /* DoubleDanda */] = 0x5d,
        _a[102 /* DoubleDanda2 */] = 0xd2,
        _a[103 /* GZero */] = 0xfa,
        _a[104 /* GOne */] = 0xf1,
        _a[105 /* GTwo */] = 0xf2,
        _a[106 /* GThree */] = 0xf3,
        _a[107 /* GFour */] = 0xf4,
        _a[108 /* GFive */] = 0xf5,
        _a[109 /* GSix */] = 0xf6,
        _a[110 /* GSeven */] = 0xf7,
        _a[111 /* GEight */] = 0xf8,
        _a[112 /* GNine */] = 0xf9,
        _a[113 /* Nu */] = 0x192,
        _a[117 /* Khanda */] = 0xc7,
        _a[115 /* Divide */] = 0x2039,
        _a[116 /* Multiply */] = 0xbf,
        _a[118 /* FlowerDesign1 */] = 0x152,
        _a[119 /* FlowerDesign2 */] = 0x201a,
        _a[120 /* FlowerDesign3 */] = 0x2030,
        _a[121 /* FlowerDesign4 */] = 0xd3,
        _a[122 /* FlowerDesign5 */] = 0xd4,
        _a[123 /* Diamond */] = 0x2022,
        _a[124 /* KThind */] = 0xff,
        _a[125 /* Colon */] = 0xda,
        _a[126 /* Unknown1 */] = 0xb4,
        _a[127 /* TopRightExtention */] = 0xd8,
        _a[128 /* SingleQuoteCurlyLeft */] = 0x2018,
        _a[129 /* SingleQuoteCurlyRight */] = 0x2019,
        _a
    );
    var _a;
})(PunjabiFontConvertor || (PunjabiFontConvertor = {}));
var PunjabiFontConvertor;
(function (PunjabiFontConvertor) {
    PunjabiFontConvertor.unicodeMapping = (_a = {},
        _a[0 /* IkOnkarVersion1 */] = 0x0A74,
        //[Char.IkOnkarVersion1b]: ,
        //[Char.IkOnkarVersion2a]: ,
        //[Char.IkOnkarVersion2b]: ,
        //[Char.IkOnkarVersion3]: ,
        _a[7 /* Uੳ */] = 0x0A73,
        _a[8 /* Uਉ */] = 0x0A09,
        _a[9 /* Uਊ */] = 0x0A0A,
        _a[10 /* Oਓ */] = 0x0A13,
        _a[11 /* Aਅ */] = 0x0A05,
        _a[12 /* Aਆ */] = 0x0A06,
        _a[13 /* Aਐ */] = 0x0A10,
        _a[14 /* Oਔ */] = 0x0A14,
        _a[15 /* Eੲ */] = 0x0A72,
        _a[16 /* Eਇ */] = 0x0A07,
        _a[17 /* Eਈ */] = 0x0A08,
        _a[18 /* Eਏ */] = 0x0A0F,
        _a[19 /* Sਸ */] = 0x0A38,
        _a[20 /* Hਹ */] = 0x0A39,
        _a[21 /* Kਕ */] = 0x0A15,
        _a[22 /* Kਖ */] = 0x0A16,
        _a[23 /* Gਗ */] = 0x0A17,
        _a[24 /* Gਘ */] = 0x0A18,
        _a[25 /* Nਙ */] = 0x0A19,
        _a[26 /* Cਚ */] = 0x0A1A,
        _a[27 /* Cਛ */] = 0x0A1B,
        _a[28 /* Jਜ */] = 0x0A1C,
        _a[29 /* Jਝ */] = 0x0A1D,
        _a[30 /* Nਞ */] = 0x0A1E,
        _a[31 /* Tਟ */] = 0x0A1F,
        _a[32 /* Tਠ */] = 0x0A20,
        _a[33 /* Dਡ */] = 0x0A21,
        _a[34 /* Dਢ */] = 0x0A22,
        _a[35 /* Nਣ */] = 0x0A23,
        _a[36 /* Tਤ */] = 0x0A24,
        _a[37 /* Tਥ */] = 0x0A25,
        _a[38 /* Dਦ */] = 0x0A26,
        _a[39 /* Dਧ */] = 0x0A27,
        _a[40 /* Nਨ */] = 0x0A28,
        _a[41 /* Pਪ */] = 0x0A2A,
        _a[42 /* Fਫ */] = 0x0A2B,
        _a[43 /* Bਬ */] = 0x0A2C,
        _a[44 /* Bਭ */] = 0x0A2D,
        _a[45 /* Mਮ */] = 0x0A2E,
        _a[46 /* Yਯ */] = 0x0A2F,
        _a[47 /* Rਰ */] = 0x0A30,
        _a[48 /* Lਲ */] = 0x0A32,
        _a[49 /* Vਵ */] = 0x0A35,
        _a[50 /* Rੜ */] = 0x0A5C,
        _a[51 /* SPairiBindiਸ਼ */] = 0x0A36,
        _a[52 /* KPairiBindiਖ਼ */] = 0x0A59,
        _a[53 /* GPairiBindiਗ਼ */] = 0x0A5A,
        _a[54 /* JPairiBindiਜ਼ */] = 0x0A5B,
        _a[55 /* FPairiBindiਫ਼ */] = 0x0A5E,
        _a[56 /* LPairiBindiਲ਼ */] = 0x0A33,
        _a[57 /* PairiBindi */] = 0x0A3C,
        //[Char.Dot]:,
        //[Char.PairiHaha]: ,
        //[Char.PairiRara]: 
        //[Char.PairiChacha]: ,
        //[Char.PairiTenka]: ,
        //[Char.PairiVava]: ,
        //[Char.PairiYaiya]: ,
        //[Char.PairiTata]: ,
        //[Char.PairiNana]: c,
        //[Char.HalfYaiya]:e,
        _a[72 /* Tippi */] = 0x0A70,
        _a[75 /* Bindi */] = 0x0A02,
        _a[77 /* Visagra */] = 0x0A03,
        _a[79 /* AddakRight */] = 0x0A71,
        //[Char.Addak2]: 0x00,
        //[Char.AdakBindi]: 0x00,
        //[Char.Bindi]:
        _a[82 /* Yakash */] = 0x0A75,
        _a[83 /* Kana */] = 0x0A3E,
        // [Char.KanaBindi]: 
        _a[85 /* Sihari */] = 0x0A3F,
        _a[86 /* Bihari */] = 0x0A40,
        _a[87 /* Aunkar */] = 0x0A41,
        _a[89 /* Dulainkar */] = 0x0A42,
        _a[91 /* Lavan */] = 0x0A47,
        _a[92 /* Dulavan */] = 0x0A48,
        _a[93 /* Hora */] = 0x0A4B,
        _a[94 /* Kanaura */] = 0x0A4C,
        _a[95 /* Virama */] = 0x0A4D,
        _a[96 /* Udaat */] = 0x0A51,
        _a[97 /* Danda */] = 0x0964,
        _a[101 /* DoubleDanda */] = 0x0965,
        _a[103 /* GZero */] = 0x0A66,
        _a[104 /* GOne */] = 0x0A67,
        _a[105 /* GTwo */] = 0x0A68,
        _a[106 /* GThree */] = 0x0A69,
        _a[107 /* GFour */] = 0x0A6A,
        _a[108 /* GFive */] = 0x0A6B,
        _a[109 /* GSix */] = 0x0A6C,
        _a[110 /* GSeven */] = 0x0A6D,
        _a[111 /* GEight */] = 0x0A6E,
        _a[112 /* GNine */] = 0x0A6F,
        //[Char.Nu]: ,
        //[Char.Khanda]: ,
        _a[115 /* Divide */] = 0xf7,
        _a[116 /* Multiply */] = 0xd7,
        //[Char.FlowerDesign1]: ,
        //[Char.FlowerDesign2]: ,
        //[Char.FlowerDesign3]: ,
        //[Char.FlowerDesign4]: ,
        //[Char.FlowerDesign5]: ,
        _a[124 /* KThind */] = 0xff,
        _a[125 /* Colon */] = 0xda,
        _a[128 /* SingleQuoteCurlyLeft */] = 0x2018,
        _a[129 /* SingleQuoteCurlyRight */] = 0x2019,
        _a
    );
    var _a;
})(PunjabiFontConvertor || (PunjabiFontConvertor = {}));
var PunjabiFontConvertor;
(function (PunjabiFontConvertor) {
    PunjabiFontConvertor.drChatrikMappings = (_a = {},
        _a[1 /* IkOnkarVersion1a */] = 0xc3,
        _a[2 /* IkOnkarVersion1b */] = 0xc4,
        _a[7 /* Uੳ */] = 0x41,
        _a[11 /* Aਅ */] = 0x61,
        _a[15 /* Eੲ */] = 0x65,
        _a[19 /* Sਸ */] = 0x73,
        _a[20 /* Hਹ */] = 0x68,
        _a[21 /* Kਕ */] = 0x6b,
        _a[22 /* Kਖ */] = 0x4b,
        _a[23 /* Gਗ */] = 0x67,
        _a[24 /* Gਘ */] = 0x47,
        _a[25 /* Nਙ */] = 0xd5,
        _a[26 /* Cਚ */] = 0x63,
        _a[27 /* Cਛ */] = 0x43,
        _a[28 /* Jਜ */] = 0x6a,
        _a[29 /* Jਝ */] = 0x4a,
        _a[30 /* Nਞ */] = 0xd6,
        _a[31 /* Tਟ */] = 0x74,
        _a[32 /* Tਠ */] = 0x54,
        _a[33 /* Dਡ */] = 0x7a,
        _a[34 /* Dਢ */] = 0x5a,
        _a[35 /* Nਣ */] = 0x78,
        _a[36 /* Tਤ */] = 0x71,
        _a[37 /* Tਥ */] = 0x51,
        _a[38 /* Dਦ */] = 0x64,
        _a[39 /* Dਧ */] = 0x44,
        _a[40 /* Nਨ */] = 0x6e,
        _a[41 /* Pਪ */] = 0x70,
        _a[42 /* Fਫ */] = 0x50,
        _a[43 /* Bਬ */] = 0x62,
        _a[44 /* Bਭ */] = 0x42,
        _a[45 /* Mਮ */] = 0x6d,
        _a[46 /* Yਯ */] = 0x58,
        _a[47 /* Rਰ */] = 0x72,
        _a[48 /* Lਲ */] = 0x6c,
        _a[49 /* Vਵ */] = 0x76,
        _a[50 /* Rੜ */] = 0x56,
        _a[51 /* SPairiBindiਸ਼ */] = 0xc8,
        _a[52 /* KPairiBindiਖ਼ */] = 0xc9,
        _a[53 /* GPairiBindiਗ਼ */] = 0xca,
        _a[54 /* JPairiBindiਜ਼ */] = 0xcb,
        _a[55 /* FPairiBindiਫ਼ */] = 0xcc,
        _a[56 /* LPairiBindiਲ਼ */] = 0xdc,
        _a[57 /* PairiBindi */] = 0xe6,
        _a[57 /* PairiBindi */] = 0xe6,
        _a[58 /* PairiBindi2 */] = 0x4c,
        _a[59 /* Dot */] = 0x5b,
        _a[60 /* PairiHaha */] = 0x48,
        _a[62 /* PairiRara */] = 0x52,
        _a[72 /* Tippi */] = 0x4d,
        _a[73 /* Tippi2 */] = 0x53,
        _a[75 /* Bindi */] = 0x4e,
        _a[79 /* AddakRight */] = 0x77,
        _a[80 /* AddakRight2 */] = 0x57,
        _a[81 /* AdakBindi */] = 0x0A01,
        _a[83 /* Kana */] = 0x66,
        _a[84 /* KanaBindi */] = 0x46,
        _a[85 /* Sihari */] = 0x69,
        _a[86 /* Bihari */] = 0x49,
        _a[87 /* Aunkar */] = 0x75,
        _a[89 /* Dulainkar */] = 0x55,
        _a[91 /* Lavan */] = 0x79,
        _a[92 /* Dulavan */] = 0x59,
        _a[93 /* Hora */] = 0x6f,
        _a[94 /* Kanaura */] = 0x4f,
        _a[95 /* Virama */] = 0xd9,
        _a[97 /* Danda */] = 0x2e,
        _a[99 /* Danda2 */] = 0x7c,
        _a[100 /* Danda3 */] = 0xbb,
        _a[101 /* DoubleDanda */] = 0x5d,
        _a[102 /* DoubleDanda2 */] = 0xab,
        _a[103 /* GZero */] = 0xfa,
        _a[104 /* GOne */] = 0xf1,
        _a[105 /* GTwo */] = 0xf2,
        _a[106 /* GThree */] = 0xf3,
        _a[107 /* GFour */] = 0xf4,
        _a[108 /* GFive */] = 0xf5,
        _a[109 /* GSix */] = 0xf6,
        _a[110 /* GSeven */] = 0xf7,
        _a[111 /* GEight */] = 0xf8,
        _a[112 /* GNine */] = 0xf9,
        _a[128 /* SingleQuoteCurlyLeft */] = 0x2018,
        _a[129 /* SingleQuoteCurlyRight */] = 0x2019,
        _a
    );
    var _a;
})(PunjabiFontConvertor || (PunjabiFontConvertor = {}));
var PunjabiFontConvertor;
(function (PunjabiFontConvertor) {
    PunjabiFontConvertor.awazeMappings = (_a = {},
        //[Char.IkOnkarVersion1a]: 0x3c,
        //[Char.IkOnkarVersion1b]: 0x3e,
        _a[4 /* IkOnkarVersion2a */] = 0xc5,
        _a[5 /* IkOnkarVersion2b */] = 0xc6,
        _a[6 /* IkOnkarVersion3 */] = 0xa1,
        _a[7 /* Uੳ */] = 0x75,
        //[Char.Uਉ]: 0x00,
        //[Char.Uਊ]: 0x00,
        _a[10 /* Oਓ */] = 0x6f,
        _a[11 /* Aਅ */] = 0x61,
        //[Char.Aਆ]: 0x00,
        //[Char.Aਐ]: 0x00,
        //[Char.Oਔ]: 0x00,
        _a[15 /* Eੲ */] = 0x65,
        //[Char.Eਇ]: 0x00,
        //[Char.Eਈ]: 0x00,
        //[Char.Eਏ]: 0x00,
        _a[19 /* Sਸ */] = 0x73,
        _a[20 /* Hਹ */] = 0x68,
        _a[21 /* Kਕ */] = 0x63,
        _a[22 /* Kਖ */] = 0x6b,
        _a[23 /* Gਗ */] = 0x67,
        _a[24 /* Gਘ */] = 0x47,
        _a[25 /* Nਙ */] = 0x4c,
        _a[26 /* Cਚ */] = 0x43,
        _a[27 /* Cਛ */] = 0x78,
        _a[28 /* Jਜ */] = 0x6a,
        _a[29 /* Jਝ */] = 0x4a,
        _a[30 /* Nਞ */] = 0x4d,
        _a[31 /* Tਟ */] = 0x74,
        _a[32 /* Tਠ */] = 0x54,
        _a[33 /* Dਡ */] = 0x44,
        _a[34 /* Dਢ */] = 0x51,
        _a[35 /* Nਣ */] = 0x4e,
        _a[36 /* Tਤ */] = 0x56,
        _a[37 /* Tਥ */] = 0x57,
        _a[38 /* Dਦ */] = 0x64,
        _a[39 /* Dਧ */] = 0x59,
        _a[40 /* Nਨ */] = 0x6e,
        _a[41 /* Pਪ */] = 0x70,
        _a[42 /* Fਫ */] = 0x66,
        _a[43 /* Bਬ */] = 0x62,
        _a[44 /* Bਭ */] = 0x42,
        _a[45 /* Mਮ */] = 0x6d,
        _a[46 /* Yਯ */] = 0x79,
        _a[47 /* Rਰ */] = 0x72,
        _a[48 /* Lਲ */] = 0x6c,
        _a[49 /* Vਵ */] = 0x76,
        _a[50 /* Rੜ */] = 0x52,
        _a[51 /* SPairiBindiਸ਼ */] = 0x53,
        _a[52 /* KPairiBindiਖ਼ */] = 0x4b,
        _a[53 /* GPairiBindiਗ਼ */] = 0x5a,
        _a[54 /* JPairiBindiਜ਼ */] = 0x7a,
        _a[55 /* FPairiBindiਫ਼ */] = 0x46,
        //[Char.LPairiBindiਲ਼]: 0x4c,
        _a[57 /* PairiBindi */] = 0xe6,
        _a[59 /* Dot */] = 0x50,
        _a[60 /* PairiHaha */] = 0x48,
        _a[61 /* PairiHahaDulainkar */] = 0xa7,
        _a[62 /* PairiRara */] = 0x71,
        //[Char.PairiRaraPairiBindi]: 0x71,
        _a[64 /* PairiChacha */] = 0xe7,
        _a[65 /* PairiTenka */] = 0x2020,
        _a[66 /* PairiVava */] = 0x58,
        _a[67 /* PairiYaiya */] = 0xcf,
        _a[68 /* PairiTata */] = 0x153,
        _a[69 /* PairiNana */] = 0x2dc,
        _a[71 /* HalfYaiyaLeft */] = 0x77,
        _a[72 /* Tippi */] = 0x2a,
        _a[74 /* TippiRight */] = 0x5e,
        //[Char.Visagra]: 0x00,
        _a[78 /* AddakAbove */] = 0x26,
        _a[79 /* AddakRight */] = 0x25,
        //[Char.AddakRight2]: 0xa4,
        _a[81 /* AdakBindi */] = 0x0A01,
        _a[75 /* Bindi */] = 0x3a,
        _a[76 /* Bindi2 */] = 0x2c6,
        //[Char.Yakash]: 0x00,
        _a[83 /* Kana */] = 0x41,
        _a[84 /* KanaBindi */] = 0x3b,
        _a[85 /* Sihari */] = 0x69,
        _a[86 /* Bihari */] = 0x49,
        _a[87 /* Aunkar */] = 0x55,
        _a[88 /* Aunkar2 */] = 0xfc,
        _a[89 /* Dulainkar */] = 0x3c,
        //[Char.Dulainkar2]: 0xa8,
        _a[91 /* Lavan */] = 0x45,
        _a[92 /* Dulavan */] = 0x3e,
        _a[93 /* Hora */] = 0x7e,
        _a[94 /* Kanaura */] = 0x4f,
        _a[95 /* Virama */] = 0x40,
        //[Char.Udaat]: 0x00,
        _a[97 /* Danda */] = 0x2e,
        _a[98 /* DandaLong */] = 0xa2,
        _a[101 /* DoubleDanda */] = 0x7c,
        //[Char.DoubleDanda2]: 0xd2,
        _a[103 /* GZero */] = 0x201a,
        _a[104 /* GOne */] = 0x2044,
        _a[105 /* GTwo */] = 0xa4,
        _a[106 /* GThree */] = 0x2039,
        _a[107 /* GFour */] = 0x203a,
        _a[108 /* GFive */] = 0xf001,
        _a[109 /* GSix */] = 0xf002,
        _a[110 /* GSeven */] = 0x2021,
        _a[111 /* GEight */] = 0xb0,
        //[Char.GNine]: 0xf9,
        _a[113 /* Nu */] = 0x2dc,
        _a[114 /* NanaDulainkar */] = 0xb6,
        _a[117 /* Khanda */] = 0x2da,
        //[Char.Divide]: 0x2039,
        _a[116 /* Multiply */] = 0xbf,
        _a[118 /* FlowerDesign1 */] = 0x152,
        //[Char.FlowerDesign2]: 0x201a,
        _a[120 /* FlowerDesign3 */] = 0x2030,
        _a[121 /* FlowerDesign4 */] = 0xd3,
        _a[122 /* FlowerDesign5 */] = 0xd4,
        _a[123 /* Diamond */] = 0x2022,
        _a[124 /* KThind */] = 0xff,
        _a[125 /* Colon */] = 0x5c,
        _a[126 /* Unknown1 */] = 0xb4,
        _a[127 /* TopRightExtention */] = 0xd8,
        _a[128 /* SingleQuoteCurlyLeft */] = 0x60,
        _a[129 /* SingleQuoteCurlyRight */] = 0x24,
        _a[130 /* DoubleQuoteCurlyLeft */] = 0x2018,
        _a[131 /* DoubleQuoteCurlyRight */] = 0x2019,
        _a[132 /* SquareBracketLeft */] = 0x5b,
        _a[133 /* SquareBracketLeft2 */] = 0x7b,
        _a[134 /* SquareBracketRight */] = 0x5d,
        _a[135 /* SquareBracketRight2 */] = 0x7d,
        _a
    );
    var _a;
})(PunjabiFontConvertor || (PunjabiFontConvertor = {}));
///<reference path="./charEnum" />
///<reference path="./mappings/anmolFontMappings" />
///<reference path="./mappings/unicodeFontMappings" />
///<reference path="./mappings/drChatrikFontMappings" />
///<reference path="./mappings/awazeFont" />
var PunjabiFontConvertor;
(function (PunjabiFontConvertor) {
    var moveAcrossChaSet = [
        [[60 /* PairiHaha */], [95 /* Virama */, 20 /* Hਹ */]],
        [[62 /* PairiRara */], [95 /* Virama */, 47 /* Rਰ */]],
        [[64 /* PairiChacha */], [95 /* Virama */, 26 /* Cਚ */]],
        [[65 /* PairiTenka */], [95 /* Virama */, 31 /* Tਟ */]],
        [[66 /* PairiVava */], [95 /* Virama */, 49 /* Vਵ */]],
        [[67 /* PairiYaiya */], [95 /* Virama */, 46 /* Yਯ */, 95 /* Virama */, 46 /* Yਯ */]],
        [[68 /* PairiTata */], [95 /* Virama */, 36 /* Tਤ */]],
        [[69 /* PairiNana */], [95 /* Virama */, 40 /* Nਨ */]],
        [[63 /* PairiRaraPairiBindi */], [62 /* PairiRara */, 57 /* PairiBindi */],
            [62 /* PairiRara */, 58 /* PairiBindi2 */], [57 /* PairiBindi */, 95 /* Virama */, 47 /* Rਰ */], [58 /* PairiBindi2 */, 95 /* Virama */, 47 /* Rਰ */]],
    ];
    var ikOnkarVersion1 = [[0 /* IkOnkarVersion1 */], [1 /* IkOnkarVersion1a */, 2 /* IkOnkarVersion1b */], [1 /* IkOnkarVersion1a */]];
    var ikOnkarVersion2 = [[3 /* IkOnkarVersion2 */], [4 /* IkOnkarVersion2a */, 5 /* IkOnkarVersion2b */], [4 /* IkOnkarVersion2a */]];
    var ikOnkarVersion3 = [[6 /* IkOnkarVersion3 */]];
    var compositions = moveAcrossChaSet.concat([
        ikOnkarVersion1,
        ikOnkarVersion2,
        ikOnkarVersion3,
        ikOnkarVersion1.concat(ikOnkarVersion2, ikOnkarVersion3),
        [[70 /* HalfYaiyaRight */], [95 /* Virama */, 46 /* Yਯ */]],
        [[81 /* AdakBindi */], [79 /* AddakRight */, 75 /* Bindi */]],
        [[12 /* Aਆ */], [11 /* Aਅ */, 83 /* Kana */]],
        [[12 /* Aਆ */, 75 /* Bindi */], [11 /* Aਅ */, 84 /* KanaBindi */]],
        [[16 /* Eਇ */], [85 /* Sihari */, 15 /* Eੲ */]],
        [[17 /* Eਈ */], [15 /* Eੲ */, 86 /* Bihari */]],
        [[8 /* Uਉ */], [7 /* Uੳ */, 87 /* Aunkar */]],
        [[9 /* Uਊ */], [7 /* Uੳ */, 89 /* Dulainkar */]],
        [[18 /* Eਏ */], [15 /* Eੲ */, 91 /* Lavan */]],
        [[13 /* Aਐ */], [11 /* Aਅ */, 92 /* Dulavan */]],
        [[14 /* Oਔ */], [11 /* Aਅ */, 94 /* Kanaura */]],
        [[56 /* LPairiBindiਲ਼ */], [48 /* Lਲ */, 57 /* PairiBindi */]],
        [[51 /* SPairiBindiਸ਼ */], [19 /* Sਸ */, 57 /* PairiBindi */]],
        [[52 /* KPairiBindiਖ਼ */], [22 /* Kਖ */, 57 /* PairiBindi */]],
        [[53 /* GPairiBindiਗ਼ */], [23 /* Gਗ */, 57 /* PairiBindi */]],
        [[54 /* JPairiBindiਜ਼ */], [28 /* Jਜ */, 57 /* PairiBindi */]],
        [[55 /* FPairiBindiਫ਼ */], [42 /* Fਫ */, 57 /* PairiBindi */]],
        [[101 /* DoubleDanda */], [97 /* Danda */, 97 /* Danda */], [102 /* DoubleDanda2 */]],
        [[89 /* Dulainkar */], [90 /* Dulainkar2 */]],
        [[87 /* Aunkar */], [88 /* Aunkar2 */]],
        [[97 /* Danda */], [99 /* Danda2 */], [100 /* Danda3 */], [98 /* DandaLong */]],
        [[84 /* KanaBindi */], [83 /* Kana */, 75 /* Bindi */]],
        [[79 /* AddakRight */], [80 /* AddakRight2 */]],
        [[78 /* AddakAbove */], [79 /* AddakRight */], [80 /* AddakRight2 */]],
        [[0 /* IkOnkarVersion1 */], [1 /* IkOnkarVersion1a */, 2 /* IkOnkarVersion1b */], [1 /* IkOnkarVersion1a */]],
        [[57 /* PairiBindi */], [58 /* PairiBindi2 */]],
        [[72 /* Tippi */], [73 /* Tippi2 */], [74 /* TippiRight */]],
        [[113 /* Nu */], [40 /* Nਨ */, 89 /* Dulainkar */, 72 /* Tippi */], [40 /* Nਨ */, 72 /* Tippi */, 89 /* Dulainkar */], [114 /* NanaDulainkar */, 72 /* Tippi */]],
        [[114 /* NanaDulainkar */], [40 /* Nਨ */, 89 /* Dulainkar */]],
        [[118 /* FlowerDesign1 */], [119 /* FlowerDesign2 */], [120 /* FlowerDesign3 */], [121 /* FlowerDesign4 */], [122 /* FlowerDesign5 */]],
        [[61 /* PairiHahaDulainkar */], [95 /* Virama */, 20 /* Hਹ */, 89 /* Dulainkar */]],
    ]);
    var fontConvertorConfigs = {
        "Unicode": {
            moveRightCharacters: [85 /* Sihari */],
            characterCodes: makeArray(PunjabiFontConvertor.unicodeMapping)
        },
        "AnmolUni": {
            moveRightCharacters: [85 /* Sihari */],
            characterCodes: makeArray(PunjabiFontConvertor.unicodeMapping)
        },
        "AnmolLipi": {
            moveRightCharacters: [],
            characterCodes: makeArray(PunjabiFontConvertor.anmolMapping)
        },
        "DrChatrikWeb": {
            moveRightCharacters: [],
            characterCodes: makeArray(PunjabiFontConvertor.drChatrikMappings)
        },
        "Awaze": {
            moveRightCharacters: [],
            characterCodes: makeArray(PunjabiFontConvertor.awazeMappings)
        }
    };
    function convert(str, toFontName, fromFontName) {
        var to = fontConvertorConfigs[toFontName];
        var from = fontConvertorConfigs[fromFontName];
        var mapperConfig = Convertor.getMapper(to, from, compositions, moveAcrossChaSet);
        return Convertor.convertStringUsingMapper(mapperConfig, str);
    }
    PunjabiFontConvertor.convert = convert;
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
})(PunjabiFontConvertor || (PunjabiFontConvertor = {}));
