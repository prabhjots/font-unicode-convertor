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
        var maxWidth = 1;
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
        _a[11 /* Uੳ */] = 0x61,
        //[Char.Uਉ]: 0x00,
        //[Char.Uਊ]: 0x00,
        _a[15 /* Oਓ */] = 0x45,
        _a[16 /* Aਅ */] = 0x41,
        //[Char.Aਆ]: 0x00,
        //[Char.Aਐ]: 0x00,
        //[Char.Oਔ]: 0x00,
        _a[20 /* Eੲ */] = 0x65,
        //[Char.Eਇ]: 0x00,
        //[Char.Eਈ]: 0x00,
        //[Char.Eਏ]: 0x00,
        _a[24 /* Sਸ */] = 0x73,
        _a[25 /* Hਹ */] = 0x68,
        _a[26 /* Kਕ */] = 0x6b,
        _a[27 /* Kਖ */] = 0x4b,
        _a[28 /* Gਗ */] = 0x67,
        _a[29 /* Gਘ */] = 0x47,
        _a[30 /* Nਙ */] = 0x7c,
        _a[31 /* Cਚ */] = 0x63,
        _a[32 /* Cਛ */] = 0x43,
        _a[33 /* Jਜ */] = 0x6a,
        _a[34 /* Jਝ */] = 0x4a,
        _a[35 /* Nਞ */] = 0x5c,
        _a[36 /* Tਟ */] = 0x74,
        _a[37 /* Tਠ */] = 0x54,
        _a[38 /* Dਡ */] = 0x66,
        _a[39 /* Dਢ */] = 0x46,
        _a[40 /* Nਣ */] = 0x78,
        _a[41 /* Tਤ */] = 0x71,
        _a[42 /* Tਥ */] = 0x51,
        _a[43 /* Dਦ */] = 0x64,
        _a[44 /* Dਧ */] = 0x44,
        _a[45 /* Nਨ */] = 0x6e,
        _a[46 /* Pਪ */] = 0x70,
        _a[47 /* Fਫ */] = 0x50,
        _a[48 /* Bਬ */] = 0x62,
        _a[49 /* Bਭ */] = 0x42,
        _a[50 /* Mਮ */] = 0x6d,
        _a[51 /* Yਯ */] = 0x58,
        _a[52 /* Rਰ */] = 0x72,
        _a[53 /* Lਲ */] = 0x6c,
        _a[54 /* Vਵ */] = 0x76,
        _a[55 /* Rੜ */] = 0x56,
        _a[56 /* SPairiBindiਸ਼ */] = 0x53,
        _a[57 /* KPairiBindiਖ਼ */] = 0x5e,
        _a[58 /* GPairiBindiਗ਼ */] = 0x5a,
        _a[59 /* JPairiBindiਜ਼ */] = 0x7a,
        _a[60 /* FPairiBindiਫ਼ */] = 0x26,
        _a[61 /* LPairiBindiਲ਼ */] = 0x4c,
        _a[62 /* PairiBindi */] = 0xe6,
        _a[64 /* Dot */] = 0x2e,
        _a[65 /* PairiHaha */] = 0x48,
        _a[66 /* PairiHahaDulainkar */] = 0xa7,
        _a[67 /* PairiRara */] = 0x52,
        _a[69 /* PairiRaraPairiBindi */] = 0xae,
        _a[70 /* PairiChacha */] = 0xe7,
        _a[71 /* PairiTenka */] = 0x2020,
        _a[72 /* PairiVava */] = 0xcd,
        _a[73 /* PairiYaiya */] = 0xcf,
        _a[74 /* PairiTata */] = 0x153,
        _a[75 /* PairiNana */] = 0x2dc,
        _a[76 /* HalfYaiyaRight */] = 0xce,
        _a[79 /* Tippi */] = 0x4d,
        //[Char.Bindi]: 0x00,
        //[Char.Visagra]: 0x00,
        _a[85 /* AddakAbove */] = 0x60,
        _a[86 /* AddakRight */] = 0x7e,
        _a[87 /* AddakRight2 */] = 0xa4,
        _a[88 /* AdakBindi */] = 0x0A01,
        _a[82 /* Bindi */] = 0x4e,
        _a[83 /* Bindi2 */] = 0x2c6,
        //[Char.Yakash]: 0x00,
        _a[90 /* Kana */] = 0x77,
        _a[91 /* KanaBindi */] = 0x57,
        _a[92 /* Sihari */] = 0x69,
        _a[93 /* Bihari */] = 0x49,
        _a[95 /* Aunkar */] = 0x75,
        _a[96 /* Aunkar2 */] = 0xfc,
        _a[97 /* Dulainkar */] = 0x55,
        _a[98 /* Dulainkar2 */] = 0xa8,
        _a[99 /* Lavan */] = 0x79,
        _a[100 /* Dulavan */] = 0x59,
        _a[101 /* Hora */] = 0x6f,
        _a[102 /* Kanaura */] = 0x4f,
        _a[104 /* Virama */] = 0x40,
        //[Char.Udaat]: 0x00,
        _a[106 /* Danda */] = 0x5b,
        _a[110 /* DoubleDanda */] = 0x5d,
        _a[111 /* DoubleDanda2 */] = 0xd2,
        _a[112 /* GZero */] = 0xfa,
        _a[113 /* GOne */] = 0xf1,
        _a[114 /* GTwo */] = 0xf2,
        _a[115 /* GThree */] = 0xf3,
        _a[116 /* GFour */] = 0xf4,
        _a[117 /* GFive */] = 0xf5,
        _a[118 /* GSix */] = 0xf6,
        _a[119 /* GSeven */] = 0xf7,
        _a[120 /* GEight */] = 0xf8,
        _a[121 /* GNine */] = 0xf9,
        _a[122 /* EnglishZero */] = 0x30,
        _a[123 /* EnglishOne */] = 0x31,
        _a[124 /* EnglishTwo */] = 0x32,
        _a[125 /* EnglishThree */] = 0x33,
        _a[126 /* EnglishFour */] = 0x34,
        _a[127 /* EnglishFive */] = 0x35,
        _a[128 /* EnglishSix */] = 0x36,
        _a[129 /* EnglishSeven */] = 0x37,
        _a[130 /* EnglishEight */] = 0x38,
        _a[131 /* EnglishNine */] = 0x39,
        _a[132 /* Nu */] = 0x192,
        _a[137 /* Khanda */] = 0xc7,
        _a[135 /* Divide */] = 0x2039,
        _a[136 /* Multiply */] = 0xbf,
        _a[139 /* FlowerDesign1 */] = 0x152,
        _a[140 /* FlowerDesign2 */] = 0x201a,
        _a[141 /* FlowerDesign3 */] = 0x2030,
        _a[142 /* FlowerDesign4 */] = 0xd3,
        _a[143 /* FlowerDesign5 */] = 0xd4,
        _a[144 /* Diamond */] = 0x2022,
        _a[145 /* KThind */] = 0xff,
        _a[146 /* Colon */] = 0x3a,
        _a[147 /* ColonFancy */] = 0xda,
        _a[148 /* SemiColon */] = 0x3b,
        _a[151 /* Unknown1 */] = 0xb4,
        _a[152 /* TopRightExtention */] = 0xd8,
        _a[153 /* SingleQuoteCurlyLeft */] = 0x2018,
        _a[155 /* SingleQuoteCurlyRight */] = 0x2019,
        _a[157 /* DoubleQuoteCurlyLeft */] = 0x201c,
        _a[158 /* DoubleQuoteCurlyRight */] = 0x201d,
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
        _a[11 /* Uੳ */] = 0x0A73,
        _a[12 /* Uਉ */] = 0x0A09,
        _a[14 /* Uਊ */] = 0x0A0A,
        _a[15 /* Oਓ */] = 0x0A13,
        _a[16 /* Aਅ */] = 0x0A05,
        _a[17 /* Aਆ */] = 0x0A06,
        _a[18 /* Aਐ */] = 0x0A10,
        _a[19 /* Oਔ */] = 0x0A14,
        _a[20 /* Eੲ */] = 0x0A72,
        _a[21 /* Eਇ */] = 0x0A07,
        _a[22 /* Eਈ */] = 0x0A08,
        _a[23 /* Eਏ */] = 0x0A0F,
        _a[24 /* Sਸ */] = 0x0A38,
        _a[25 /* Hਹ */] = 0x0A39,
        _a[26 /* Kਕ */] = 0x0A15,
        _a[27 /* Kਖ */] = 0x0A16,
        _a[28 /* Gਗ */] = 0x0A17,
        _a[29 /* Gਘ */] = 0x0A18,
        _a[30 /* Nਙ */] = 0x0A19,
        _a[31 /* Cਚ */] = 0x0A1A,
        _a[32 /* Cਛ */] = 0x0A1B,
        _a[33 /* Jਜ */] = 0x0A1C,
        _a[34 /* Jਝ */] = 0x0A1D,
        _a[35 /* Nਞ */] = 0x0A1E,
        _a[36 /* Tਟ */] = 0x0A1F,
        _a[37 /* Tਠ */] = 0x0A20,
        _a[38 /* Dਡ */] = 0x0A21,
        _a[39 /* Dਢ */] = 0x0A22,
        _a[40 /* Nਣ */] = 0x0A23,
        _a[41 /* Tਤ */] = 0x0A24,
        _a[42 /* Tਥ */] = 0x0A25,
        _a[43 /* Dਦ */] = 0x0A26,
        _a[44 /* Dਧ */] = 0x0A27,
        _a[45 /* Nਨ */] = 0x0A28,
        _a[46 /* Pਪ */] = 0x0A2A,
        _a[47 /* Fਫ */] = 0x0A2B,
        _a[48 /* Bਬ */] = 0x0A2C,
        _a[49 /* Bਭ */] = 0x0A2D,
        _a[50 /* Mਮ */] = 0x0A2E,
        _a[51 /* Yਯ */] = 0x0A2F,
        _a[52 /* Rਰ */] = 0x0A30,
        _a[53 /* Lਲ */] = 0x0A32,
        _a[54 /* Vਵ */] = 0x0A35,
        _a[55 /* Rੜ */] = 0x0A5C,
        _a[56 /* SPairiBindiਸ਼ */] = 0x0A36,
        _a[57 /* KPairiBindiਖ਼ */] = 0x0A59,
        _a[58 /* GPairiBindiਗ਼ */] = 0x0A5A,
        _a[59 /* JPairiBindiਜ਼ */] = 0x0A5B,
        _a[60 /* FPairiBindiਫ਼ */] = 0x0A5E,
        _a[61 /* LPairiBindiਲ਼ */] = 0x0A33,
        _a[62 /* PairiBindi */] = 0x0A3C,
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
        _a[79 /* Tippi */] = 0x0A70,
        _a[82 /* Bindi */] = 0x0A02,
        _a[84 /* Visagra */] = 0x0A03,
        _a[86 /* AddakRight */] = 0x0A71,
        //[Char.Addak2]: 0x00,
        //[Char.AdakBindi]: 0x00,
        //[Char.Bindi]:
        _a[89 /* Yakash */] = 0x0A75,
        _a[90 /* Kana */] = 0x0A3E,
        // [Char.KanaBindi]: 
        _a[92 /* Sihari */] = 0x0A3F,
        _a[93 /* Bihari */] = 0x0A40,
        _a[95 /* Aunkar */] = 0x0A41,
        _a[97 /* Dulainkar */] = 0x0A42,
        _a[99 /* Lavan */] = 0x0A47,
        _a[100 /* Dulavan */] = 0x0A48,
        _a[101 /* Hora */] = 0x0A4B,
        _a[102 /* Kanaura */] = 0x0A4C,
        _a[104 /* Virama */] = 0x0A4D,
        _a[105 /* Udaat */] = 0x0A51,
        _a[106 /* Danda */] = 0x0964,
        _a[110 /* DoubleDanda */] = 0x0965,
        _a[112 /* GZero */] = 0x0A66,
        _a[113 /* GOne */] = 0x0A67,
        _a[114 /* GTwo */] = 0x0A68,
        _a[115 /* GThree */] = 0x0A69,
        _a[116 /* GFour */] = 0x0A6A,
        _a[117 /* GFive */] = 0x0A6B,
        _a[118 /* GSix */] = 0x0A6C,
        _a[119 /* GSeven */] = 0x0A6D,
        _a[120 /* GEight */] = 0x0A6E,
        _a[121 /* GNine */] = 0x0A6F,
        _a[122 /* EnglishZero */] = 0x30,
        _a[123 /* EnglishOne */] = 0x31,
        _a[124 /* EnglishTwo */] = 0x32,
        _a[125 /* EnglishThree */] = 0x33,
        _a[126 /* EnglishFour */] = 0x34,
        _a[127 /* EnglishFive */] = 0x35,
        _a[128 /* EnglishSix */] = 0x36,
        _a[129 /* EnglishSeven */] = 0x37,
        _a[130 /* EnglishEight */] = 0x38,
        _a[131 /* EnglishNine */] = 0x39,
        //[Char.Nu]: ,
        //[Char.Khanda]: ,
        _a[135 /* Divide */] = 0xf7,
        _a[136 /* Multiply */] = 0xd7,
        //[Char.FlowerDesign1]: ,
        //[Char.FlowerDesign2]: ,
        //[Char.FlowerDesign3]: ,
        //[Char.FlowerDesign4]: ,
        //[Char.FlowerDesign5]: ,
        _a[145 /* KThind */] = 0xff,
        _a[146 /* Colon */] = 0x3a,
        _a[148 /* SemiColon */] = 0x3b,
        _a[153 /* SingleQuoteCurlyLeft */] = 0x2018,
        _a[155 /* SingleQuoteCurlyRight */] = 0x2019,
        _a[157 /* DoubleQuoteCurlyLeft */] = 0x201c,
        _a[158 /* DoubleQuoteCurlyRight */] = 0x201d,
        _a
    );
    var _a;
})(PunjabiFontConvertor || (PunjabiFontConvertor = {}));
var PunjabiFontConvertor;
(function (PunjabiFontConvertor) {
    PunjabiFontConvertor.drChatrikMappings = (_a = {},
        _a[1 /* IkOnkarVersion1a */] = 0xc3,
        _a[2 /* IkOnkarVersion1b */] = 0xc4,
        _a[11 /* Uੳ */] = 0x41,
        _a[16 /* Aਅ */] = 0x61,
        _a[20 /* Eੲ */] = 0x65,
        _a[24 /* Sਸ */] = 0x73,
        _a[25 /* Hਹ */] = 0x68,
        _a[26 /* Kਕ */] = 0x6b,
        _a[27 /* Kਖ */] = 0x4b,
        _a[28 /* Gਗ */] = 0x67,
        _a[29 /* Gਘ */] = 0x47,
        _a[30 /* Nਙ */] = 0xd5,
        _a[31 /* Cਚ */] = 0x63,
        _a[32 /* Cਛ */] = 0x43,
        _a[33 /* Jਜ */] = 0x6a,
        _a[34 /* Jਝ */] = 0x4a,
        _a[35 /* Nਞ */] = 0xd6,
        _a[36 /* Tਟ */] = 0x74,
        _a[37 /* Tਠ */] = 0x54,
        _a[38 /* Dਡ */] = 0x7a,
        _a[39 /* Dਢ */] = 0x5a,
        _a[40 /* Nਣ */] = 0x78,
        _a[41 /* Tਤ */] = 0x71,
        _a[42 /* Tਥ */] = 0x51,
        _a[43 /* Dਦ */] = 0x64,
        _a[44 /* Dਧ */] = 0x44,
        _a[45 /* Nਨ */] = 0x6e,
        _a[46 /* Pਪ */] = 0x70,
        _a[47 /* Fਫ */] = 0x50,
        _a[48 /* Bਬ */] = 0x62,
        _a[49 /* Bਭ */] = 0x42,
        _a[50 /* Mਮ */] = 0x6d,
        _a[51 /* Yਯ */] = 0x58,
        _a[52 /* Rਰ */] = 0x72,
        _a[53 /* Lਲ */] = 0x6c,
        _a[54 /* Vਵ */] = 0x76,
        _a[55 /* Rੜ */] = 0x56,
        _a[56 /* SPairiBindiਸ਼ */] = 0xc8,
        _a[57 /* KPairiBindiਖ਼ */] = 0xc9,
        _a[58 /* GPairiBindiਗ਼ */] = 0xca,
        _a[59 /* JPairiBindiਜ਼ */] = 0xcb,
        _a[60 /* FPairiBindiਫ਼ */] = 0xcc,
        _a[61 /* LPairiBindiਲ਼ */] = 0xdc,
        _a[62 /* PairiBindi */] = 0xe6,
        _a[62 /* PairiBindi */] = 0xe6,
        _a[63 /* PairiBindi2 */] = 0x4c,
        _a[64 /* Dot */] = 0x5b,
        _a[65 /* PairiHaha */] = 0x48,
        _a[67 /* PairiRara */] = 0x52,
        _a[79 /* Tippi */] = 0x4d,
        _a[80 /* Tippi2 */] = 0x53,
        _a[82 /* Bindi */] = 0x4e,
        _a[86 /* AddakRight */] = 0x77,
        _a[87 /* AddakRight2 */] = 0x57,
        _a[88 /* AdakBindi */] = 0x0A01,
        _a[90 /* Kana */] = 0x66,
        _a[91 /* KanaBindi */] = 0x46,
        _a[92 /* Sihari */] = 0x69,
        _a[93 /* Bihari */] = 0x49,
        _a[95 /* Aunkar */] = 0x75,
        _a[97 /* Dulainkar */] = 0x55,
        _a[99 /* Lavan */] = 0x79,
        _a[100 /* Dulavan */] = 0x59,
        _a[101 /* Hora */] = 0x6f,
        _a[102 /* Kanaura */] = 0x4f,
        _a[104 /* Virama */] = 0xd9,
        _a[106 /* Danda */] = 0x2e,
        _a[108 /* Danda2 */] = 0x7c,
        _a[109 /* Danda3 */] = 0xbb,
        _a[110 /* DoubleDanda */] = 0x5d,
        _a[111 /* DoubleDanda2 */] = 0xab,
        _a[112 /* GZero */] = 0xfa,
        _a[113 /* GOne */] = 0xf1,
        _a[114 /* GTwo */] = 0xf2,
        _a[115 /* GThree */] = 0xf3,
        _a[116 /* GFour */] = 0xf4,
        _a[117 /* GFive */] = 0xf5,
        _a[118 /* GSix */] = 0xf6,
        _a[119 /* GSeven */] = 0xf7,
        _a[120 /* GEight */] = 0xf8,
        _a[121 /* GNine */] = 0xf9,
        _a[122 /* EnglishZero */] = 0x30,
        _a[123 /* EnglishOne */] = 0x31,
        _a[124 /* EnglishTwo */] = 0x32,
        _a[125 /* EnglishThree */] = 0x33,
        _a[126 /* EnglishFour */] = 0x34,
        _a[127 /* EnglishFive */] = 0x35,
        _a[128 /* EnglishSix */] = 0x36,
        _a[129 /* EnglishSeven */] = 0x37,
        _a[130 /* EnglishEight */] = 0x38,
        _a[131 /* EnglishNine */] = 0x39,
        _a[146 /* Colon */] = 0x3a,
        _a[147 /* ColonFancy */] = 0xda,
        _a[148 /* SemiColon */] = 0x3b,
        _a[153 /* SingleQuoteCurlyLeft */] = 0x2018,
        _a[155 /* SingleQuoteCurlyRight */] = 0x2019,
        _a[157 /* DoubleQuoteCurlyLeft */] = 0x201c,
        _a[158 /* DoubleQuoteCurlyRight */] = 0x201d,
        _a
    );
    var _a;
})(PunjabiFontConvertor || (PunjabiFontConvertor = {}));
var PunjabiFontConvertor;
(function (PunjabiFontConvertor) {
    PunjabiFontConvertor.awazeMappings = (_a = {},
        //[Char.IkOnkarVersion1a]: 0x3c,
        //[Char.IkOnkarVersion1b]: 0x3e,
        //[Char.IkOnkarVersion2a]: 0xc5,
        //[Char.IkOnkarVersion2b]: 0xc6,
        _a[6 /* IkOnkarVersion3 */] = 0xf7,
        _a[9 /* Onkar1 */] = 0xd8,
        _a[10 /* Onkar2 */] = 0xa3,
        _a[11 /* Uੳ */] = 0x75,
        //[Char.Uਉ]: 0x00,
        //[Char.Uਊ]: 0x00,
        _a[15 /* Oਓ */] = 0x6f,
        _a[16 /* Aਅ */] = 0x61,
        //[Char.Aਆ]: 0x00,
        //[Char.Aਐ]: 0x00,
        //[Char.Oਔ]: 0x00,
        _a[20 /* Eੲ */] = 0x65,
        //[Char.Eਇ]: 0x00,
        //[Char.Eਈ]: 0x00,
        _a[23 /* Eਏ */] = 0xb4,
        _a[24 /* Sਸ */] = 0x73,
        _a[25 /* Hਹ */] = 0x68,
        _a[26 /* Kਕ */] = 0x63,
        _a[27 /* Kਖ */] = 0x6b,
        _a[28 /* Gਗ */] = 0x67,
        _a[29 /* Gਘ */] = 0x47,
        _a[30 /* Nਙ */] = 0x4c,
        _a[31 /* Cਚ */] = 0x43,
        _a[32 /* Cਛ */] = 0x78,
        _a[33 /* Jਜ */] = 0x6a,
        _a[34 /* Jਝ */] = 0x4a,
        _a[35 /* Nਞ */] = 0x4d,
        _a[36 /* Tਟ */] = 0x74,
        _a[37 /* Tਠ */] = 0x54,
        _a[38 /* Dਡ */] = 0x44,
        _a[39 /* Dਢ */] = 0x51,
        _a[40 /* Nਣ */] = 0x4e,
        _a[41 /* Tਤ */] = 0x56,
        _a[42 /* Tਥ */] = 0x57,
        _a[43 /* Dਦ */] = 0x64,
        _a[44 /* Dਧ */] = 0x59,
        _a[45 /* Nਨ */] = 0x6e,
        _a[46 /* Pਪ */] = 0x70,
        _a[47 /* Fਫ */] = 0x66,
        _a[48 /* Bਬ */] = 0x62,
        _a[49 /* Bਭ */] = 0x42,
        _a[50 /* Mਮ */] = 0x6d,
        _a[51 /* Yਯ */] = 0x79,
        _a[52 /* Rਰ */] = 0x72,
        _a[53 /* Lਲ */] = 0x6c,
        _a[54 /* Vਵ */] = 0x76,
        _a[55 /* Rੜ */] = 0x52,
        _a[56 /* SPairiBindiਸ਼ */] = 0x53,
        _a[57 /* KPairiBindiਖ਼ */] = 0x4b,
        _a[58 /* GPairiBindiਗ਼ */] = 0x5a,
        _a[59 /* JPairiBindiਜ਼ */] = 0x7a,
        _a[60 /* FPairiBindiਫ਼ */] = 0x46,
        //[Char.LPairiBindiਲ਼]: 0x4c,
        _a[62 /* PairiBindi */] = 0xe6,
        _a[64 /* Dot */] = 0x50,
        _a[65 /* PairiHaha */] = 0x48,
        //[Char.PairiHahaDulainkar]: 0xa7,
        _a[67 /* PairiRara */] = 0x71,
        //[Char.PairiRaraPairiBindi]: 0x71,
        _a[70 /* PairiChacha */] = 0xe7,
        _a[71 /* PairiTenka */] = 0x2020,
        _a[72 /* PairiVava */] = 0x58,
        _a[73 /* PairiYaiya */] = 0xcf,
        _a[74 /* PairiTata */] = 0x153,
        _a[75 /* PairiNana */] = 0x2dc,
        _a[77 /* HalfYaiyaLeft */] = 0x77,
        _a[79 /* Tippi */] = 0x2a,
        _a[81 /* TippiRight */] = 0x5e,
        //[Char.Visagra]: 0x00,
        _a[85 /* AddakAbove */] = 0x26,
        _a[86 /* AddakRight */] = 0x25,
        //[Char.AddakRight2]: 0xa4,
        _a[88 /* AdakBindi */] = 0x0A01,
        _a[82 /* Bindi */] = 0x3a,
        _a[83 /* Bindi2 */] = 0x2c6,
        //[Char.Yakash]: 0x00,
        _a[90 /* Kana */] = 0x41,
        _a[91 /* KanaBindi */] = 0x3b,
        _a[92 /* Sihari */] = 0x69,
        _a[93 /* Bihari */] = 0x49,
        _a[94 /* BihariBindi */] = 0x192,
        _a[95 /* Aunkar */] = 0x55,
        _a[96 /* Aunkar2 */] = 0xfc,
        _a[97 /* Dulainkar */] = 0x3c,
        //[Char.Dulainkar2]: 0xa8,
        _a[99 /* Lavan */] = 0x45,
        _a[100 /* Dulavan */] = 0x3e,
        _a[101 /* Hora */] = 0x7e,
        _a[102 /* Kanaura */] = 0x4f,
        _a[103 /* Kanaura2 */] = 0xf8,
        _a[104 /* Virama */] = 0x40,
        //[Char.Udaat]: 0x00,
        _a[106 /* Danda */] = 0x2e,
        _a[107 /* DandaLong */] = 0xa2,
        _a[110 /* DoubleDanda */] = 0x7c,
        //[Char.DoubleDanda2]: 0xd2,
        _a[112 /* GZero */] = 0x201a,
        _a[113 /* GOne */] = 0x2044,
        _a[114 /* GTwo */] = 0xa4,
        _a[115 /* GThree */] = 0x2039,
        _a[116 /* GFour */] = 0x203a,
        _a[117 /* GFive */] = 0xf001,
        _a[118 /* GSix */] = 0xf002,
        _a[119 /* GSeven */] = 0x2021,
        _a[120 /* GEight */] = 0xb0,
        //[Char.GNine]: 0xf9,
        _a[122 /* EnglishZero */] = 0x30,
        _a[123 /* EnglishOne */] = 0x31,
        _a[124 /* EnglishTwo */] = 0x32,
        _a[125 /* EnglishThree */] = 0x33,
        _a[126 /* EnglishFour */] = 0x34,
        _a[127 /* EnglishFive */] = 0x35,
        _a[128 /* EnglishSix */] = 0x36,
        _a[129 /* EnglishSeven */] = 0x37,
        _a[130 /* EnglishEight */] = 0x38,
        _a[131 /* EnglishNine */] = 0x39,
        _a[132 /* Nu */] = 0x2dc,
        _a[133 /* NanaDulainkar */] = 0xb6,
        _a[137 /* Khanda */] = 0x2da,
        _a[138 /* Khanda2 */] = 0x2202,
        //[Char.Divide]: 0x2039,
        _a[136 /* Multiply */] = 0xbf,
        _a[139 /* FlowerDesign1 */] = 0x152,
        //[Char.FlowerDesign2]: 0x201a,
        _a[141 /* FlowerDesign3 */] = 0x2030,
        _a[142 /* FlowerDesign4 */] = 0xd3,
        _a[143 /* FlowerDesign5 */] = 0xd4,
        _a[144 /* Diamond */] = 0x2022,
        _a[145 /* KThind */] = 0xff,
        _a[146 /* Colon */] = 0x5c,
        _a[148 /* SemiColon */] = 0xdf,
        _a[149 /* SemiColon2 */] = 0xab,
        _a[150 /* SemiColon3 */] = 0x2026,
        _a[151 /* Unknown1 */] = 0xb4,
        _a[152 /* TopRightExtention */] = 0xd8,
        _a[153 /* SingleQuoteCurlyLeft */] = 0x60,
        _a[154 /* SingleQuoteCurlyLeft2 */] = 0xa7,
        _a[155 /* SingleQuoteCurlyRight */] = 0x24,
        _a[156 /* SingleQuoteCurlyRight2 */] = 0xa1,
        _a[157 /* DoubleQuoteCurlyLeft */] = 0x2122,
        _a[158 /* DoubleQuoteCurlyRight */] = 0x23,
        _a[160 /* SquareBracketLeft */] = 0x5b,
        _a[161 /* SquareBracketLeft2 */] = 0x7b,
        _a[162 /* SquareBracketRight */] = 0x5d,
        _a[163 /* SquareBracketRight2 */] = 0x7d,
        _a
    );
    var _a;
})(PunjabiFontConvertor || (PunjabiFontConvertor = {}));
var PunjabiFontConvertor;
(function (PunjabiFontConvertor) {
    PunjabiFontConvertor.satluj = (_a = {},
        _a[0 /* IkOnkarVersion1 */] = 0xfd,
        //[Char.IkOnkarVersion1b]: 0x3e,
        //[Char.IkOnkarVersion2a]: 0xc5,
        //[Char.IkOnkarVersion2b]: 0xc6,
        //[Char.IkOnkarVersion3]: 0xf7,
        //[Char.Onkar1]: 0xd8,
        //[Char.Onkar2]: 0xa3,
        _a[11 /* Uੳ */] = 0xc0,
        //[Char.Uਉ]: 0x00,
        //[Char.Uਊ]: 0x00,
        _a[15 /* Oਓ */] = 0xfa,
        _a[16 /* Aਅ */] = 0xc1,
        //[Char.Aਆ]: 0x00,
        //[Char.Aਐ]: 0x00,
        //[Char.Oਔ]: 0x00,
        _a[20 /* Eੲ */] = 0xc2,
        //[Char.Eਇ]: 0x00,
        //[Char.Eਈ]: 0x00,
        //[Char.Eਏ]: 0xb4,
        _a[24 /* Sਸ */] = 0xc3,
        _a[25 /* Hਹ */] = 0xd4,
        _a[26 /* Kਕ */] = 0xd5,
        _a[27 /* Kਖ */] = 0xd6,
        _a[28 /* Gਗ */] = 0xd7,
        _a[29 /* Gਘ */] = 0xd8,
        _a[30 /* Nਙ */] = 0xd9,
        _a[31 /* Cਚ */] = 0xda,
        _a[32 /* Cਛ */] = 0xdb,
        _a[33 /* Jਜ */] = 0xdc,
        _a[34 /* Jਝ */] = 0xde,
        _a[35 /* Nਞ */] = 0xdf,
        _a[36 /* Tਟ */] = 0xe0,
        _a[37 /* Tਠ */] = 0xe1,
        _a[38 /* Dਡ */] = 0xe2,
        _a[39 /* Dਢ */] = 0xe3,
        _a[40 /* Nਣ */] = 0xe4,
        _a[41 /* Tਤ */] = 0xe5,
        _a[42 /* Tਥ */] = 0xe6,
        _a[43 /* Dਦ */] = 0xe7,
        _a[44 /* Dਧ */] = 0xe8,
        _a[45 /* Nਨ */] = 0xe9,
        _a[46 /* Pਪ */] = 0xea,
        _a[47 /* Fਫ */] = 0xeb,
        _a[48 /* Bਬ */] = 0xec,
        _a[49 /* Bਭ */] = 0xed,
        _a[50 /* Mਮ */] = 0xee,
        _a[51 /* Yਯ */] = 0xef,
        _a[52 /* Rਰ */] = 0xf0,
        _a[53 /* Lਲ */] = 0xf1,
        _a[54 /* Vਵ */] = 0xf2,
        _a[55 /* Rੜ */] = 0xf3,
        _a[56 /* SPairiBindiਸ਼ */] = 0xf4,
        _a[57 /* KPairiBindiਖ਼ */] = 0xf5,
        _a[58 /* GPairiBindiਗ਼ */] = 0xf6,
        _a[59 /* JPairiBindiਜ਼ */] = 0xf7,
        _a[60 /* FPairiBindiਫ਼ */] = 0xf8,
        _a[61 /* LPairiBindiਲ਼ */] = 0xff,
        //[Char.PairiBindi]: 0xe6,
        //[Char.Dot]: 0x50,
        //[Char.PairiHaha]: 0x48,
        //[Char.PairiHahaDulainkar]: 0xa7,
        _a[67 /* PairiRara */] = 0xcc,
        _a[68 /* PairiRaraLeft */] = 0x7a,
        //[Char.PairiRaraPairiBindi]: 0x71,
        _a[70 /* PairiChacha */] = 0x7b,
        _a[71 /* PairiTenka */] = 0x7c,
        _a[72 /* PairiVava */] = 0xc9,
        //[Char.PairiYaiya]: 0xcf,
        _a[74 /* PairiTata */] = 0x7d,
        _a[75 /* PairiNana */] = 0xa5,
        //[Char.HalfYaiyaLeft]: 0x77,
        _a[78 /* TippiLeft */] = 0xa7,
        _a[79 /* Tippi */] = 0xbf,
        //[Char.TippiRight]: 0x5e,
        //[Char.Visagra]: 0x00,
        //[Char.AddakAbove]: 0x26,
        //[Char.AddakRight]: 0x25,
        //[Char.AddakRight2]: 0xa4,
        //[Char.AdakBindi]: 0x0A01,
        _a[82 /* Bindi */] = 0xba,
        //[Char.Bindi2]: 0x2c6,
        //[Char.Yakash]: 0x00,
        _a[90 /* Kana */] = 0xc5,
        _a[91 /* KanaBindi */] = 0xbb,
        _a[92 /* Sihari */] = 0xc7,
        _a[93 /* Bihari */] = 0xc6,
        _a[94 /* BihariBindi */] = 0xc4,
        //[Char.Aunkar]: 0x55,
        //[Char.Aunkar2]:0xfc,
        _a[97 /* Dulainkar */] = 0xb1,
        _a[98 /* Dulainkar2 */] = 0xc8,
        _a[99 /* Lavan */] = 0xb6,
        _a[100 /* Dulavan */] = 0xcb,
        //[Char.Hora]: 0x7e,
        _a[102 /* Kanaura */] = 0xcf,
        //[Char.Kanaura2]: 0xf8,
        //[Char.Virama]: 0x40,
        //[Char.Udaat]: 0x00,
        _a[106 /* Danda */] = 0xa2,
        _a[108 /* Danda2 */] = 0xcd,
        //[Char.DandaLong]: 0xa2,
        _a[110 /* DoubleDanda */] = 0xa3,
        _a[111 /* DoubleDanda2 */] = 0xa8,
        _a[112 /* GZero */] = 0x30,
        _a[113 /* GOne */] = 0x31,
        _a[114 /* GTwo */] = 0x32,
        _a[115 /* GThree */] = 0x33,
        _a[116 /* GFour */] = 0x34,
        _a[117 /* GFive */] = 0x35,
        _a[118 /* GSix */] = 0x36,
        _a[119 /* GSeven */] = 0x37,
        _a[120 /* GEight */] = 0x38,
        _a[121 /* GNine */] = 0x39,
        _a[122 /* EnglishZero */] = 0x40,
        _a[123 /* EnglishOne */] = 0x41,
        _a[124 /* EnglishTwo */] = 0x42,
        _a[125 /* EnglishThree */] = 0x43,
        _a[126 /* EnglishFour */] = 0x44,
        _a[127 /* EnglishFive */] = 0x45,
        _a[128 /* EnglishSix */] = 0x46,
        _a[129 /* EnglishSeven */] = 0x47,
        _a[130 /* EnglishEight */] = 0x48,
        _a[131 /* EnglishNine */] = 0x49,
        _a[132 /* Nu */] = 0xf9,
        //[Char.NanaDulainkar] : 0xb6,
        //[Char.Khanda]: 0x2da,
        //[Char.Khanda2]: 0x2202,
        //[Char.Divide]: 0x2039,
        //[Char.Multiply]: 0xbf,
        //[Char.FlowerDesign1]: 0x152,
        //[Char.FlowerDesign2]: 0x201a,
        //[Char.FlowerDesign3]: 0x2030,
        //[Char.FlowerDesign4]: 0xd3,
        //[Char.FlowerDesign5]: 0xd4,
        //[Char.Diamond]:0x2022,
        //[Char.KThind] : 0xff,        
        _a[146 /* Colon */] = 0x3a,
        _a[148 /* SemiColon */] = 0x3b,
        //[Char.Unknown1]: 0xb4,
        _a[152 /* TopRightExtention */] = 0xce,
        _a[153 /* SingleQuoteCurlyLeft */] = 0xd2,
        //[Char.SingleQuoteCurlyLeft2]: 0xa7,
        _a[155 /* SingleQuoteCurlyRight */] = 0xd3,
        //[Char.SingleQuoteCurlyRight2]: 0xa1,
        //[Char.DoubleQuoteCurlyLeft]: 0x2122,
        //[Char.DoubleQuoteCurlyRight]: 0x23, 
        //[Char.SquareBracketLeft]: 0x5b,
        //[Char.SquareBracketLeft2]: 0x7b,
        //[Char.SquareBracketRight]: 0x5d,
        //[Char.SquareBracketRight2]: 0x7d,
        _a[164 /* KakaPairiRara */] = 0xb4,
        _a[13 /* UਉBindi */] = 0xaa,
        _a[165 /* LalaDulainkar */] = 0xac,
        _a[166 /* LalaAunkar */] = 0xab,
        _a[167 /* LalaTippi */] = 0xa6,
        _a[168 /* TਥAunkar */] = 0x00,
        _a[169 /* CਚAunkar */] = 0x00,
        _a
    );
    var _a;
})(PunjabiFontConvertor || (PunjabiFontConvertor = {}));
var PunjabiFontConvertor;
(function (PunjabiFontConvertor) {
    PunjabiFontConvertor.asees = (_a = {},
        _a[0 /* IkOnkarVersion1 */] = 0xc5,
        _a[1 /* IkOnkarVersion1a */] = 0x2039,
        //[Char.IkOnkarVersion1b]: 0x3e,
        _a[3 /* IkOnkarVersion2 */] = 0xc6,
        //[Char.IkOnkarVersion2a]: 0xc5,
        //[Char.IkOnkarVersion2b]: ,
        _a[6 /* IkOnkarVersion3 */] = 0xa1,
        _a[7 /* IkOnkarVersion4 */] = 0xe5,
        _a[8 /* IkOnkarVersion5 */] = 0x3e,
        //[Char.Onkar1]: 0xd8,
        //[Char.Onkar2]: 0xa3,
        _a[11 /* Uੳ */] = 0x54,
        //[Char.Uਉ]: 0x00,
        //[Char.Uਊ]: 0x00,
        _a[15 /* Oਓ */] = 0x55,
        _a[16 /* Aਅ */] = 0x6e,
        //[Char.Aਆ]: 0x00,
        //[Char.Aਐ]: 0x00,
        //[Char.Oਔ]: 0x00,
        _a[20 /* Eੲ */] = 0x4a,
        //[Char.Eਇ]: 0x00,
        //[Char.Eਈ]: 0x00,
        //[Char.Eਏ]: 0xb4,
        _a[24 /* Sਸ */] = 0x3b,
        _a[25 /* Hਹ */] = 0x6a,
        _a[26 /* Kਕ */] = 0x65,
        _a[27 /* Kਖ */] = 0x79,
        _a[28 /* Gਗ */] = 0x72,
        _a[29 /* Gਘ */] = 0x78,
        _a[30 /* Nਙ */] = 0x43,
        _a[31 /* Cਚ */] = 0x75,
        _a[32 /* Cਛ */] = 0x53,
        _a[33 /* Jਜ */] = 0x69,
        _a[34 /* Jਝ */] = 0x4d,
        _a[35 /* Nਞ */] = 0x52,
        _a[36 /* Tਟ */] = 0x4e,
        _a[37 /* Tਠ */] = 0x6d,
        _a[38 /* Dਡ */] = 0x76,
        _a[39 /* Dਢ */] = 0x59,
        _a[40 /* Nਣ */] = 0x44,
        _a[41 /* Tਤ */] = 0x73,
        _a[42 /* Tਥ */] = 0x45,
        _a[43 /* Dਦ */] = 0x64,
        _a[44 /* Dਧ */] = 0x58,
        _a[45 /* Nਨ */] = 0x42,
        _a[46 /* Pਪ */] = 0x67,
        _a[47 /* Fਫ */] = 0x63,
        _a[48 /* Bਬ */] = 0x70,
        _a[49 /* Bਭ */] = 0x47,
        _a[50 /* Mਮ */] = 0x77,
        _a[51 /* Yਯ */] = 0x3a,
        _a[52 /* Rਰ */] = 0x6f,
        _a[53 /* Lਲ */] = 0x62,
        _a[54 /* Vਵ */] = 0x74,
        _a[55 /* Rੜ */] = 0x56,
        _a[56 /* SPairiBindiਸ਼ */] = 0x50,
        _a[57 /* KPairiBindiਖ਼ */] = 0x5c,
        _a[58 /* GPairiBindiਗ਼ */] = 0x7d,
        _a[59 /* JPairiBindiਜ਼ */] = 0x49,
        _a[60 /* FPairiBindiਫ਼ */] = 0x7c,
        _a[61 /* LPairiBindiਲ਼ */] = 0x2b,
        _a[62 /* PairiBindi */] = 0x61,
        _a[64 /* Dot */] = 0x48,
        _a[65 /* PairiHaha */] = 0x51,
        _a[66 /* PairiHahaDulainkar */] = 0xa7,
        _a[67 /* PairiRara */] = 0x71,
        _a[68 /* PairiRaraLeft */] = 0xae,
        //[Char.PairiRaraPairiBindi]: 0x71,
        _a[70 /* PairiChacha */] = 0xe7,
        _a[71 /* PairiTenka */] = 0x2020,
        _a[72 /* PairiVava */] = 0x5f,
        _a[73 /* PairiYaiya */] = 0xcf,
        _a[74 /* PairiTata */] = 0x153,
        _a[75 /* PairiNana */] = 0x2dc,
        _a[76 /* HalfYaiyaRight */] = 0xce,
        //[Char.HalfYaiyaLeft]: 0x77,
        _a[79 /* Tippi */] = 0x7a,
        //[Char.TippiRight]: 0x5e,
        //[Char.Visagra]: 0x00,
        _a[85 /* AddakAbove */] = 0x5a,
        _a[86 /* AddakRight */] = 0x7e,
        _a[87 /* AddakRight2 */] = 0xa4,
        //[Char.AdakBindi]: 0x0A01,
        _a[82 /* Bindi */] = 0x41,
        _a[83 /* Bindi2 */] = 0x2c6,
        //[Char.Yakash]: 0x00,
        _a[90 /* Kana */] = 0x6b,
        _a[91 /* KanaBindi */] = 0x4b,
        _a[92 /* Sihari */] = 0x66,
        _a[93 /* Bihari */] = 0x68,
        //[Char.BihariBindi]: 0x192,
        _a[95 /* Aunkar */] = 0x5b,
        //[Char.Aunkar2]:0xfc,
        _a[97 /* Dulainkar */] = 0x7b,
        _a[98 /* Dulainkar2 */] = 0xa8,
        _a[99 /* Lavan */] = 0x2f,
        _a[100 /* Dulavan */] = 0x3f,
        _a[101 /* Hora */] = 0x27,
        _a[102 /* Kanaura */] = 0x22,
        //[Char.Kanaura2]: 0xf8,
        //[Char.Virama]: 0x40,
        //[Char.Udaat]: 0x00,
        _a[106 /* Danda */] = 0x2e,
        //[Char.DandaLong]: 0xa2,
        _a[110 /* DoubleDanda */] = 0x5d,
        _a[111 /* DoubleDanda2 */] = 0xd2,
        _a[112 /* GZero */] = 0xfa,
        _a[113 /* GOne */] = 0xf1,
        _a[114 /* GTwo */] = 0xf2,
        _a[115 /* GThree */] = 0xf3,
        _a[116 /* GFour */] = 0xf4,
        _a[117 /* GFive */] = 0xf5,
        _a[118 /* GSix */] = 0xf6,
        _a[119 /* GSeven */] = 0xf7,
        _a[120 /* GEight */] = 0xf8,
        _a[121 /* GNine */] = 0xf9,
        _a[122 /* EnglishZero */] = 0x30,
        _a[123 /* EnglishOne */] = 0x31,
        _a[124 /* EnglishTwo */] = 0x32,
        _a[125 /* EnglishThree */] = 0x33,
        _a[126 /* EnglishFour */] = 0x34,
        _a[127 /* EnglishFive */] = 0x35,
        _a[128 /* EnglishSix */] = 0x36,
        _a[129 /* EnglishSeven */] = 0x37,
        _a[130 /* EnglishEight */] = 0x38,
        _a[131 /* EnglishNine */] = 0x39,
        _a[132 /* Nu */] = 0x192,
        //[Char.NanaDulainkar] : 0xb6,
        _a[134 /* RaraAunkar */] = 0x57,
        _a[137 /* Khanda */] = 0xc7,
        //[Char.Khanda2]: 0x2202,
        //[Char.Divide]: 0x2039,
        _a[136 /* Multiply */] = 0x25,
        _a[139 /* FlowerDesign1 */] = 0x152,
        _a[140 /* FlowerDesign2 */] = 0x201a,
        _a[141 /* FlowerDesign3 */] = 0x2030,
        _a[142 /* FlowerDesign4 */] = 0xd3,
        _a[143 /* FlowerDesign5 */] = 0xd4,
        //[Char.Diamond]:0x2022,
        _a[145 /* KThind */] = 0xff,
        _a[146 /* Colon */] = 0x4c,
        _a[147 /* ColonFancy */] = 0xda,
        _a[148 /* SemiColon */] = 0x6c,
        //[Char.Unknown1]: 0xb4,
        _a[152 /* TopRightExtention */] = 0x46,
        _a[153 /* SingleQuoteCurlyLeft */] = 0x2018,
        _a[155 /* SingleQuoteCurlyRight */] = 0x2019,
        _a[157 /* DoubleQuoteCurlyLeft */] = 0x201c,
        _a[158 /* DoubleQuoteCurlyRight */] = 0x201d,
        _a[159 /* DoubleQuoteCurlyRight2 */] = 0x40,
        _a
    );
    var _a;
})(PunjabiFontConvertor || (PunjabiFontConvertor = {}));
///<reference path="./charEnum" />
///<reference path="./mappings/anmolFontMappings" />
///<reference path="./mappings/unicodeFontMappings" />
///<reference path="./mappings/drChatrikFontMappings" />
///<reference path="./mappings/awazeFont" />
///<reference path="./mappings/satluj" />
///<reference path="./mappings/asees" />
var PunjabiFontConvertor;
(function (PunjabiFontConvertor) {
    var moveAcrossChaSet = [
        [[65 /* PairiHaha */], [104 /* Virama */, 25 /* Hਹ */]],
        [[67 /* PairiRara */], [68 /* PairiRaraLeft */], [104 /* Virama */, 52 /* Rਰ */]],
        [[70 /* PairiChacha */], [104 /* Virama */, 31 /* Cਚ */]],
        [[71 /* PairiTenka */], [104 /* Virama */, 36 /* Tਟ */]],
        [[72 /* PairiVava */], [104 /* Virama */, 54 /* Vਵ */]],
        [[73 /* PairiYaiya */], [104 /* Virama */, 51 /* Yਯ */, 104 /* Virama */, 51 /* Yਯ */]],
        [[74 /* PairiTata */], [104 /* Virama */, 41 /* Tਤ */]],
        [[75 /* PairiNana */], [104 /* Virama */, 45 /* Nਨ */]],
        [[69 /* PairiRaraPairiBindi */], [67 /* PairiRara */, 62 /* PairiBindi */],
            [67 /* PairiRara */, 63 /* PairiBindi2 */], [62 /* PairiBindi */, 104 /* Virama */, 52 /* Rਰ */], [63 /* PairiBindi2 */, 104 /* Virama */, 52 /* Rਰ */]],
    ];
    var ikOnkarVersion1 = [[0 /* IkOnkarVersion1 */], [1 /* IkOnkarVersion1a */, 2 /* IkOnkarVersion1b */], [1 /* IkOnkarVersion1a */], [113 /* GOne */, 9 /* Onkar1 */]];
    var ikOnkarVersion2 = [[3 /* IkOnkarVersion2 */], [4 /* IkOnkarVersion2a */, 5 /* IkOnkarVersion2b */], [4 /* IkOnkarVersion2a */], [113 /* GOne */, 10 /* Onkar2 */]];
    var ikOnkarVersion3 = [[6 /* IkOnkarVersion3 */]];
    var compositions = moveAcrossChaSet.concat([
        ikOnkarVersion1,
        ikOnkarVersion2,
        ikOnkarVersion3,
        ikOnkarVersion1.concat(ikOnkarVersion2, ikOnkarVersion3, [[7 /* IkOnkarVersion4 */], [8 /* IkOnkarVersion5 */]]),
        [[76 /* HalfYaiyaRight */], [104 /* Virama */, 51 /* Yਯ */]],
        [[88 /* AdakBindi */], [86 /* AddakRight */, 82 /* Bindi */]],
        [[17 /* Aਆ */], [16 /* Aਅ */, 90 /* Kana */]],
        [[17 /* Aਆ */, 82 /* Bindi */], [16 /* Aਅ */, 91 /* KanaBindi */]],
        [[21 /* Eਇ */], [92 /* Sihari */, 20 /* Eੲ */]],
        [[22 /* Eਈ */], [20 /* Eੲ */, 93 /* Bihari */]],
        [[12 /* Uਉ */], [11 /* Uੳ */, 95 /* Aunkar */]],
        [[14 /* Uਊ */], [11 /* Uੳ */, 97 /* Dulainkar */]],
        [[15 /* Oਓ */], [9 /* Onkar1 */], [10 /* Onkar2 */]],
        [[23 /* Eਏ */], [20 /* Eੲ */, 99 /* Lavan */]],
        [[18 /* Aਐ */], [16 /* Aਅ */, 100 /* Dulavan */]],
        [[19 /* Oਔ */], [16 /* Aਅ */, 102 /* Kanaura */]],
        [[61 /* LPairiBindiਲ਼ */], [53 /* Lਲ */, 62 /* PairiBindi */]],
        [[56 /* SPairiBindiਸ਼ */], [24 /* Sਸ */, 62 /* PairiBindi */]],
        [[57 /* KPairiBindiਖ਼ */], [27 /* Kਖ */, 62 /* PairiBindi */]],
        [[58 /* GPairiBindiਗ਼ */], [28 /* Gਗ */, 62 /* PairiBindi */]],
        [[59 /* JPairiBindiਜ਼ */], [33 /* Jਜ */, 62 /* PairiBindi */]],
        [[60 /* FPairiBindiਫ਼ */], [47 /* Fਫ */, 62 /* PairiBindi */]],
        [[110 /* DoubleDanda */], [106 /* Danda */, 106 /* Danda */], [111 /* DoubleDanda2 */]],
        [[97 /* Dulainkar */], [98 /* Dulainkar2 */]],
        [[95 /* Aunkar */], [96 /* Aunkar2 */]],
        [[106 /* Danda */], [108 /* Danda2 */], [109 /* Danda3 */], [107 /* DandaLong */]],
        [[91 /* KanaBindi */], [90 /* Kana */, 82 /* Bindi */]],
        [[86 /* AddakRight */], [87 /* AddakRight2 */]],
        [[85 /* AddakAbove */], [86 /* AddakRight */], [87 /* AddakRight2 */]],
        [[0 /* IkOnkarVersion1 */], [1 /* IkOnkarVersion1a */, 2 /* IkOnkarVersion1b */], [1 /* IkOnkarVersion1a */]],
        [[62 /* PairiBindi */], [63 /* PairiBindi2 */]],
        [[79 /* Tippi */], [80 /* Tippi2 */], [81 /* TippiRight */], [78 /* TippiLeft */]],
        [[132 /* Nu */], [45 /* Nਨ */, 97 /* Dulainkar */, 79 /* Tippi */], [45 /* Nਨ */, 79 /* Tippi */, 97 /* Dulainkar */], [133 /* NanaDulainkar */, 79 /* Tippi */]],
        [[133 /* NanaDulainkar */], [45 /* Nਨ */, 97 /* Dulainkar */]],
        [[139 /* FlowerDesign1 */], [140 /* FlowerDesign2 */], [141 /* FlowerDesign3 */], [142 /* FlowerDesign4 */], [143 /* FlowerDesign5 */]],
        [[66 /* PairiHahaDulainkar */], [104 /* Virama */, 25 /* Hਹ */, 97 /* Dulainkar */]],
        [[94 /* BihariBindi */], [93 /* Bihari */, 82 /* Bindi */]],
        [[102 /* Kanaura */], [103 /* Kanaura2 */]],
        [[153 /* SingleQuoteCurlyLeft */], [154 /* SingleQuoteCurlyLeft2 */]],
        [[155 /* SingleQuoteCurlyRight */], [156 /* SingleQuoteCurlyRight2 */]],
        [[158 /* DoubleQuoteCurlyRight */], [159 /* DoubleQuoteCurlyRight2 */]],
        [[137 /* Khanda */], [138 /* Khanda2 */]],
        [[146 /* Colon */], [147 /* ColonFancy */]],
        [[148 /* SemiColon */], [149 /* SemiColon2 */], [150 /* SemiColon3 */]],
        [[134 /* RaraAunkar */], [52 /* Rਰ */, 95 /* Aunkar */], [52 /* Rਰ */, 96 /* Aunkar2 */]],
        [[164 /* KakaPairiRara */], [26 /* Kਕ */, 67 /* PairiRara */], [26 /* Kਕ */, 104 /* Virama */, 52 /* Rਰ */]],
        [[12 /* Uਉ */], [11 /* Uੳ */, 95 /* Aunkar */]],
        [[165 /* LalaDulainkar */], [53 /* Lਲ */, 97 /* Dulainkar */], [53 /* Lਲ */, 98 /* Dulainkar2 */]],
        [[166 /* LalaAunkar */], [53 /* Lਲ */, 95 /* Aunkar */], [53 /* Lਲ */, 96 /* Aunkar2 */]],
        [[167 /* LalaTippi */], [53 /* Lਲ */, 79 /* Tippi */], [80 /* Tippi2 */]],
        [[168 /* TਥAunkar */], [42 /* Tਥ */, 95 /* Aunkar */], [42 /* Tਥ */, 96 /* Aunkar2 */]],
        [[169 /* CਚAunkar */], [31 /* Cਚ */, 95 /* Aunkar */], [31 /* Cਚ */, 96 /* Aunkar2 */]],
    ]);
    var fontConvertorConfigs = {
        "Unicode": {
            moveRightCharacters: [92 /* Sihari */],
            characterCodes: makeArray(PunjabiFontConvertor.unicodeMapping)
        },
        "AnmolUni": {
            moveRightCharacters: [92 /* Sihari */],
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
        },
        "Satluj": {
            moveRightCharacters: [],
            characterCodes: makeArray(PunjabiFontConvertor.satluj)
        },
        "Asees": {
            moveRightCharacters: [],
            characterCodes: makeArray(PunjabiFontConvertor.asees)
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
