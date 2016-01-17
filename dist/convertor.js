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
        _a[14 /* Oਓ */] = 0x45,
        _a[15 /* Aਅ */] = 0x41,
        //[Char.Aਆ]: 0x00,
        //[Char.Aਐ]: 0x00,
        //[Char.Oਔ]: 0x00,
        _a[19 /* Eੲ */] = 0x65,
        //[Char.Eਇ]: 0x00,
        //[Char.Eਈ]: 0x00,
        //[Char.Eਏ]: 0x00,
        _a[23 /* Sਸ */] = 0x73,
        _a[24 /* Hਹ */] = 0x68,
        _a[25 /* Kਕ */] = 0x6b,
        _a[26 /* Kਖ */] = 0x4b,
        _a[27 /* Gਗ */] = 0x67,
        _a[28 /* Gਘ */] = 0x47,
        _a[29 /* Nਙ */] = 0x7c,
        _a[30 /* Cਚ */] = 0x63,
        _a[31 /* Cਛ */] = 0x43,
        _a[32 /* Jਜ */] = 0x6a,
        _a[33 /* Jਝ */] = 0x4a,
        _a[34 /* Nਞ */] = 0x5c,
        _a[35 /* Tਟ */] = 0x74,
        _a[36 /* Tਠ */] = 0x54,
        _a[37 /* Dਡ */] = 0x66,
        _a[38 /* Dਢ */] = 0x46,
        _a[39 /* Nਣ */] = 0x78,
        _a[40 /* Tਤ */] = 0x71,
        _a[41 /* Tਥ */] = 0x51,
        _a[42 /* Dਦ */] = 0x64,
        _a[43 /* Dਧ */] = 0x44,
        _a[44 /* Nਨ */] = 0x6e,
        _a[45 /* Pਪ */] = 0x70,
        _a[46 /* Fਫ */] = 0x50,
        _a[47 /* Bਬ */] = 0x62,
        _a[48 /* Bਭ */] = 0x42,
        _a[49 /* Mਮ */] = 0x6d,
        _a[50 /* Yਯ */] = 0x58,
        _a[51 /* Rਰ */] = 0x72,
        _a[52 /* Lਲ */] = 0x6c,
        _a[53 /* Vਵ */] = 0x76,
        _a[54 /* Rੜ */] = 0x56,
        _a[55 /* SPairiBindiਸ਼ */] = 0x53,
        _a[56 /* KPairiBindiਖ਼ */] = 0x5e,
        _a[57 /* GPairiBindiਗ਼ */] = 0x5a,
        _a[58 /* JPairiBindiਜ਼ */] = 0x7a,
        _a[59 /* FPairiBindiਫ਼ */] = 0x26,
        _a[60 /* LPairiBindiਲ਼ */] = 0x4c,
        _a[61 /* PairiBindi */] = 0xe6,
        _a[63 /* Dot */] = 0x2e,
        _a[64 /* PairiHaha */] = 0x48,
        _a[65 /* PairiHahaDulainkar */] = 0xa7,
        _a[66 /* PairiRara */] = 0x52,
        _a[68 /* PairiRaraPairiBindi */] = 0xae,
        _a[69 /* PairiChacha */] = 0xe7,
        _a[70 /* PairiTenka */] = 0x2020,
        _a[71 /* PairiVava */] = 0xcd,
        _a[72 /* PairiYaiya */] = 0xcf,
        _a[73 /* PairiTata */] = 0x153,
        _a[74 /* PairiNana */] = 0x2dc,
        _a[75 /* HalfYaiyaRight */] = 0xce,
        _a[77 /* Tippi */] = 0x4d,
        //[Char.Bindi]: 0x00,
        //[Char.Visagra]: 0x00,
        _a[83 /* AddakAbove */] = 0x60,
        _a[84 /* AddakRight */] = 0x7e,
        _a[85 /* AddakRight2 */] = 0xa4,
        _a[86 /* AdakBindi */] = 0x0A01,
        _a[80 /* Bindi */] = 0x4e,
        _a[81 /* Bindi2 */] = 0x2c6,
        //[Char.Yakash]: 0x00,
        _a[88 /* Kana */] = 0x77,
        _a[89 /* KanaBindi */] = 0x57,
        _a[90 /* Sihari */] = 0x69,
        _a[91 /* Bihari */] = 0x49,
        _a[93 /* Aunkar */] = 0x75,
        _a[94 /* Aunkar2 */] = 0xfc,
        _a[95 /* Dulainkar */] = 0x55,
        _a[96 /* Dulainkar2 */] = 0xa8,
        _a[97 /* Lavan */] = 0x79,
        _a[98 /* Dulavan */] = 0x59,
        _a[99 /* Hora */] = 0x6f,
        _a[100 /* Kanaura */] = 0x4f,
        _a[102 /* Virama */] = 0x40,
        //[Char.Udaat]: 0x00,
        _a[104 /* Danda */] = 0x5b,
        _a[108 /* DoubleDanda */] = 0x5d,
        _a[109 /* DoubleDanda2 */] = 0xd2,
        _a[110 /* GZero */] = 0xfa,
        _a[111 /* GOne */] = 0xf1,
        _a[112 /* GTwo */] = 0xf2,
        _a[113 /* GThree */] = 0xf3,
        _a[114 /* GFour */] = 0xf4,
        _a[115 /* GFive */] = 0xf5,
        _a[116 /* GSix */] = 0xf6,
        _a[117 /* GSeven */] = 0xf7,
        _a[118 /* GEight */] = 0xf8,
        _a[119 /* GNine */] = 0xf9,
        _a[120 /* EnglishZero */] = 0x30,
        _a[121 /* EnglishOne */] = 0x31,
        _a[122 /* EnglishTwo */] = 0x32,
        _a[123 /* EnglishThree */] = 0x33,
        _a[124 /* EnglishFour */] = 0x34,
        _a[125 /* EnglishFive */] = 0x35,
        _a[126 /* EnglishSix */] = 0x36,
        _a[127 /* EnglishSeven */] = 0x37,
        _a[128 /* EnglishEight */] = 0x38,
        _a[129 /* EnglishNine */] = 0x39,
        _a[130 /* Nu */] = 0x192,
        _a[135 /* Khanda */] = 0xc7,
        _a[133 /* Divide */] = 0x2039,
        _a[134 /* Multiply */] = 0xbf,
        _a[137 /* FlowerDesign1 */] = 0x152,
        _a[138 /* FlowerDesign2 */] = 0x201a,
        _a[139 /* FlowerDesign3 */] = 0x2030,
        _a[140 /* FlowerDesign4 */] = 0xd3,
        _a[141 /* FlowerDesign5 */] = 0xd4,
        _a[142 /* Diamond */] = 0x2022,
        _a[143 /* KThind */] = 0xff,
        _a[144 /* Colon */] = 0x3a,
        _a[145 /* ColonFancy */] = 0xda,
        _a[146 /* SemiColon */] = 0x3b,
        _a[149 /* Unknown1 */] = 0xb4,
        _a[150 /* TopRightExtention */] = 0xd8,
        _a[151 /* SingleQuoteCurlyLeft */] = 0x2018,
        _a[153 /* SingleQuoteCurlyRight */] = 0x2019,
        _a[155 /* DoubleQuoteCurlyLeft */] = 0x201c,
        _a[156 /* DoubleQuoteCurlyRight */] = 0x201d,
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
        _a[13 /* Uਊ */] = 0x0A0A,
        _a[14 /* Oਓ */] = 0x0A13,
        _a[15 /* Aਅ */] = 0x0A05,
        _a[16 /* Aਆ */] = 0x0A06,
        _a[17 /* Aਐ */] = 0x0A10,
        _a[18 /* Oਔ */] = 0x0A14,
        _a[19 /* Eੲ */] = 0x0A72,
        _a[20 /* Eਇ */] = 0x0A07,
        _a[21 /* Eਈ */] = 0x0A08,
        _a[22 /* Eਏ */] = 0x0A0F,
        _a[23 /* Sਸ */] = 0x0A38,
        _a[24 /* Hਹ */] = 0x0A39,
        _a[25 /* Kਕ */] = 0x0A15,
        _a[26 /* Kਖ */] = 0x0A16,
        _a[27 /* Gਗ */] = 0x0A17,
        _a[28 /* Gਘ */] = 0x0A18,
        _a[29 /* Nਙ */] = 0x0A19,
        _a[30 /* Cਚ */] = 0x0A1A,
        _a[31 /* Cਛ */] = 0x0A1B,
        _a[32 /* Jਜ */] = 0x0A1C,
        _a[33 /* Jਝ */] = 0x0A1D,
        _a[34 /* Nਞ */] = 0x0A1E,
        _a[35 /* Tਟ */] = 0x0A1F,
        _a[36 /* Tਠ */] = 0x0A20,
        _a[37 /* Dਡ */] = 0x0A21,
        _a[38 /* Dਢ */] = 0x0A22,
        _a[39 /* Nਣ */] = 0x0A23,
        _a[40 /* Tਤ */] = 0x0A24,
        _a[41 /* Tਥ */] = 0x0A25,
        _a[42 /* Dਦ */] = 0x0A26,
        _a[43 /* Dਧ */] = 0x0A27,
        _a[44 /* Nਨ */] = 0x0A28,
        _a[45 /* Pਪ */] = 0x0A2A,
        _a[46 /* Fਫ */] = 0x0A2B,
        _a[47 /* Bਬ */] = 0x0A2C,
        _a[48 /* Bਭ */] = 0x0A2D,
        _a[49 /* Mਮ */] = 0x0A2E,
        _a[50 /* Yਯ */] = 0x0A2F,
        _a[51 /* Rਰ */] = 0x0A30,
        _a[52 /* Lਲ */] = 0x0A32,
        _a[53 /* Vਵ */] = 0x0A35,
        _a[54 /* Rੜ */] = 0x0A5C,
        _a[55 /* SPairiBindiਸ਼ */] = 0x0A36,
        _a[56 /* KPairiBindiਖ਼ */] = 0x0A59,
        _a[57 /* GPairiBindiਗ਼ */] = 0x0A5A,
        _a[58 /* JPairiBindiਜ਼ */] = 0x0A5B,
        _a[59 /* FPairiBindiਫ਼ */] = 0x0A5E,
        _a[60 /* LPairiBindiਲ਼ */] = 0x0A33,
        _a[61 /* PairiBindi */] = 0x0A3C,
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
        _a[77 /* Tippi */] = 0x0A70,
        _a[80 /* Bindi */] = 0x0A02,
        _a[82 /* Visagra */] = 0x0A03,
        _a[84 /* AddakRight */] = 0x0A71,
        //[Char.Addak2]: 0x00,
        //[Char.AdakBindi]: 0x00,
        //[Char.Bindi]:
        _a[87 /* Yakash */] = 0x0A75,
        _a[88 /* Kana */] = 0x0A3E,
        // [Char.KanaBindi]: 
        _a[90 /* Sihari */] = 0x0A3F,
        _a[91 /* Bihari */] = 0x0A40,
        _a[93 /* Aunkar */] = 0x0A41,
        _a[95 /* Dulainkar */] = 0x0A42,
        _a[97 /* Lavan */] = 0x0A47,
        _a[98 /* Dulavan */] = 0x0A48,
        _a[99 /* Hora */] = 0x0A4B,
        _a[100 /* Kanaura */] = 0x0A4C,
        _a[102 /* Virama */] = 0x0A4D,
        _a[103 /* Udaat */] = 0x0A51,
        _a[104 /* Danda */] = 0x0964,
        _a[108 /* DoubleDanda */] = 0x0965,
        _a[110 /* GZero */] = 0x0A66,
        _a[111 /* GOne */] = 0x0A67,
        _a[112 /* GTwo */] = 0x0A68,
        _a[113 /* GThree */] = 0x0A69,
        _a[114 /* GFour */] = 0x0A6A,
        _a[115 /* GFive */] = 0x0A6B,
        _a[116 /* GSix */] = 0x0A6C,
        _a[117 /* GSeven */] = 0x0A6D,
        _a[118 /* GEight */] = 0x0A6E,
        _a[119 /* GNine */] = 0x0A6F,
        _a[120 /* EnglishZero */] = 0x30,
        _a[121 /* EnglishOne */] = 0x31,
        _a[122 /* EnglishTwo */] = 0x32,
        _a[123 /* EnglishThree */] = 0x33,
        _a[124 /* EnglishFour */] = 0x34,
        _a[125 /* EnglishFive */] = 0x35,
        _a[126 /* EnglishSix */] = 0x36,
        _a[127 /* EnglishSeven */] = 0x37,
        _a[128 /* EnglishEight */] = 0x38,
        _a[129 /* EnglishNine */] = 0x39,
        //[Char.Nu]: ,
        //[Char.Khanda]: ,
        _a[133 /* Divide */] = 0xf7,
        _a[134 /* Multiply */] = 0xd7,
        //[Char.FlowerDesign1]: ,
        //[Char.FlowerDesign2]: ,
        //[Char.FlowerDesign3]: ,
        //[Char.FlowerDesign4]: ,
        //[Char.FlowerDesign5]: ,
        _a[143 /* KThind */] = 0xff,
        _a[144 /* Colon */] = 0x3a,
        _a[146 /* SemiColon */] = 0x3b,
        _a[151 /* SingleQuoteCurlyLeft */] = 0x2018,
        _a[153 /* SingleQuoteCurlyRight */] = 0x2019,
        _a[155 /* DoubleQuoteCurlyLeft */] = 0x201c,
        _a[156 /* DoubleQuoteCurlyRight */] = 0x201d,
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
        _a[15 /* Aਅ */] = 0x61,
        _a[19 /* Eੲ */] = 0x65,
        _a[23 /* Sਸ */] = 0x73,
        _a[24 /* Hਹ */] = 0x68,
        _a[25 /* Kਕ */] = 0x6b,
        _a[26 /* Kਖ */] = 0x4b,
        _a[27 /* Gਗ */] = 0x67,
        _a[28 /* Gਘ */] = 0x47,
        _a[29 /* Nਙ */] = 0xd5,
        _a[30 /* Cਚ */] = 0x63,
        _a[31 /* Cਛ */] = 0x43,
        _a[32 /* Jਜ */] = 0x6a,
        _a[33 /* Jਝ */] = 0x4a,
        _a[34 /* Nਞ */] = 0xd6,
        _a[35 /* Tਟ */] = 0x74,
        _a[36 /* Tਠ */] = 0x54,
        _a[37 /* Dਡ */] = 0x7a,
        _a[38 /* Dਢ */] = 0x5a,
        _a[39 /* Nਣ */] = 0x78,
        _a[40 /* Tਤ */] = 0x71,
        _a[41 /* Tਥ */] = 0x51,
        _a[42 /* Dਦ */] = 0x64,
        _a[43 /* Dਧ */] = 0x44,
        _a[44 /* Nਨ */] = 0x6e,
        _a[45 /* Pਪ */] = 0x70,
        _a[46 /* Fਫ */] = 0x50,
        _a[47 /* Bਬ */] = 0x62,
        _a[48 /* Bਭ */] = 0x42,
        _a[49 /* Mਮ */] = 0x6d,
        _a[50 /* Yਯ */] = 0x58,
        _a[51 /* Rਰ */] = 0x72,
        _a[52 /* Lਲ */] = 0x6c,
        _a[53 /* Vਵ */] = 0x76,
        _a[54 /* Rੜ */] = 0x56,
        _a[55 /* SPairiBindiਸ਼ */] = 0xc8,
        _a[56 /* KPairiBindiਖ਼ */] = 0xc9,
        _a[57 /* GPairiBindiਗ਼ */] = 0xca,
        _a[58 /* JPairiBindiਜ਼ */] = 0xcb,
        _a[59 /* FPairiBindiਫ਼ */] = 0xcc,
        _a[60 /* LPairiBindiਲ਼ */] = 0xdc,
        _a[61 /* PairiBindi */] = 0xe6,
        _a[61 /* PairiBindi */] = 0xe6,
        _a[62 /* PairiBindi2 */] = 0x4c,
        _a[63 /* Dot */] = 0x5b,
        _a[64 /* PairiHaha */] = 0x48,
        _a[66 /* PairiRara */] = 0x52,
        _a[77 /* Tippi */] = 0x4d,
        _a[78 /* Tippi2 */] = 0x53,
        _a[80 /* Bindi */] = 0x4e,
        _a[84 /* AddakRight */] = 0x77,
        _a[85 /* AddakRight2 */] = 0x57,
        _a[86 /* AdakBindi */] = 0x0A01,
        _a[88 /* Kana */] = 0x66,
        _a[89 /* KanaBindi */] = 0x46,
        _a[90 /* Sihari */] = 0x69,
        _a[91 /* Bihari */] = 0x49,
        _a[93 /* Aunkar */] = 0x75,
        _a[95 /* Dulainkar */] = 0x55,
        _a[97 /* Lavan */] = 0x79,
        _a[98 /* Dulavan */] = 0x59,
        _a[99 /* Hora */] = 0x6f,
        _a[100 /* Kanaura */] = 0x4f,
        _a[102 /* Virama */] = 0xd9,
        _a[104 /* Danda */] = 0x2e,
        _a[106 /* Danda2 */] = 0x7c,
        _a[107 /* Danda3 */] = 0xbb,
        _a[108 /* DoubleDanda */] = 0x5d,
        _a[109 /* DoubleDanda2 */] = 0xab,
        _a[110 /* GZero */] = 0xfa,
        _a[111 /* GOne */] = 0xf1,
        _a[112 /* GTwo */] = 0xf2,
        _a[113 /* GThree */] = 0xf3,
        _a[114 /* GFour */] = 0xf4,
        _a[115 /* GFive */] = 0xf5,
        _a[116 /* GSix */] = 0xf6,
        _a[117 /* GSeven */] = 0xf7,
        _a[118 /* GEight */] = 0xf8,
        _a[119 /* GNine */] = 0xf9,
        _a[120 /* EnglishZero */] = 0x30,
        _a[121 /* EnglishOne */] = 0x31,
        _a[122 /* EnglishTwo */] = 0x32,
        _a[123 /* EnglishThree */] = 0x33,
        _a[124 /* EnglishFour */] = 0x34,
        _a[125 /* EnglishFive */] = 0x35,
        _a[126 /* EnglishSix */] = 0x36,
        _a[127 /* EnglishSeven */] = 0x37,
        _a[128 /* EnglishEight */] = 0x38,
        _a[129 /* EnglishNine */] = 0x39,
        _a[144 /* Colon */] = 0x3a,
        _a[145 /* ColonFancy */] = 0xda,
        _a[146 /* SemiColon */] = 0x3b,
        _a[151 /* SingleQuoteCurlyLeft */] = 0x2018,
        _a[153 /* SingleQuoteCurlyRight */] = 0x2019,
        _a[155 /* DoubleQuoteCurlyLeft */] = 0x201c,
        _a[156 /* DoubleQuoteCurlyRight */] = 0x201d,
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
        _a[14 /* Oਓ */] = 0x6f,
        _a[15 /* Aਅ */] = 0x61,
        //[Char.Aਆ]: 0x00,
        //[Char.Aਐ]: 0x00,
        //[Char.Oਔ]: 0x00,
        _a[19 /* Eੲ */] = 0x65,
        //[Char.Eਇ]: 0x00,
        //[Char.Eਈ]: 0x00,
        _a[22 /* Eਏ */] = 0xb4,
        _a[23 /* Sਸ */] = 0x73,
        _a[24 /* Hਹ */] = 0x68,
        _a[25 /* Kਕ */] = 0x63,
        _a[26 /* Kਖ */] = 0x6b,
        _a[27 /* Gਗ */] = 0x67,
        _a[28 /* Gਘ */] = 0x47,
        _a[29 /* Nਙ */] = 0x4c,
        _a[30 /* Cਚ */] = 0x43,
        _a[31 /* Cਛ */] = 0x78,
        _a[32 /* Jਜ */] = 0x6a,
        _a[33 /* Jਝ */] = 0x4a,
        _a[34 /* Nਞ */] = 0x4d,
        _a[35 /* Tਟ */] = 0x74,
        _a[36 /* Tਠ */] = 0x54,
        _a[37 /* Dਡ */] = 0x44,
        _a[38 /* Dਢ */] = 0x51,
        _a[39 /* Nਣ */] = 0x4e,
        _a[40 /* Tਤ */] = 0x56,
        _a[41 /* Tਥ */] = 0x57,
        _a[42 /* Dਦ */] = 0x64,
        _a[43 /* Dਧ */] = 0x59,
        _a[44 /* Nਨ */] = 0x6e,
        _a[45 /* Pਪ */] = 0x70,
        _a[46 /* Fਫ */] = 0x66,
        _a[47 /* Bਬ */] = 0x62,
        _a[48 /* Bਭ */] = 0x42,
        _a[49 /* Mਮ */] = 0x6d,
        _a[50 /* Yਯ */] = 0x79,
        _a[51 /* Rਰ */] = 0x72,
        _a[52 /* Lਲ */] = 0x6c,
        _a[53 /* Vਵ */] = 0x76,
        _a[54 /* Rੜ */] = 0x52,
        _a[55 /* SPairiBindiਸ਼ */] = 0x53,
        _a[56 /* KPairiBindiਖ਼ */] = 0x4b,
        _a[57 /* GPairiBindiਗ਼ */] = 0x5a,
        _a[58 /* JPairiBindiਜ਼ */] = 0x7a,
        _a[59 /* FPairiBindiਫ਼ */] = 0x46,
        //[Char.LPairiBindiਲ਼]: 0x4c,
        _a[61 /* PairiBindi */] = 0xe6,
        _a[63 /* Dot */] = 0x50,
        _a[64 /* PairiHaha */] = 0x48,
        //[Char.PairiHahaDulainkar]: 0xa7,
        _a[66 /* PairiRara */] = 0x71,
        //[Char.PairiRaraPairiBindi]: 0x71,
        _a[69 /* PairiChacha */] = 0xe7,
        _a[70 /* PairiTenka */] = 0x2020,
        _a[71 /* PairiVava */] = 0x58,
        _a[72 /* PairiYaiya */] = 0xcf,
        _a[73 /* PairiTata */] = 0x153,
        _a[74 /* PairiNana */] = 0x2dc,
        _a[76 /* HalfYaiyaLeft */] = 0x77,
        _a[77 /* Tippi */] = 0x2a,
        _a[79 /* TippiRight */] = 0x5e,
        //[Char.Visagra]: 0x00,
        _a[83 /* AddakAbove */] = 0x26,
        _a[84 /* AddakRight */] = 0x25,
        //[Char.AddakRight2]: 0xa4,
        _a[86 /* AdakBindi */] = 0x0A01,
        _a[80 /* Bindi */] = 0x3a,
        _a[81 /* Bindi2 */] = 0x2c6,
        //[Char.Yakash]: 0x00,
        _a[88 /* Kana */] = 0x41,
        _a[89 /* KanaBindi */] = 0x3b,
        _a[90 /* Sihari */] = 0x69,
        _a[91 /* Bihari */] = 0x49,
        _a[92 /* BihariBindi */] = 0x192,
        _a[93 /* Aunkar */] = 0x55,
        _a[94 /* Aunkar2 */] = 0xfc,
        _a[95 /* Dulainkar */] = 0x3c,
        //[Char.Dulainkar2]: 0xa8,
        _a[97 /* Lavan */] = 0x45,
        _a[98 /* Dulavan */] = 0x3e,
        _a[99 /* Hora */] = 0x7e,
        _a[100 /* Kanaura */] = 0x4f,
        _a[101 /* Kanaura2 */] = 0xf8,
        _a[102 /* Virama */] = 0x40,
        //[Char.Udaat]: 0x00,
        _a[104 /* Danda */] = 0x2e,
        _a[105 /* DandaLong */] = 0xa2,
        _a[108 /* DoubleDanda */] = 0x7c,
        //[Char.DoubleDanda2]: 0xd2,
        _a[110 /* GZero */] = 0x201a,
        _a[111 /* GOne */] = 0x2044,
        _a[112 /* GTwo */] = 0xa4,
        _a[113 /* GThree */] = 0x2039,
        _a[114 /* GFour */] = 0x203a,
        _a[115 /* GFive */] = 0xf001,
        _a[116 /* GSix */] = 0xf002,
        _a[117 /* GSeven */] = 0x2021,
        _a[118 /* GEight */] = 0xb0,
        //[Char.GNine]: 0xf9,
        _a[120 /* EnglishZero */] = 0x30,
        _a[121 /* EnglishOne */] = 0x31,
        _a[122 /* EnglishTwo */] = 0x32,
        _a[123 /* EnglishThree */] = 0x33,
        _a[124 /* EnglishFour */] = 0x34,
        _a[125 /* EnglishFive */] = 0x35,
        _a[126 /* EnglishSix */] = 0x36,
        _a[127 /* EnglishSeven */] = 0x37,
        _a[128 /* EnglishEight */] = 0x38,
        _a[129 /* EnglishNine */] = 0x39,
        _a[130 /* Nu */] = 0x2dc,
        _a[131 /* NanaDulainkar */] = 0xb6,
        _a[135 /* Khanda */] = 0x2da,
        _a[136 /* Khanda2 */] = 0x2202,
        //[Char.Divide]: 0x2039,
        _a[134 /* Multiply */] = 0xbf,
        _a[137 /* FlowerDesign1 */] = 0x152,
        //[Char.FlowerDesign2]: 0x201a,
        _a[139 /* FlowerDesign3 */] = 0x2030,
        _a[140 /* FlowerDesign4 */] = 0xd3,
        _a[141 /* FlowerDesign5 */] = 0xd4,
        _a[142 /* Diamond */] = 0x2022,
        _a[143 /* KThind */] = 0xff,
        _a[144 /* Colon */] = 0x5c,
        _a[146 /* SemiColon */] = 0xdf,
        _a[147 /* SemiColon2 */] = 0xab,
        _a[148 /* SemiColon3 */] = 0x2026,
        _a[149 /* Unknown1 */] = 0xb4,
        _a[150 /* TopRightExtention */] = 0xd8,
        _a[151 /* SingleQuoteCurlyLeft */] = 0x60,
        _a[152 /* SingleQuoteCurlyLeft2 */] = 0xa7,
        _a[153 /* SingleQuoteCurlyRight */] = 0x24,
        _a[154 /* SingleQuoteCurlyRight2 */] = 0xa1,
        _a[155 /* DoubleQuoteCurlyLeft */] = 0x2122,
        _a[156 /* DoubleQuoteCurlyRight */] = 0x23,
        _a[158 /* SquareBracketLeft */] = 0x5b,
        _a[159 /* SquareBracketLeft2 */] = 0x7b,
        _a[160 /* SquareBracketRight */] = 0x5d,
        _a[161 /* SquareBracketRight2 */] = 0x7d,
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
        _a[14 /* Oਓ */] = 0xfa,
        _a[15 /* Aਅ */] = 0xc1,
        //[Char.Aਆ]: 0x00,
        //[Char.Aਐ]: 0x00,
        //[Char.Oਔ]: 0x00,
        _a[19 /* Eੲ */] = 0xc2,
        //[Char.Eਇ]: 0x00,
        //[Char.Eਈ]: 0x00,
        //[Char.Eਏ]: 0xb4,
        _a[23 /* Sਸ */] = 0xc3,
        _a[24 /* Hਹ */] = 0xd4,
        _a[25 /* Kਕ */] = 0xd5,
        _a[26 /* Kਖ */] = 0xd6,
        _a[27 /* Gਗ */] = 0xd7,
        _a[28 /* Gਘ */] = 0xd8,
        _a[29 /* Nਙ */] = 0xd9,
        _a[30 /* Cਚ */] = 0xda,
        _a[31 /* Cਛ */] = 0xdb,
        _a[32 /* Jਜ */] = 0xdc,
        _a[33 /* Jਝ */] = 0xde,
        _a[34 /* Nਞ */] = 0xdf,
        _a[35 /* Tਟ */] = 0xe0,
        _a[36 /* Tਠ */] = 0xe1,
        _a[37 /* Dਡ */] = 0xe2,
        _a[38 /* Dਢ */] = 0xe3,
        _a[39 /* Nਣ */] = 0xe4,
        _a[40 /* Tਤ */] = 0xe5,
        _a[41 /* Tਥ */] = 0xe6,
        _a[42 /* Dਦ */] = 0xe7,
        _a[43 /* Dਧ */] = 0xe8,
        _a[44 /* Nਨ */] = 0xe9,
        _a[45 /* Pਪ */] = 0xea,
        _a[46 /* Fਫ */] = 0xeb,
        _a[47 /* Bਬ */] = 0xec,
        _a[48 /* Bਭ */] = 0xed,
        _a[49 /* Mਮ */] = 0xee,
        _a[50 /* Yਯ */] = 0xef,
        _a[51 /* Rਰ */] = 0xf0,
        _a[52 /* Lਲ */] = 0xf1,
        _a[53 /* Vਵ */] = 0xf2,
        _a[54 /* Rੜ */] = 0xf3,
        _a[55 /* SPairiBindiਸ਼ */] = 0xf4,
        _a[56 /* KPairiBindiਖ਼ */] = 0xf5,
        _a[57 /* GPairiBindiਗ਼ */] = 0xf6,
        _a[58 /* JPairiBindiਜ਼ */] = 0xf7,
        //[Char.FPairiBindiਫ਼]: 0x46,
        _a[60 /* LPairiBindiਲ਼ */] = 0xff,
        //[Char.PairiBindi]: 0xe6,
        //[Char.Dot]: 0x50,
        //[Char.PairiHaha]: 0x48,
        //[Char.PairiHahaDulainkar]: 0xa7,
        _a[66 /* PairiRara */] = 0x7a,
        //[Char.PairiRaraPairiBindi]: 0x71,
        _a[69 /* PairiChacha */] = 0x7b,
        _a[70 /* PairiTenka */] = 0x7c,
        _a[71 /* PairiVava */] = 0xc9,
        //[Char.PairiYaiya]: 0xcf,
        _a[73 /* PairiTata */] = 0x7d,
        _a[74 /* PairiNana */] = 0xa5,
        //[Char.HalfYaiyaLeft]: 0x77,
        _a[77 /* Tippi */] = 0xa7,
        //[Char.TippiRight]: 0x5e,
        //[Char.Visagra]: 0x00,
        //[Char.AddakAbove]: 0x26,
        //[Char.AddakRight]: 0x25,
        //[Char.AddakRight2]: 0xa4,
        //[Char.AdakBindi]: 0x0A01,
        //[Char.Bindi]: 0x3a,
        //[Char.Bindi2]: 0x2c6,
        //[Char.Yakash]: 0x00,
        _a[88 /* Kana */] = 0xc5,
        //[Char.KanaBindi]: 0x3b,
        _a[90 /* Sihari */] = 0xc7,
        _a[91 /* Bihari */] = 0xc6,
        _a[92 /* BihariBindi */] = 0xc4,
        //[Char.Aunkar]: 0x55,
        //[Char.Aunkar2]:0xfc,
        _a[95 /* Dulainkar */] = 0xb1,
        _a[96 /* Dulainkar2 */] = 0xc8,
        _a[97 /* Lavan */] = 0xb6,
        _a[98 /* Dulavan */] = 0xcb,
        //[Char.Hora]: 0x7e,
        _a[100 /* Kanaura */] = 0xcf,
        //[Char.Kanaura2]: 0xf8,
        //[Char.Virama]: 0x40,
        //[Char.Udaat]: 0x00,
        _a[104 /* Danda */] = 0xa2,
        _a[106 /* Danda2 */] = 0xcd,
        //[Char.DandaLong]: 0xa2,
        _a[108 /* DoubleDanda */] = 0xa3,
        _a[109 /* DoubleDanda2 */] = 0xa8,
        _a[110 /* GZero */] = 0x30,
        _a[111 /* GOne */] = 0x31,
        _a[112 /* GTwo */] = 0x32,
        _a[113 /* GThree */] = 0x33,
        _a[114 /* GFour */] = 0x34,
        _a[115 /* GFive */] = 0x35,
        _a[116 /* GSix */] = 0x36,
        _a[117 /* GSeven */] = 0x37,
        _a[118 /* GEight */] = 0x38,
        _a[119 /* GNine */] = 0x39,
        _a[120 /* EnglishZero */] = 0x40,
        _a[121 /* EnglishOne */] = 0x41,
        _a[122 /* EnglishTwo */] = 0x42,
        _a[123 /* EnglishThree */] = 0x43,
        _a[124 /* EnglishFour */] = 0x44,
        _a[125 /* EnglishFive */] = 0x45,
        _a[126 /* EnglishSix */] = 0x46,
        _a[127 /* EnglishSeven */] = 0x47,
        _a[128 /* EnglishEight */] = 0x48,
        _a[129 /* EnglishNine */] = 0x49,
        _a[130 /* Nu */] = 0xf9,
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
        _a[144 /* Colon */] = 0x3a,
        _a[146 /* SemiColon */] = 0x3b,
        //[Char.Unknown1]: 0xb4,
        _a[150 /* TopRightExtention */] = 0xce,
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
        _a[14 /* Oਓ */] = 0x55,
        _a[15 /* Aਅ */] = 0x6e,
        //[Char.Aਆ]: 0x00,
        //[Char.Aਐ]: 0x00,
        //[Char.Oਔ]: 0x00,
        _a[19 /* Eੲ */] = 0x4a,
        //[Char.Eਇ]: 0x00,
        //[Char.Eਈ]: 0x00,
        //[Char.Eਏ]: 0xb4,
        _a[23 /* Sਸ */] = 0x3b,
        _a[24 /* Hਹ */] = 0x6a,
        _a[25 /* Kਕ */] = 0x65,
        _a[26 /* Kਖ */] = 0x79,
        _a[27 /* Gਗ */] = 0x72,
        _a[28 /* Gਘ */] = 0x78,
        _a[29 /* Nਙ */] = 0x43,
        _a[30 /* Cਚ */] = 0x75,
        _a[31 /* Cਛ */] = 0x53,
        _a[32 /* Jਜ */] = 0x69,
        _a[33 /* Jਝ */] = 0x4d,
        _a[34 /* Nਞ */] = 0x52,
        _a[35 /* Tਟ */] = 0x4e,
        _a[36 /* Tਠ */] = 0x6d,
        _a[37 /* Dਡ */] = 0x76,
        _a[38 /* Dਢ */] = 0x59,
        _a[39 /* Nਣ */] = 0x44,
        _a[40 /* Tਤ */] = 0x73,
        _a[41 /* Tਥ */] = 0x45,
        _a[42 /* Dਦ */] = 0x64,
        _a[43 /* Dਧ */] = 0x58,
        _a[44 /* Nਨ */] = 0x42,
        _a[45 /* Pਪ */] = 0x67,
        _a[46 /* Fਫ */] = 0x63,
        _a[47 /* Bਬ */] = 0x70,
        _a[48 /* Bਭ */] = 0x47,
        _a[49 /* Mਮ */] = 0x77,
        _a[50 /* Yਯ */] = 0x3a,
        _a[51 /* Rਰ */] = 0x6f,
        _a[52 /* Lਲ */] = 0x62,
        _a[53 /* Vਵ */] = 0x74,
        _a[54 /* Rੜ */] = 0x56,
        _a[55 /* SPairiBindiਸ਼ */] = 0x50,
        _a[56 /* KPairiBindiਖ਼ */] = 0x5c,
        _a[57 /* GPairiBindiਗ਼ */] = 0x7d,
        _a[58 /* JPairiBindiਜ਼ */] = 0x49,
        _a[59 /* FPairiBindiਫ਼ */] = 0x7c,
        _a[60 /* LPairiBindiਲ਼ */] = 0x2b,
        _a[61 /* PairiBindi */] = 0x61,
        _a[63 /* Dot */] = 0x48,
        _a[64 /* PairiHaha */] = 0x51,
        _a[65 /* PairiHahaDulainkar */] = 0xa7,
        _a[66 /* PairiRara */] = 0x71,
        _a[67 /* PairiRaraLeft */] = 0xae,
        //[Char.PairiRaraPairiBindi]: 0x71,
        _a[69 /* PairiChacha */] = 0xe7,
        _a[70 /* PairiTenka */] = 0x2020,
        _a[71 /* PairiVava */] = 0x5f,
        _a[72 /* PairiYaiya */] = 0xcf,
        _a[73 /* PairiTata */] = 0x153,
        _a[74 /* PairiNana */] = 0x2dc,
        _a[75 /* HalfYaiyaRight */] = 0xce,
        //[Char.HalfYaiyaLeft]: 0x77,
        _a[77 /* Tippi */] = 0x7a,
        //[Char.TippiRight]: 0x5e,
        //[Char.Visagra]: 0x00,
        _a[83 /* AddakAbove */] = 0x5a,
        _a[84 /* AddakRight */] = 0x7e,
        _a[85 /* AddakRight2 */] = 0xa4,
        //[Char.AdakBindi]: 0x0A01,
        _a[80 /* Bindi */] = 0x41,
        _a[81 /* Bindi2 */] = 0x2c6,
        //[Char.Yakash]: 0x00,
        _a[88 /* Kana */] = 0x6b,
        _a[89 /* KanaBindi */] = 0x4b,
        _a[90 /* Sihari */] = 0x66,
        _a[91 /* Bihari */] = 0x68,
        //[Char.BihariBindi]: 0x192,
        _a[93 /* Aunkar */] = 0x5b,
        //[Char.Aunkar2]:0xfc,
        _a[95 /* Dulainkar */] = 0x7b,
        _a[96 /* Dulainkar2 */] = 0xa8,
        _a[97 /* Lavan */] = 0x2f,
        _a[98 /* Dulavan */] = 0x3f,
        _a[99 /* Hora */] = 0x27,
        _a[100 /* Kanaura */] = 0x22,
        //[Char.Kanaura2]: 0xf8,
        //[Char.Virama]: 0x40,
        //[Char.Udaat]: 0x00,
        _a[104 /* Danda */] = 0x2e,
        //[Char.DandaLong]: 0xa2,
        _a[108 /* DoubleDanda */] = 0x5d,
        _a[109 /* DoubleDanda2 */] = 0xd2,
        _a[110 /* GZero */] = 0xfa,
        _a[111 /* GOne */] = 0xf1,
        _a[112 /* GTwo */] = 0xf2,
        _a[113 /* GThree */] = 0xf3,
        _a[114 /* GFour */] = 0xf4,
        _a[115 /* GFive */] = 0xf5,
        _a[116 /* GSix */] = 0xf6,
        _a[117 /* GSeven */] = 0xf7,
        _a[118 /* GEight */] = 0xf8,
        _a[119 /* GNine */] = 0xf9,
        _a[120 /* EnglishZero */] = 0x30,
        _a[121 /* EnglishOne */] = 0x31,
        _a[122 /* EnglishTwo */] = 0x32,
        _a[123 /* EnglishThree */] = 0x33,
        _a[124 /* EnglishFour */] = 0x34,
        _a[125 /* EnglishFive */] = 0x35,
        _a[126 /* EnglishSix */] = 0x36,
        _a[127 /* EnglishSeven */] = 0x37,
        _a[128 /* EnglishEight */] = 0x38,
        _a[129 /* EnglishNine */] = 0x39,
        _a[130 /* Nu */] = 0x192,
        //[Char.NanaDulainkar] : 0xb6,
        _a[132 /* RaraAunkar */] = 0x57,
        _a[135 /* Khanda */] = 0xc7,
        //[Char.Khanda2]: 0x2202,
        //[Char.Divide]: 0x2039,
        _a[134 /* Multiply */] = 0x25,
        _a[137 /* FlowerDesign1 */] = 0x152,
        _a[138 /* FlowerDesign2 */] = 0x201a,
        _a[139 /* FlowerDesign3 */] = 0x2030,
        _a[140 /* FlowerDesign4 */] = 0xd3,
        _a[141 /* FlowerDesign5 */] = 0xd4,
        //[Char.Diamond]:0x2022,
        _a[143 /* KThind */] = 0xff,
        _a[144 /* Colon */] = 0x4c,
        _a[145 /* ColonFancy */] = 0xda,
        _a[146 /* SemiColon */] = 0x6c,
        //[Char.Unknown1]: 0xb4,
        _a[150 /* TopRightExtention */] = 0x46,
        _a[151 /* SingleQuoteCurlyLeft */] = 0x2018,
        _a[153 /* SingleQuoteCurlyRight */] = 0x2019,
        _a[155 /* DoubleQuoteCurlyLeft */] = 0x201c,
        _a[156 /* DoubleQuoteCurlyRight */] = 0x201d,
        _a[157 /* DoubleQuoteCurlyRight2 */] = 0x40,
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
        [[64 /* PairiHaha */], [102 /* Virama */, 24 /* Hਹ */]],
        [[66 /* PairiRara */], [67 /* PairiRaraLeft */], [102 /* Virama */, 51 /* Rਰ */]],
        [[69 /* PairiChacha */], [102 /* Virama */, 30 /* Cਚ */]],
        [[70 /* PairiTenka */], [102 /* Virama */, 35 /* Tਟ */]],
        [[71 /* PairiVava */], [102 /* Virama */, 53 /* Vਵ */]],
        [[72 /* PairiYaiya */], [102 /* Virama */, 50 /* Yਯ */, 102 /* Virama */, 50 /* Yਯ */]],
        [[73 /* PairiTata */], [102 /* Virama */, 40 /* Tਤ */]],
        [[74 /* PairiNana */], [102 /* Virama */, 44 /* Nਨ */]],
        [[68 /* PairiRaraPairiBindi */], [66 /* PairiRara */, 61 /* PairiBindi */],
            [66 /* PairiRara */, 62 /* PairiBindi2 */], [61 /* PairiBindi */, 102 /* Virama */, 51 /* Rਰ */], [62 /* PairiBindi2 */, 102 /* Virama */, 51 /* Rਰ */]],
    ];
    var ikOnkarVersion1 = [[0 /* IkOnkarVersion1 */], [1 /* IkOnkarVersion1a */, 2 /* IkOnkarVersion1b */], [1 /* IkOnkarVersion1a */], [111 /* GOne */, 9 /* Onkar1 */]];
    var ikOnkarVersion2 = [[3 /* IkOnkarVersion2 */], [4 /* IkOnkarVersion2a */, 5 /* IkOnkarVersion2b */], [4 /* IkOnkarVersion2a */], [111 /* GOne */, 10 /* Onkar2 */]];
    var ikOnkarVersion3 = [[6 /* IkOnkarVersion3 */]];
    var compositions = moveAcrossChaSet.concat([
        ikOnkarVersion1,
        ikOnkarVersion2,
        ikOnkarVersion3,
        ikOnkarVersion1.concat(ikOnkarVersion2, ikOnkarVersion3, [[7 /* IkOnkarVersion4 */], [8 /* IkOnkarVersion5 */]]),
        [[75 /* HalfYaiyaRight */], [102 /* Virama */, 50 /* Yਯ */]],
        [[86 /* AdakBindi */], [84 /* AddakRight */, 80 /* Bindi */]],
        [[16 /* Aਆ */], [15 /* Aਅ */, 88 /* Kana */]],
        [[16 /* Aਆ */, 80 /* Bindi */], [15 /* Aਅ */, 89 /* KanaBindi */]],
        [[20 /* Eਇ */], [90 /* Sihari */, 19 /* Eੲ */]],
        [[21 /* Eਈ */], [19 /* Eੲ */, 91 /* Bihari */]],
        [[12 /* Uਉ */], [11 /* Uੳ */, 93 /* Aunkar */]],
        [[13 /* Uਊ */], [11 /* Uੳ */, 95 /* Dulainkar */]],
        [[14 /* Oਓ */], [9 /* Onkar1 */], [10 /* Onkar2 */]],
        [[22 /* Eਏ */], [19 /* Eੲ */, 97 /* Lavan */]],
        [[17 /* Aਐ */], [15 /* Aਅ */, 98 /* Dulavan */]],
        [[18 /* Oਔ */], [15 /* Aਅ */, 100 /* Kanaura */]],
        [[60 /* LPairiBindiਲ਼ */], [52 /* Lਲ */, 61 /* PairiBindi */]],
        [[55 /* SPairiBindiਸ਼ */], [23 /* Sਸ */, 61 /* PairiBindi */]],
        [[56 /* KPairiBindiਖ਼ */], [26 /* Kਖ */, 61 /* PairiBindi */]],
        [[57 /* GPairiBindiਗ਼ */], [27 /* Gਗ */, 61 /* PairiBindi */]],
        [[58 /* JPairiBindiਜ਼ */], [32 /* Jਜ */, 61 /* PairiBindi */]],
        [[59 /* FPairiBindiਫ਼ */], [46 /* Fਫ */, 61 /* PairiBindi */]],
        [[108 /* DoubleDanda */], [104 /* Danda */, 104 /* Danda */], [109 /* DoubleDanda2 */]],
        [[95 /* Dulainkar */], [96 /* Dulainkar2 */]],
        [[93 /* Aunkar */], [94 /* Aunkar2 */]],
        [[104 /* Danda */], [106 /* Danda2 */], [107 /* Danda3 */], [105 /* DandaLong */]],
        [[89 /* KanaBindi */], [88 /* Kana */, 80 /* Bindi */]],
        [[84 /* AddakRight */], [85 /* AddakRight2 */]],
        [[83 /* AddakAbove */], [84 /* AddakRight */], [85 /* AddakRight2 */]],
        [[0 /* IkOnkarVersion1 */], [1 /* IkOnkarVersion1a */, 2 /* IkOnkarVersion1b */], [1 /* IkOnkarVersion1a */]],
        [[61 /* PairiBindi */], [62 /* PairiBindi2 */]],
        [[77 /* Tippi */], [78 /* Tippi2 */], [79 /* TippiRight */]],
        [[130 /* Nu */], [44 /* Nਨ */, 95 /* Dulainkar */, 77 /* Tippi */], [44 /* Nਨ */, 77 /* Tippi */, 95 /* Dulainkar */], [131 /* NanaDulainkar */, 77 /* Tippi */]],
        [[131 /* NanaDulainkar */], [44 /* Nਨ */, 95 /* Dulainkar */]],
        [[137 /* FlowerDesign1 */], [138 /* FlowerDesign2 */], [139 /* FlowerDesign3 */], [140 /* FlowerDesign4 */], [141 /* FlowerDesign5 */]],
        [[65 /* PairiHahaDulainkar */], [102 /* Virama */, 24 /* Hਹ */, 95 /* Dulainkar */]],
        [[92 /* BihariBindi */], [91 /* Bihari */, 80 /* Bindi */]],
        [[100 /* Kanaura */], [101 /* Kanaura2 */]],
        [[151 /* SingleQuoteCurlyLeft */], [152 /* SingleQuoteCurlyLeft2 */]],
        [[153 /* SingleQuoteCurlyRight */], [154 /* SingleQuoteCurlyRight2 */]],
        [[156 /* DoubleQuoteCurlyRight */], [157 /* DoubleQuoteCurlyRight2 */]],
        [[135 /* Khanda */], [136 /* Khanda2 */]],
        [[144 /* Colon */], [145 /* ColonFancy */]],
        [[146 /* SemiColon */], [147 /* SemiColon2 */], [148 /* SemiColon3 */]],
        [[132 /* RaraAunkar */], [51 /* Rਰ */, 93 /* Aunkar */], [51 /* Rਰ */, 94 /* Aunkar2 */]]
    ]);
    var fontConvertorConfigs = {
        "Unicode": {
            moveRightCharacters: [90 /* Sihari */],
            characterCodes: makeArray(PunjabiFontConvertor.unicodeMapping)
        },
        "AnmolUni": {
            moveRightCharacters: [90 /* Sihari */],
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
