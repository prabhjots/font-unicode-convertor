(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.PunjabiFontConvertor = {}));
}(this, function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    function convertStringUsingMapperInternal(config, stringToConvert) {
        var output = [];
        var charToAddOnRight = "";
        var charToMoveRightIndex = 0;
        for (var i = 0; i < stringToConvert.length; i++) {
            var j = config.maxWidth + 1;
            var matchFound = false;
            var charToMatch = "";
            while (matchFound === false && j--) {
                charToMatch = stringToConvert.substr(i, j);
                if (charToMatch in config.mapper) {
                    matchFound = true;
                    i = i + (j - 1);
                }
            }
            var charToAdd = void 0;
            if (matchFound) {
                charToAdd = config.mapper[charToMatch];
            }
            else {
                charToAdd = stringToConvert[i];
            }
            if (charToAddOnRight) {
                if (charToMoveRightIndex < 1) {
                    charToMoveRightIndex = 1;
                    output.push(charToAdd);
                }
                else if (config.moveAcrossCharacters.indexOf(charToAdd) > -1) {
                    output.push(charToAdd);
                }
                else {
                    output.push(charToAddOnRight, charToAdd);
                    charToAddOnRight = null;
                    charToMoveRightIndex = 0;
                }
            }
            else if (config.moveRightChars.indexOf(charToAdd) > -1) {
                charToAddOnRight = charToAdd;
            }
            else if (config.moveLeftChars.indexOf(charToAdd) > -1 && output.length) {
                insertCharOnLeft(output, config.moveAcrossCharacters, charToAdd, []);
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
    function convertStringUsingMapper(config, stringToConvert) {
        if (stringToConvert) {
            return stringToConvert.split(" ").map(function (s) { return convertStringUsingMapperInternal(config, s); }).join(" ");
        }
        return "";
    }
    function insertCharOnLeft(chars, moveLeftAcrossChars, characterToAdd, onRightChars) {
        var lastChar = chars.pop();
        if (lastChar) {
            if (moveLeftAcrossChars.indexOf(lastChar) > -1) {
                onRightChars.unshift(lastChar);
                insertCharOnLeft(chars, moveLeftAcrossChars, characterToAdd, onRightChars);
            }
            else {
                chars.push.apply(chars, __spreadArrays([characterToAdd, lastChar], onRightChars));
            }
        }
        else {
            chars.push.apply(chars, __spreadArrays([characterToAdd], onRightChars));
        }
    }
    function getMapper(to, from, compositions, moveAcrossCharSet) {
        var mapper = {};
        for (var i in to.characterCodes) {
            var fromChar = from.characterCodes[i];
            var toChar = to.characterCodes[i];
            if (fromChar && toChar) {
                mapper[getCharFromUnicode(fromChar)] = getCharFromUnicode(toChar);
            }
        }
        var maxWidth = 1;
        for (var _i = 0, compositions_1 = compositions; _i < compositions_1.length; _i++) {
            var compositionCharArrays = compositions_1[_i];
            var toCharacter = getCompositionCharacters(compositionCharArrays, to.characterCodes)[0];
            if (toCharacter) {
                var fromCharacters = getCompositionCharacters(compositionCharArrays, from.characterCodes);
                for (var _a = 0, fromCharacters_1 = fromCharacters; _a < fromCharacters_1.length; _a++) {
                    var fromChar_1 = fromCharacters_1[_a];
                    maxWidth = Math.max(maxWidth, fromChar_1.length);
                    if (!(fromChar_1 in mapper)) {
                        mapper[fromChar_1] = toCharacter;
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
            moveRightChars: moveRightCharIndexes.map(function (c) { return getCharFromUnicode(to.characterCodes[c]); }),
        };
    }
    function getCompositionCharacters(compositionCharArrays, codes) {
        var characters = [];
        for (var _i = 0, compositionCharArrays_1 = compositionCharArrays; _i < compositionCharArrays_1.length; _i++) {
            var compositionChar = compositionCharArrays_1[_i];
            var isValid = true;
            var charCodes = [];
            for (var _a = 0, compositionChar_1 = compositionChar; _a < compositionChar_1.length; _a++) {
                var code = compositionChar_1[_a];
                var toCode = codes[code];
                if (toCode) {
                    charCodes.push(toCode);
                }
                else {
                    isValid = false;
                    //onsole.error(`No code in to for ${code}`);
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
            unicodes[_i] = arguments[_i];
        }
        return unicodes.map(function (c) { return String.fromCharCode(c); }).join("");
    }
    function merge() {
        var configs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            configs[_i] = arguments[_i];
        }
        var c = {};
        for (var _a = 0, configs_1 = configs; _a < configs_1.length; _a++) {
            var a = configs_1[_a];
            for (var x in a) {
                c[x] = a[x];
            }
        }
        return c;
    }

    var Char;
    (function (Char) {
        Char[Char["IkOnkarVersion1"] = 0] = "IkOnkarVersion1";
        Char[Char["IkOnkarVersion1a"] = 1] = "IkOnkarVersion1a";
        Char[Char["IkOnkarVersion1b"] = 2] = "IkOnkarVersion1b";
        Char[Char["IkOnkarVersion2"] = 3] = "IkOnkarVersion2";
        Char[Char["IkOnkarVersion2a"] = 4] = "IkOnkarVersion2a";
        Char[Char["IkOnkarVersion2b"] = 5] = "IkOnkarVersion2b";
        Char[Char["IkOnkarVersion3"] = 6] = "IkOnkarVersion3";
        Char[Char["IkOnkarVersion4"] = 7] = "IkOnkarVersion4";
        Char[Char["IkOnkarVersion5"] = 8] = "IkOnkarVersion5";
        Char[Char["Onkar1"] = 9] = "Onkar1";
        Char[Char["Onkar2"] = 10] = "Onkar2";
        Char[Char["U\u0A73"] = 11] = "U\u0A73";
        Char[Char["U\u0A09"] = 12] = "U\u0A09";
        Char[Char["U\u0A09Bindi"] = 13] = "U\u0A09Bindi";
        Char[Char["U\u0A0A"] = 14] = "U\u0A0A";
        Char[Char["O\u0A13"] = 15] = "O\u0A13";
        Char[Char["O\u0A132"] = 16] = "O\u0A132";
        Char[Char["A\u0A05"] = 17] = "A\u0A05";
        Char[Char["A\u0A06"] = 18] = "A\u0A06";
        Char[Char["A\u0A10"] = 19] = "A\u0A10";
        Char[Char["O\u0A14"] = 20] = "O\u0A14";
        Char[Char["E\u0A72"] = 21] = "E\u0A72";
        Char[Char["E\u0A07"] = 22] = "E\u0A07";
        Char[Char["E\u0A08"] = 23] = "E\u0A08";
        Char[Char["E\u0A0F"] = 24] = "E\u0A0F";
        Char[Char["S\u0A38"] = 25] = "S\u0A38";
        Char[Char["H\u0A39"] = 26] = "H\u0A39";
        Char[Char["K\u0A15"] = 27] = "K\u0A15";
        Char[Char["K\u0A16"] = 28] = "K\u0A16";
        Char[Char["G\u0A17"] = 29] = "G\u0A17";
        Char[Char["G\u0A18"] = 30] = "G\u0A18";
        Char[Char["N\u0A19"] = 31] = "N\u0A19";
        Char[Char["C\u0A1A"] = 32] = "C\u0A1A";
        Char[Char["C\u0A1B"] = 33] = "C\u0A1B";
        Char[Char["J\u0A1C"] = 34] = "J\u0A1C";
        Char[Char["J\u0A1D"] = 35] = "J\u0A1D";
        Char[Char["N\u0A1E"] = 36] = "N\u0A1E";
        Char[Char["T\u0A1F"] = 37] = "T\u0A1F";
        Char[Char["T\u0A20"] = 38] = "T\u0A20";
        Char[Char["D\u0A21"] = 39] = "D\u0A21";
        Char[Char["D\u0A22"] = 40] = "D\u0A22";
        Char[Char["N\u0A23"] = 41] = "N\u0A23";
        Char[Char["T\u0A24"] = 42] = "T\u0A24";
        Char[Char["T\u0A25"] = 43] = "T\u0A25";
        Char[Char["D\u0A26"] = 44] = "D\u0A26";
        Char[Char["D\u0A27"] = 45] = "D\u0A27";
        Char[Char["N\u0A28"] = 46] = "N\u0A28";
        Char[Char["P\u0A2A"] = 47] = "P\u0A2A";
        Char[Char["F\u0A2B"] = 48] = "F\u0A2B";
        Char[Char["B\u0A2C"] = 49] = "B\u0A2C";
        Char[Char["B\u0A2D"] = 50] = "B\u0A2D";
        Char[Char["M\u0A2E"] = 51] = "M\u0A2E";
        Char[Char["Y\u0A2F"] = 52] = "Y\u0A2F";
        Char[Char["R\u0A30"] = 53] = "R\u0A30";
        Char[Char["L\u0A32"] = 54] = "L\u0A32";
        Char[Char["V\u0A35"] = 55] = "V\u0A35";
        Char[Char["R\u0A5C"] = 56] = "R\u0A5C";
        Char[Char["SPairiBindi\u0A36"] = 57] = "SPairiBindi\u0A36";
        Char[Char["KPairiBindi\u0A59"] = 58] = "KPairiBindi\u0A59";
        Char[Char["GPairiBindi\u0A5A"] = 59] = "GPairiBindi\u0A5A";
        Char[Char["JPairiBindi\u0A5B"] = 60] = "JPairiBindi\u0A5B";
        Char[Char["FPairiBindi\u0A5E"] = 61] = "FPairiBindi\u0A5E";
        Char[Char["LPairiBindi\u0A33"] = 62] = "LPairiBindi\u0A33";
        Char[Char["PairiBindi"] = 63] = "PairiBindi";
        Char[Char["PairiBindi2"] = 64] = "PairiBindi2";
        Char[Char["Dot"] = 65] = "Dot";
        Char[Char["PairiHaha"] = 66] = "PairiHaha";
        Char[Char["PairiHaha2"] = 67] = "PairiHaha2";
        Char[Char["PairiHahaDulainkar"] = 68] = "PairiHahaDulainkar";
        Char[Char["PairiRara"] = 69] = "PairiRara";
        Char[Char["PairiRaraLeft"] = 70] = "PairiRaraLeft";
        Char[Char["PairiRaraPairiBindi"] = 71] = "PairiRaraPairiBindi";
        Char[Char["PairiChacha"] = 72] = "PairiChacha";
        Char[Char["PairiTenka"] = 73] = "PairiTenka";
        Char[Char["PairiVava"] = 74] = "PairiVava";
        Char[Char["PairiVava2"] = 75] = "PairiVava2";
        Char[Char["PairiYaiya"] = 76] = "PairiYaiya";
        Char[Char["PairiTata"] = 77] = "PairiTata";
        Char[Char["PairiNana"] = 78] = "PairiNana";
        Char[Char["HalfYaiyaRight"] = 79] = "HalfYaiyaRight";
        Char[Char["HalfYaiyaLeft"] = 80] = "HalfYaiyaLeft";
        Char[Char["TippiLeft"] = 81] = "TippiLeft";
        Char[Char["Tippi"] = 82] = "Tippi";
        Char[Char["Tippi2"] = 83] = "Tippi2";
        Char[Char["TippiRight"] = 84] = "TippiRight";
        Char[Char["Bindi"] = 85] = "Bindi";
        Char[Char["Bindi2"] = 86] = "Bindi2";
        Char[Char["Visagra"] = 87] = "Visagra";
        Char[Char["AddakLeft"] = 88] = "AddakLeft";
        Char[Char["AddakAbove"] = 89] = "AddakAbove";
        Char[Char["AddakRight"] = 90] = "AddakRight";
        Char[Char["AddakRight2"] = 91] = "AddakRight2";
        Char[Char["AdakBindi"] = 92] = "AdakBindi";
        Char[Char["Yakash"] = 93] = "Yakash";
        Char[Char["Kana"] = 94] = "Kana";
        Char[Char["Kana2"] = 95] = "Kana2";
        Char[Char["KanaBindi"] = 96] = "KanaBindi";
        Char[Char["Sihari"] = 97] = "Sihari";
        Char[Char["Sihari2"] = 98] = "Sihari2";
        Char[Char["Bihari"] = 99] = "Bihari";
        Char[Char["Bihari2"] = 100] = "Bihari2";
        Char[Char["BihariBindi"] = 101] = "BihariBindi";
        Char[Char["BihariBindi2"] = 102] = "BihariBindi2";
        Char[Char["Aunkar"] = 103] = "Aunkar";
        Char[Char["Aunkar2"] = 104] = "Aunkar2";
        Char[Char["Aunkar3"] = 105] = "Aunkar3";
        Char[Char["Dulainkar"] = 106] = "Dulainkar";
        Char[Char["Dulainkar2"] = 107] = "Dulainkar2";
        Char[Char["Dulainkar3"] = 108] = "Dulainkar3";
        Char[Char["Lavan"] = 109] = "Lavan";
        Char[Char["Lavan2"] = 110] = "Lavan2";
        Char[Char["Dulavan"] = 111] = "Dulavan";
        Char[Char["Dulavan2"] = 112] = "Dulavan2";
        Char[Char["Hora"] = 113] = "Hora";
        Char[Char["Hora2"] = 114] = "Hora2";
        Char[Char["Kanaura"] = 115] = "Kanaura";
        Char[Char["Kanaura2"] = 116] = "Kanaura2";
        Char[Char["KanauraRight"] = 117] = "KanauraRight";
        Char[Char["Virama"] = 118] = "Virama";
        Char[Char["Udaat"] = 119] = "Udaat";
        Char[Char["Danda"] = 120] = "Danda";
        Char[Char["DandaLong"] = 121] = "DandaLong";
        Char[Char["Danda2"] = 122] = "Danda2";
        Char[Char["Danda3"] = 123] = "Danda3";
        Char[Char["DoubleDanda"] = 124] = "DoubleDanda";
        Char[Char["DoubleDanda2"] = 125] = "DoubleDanda2";
        Char[Char["GZero"] = 126] = "GZero";
        Char[Char["GOne"] = 127] = "GOne";
        Char[Char["GOne1"] = 128] = "GOne1";
        Char[Char["GTwo"] = 129] = "GTwo";
        Char[Char["GThree"] = 130] = "GThree";
        Char[Char["GFour"] = 131] = "GFour";
        Char[Char["GFive"] = 132] = "GFive";
        Char[Char["GSix"] = 133] = "GSix";
        Char[Char["GSeven"] = 134] = "GSeven";
        Char[Char["GEight"] = 135] = "GEight";
        Char[Char["GNine"] = 136] = "GNine";
        Char[Char["EnglishZero"] = 137] = "EnglishZero";
        Char[Char["EnglishOne"] = 138] = "EnglishOne";
        Char[Char["EnglishTwo"] = 139] = "EnglishTwo";
        Char[Char["EnglishThree"] = 140] = "EnglishThree";
        Char[Char["EnglishFour"] = 141] = "EnglishFour";
        Char[Char["EnglishFive"] = 142] = "EnglishFive";
        Char[Char["EnglishSix"] = 143] = "EnglishSix";
        Char[Char["EnglishSeven"] = 144] = "EnglishSeven";
        Char[Char["EnglishEight"] = 145] = "EnglishEight";
        Char[Char["EnglishNine"] = 146] = "EnglishNine";
        Char[Char["Nu"] = 147] = "Nu";
        Char[Char["NanaDulainkar"] = 148] = "NanaDulainkar";
        Char[Char["RaraAunkar"] = 149] = "RaraAunkar";
        Char[Char["Divide"] = 150] = "Divide";
        Char[Char["Multiply"] = 151] = "Multiply";
        Char[Char["Khanda"] = 152] = "Khanda";
        Char[Char["Khanda2"] = 153] = "Khanda2";
        Char[Char["FlowerDesign1"] = 154] = "FlowerDesign1";
        Char[Char["FlowerDesign2"] = 155] = "FlowerDesign2";
        Char[Char["FlowerDesign3"] = 156] = "FlowerDesign3";
        Char[Char["FlowerDesign4"] = 157] = "FlowerDesign4";
        Char[Char["FlowerDesign5"] = 158] = "FlowerDesign5";
        Char[Char["Diamond"] = 159] = "Diamond";
        Char[Char["KThind"] = 160] = "KThind";
        Char[Char["Colon"] = 161] = "Colon";
        Char[Char["ColonFancy"] = 162] = "ColonFancy";
        Char[Char["SemiColon"] = 163] = "SemiColon";
        Char[Char["SemiColon2"] = 164] = "SemiColon2";
        Char[Char["SemiColon3"] = 165] = "SemiColon3";
        Char[Char["Unknown1"] = 166] = "Unknown1";
        Char[Char["TopRightExtention"] = 167] = "TopRightExtention";
        Char[Char["SingleQuoteCurlyLeft"] = 168] = "SingleQuoteCurlyLeft";
        Char[Char["SingleQuoteCurlyLeft2"] = 169] = "SingleQuoteCurlyLeft2";
        Char[Char["SingleQuoteCurlyRight"] = 170] = "SingleQuoteCurlyRight";
        Char[Char["SingleQuoteCurlyRight2"] = 171] = "SingleQuoteCurlyRight2";
        Char[Char["DoubleQuoteCurlyLeft"] = 172] = "DoubleQuoteCurlyLeft";
        Char[Char["DoubleQuoteCurlyRight"] = 173] = "DoubleQuoteCurlyRight";
        Char[Char["DoubleQuoteCurlyRight2"] = 174] = "DoubleQuoteCurlyRight2";
        Char[Char["SquareBracketLeft"] = 175] = "SquareBracketLeft";
        Char[Char["SquareBracketLeft2"] = 176] = "SquareBracketLeft2";
        Char[Char["SquareBracketRight"] = 177] = "SquareBracketRight";
        Char[Char["SquareBracketRight2"] = 178] = "SquareBracketRight2";
        Char[Char["KakaPairiRara"] = 179] = "KakaPairiRara";
        Char[Char["LalaDulainkar"] = 180] = "LalaDulainkar";
        Char[Char["LalaAunkar"] = 181] = "LalaAunkar";
        Char[Char["LalaTippi"] = 182] = "LalaTippi";
        Char[Char["T\u0A25Aunkar"] = 183] = "T\u0A25Aunkar";
        Char[Char["C\u0A1AAunkar"] = 184] = "C\u0A1AAunkar";
        Char[Char["Hai"] = 185] = "Hai";
        Char[Char["Hai2"] = 186] = "Hai2";
    })(Char || (Char = {}));

    var _a;
    var anmolCharCodes = (_a = {},
        _a[Char.IkOnkarVersion1a] = 0x3c,
        _a[Char.IkOnkarVersion1b] = 0x3e,
        _a[Char.IkOnkarVersion2a] = 0xc5,
        _a[Char.IkOnkarVersion2b] = 0xc6,
        _a[Char.IkOnkarVersion3] = 0xa1,
        _a[Char.Uੳ] = 0x61,
        //[Char.Uਉ]: 0x00,
        //[Char.Uਊ]: 0x00,
        _a[Char.Oਓ] = 0x45,
        _a[Char.Aਅ] = 0x41,
        //[Char.Aਆ]: 0x00,
        //[Char.Aਐ]: 0x00,
        //[Char.Oਔ]: 0x00,
        _a[Char.Eੲ] = 0x65,
        //[Char.Eਇ]: 0x00,
        //[Char.Eਈ]: 0x00,
        //[Char.Eਏ]: 0x00,
        _a[Char.Sਸ] = 0x73,
        _a[Char.Hਹ] = 0x68,
        _a[Char.Kਕ] = 0x6b,
        _a[Char.Kਖ] = 0x4b,
        _a[Char.Gਗ] = 0x67,
        _a[Char.Gਘ] = 0x47,
        _a[Char.Nਙ] = 0x7c,
        _a[Char.Cਚ] = 0x63,
        _a[Char.Cਛ] = 0x43,
        _a[Char.Jਜ] = 0x6a,
        _a[Char.Jਝ] = 0x4a,
        _a[Char.Nਞ] = 0x5c,
        _a[Char.Tਟ] = 0x74,
        _a[Char.Tਠ] = 0x54,
        _a[Char.Dਡ] = 0x66,
        _a[Char.Dਢ] = 0x46,
        _a[Char.Nਣ] = 0x78,
        _a[Char.Tਤ] = 0x71,
        _a[Char.Tਥ] = 0x51,
        _a[Char.Dਦ] = 0x64,
        _a[Char.Dਧ] = 0x44,
        _a[Char.Nਨ] = 0x6e,
        _a[Char.Pਪ] = 0x70,
        _a[Char.Fਫ] = 0x50,
        _a[Char.Bਬ] = 0x62,
        _a[Char.Bਭ] = 0x42,
        _a[Char.Mਮ] = 0x6d,
        _a[Char.Yਯ] = 0x58,
        _a[Char.Rਰ] = 0x72,
        _a[Char.Lਲ] = 0x6c,
        _a[Char.Vਵ] = 0x76,
        _a[Char.Rੜ] = 0x56,
        _a[Char.SPairiBindiਸ਼] = 0x53,
        _a[Char.KPairiBindiਖ਼] = 0x5e,
        _a[Char.GPairiBindiਗ਼] = 0x5a,
        _a[Char.JPairiBindiਜ਼] = 0x7a,
        _a[Char.FPairiBindiਫ਼] = 0x26,
        _a[Char.LPairiBindiਲ਼] = 0x4c,
        _a[Char.PairiBindi] = 0xe6,
        _a[Char.Dot] = 0x2e,
        _a[Char.PairiHaha] = 0x48,
        _a[Char.PairiHahaDulainkar] = 0xa7,
        _a[Char.PairiRara] = 0x52,
        _a[Char.PairiRaraPairiBindi] = 0xae,
        _a[Char.PairiChacha] = 0xe7,
        _a[Char.PairiTenka] = 0x2020,
        _a[Char.PairiVava] = 0xcd,
        _a[Char.PairiYaiya] = 0xcf,
        _a[Char.PairiTata] = 0x153,
        _a[Char.PairiNana] = 0x2dc,
        _a[Char.HalfYaiyaRight] = 0xce,
        _a[Char.Tippi] = 0x4d,
        //[Char.Bindi]: 0x00,
        //[Char.Visagra]: 0x00,
        _a[Char.AddakAbove] = 0x60,
        _a[Char.AddakRight] = 0x7e,
        _a[Char.AddakRight2] = 0xa4,
        _a[Char.AdakBindi] = 0x0A01,
        _a[Char.Bindi] = 0x4e,
        _a[Char.Bindi2] = 0x2c6,
        //[Char.Yakash]: 0x00,
        _a[Char.Kana] = 0x77,
        _a[Char.KanaBindi] = 0x57,
        _a[Char.Sihari] = 0x69,
        _a[Char.Bihari] = 0x49,
        _a[Char.Aunkar] = 0x75,
        _a[Char.Aunkar2] = 0xfc,
        _a[Char.Dulainkar] = 0x55,
        _a[Char.Dulainkar2] = 0xa8,
        _a[Char.Lavan] = 0x79,
        _a[Char.Dulavan] = 0x59,
        _a[Char.Hora] = 0x6f,
        _a[Char.Kanaura] = 0x4f,
        _a[Char.Virama] = 0x40,
        //[Char.Udaat]: 0x00,
        _a[Char.Danda] = 0x5b,
        _a[Char.DoubleDanda] = 0x5d,
        _a[Char.DoubleDanda2] = 0xd2,
        _a[Char.GZero] = 0xfa,
        _a[Char.GOne] = 0xf1,
        _a[Char.GTwo] = 0xf2,
        _a[Char.GThree] = 0xf3,
        _a[Char.GFour] = 0xf4,
        _a[Char.GFive] = 0xf5,
        _a[Char.GSix] = 0xf6,
        _a[Char.GSeven] = 0xf7,
        _a[Char.GEight] = 0xf8,
        _a[Char.GNine] = 0xf9,
        _a[Char.EnglishZero] = 0x30,
        _a[Char.EnglishOne] = 0x31,
        _a[Char.EnglishTwo] = 0x32,
        _a[Char.EnglishThree] = 0x33,
        _a[Char.EnglishFour] = 0x34,
        _a[Char.EnglishFive] = 0x35,
        _a[Char.EnglishSix] = 0x36,
        _a[Char.EnglishSeven] = 0x37,
        _a[Char.EnglishEight] = 0x38,
        _a[Char.EnglishNine] = 0x39,
        _a[Char.Nu] = 0x192,
        _a[Char.Khanda] = 0xc7,
        _a[Char.Divide] = 0x2039,
        _a[Char.Multiply] = 0xbf,
        _a[Char.FlowerDesign1] = 0x152,
        _a[Char.FlowerDesign2] = 0x201a,
        _a[Char.FlowerDesign3] = 0x2030,
        _a[Char.FlowerDesign4] = 0xd3,
        _a[Char.FlowerDesign5] = 0xd4,
        _a[Char.Diamond] = 0x2022,
        _a[Char.KThind] = 0xff,
        _a[Char.Colon] = 0x3a,
        _a[Char.ColonFancy] = 0xda,
        _a[Char.SemiColon] = 0x3b,
        _a[Char.Unknown1] = 0xb4,
        _a[Char.TopRightExtention] = 0xd8,
        _a[Char.SingleQuoteCurlyLeft] = 0x2018,
        _a[Char.SingleQuoteCurlyRight] = 0x2019,
        _a[Char.DoubleQuoteCurlyLeft] = 0x201c,
        _a[Char.DoubleQuoteCurlyRight] = 0x201d,
        _a);

    var _a$1;
    var aseesCharCodes = (_a$1 = {},
        _a$1[Char.IkOnkarVersion1] = 0xc5,
        _a$1[Char.IkOnkarVersion1a] = 0x2039,
        //[Char.IkOnkarVersion1b]: 0x3e,
        _a$1[Char.IkOnkarVersion2] = 0xc6,
        //[Char.IkOnkarVersion2a]: 0xc5,
        //[Char.IkOnkarVersion2b]: ,
        _a$1[Char.IkOnkarVersion3] = 0xa1,
        _a$1[Char.IkOnkarVersion4] = 0xe5,
        _a$1[Char.IkOnkarVersion5] = 0x3e,
        //[Char.Onkar1]: 0xd8,
        //[Char.Onkar2]: 0xa3,
        _a$1[Char.Uੳ] = 0x54,
        //[Char.Uਉ]: 0x00,
        //[Char.Uਊ]: 0x00,
        _a$1[Char.Oਓ] = 0x55,
        _a$1[Char.Aਅ] = 0x6e,
        //[Char.Aਆ]: 0x00,
        //[Char.Aਐ]: 0x00,
        //[Char.Oਔ]: 0x00,
        _a$1[Char.Eੲ] = 0x4a,
        //[Char.Eਇ]: 0x00,
        //[Char.Eਈ]: 0x00,
        //[Char.Eਏ]: 0xb4,
        _a$1[Char.Sਸ] = 0x3b,
        _a$1[Char.Hਹ] = 0x6a,
        _a$1[Char.Kਕ] = 0x65,
        _a$1[Char.Kਖ] = 0x79,
        _a$1[Char.Gਗ] = 0x72,
        _a$1[Char.Gਘ] = 0x78,
        _a$1[Char.Nਙ] = 0x43,
        _a$1[Char.Cਚ] = 0x75,
        _a$1[Char.Cਛ] = 0x53,
        _a$1[Char.Jਜ] = 0x69,
        _a$1[Char.Jਝ] = 0x4d,
        _a$1[Char.Nਞ] = 0x52,
        _a$1[Char.Tਟ] = 0x4e,
        _a$1[Char.Tਠ] = 0x6d,
        _a$1[Char.Dਡ] = 0x76,
        _a$1[Char.Dਢ] = 0x59,
        _a$1[Char.Nਣ] = 0x44,
        _a$1[Char.Tਤ] = 0x73,
        _a$1[Char.Tਥ] = 0x45,
        _a$1[Char.Dਦ] = 0x64,
        _a$1[Char.Dਧ] = 0x58,
        _a$1[Char.Nਨ] = 0x42,
        _a$1[Char.Pਪ] = 0x67,
        _a$1[Char.Fਫ] = 0x63,
        _a$1[Char.Bਬ] = 0x70,
        _a$1[Char.Bਭ] = 0x47,
        _a$1[Char.Mਮ] = 0x77,
        _a$1[Char.Yਯ] = 0x3a,
        _a$1[Char.Rਰ] = 0x6f,
        _a$1[Char.Lਲ] = 0x62,
        _a$1[Char.Vਵ] = 0x74,
        _a$1[Char.Rੜ] = 0x56,
        _a$1[Char.SPairiBindiਸ਼] = 0x50,
        _a$1[Char.KPairiBindiਖ਼] = 0x5c,
        _a$1[Char.GPairiBindiਗ਼] = 0x7d,
        _a$1[Char.JPairiBindiਜ਼] = 0x49,
        _a$1[Char.FPairiBindiਫ਼] = 0x7c,
        _a$1[Char.LPairiBindiਲ਼] = 0x2b,
        _a$1[Char.PairiBindi] = 0x61,
        _a$1[Char.Dot] = 0x48,
        _a$1[Char.PairiHaha] = 0x51,
        _a$1[Char.PairiHahaDulainkar] = 0xa7,
        _a$1[Char.PairiRara] = 0x71,
        _a$1[Char.PairiRaraLeft] = 0xae,
        //[Char.PairiRaraPairiBindi]: 0x71,
        _a$1[Char.PairiChacha] = 0xe7,
        _a$1[Char.PairiTenka] = 0x2020,
        _a$1[Char.PairiVava] = 0x5f,
        _a$1[Char.PairiYaiya] = 0xcf,
        _a$1[Char.PairiTata] = 0x153,
        _a$1[Char.PairiNana] = 0x2dc,
        _a$1[Char.HalfYaiyaRight] = 0xce,
        //[Char.HalfYaiyaLeft]: 0x77,
        _a$1[Char.Tippi] = 0x7a,
        //[Char.TippiRight]: 0x5e,
        //[Char.Visagra]: 0x00,
        _a$1[Char.AddakAbove] = 0x5a,
        _a$1[Char.AddakRight] = 0x7e,
        _a$1[Char.AddakRight2] = 0xa4,
        //[Char.AdakBindi]: 0x0A01,
        _a$1[Char.Bindi] = 0x41,
        _a$1[Char.Bindi2] = 0x2c6,
        //[Char.Yakash]: 0x00,
        _a$1[Char.Kana] = 0x6b,
        _a$1[Char.KanaBindi] = 0x4b,
        _a$1[Char.Sihari] = 0x66,
        _a$1[Char.Bihari] = 0x68,
        //[Char.BihariBindi]: 0x192,
        _a$1[Char.Aunkar] = 0x5b,
        //[Char.Aunkar2]:0xfc,
        _a$1[Char.Dulainkar] = 0x7b,
        _a$1[Char.Dulainkar2] = 0xa8,
        _a$1[Char.Lavan] = 0x2f,
        _a$1[Char.Dulavan] = 0x3f,
        _a$1[Char.Hora] = 0x27,
        _a$1[Char.Kanaura] = 0x22,
        //[Char.Kanaura2]: 0xf8,
        //[Char.Virama]: 0x40,
        //[Char.Udaat]: 0x00,
        _a$1[Char.Danda] = 0x2e,
        //[Char.DandaLong]: 0xa2,
        _a$1[Char.DoubleDanda] = 0x5d,
        _a$1[Char.DoubleDanda2] = 0xd2,
        _a$1[Char.GZero] = 0xfa,
        _a$1[Char.GOne] = 0xf1,
        _a$1[Char.GTwo] = 0xf2,
        _a$1[Char.GThree] = 0xf3,
        _a$1[Char.GFour] = 0xf4,
        _a$1[Char.GFive] = 0xf5,
        _a$1[Char.GSix] = 0xf6,
        _a$1[Char.GSeven] = 0xf7,
        _a$1[Char.GEight] = 0xf8,
        _a$1[Char.GNine] = 0xf9,
        _a$1[Char.EnglishZero] = 0x30,
        _a$1[Char.EnglishOne] = 0x31,
        _a$1[Char.EnglishTwo] = 0x32,
        _a$1[Char.EnglishThree] = 0x33,
        _a$1[Char.EnglishFour] = 0x34,
        _a$1[Char.EnglishFive] = 0x35,
        _a$1[Char.EnglishSix] = 0x36,
        _a$1[Char.EnglishSeven] = 0x37,
        _a$1[Char.EnglishEight] = 0x38,
        _a$1[Char.EnglishNine] = 0x39,
        _a$1[Char.Nu] = 0x192,
        //[Char.NanaDulainkar] : 0xb6,
        _a$1[Char.RaraAunkar] = 0x57,
        _a$1[Char.Khanda] = 0xc7,
        //[Char.Khanda2]: 0x2202,
        //[Char.Divide]: 0x2039,
        _a$1[Char.Multiply] = 0x25,
        _a$1[Char.FlowerDesign1] = 0x152,
        _a$1[Char.FlowerDesign2] = 0x201a,
        _a$1[Char.FlowerDesign3] = 0x2030,
        _a$1[Char.FlowerDesign4] = 0xd3,
        _a$1[Char.FlowerDesign5] = 0xd4,
        //[Char.Diamond]:0x2022,
        _a$1[Char.KThind] = 0xff,
        _a$1[Char.Colon] = 0x4c,
        _a$1[Char.ColonFancy] = 0xda,
        _a$1[Char.SemiColon] = 0x6c,
        //[Char.Unknown1]: 0xb4,
        _a$1[Char.TopRightExtention] = 0x46,
        _a$1[Char.SingleQuoteCurlyLeft] = 0x2018,
        _a$1[Char.SingleQuoteCurlyRight] = 0x2019,
        _a$1[Char.DoubleQuoteCurlyLeft] = 0x201c,
        _a$1[Char.DoubleQuoteCurlyRight] = 0x201d,
        _a$1[Char.DoubleQuoteCurlyRight2] = 0x40,
        _a$1);

    var _a$2;
    var awazeMappings = (_a$2 = {},
        //[Char.IkOnkarVersion1a]: 0x3c,
        //[Char.IkOnkarVersion1b]: 0x3e,
        //[Char.IkOnkarVersion2a]: 0xc5,
        //[Char.IkOnkarVersion2b]: 0xc6,
        _a$2[Char.IkOnkarVersion3] = 0xf7,
        _a$2[Char.Onkar1] = 0xd8,
        _a$2[Char.Onkar2] = 0xa3,
        _a$2[Char.Uੳ] = 0x75,
        //[Char.Uਉ]: 0x00,
        //[Char.Uਊ]: 0x00,
        _a$2[Char.Oਓ] = 0x6f,
        _a$2[Char.Aਅ] = 0x61,
        //[Char.Aਆ]: 0x00,
        //[Char.Aਐ]: 0x00,
        //[Char.Oਔ]: 0x00,
        _a$2[Char.Eੲ] = 0x65,
        //[Char.Eਇ]: 0x00,
        //[Char.Eਈ]: 0x00,
        _a$2[Char.Eਏ] = 0xb4,
        _a$2[Char.Sਸ] = 0x73,
        _a$2[Char.Hਹ] = 0x68,
        _a$2[Char.Kਕ] = 0x63,
        _a$2[Char.Kਖ] = 0x6b,
        _a$2[Char.Gਗ] = 0x67,
        _a$2[Char.Gਘ] = 0x47,
        _a$2[Char.Nਙ] = 0x4c,
        _a$2[Char.Cਚ] = 0x43,
        _a$2[Char.Cਛ] = 0x78,
        _a$2[Char.Jਜ] = 0x6a,
        _a$2[Char.Jਝ] = 0x4a,
        _a$2[Char.Nਞ] = 0x4d,
        _a$2[Char.Tਟ] = 0x74,
        _a$2[Char.Tਠ] = 0x54,
        _a$2[Char.Dਡ] = 0x44,
        _a$2[Char.Dਢ] = 0x51,
        _a$2[Char.Nਣ] = 0x4e,
        _a$2[Char.Tਤ] = 0x56,
        _a$2[Char.Tਥ] = 0x57,
        _a$2[Char.Dਦ] = 0x64,
        _a$2[Char.Dਧ] = 0x59,
        _a$2[Char.Nਨ] = 0x6e,
        _a$2[Char.Pਪ] = 0x70,
        _a$2[Char.Fਫ] = 0x66,
        _a$2[Char.Bਬ] = 0x62,
        _a$2[Char.Bਭ] = 0x42,
        _a$2[Char.Mਮ] = 0x6d,
        _a$2[Char.Yਯ] = 0x79,
        _a$2[Char.Rਰ] = 0x72,
        _a$2[Char.Lਲ] = 0x6c,
        _a$2[Char.Vਵ] = 0x76,
        _a$2[Char.Rੜ] = 0x52,
        _a$2[Char.SPairiBindiਸ਼] = 0x53,
        _a$2[Char.KPairiBindiਖ਼] = 0x4b,
        _a$2[Char.GPairiBindiਗ਼] = 0x5a,
        _a$2[Char.JPairiBindiਜ਼] = 0x7a,
        _a$2[Char.FPairiBindiਫ਼] = 0x46,
        //[Char.LPairiBindiਲ਼]: 0x4c,
        _a$2[Char.PairiBindi] = 0xe6,
        _a$2[Char.Dot] = 0x50,
        _a$2[Char.PairiHaha] = 0x48,
        //[Char.PairiHahaDulainkar]: 0xa7,
        _a$2[Char.PairiRara] = 0x71,
        //[Char.PairiRaraPairiBindi]: 0x71,
        _a$2[Char.PairiChacha] = 0xe7,
        _a$2[Char.PairiTenka] = 0x2020,
        _a$2[Char.PairiVava] = 0x58,
        _a$2[Char.PairiYaiya] = 0xcf,
        _a$2[Char.PairiTata] = 0x153,
        _a$2[Char.PairiNana] = 0x2dc,
        _a$2[Char.HalfYaiyaLeft] = 0x77,
        _a$2[Char.Tippi] = 0x2a,
        _a$2[Char.TippiRight] = 0x5e,
        //[Char.Visagra]: 0x00,
        _a$2[Char.AddakAbove] = 0x26,
        _a$2[Char.AddakRight] = 0x25,
        //[Char.AddakRight2]: 0xa4,
        _a$2[Char.AdakBindi] = 0x0A01,
        _a$2[Char.Bindi] = 0x3a,
        _a$2[Char.Bindi2] = 0x2c6,
        //[Char.Yakash]: 0x00,
        _a$2[Char.Kana] = 0x41,
        _a$2[Char.KanaBindi] = 0x3b,
        _a$2[Char.Sihari] = 0x69,
        _a$2[Char.Bihari] = 0x49,
        _a$2[Char.BihariBindi] = 0x192,
        _a$2[Char.Aunkar] = 0x55,
        _a$2[Char.Aunkar2] = 0xfc,
        _a$2[Char.Dulainkar] = 0x3c,
        //[Char.Dulainkar2]: 0xa8,
        _a$2[Char.Lavan] = 0x45,
        _a$2[Char.Dulavan] = 0x3e,
        _a$2[Char.Hora] = 0x7e,
        _a$2[Char.Kanaura] = 0x4f,
        _a$2[Char.Kanaura2] = 0xf8,
        _a$2[Char.Virama] = 0x40,
        //[Char.Udaat]: 0x00,
        _a$2[Char.Danda] = 0x2e,
        _a$2[Char.DandaLong] = 0xa2,
        _a$2[Char.DoubleDanda] = 0x7c,
        //[Char.DoubleDanda2]: 0xd2,
        _a$2[Char.GZero] = 0x201a,
        _a$2[Char.GOne] = 0x2044,
        _a$2[Char.GTwo] = 0xa4,
        _a$2[Char.GThree] = 0x2039,
        _a$2[Char.GFour] = 0x203a,
        _a$2[Char.GFive] = 0xf001,
        _a$2[Char.GSix] = 0xf002,
        _a$2[Char.GSeven] = 0x2021,
        _a$2[Char.GEight] = 0xb0,
        //[Char.GNine]: 0xf9,
        _a$2[Char.EnglishZero] = 0x30,
        _a$2[Char.EnglishOne] = 0x31,
        _a$2[Char.EnglishTwo] = 0x32,
        _a$2[Char.EnglishThree] = 0x33,
        _a$2[Char.EnglishFour] = 0x34,
        _a$2[Char.EnglishFive] = 0x35,
        _a$2[Char.EnglishSix] = 0x36,
        _a$2[Char.EnglishSeven] = 0x37,
        _a$2[Char.EnglishEight] = 0x38,
        _a$2[Char.EnglishNine] = 0x39,
        _a$2[Char.Nu] = 0x2dc,
        _a$2[Char.NanaDulainkar] = 0xb6,
        _a$2[Char.Khanda] = 0x2da,
        _a$2[Char.Khanda2] = 0x2202,
        //[Char.Divide]: 0x2039,
        _a$2[Char.Multiply] = 0xbf,
        _a$2[Char.FlowerDesign1] = 0x152,
        //[Char.FlowerDesign2]: 0x201a,
        _a$2[Char.FlowerDesign3] = 0x2030,
        _a$2[Char.FlowerDesign4] = 0xd3,
        _a$2[Char.FlowerDesign5] = 0xd4,
        _a$2[Char.Diamond] = 0x2022,
        _a$2[Char.KThind] = 0xff,
        _a$2[Char.Colon] = 0x5c,
        _a$2[Char.SemiColon] = 0xdf,
        _a$2[Char.SemiColon2] = 0xab,
        _a$2[Char.SemiColon3] = 0x2026,
        _a$2[Char.Unknown1] = 0xb4,
        _a$2[Char.TopRightExtention] = 0xd8,
        _a$2[Char.SingleQuoteCurlyLeft] = 0x60,
        _a$2[Char.SingleQuoteCurlyLeft2] = 0xa7,
        _a$2[Char.SingleQuoteCurlyRight] = 0x24,
        _a$2[Char.SingleQuoteCurlyRight2] = 0xa1,
        _a$2[Char.DoubleQuoteCurlyLeft] = 0x2122,
        _a$2[Char.DoubleQuoteCurlyRight] = 0x23,
        _a$2[Char.SquareBracketLeft] = 0x5b,
        _a$2[Char.SquareBracketLeft2] = 0x7b,
        _a$2[Char.SquareBracketRight] = 0x5d,
        _a$2[Char.SquareBracketRight2] = 0x7d,
        _a$2);

    var _a$3;
    var drChatrikMappings = (_a$3 = {},
        _a$3[Char.IkOnkarVersion1a] = 0xc3,
        _a$3[Char.IkOnkarVersion1b] = 0xc4,
        _a$3[Char.Uੳ] = 0x41,
        _a$3[Char.Aਅ] = 0x61,
        _a$3[Char.Eੲ] = 0x65,
        _a$3[Char.Sਸ] = 0x73,
        _a$3[Char.Hਹ] = 0x68,
        _a$3[Char.Kਕ] = 0x6b,
        _a$3[Char.Kਖ] = 0x4b,
        _a$3[Char.Gਗ] = 0x67,
        _a$3[Char.Gਘ] = 0x47,
        _a$3[Char.Nਙ] = 0xd5,
        _a$3[Char.Cਚ] = 0x63,
        _a$3[Char.Cਛ] = 0x43,
        _a$3[Char.Jਜ] = 0x6a,
        _a$3[Char.Jਝ] = 0x4a,
        _a$3[Char.Nਞ] = 0xd6,
        _a$3[Char.Tਟ] = 0x74,
        _a$3[Char.Tਠ] = 0x54,
        _a$3[Char.Dਡ] = 0x7a,
        _a$3[Char.Dਢ] = 0x5a,
        _a$3[Char.Nਣ] = 0x78,
        _a$3[Char.Tਤ] = 0x71,
        _a$3[Char.Tਥ] = 0x51,
        _a$3[Char.Dਦ] = 0x64,
        _a$3[Char.Dਧ] = 0x44,
        _a$3[Char.Nਨ] = 0x6e,
        _a$3[Char.Pਪ] = 0x70,
        _a$3[Char.Fਫ] = 0x50,
        _a$3[Char.Bਬ] = 0x62,
        _a$3[Char.Bਭ] = 0x42,
        _a$3[Char.Mਮ] = 0x6d,
        _a$3[Char.Yਯ] = 0x58,
        _a$3[Char.Rਰ] = 0x72,
        _a$3[Char.Lਲ] = 0x6c,
        _a$3[Char.Vਵ] = 0x76,
        _a$3[Char.Rੜ] = 0x56,
        _a$3[Char.SPairiBindiਸ਼] = 0xc8,
        _a$3[Char.KPairiBindiਖ਼] = 0xc9,
        _a$3[Char.GPairiBindiਗ਼] = 0xca,
        _a$3[Char.JPairiBindiਜ਼] = 0xcb,
        _a$3[Char.FPairiBindiਫ਼] = 0xcc,
        _a$3[Char.LPairiBindiਲ਼] = 0xdc,
        _a$3[Char.PairiBindi] = 0xe6,
        _a$3[Char.PairiBindi] = 0xe6,
        _a$3[Char.PairiBindi2] = 0x4c,
        _a$3[Char.Dot] = 0x5b,
        _a$3[Char.PairiHaha] = 0x48,
        _a$3[Char.PairiRara] = 0x52,
        _a$3[Char.Tippi] = 0x4d,
        _a$3[Char.Tippi2] = 0x53,
        _a$3[Char.Bindi] = 0x4e,
        _a$3[Char.AddakRight] = 0x77,
        _a$3[Char.AddakRight2] = 0x57,
        _a$3[Char.AdakBindi] = 0x0A01,
        _a$3[Char.Kana] = 0x66,
        _a$3[Char.KanaBindi] = 0x46,
        _a$3[Char.Sihari] = 0x69,
        _a$3[Char.Bihari] = 0x49,
        _a$3[Char.Aunkar] = 0x75,
        _a$3[Char.Dulainkar] = 0x55,
        _a$3[Char.Lavan] = 0x79,
        _a$3[Char.Dulavan] = 0x59,
        _a$3[Char.Hora] = 0x6f,
        _a$3[Char.Kanaura] = 0x4f,
        _a$3[Char.Virama] = 0xd9,
        _a$3[Char.Danda] = 0x2e,
        _a$3[Char.Danda2] = 0x7c,
        _a$3[Char.Danda3] = 0xbb,
        _a$3[Char.DoubleDanda] = 0x5d,
        _a$3[Char.DoubleDanda2] = 0xab,
        _a$3[Char.GZero] = 0xfa,
        _a$3[Char.GOne] = 0xf1,
        _a$3[Char.GTwo] = 0xf2,
        _a$3[Char.GThree] = 0xf3,
        _a$3[Char.GFour] = 0xf4,
        _a$3[Char.GFive] = 0xf5,
        _a$3[Char.GSix] = 0xf6,
        _a$3[Char.GSeven] = 0xf7,
        _a$3[Char.GEight] = 0xf8,
        _a$3[Char.GNine] = 0xf9,
        _a$3[Char.EnglishZero] = 0x30,
        _a$3[Char.EnglishOne] = 0x31,
        _a$3[Char.EnglishTwo] = 0x32,
        _a$3[Char.EnglishThree] = 0x33,
        _a$3[Char.EnglishFour] = 0x34,
        _a$3[Char.EnglishFive] = 0x35,
        _a$3[Char.EnglishSix] = 0x36,
        _a$3[Char.EnglishSeven] = 0x37,
        _a$3[Char.EnglishEight] = 0x38,
        _a$3[Char.EnglishNine] = 0x39,
        _a$3[Char.Colon] = 0x3a,
        _a$3[Char.ColonFancy] = 0xda,
        _a$3[Char.SemiColon] = 0x3b,
        _a$3[Char.SingleQuoteCurlyLeft] = 0x2018,
        _a$3[Char.SingleQuoteCurlyRight] = 0x2019,
        _a$3[Char.DoubleQuoteCurlyLeft] = 0x201c,
        _a$3[Char.DoubleQuoteCurlyRight] = 0x201d,
        _a$3);

    var _a$4;
    var gurbaniLipi = (_a$4 = {},
        _a$4[Char.GZero] = 0x30,
        _a$4[Char.GOne] = 0x31,
        _a$4[Char.GTwo] = 0x32,
        _a$4[Char.GThree] = 0x33,
        _a$4[Char.GFour] = 0x34,
        _a$4[Char.GFive] = 0x35,
        _a$4[Char.GSix] = 0x36,
        _a$4[Char.GSeven] = 0x37,
        _a$4[Char.GEight] = 0x38,
        _a$4[Char.GNine] = 0x39,
        _a$4[Char.EnglishZero] = 0x30,
        _a$4[Char.EnglishOne] = 0x31,
        _a$4[Char.EnglishTwo] = 0x32,
        _a$4[Char.EnglishThree] = 0x33,
        _a$4[Char.EnglishFour] = 0x34,
        _a$4[Char.EnglishFive] = 0x35,
        _a$4[Char.EnglishSix] = 0x36,
        _a$4[Char.EnglishSeven] = 0x37,
        _a$4[Char.EnglishEight] = 0x38,
        _a$4[Char.EnglishNine] = 0x39,
        _a$4);

    var _a$5;
    var joyCharCodes = (_a$5 = {},
        _a$5[Char.IkOnkarVersion1] = 0x2dd,
        //[Char.IkOnkarVersion1b]: 0x3e,
        //[Char.IkOnkarVersion2a]: 0xc5,
        //[Char.IkOnkarVersion2b]: 0xc6,
        //[Char.IkOnkarVersion3]: 0xf7,
        //[Char.Onkar1]: 0xd8,
        //[Char.Onkar2]: 0xa3,
        _a$5[Char.Uੳ] = 0x54,
        //[Char.Uਉ]: 0x00,
        //[Char.Uਊ]: 0x00,
        _a$5[Char.Oਓ] = 0x55,
        _a$5[Char.Oਓ2] = 0x2d9,
        _a$5[Char.Aਅ] = 0x6e,
        //[Char.Aਆ]: 0x00,
        //[Char.Aਐ]: 0x00,
        //[Char.Oਔ]: 0x00,
        _a$5[Char.Eੲ] = 0x4a,
        //[Char.Eਇ]: 0x00,
        //[Char.Eਈ]: 0x00,
        //[Char.Eਏ]: 0xb4,
        _a$5[Char.Sਸ] = 0x3b,
        _a$5[Char.Hਹ] = 0x6a,
        _a$5[Char.Kਕ] = 0x65,
        _a$5[Char.Kਖ] = 0x79,
        _a$5[Char.Gਗ] = 0x72,
        _a$5[Char.Gਘ] = 0x78,
        _a$5[Char.Nਙ] = 0x43,
        _a$5[Char.Cਚ] = 0x75,
        _a$5[Char.Cਛ] = 0x53,
        _a$5[Char.Jਜ] = 0x69,
        _a$5[Char.Jਝ] = 0x4d,
        _a$5[Char.Nਞ] = 0x52,
        _a$5[Char.Tਟ] = 0x4e,
        _a$5[Char.Tਠ] = 0x6d,
        _a$5[Char.Dਡ] = 0x76,
        _a$5[Char.Dਢ] = 0x59,
        _a$5[Char.Nਣ] = 0x44,
        _a$5[Char.Tਤ] = 0x73,
        _a$5[Char.Tਥ] = 0x45,
        _a$5[Char.Dਦ] = 0x64,
        _a$5[Char.Dਧ] = 0x58,
        _a$5[Char.Nਨ] = 0x42,
        _a$5[Char.Pਪ] = 0x67,
        _a$5[Char.Fਫ] = 0x63,
        _a$5[Char.Bਬ] = 0x70,
        _a$5[Char.Bਭ] = 0x47,
        _a$5[Char.Mਮ] = 0x77,
        _a$5[Char.Yਯ] = 0x3a,
        _a$5[Char.Rਰ] = 0x6f,
        _a$5[Char.Lਲ] = 0x62,
        _a$5[Char.Vਵ] = 0x74,
        _a$5[Char.Rੜ] = 0x56,
        _a$5[Char.SPairiBindiਸ਼] = 0xd9,
        _a$5[Char.KPairiBindiਖ਼] = 0x131,
        _a$5[Char.GPairiBindiਗ਼] = 0x2c6,
        _a$5[Char.JPairiBindiਜ਼] = 0x2dc,
        _a$5[Char.FPairiBindiਫ਼] = 0xaf,
        _a$5[Char.LPairiBindiਲ਼] = 0x2c7,
        //[Char.PairiBindi]: 0xe6,
        //[Char.Dot]: 0x50,
        _a$5[Char.PairiHaha] = 0x51,
        _a$5[Char.PairiHaha2] = 0x2211,
        //[Char.PairiHahaDulainkar]: 0xa7,
        _a$5[Char.PairiRara] = 0xc3,
        _a$5[Char.PairiRaraLeft] = 0x71,
        //[Char.PairiRaraPairiBindi]: 0x71,
        //[Char.PairiChacha]: 0x7b,
        //[Char.PairiTenka]: 0x7c,
        _a$5[Char.PairiVava] = 0x60,
        _a$5[Char.PairiVava2] = 0x2026,
        //[Char.PairiYaiya]: 0xcf,
        _a$5[Char.HalfYaiyaRight] = 0x203a,
        //[Char.PairiTata]: 0x7d,
        //[Char.PairiNana]: 0xa5,
        //[Char.HalfYaiyaLeft]: 0x77,
        //[Char.TippiLeft]: 0xa7,
        _a$5[Char.Tippi] = 0x7a,
        _a$5[Char.Tippi2] = 0xf8,
        _a$5[Char.TippiRight] = 0x2265,
        //[Char.Visagra]: 0x00,
        _a$5[Char.AddakLeft] = 0xe6,
        _a$5[Char.AddakAbove] = 0xba,
        _a$5[Char.AddakRight] = 0xb5,
        //[Char.AddakRight2]: 0xa4,
        //[Char.AdakBindi]: 0x0A01,
        _a$5[Char.Bindi] = 0x222b,
        _a$5[Char.Bindi2] = 0x41,
        //[Char.Yakash]: 0x00,
        _a$5[Char.Kana] = 0x6b,
        _a$5[Char.Kana2] = 0x2248,
        _a$5[Char.KanaBindi] = 0xaa,
        _a$5[Char.Sihari] = 0x66,
        _a$5[Char.Sihari2] = 0xab,
        _a$5[Char.Bihari] = 0x68,
        _a$5[Char.Bihari2] = 0x2206,
        _a$5[Char.BihariBindi] = 0x5d,
        _a$5[Char.BihariBindi2] = 0x192,
        _a$5[Char.Aunkar] = 0x5b,
        _a$5[Char.Aunkar2] = 0x221e,
        _a$5[Char.Aunkar3] = 0x3c0,
        _a$5[Char.Dulainkar] = 0x7b,
        _a$5[Char.Dulainkar2] = 0xb1,
        _a$5[Char.Dulainkar3] = 0xbb,
        _a$5[Char.Lavan] = 0x2f,
        _a$5[Char.Lavan2] = 0x2202,
        _a$5[Char.Dulavan] = 0x3f,
        _a$5[Char.Dulavan2] = 0x2b,
        _a$5[Char.Hora] = 0xd8,
        _a$5[Char.Hora2] = 0x27,
        _a$5[Char.Kanaura] = 0x22,
        _a$5[Char.Kanaura2] = 0x2126,
        _a$5[Char.KanauraRight] = 0x153,
        //[Char.Virama]: 0x40,
        //[Char.Udaat]: 0x00,
        _a$5[Char.Danda] = 0xd5,
        _a$5[Char.Danda2] = 0x2e,
        //[Char.DandaLong]: 0xa2,
        //[Char.DoubleDanda]: 0xa3,
        //[Char.DoubleDanda2]: 0xa8,
        _a$5[Char.GZero] = 0xa0,
        _a$5[Char.GOne] = 0xa1,
        _a$5[Char.GOne1] = 0x49,
        _a$5[Char.GTwo] = 0xa2,
        _a$5[Char.GThree] = 0xa3,
        _a$5[Char.GFour] = 0xa4,
        //[Char.GFive]: 0x35,
        _a$5[Char.GSix] = 0xa6,
        _a$5[Char.GSeven] = 0xa7,
        //[Char.GEight]: 0x38,
        _a$5[Char.GNine] = 0xa9,
        _a$5[Char.EnglishZero] = 0x30,
        _a$5[Char.EnglishOne] = 0x31,
        _a$5[Char.EnglishTwo] = 0x32,
        _a$5[Char.EnglishThree] = 0x33,
        _a$5[Char.EnglishFour] = 0x34,
        _a$5[Char.EnglishFive] = 0x35,
        _a$5[Char.EnglishSix] = 0x36,
        _a$5[Char.EnglishSeven] = 0x37,
        _a$5[Char.EnglishEight] = 0x38,
        _a$5[Char.EnglishNine] = 0x39,
        _a$5[Char.Nu] = 0x2d8,
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
        //[Char.Colon]: 0x3a,
        _a$5[Char.SemiColon] = 0x6c,
        //[Char.Unknown1]: 0xb4,
        _a$5[Char.TopRightExtention] = 0x152,
        _a$5[Char.SingleQuoteCurlyLeft] = 0x201c,
        //[Char.SingleQuoteCurlyLeft2]: 0xa7,
        _a$5[Char.SingleQuoteCurlyRight] = 0x201d,
        //[Char.SingleQuoteCurlyRight2]: 0xa1,
        _a$5[Char.DoubleQuoteCurlyLeft] = 0x161,
        _a$5[Char.DoubleQuoteCurlyRight] = 0x40,
        //[Char.SquareBracketLeft]: 0x5b,
        //[Char.SquareBracketLeft2]: 0x7b,
        //[Char.SquareBracketRight]: 0x5d,
        //[Char.SquareBracketRight2]: 0x7d,
        _a$5[Char.KakaPairiRara] = 0xa5,
        _a$5[Char.UਉBindi] = 0x2122,
        _a$5[Char.LalaDulainkar] = 0xa8,
        _a$5[Char.LalaAunkar] = 0xb4,
        //[Char.LalaTippi]: 0xa6,
        //[Char.TਥAunkar]: 0x00,
        //[Char.CਚAunkar]: 0x00,
        _a$5[Char.Hai] = 0x57,
        _a$5[Char.Hai2] = 0x2db,
        _a$5[Char.TਥAunkar] = 0x2da,
        _a$5[Char.CਚAunkar] = 0xb8,
        _a$5);

    var _a$6;
    var satlujMappings = (_a$6 = {},
        _a$6[Char.IkOnkarVersion1] = 0xfd,
        //[Char.IkOnkarVersion1b]: 0x3e,
        //[Char.IkOnkarVersion2a]: 0xc5,
        //[Char.IkOnkarVersion2b]: 0xc6,
        //[Char.IkOnkarVersion3]: 0xf7,
        //[Char.Onkar1]: 0xd8,
        //[Char.Onkar2]: 0xa3,
        _a$6[Char.Uੳ] = 0xc0,
        //[Char.Uਉ]: 0x00,
        //[Char.Uਊ]: 0x00,
        _a$6[Char.Oਓ] = 0xfa,
        _a$6[Char.Aਅ] = 0xc1,
        //[Char.Aਆ]: 0x00,
        //[Char.Aਐ]: 0x00,
        //[Char.Oਔ]: 0x00,
        _a$6[Char.Eੲ] = 0xc2,
        //[Char.Eਇ]: 0x00,
        //[Char.Eਈ]: 0x00,
        //[Char.Eਏ]: 0xb4,
        _a$6[Char.Sਸ] = 0xc3,
        _a$6[Char.Hਹ] = 0xd4,
        _a$6[Char.Kਕ] = 0xd5,
        _a$6[Char.Kਖ] = 0xd6,
        _a$6[Char.Gਗ] = 0xd7,
        _a$6[Char.Gਘ] = 0xd8,
        _a$6[Char.Nਙ] = 0xd9,
        _a$6[Char.Cਚ] = 0xda,
        _a$6[Char.Cਛ] = 0xdb,
        _a$6[Char.Jਜ] = 0xdc,
        _a$6[Char.Jਝ] = 0xde,
        _a$6[Char.Nਞ] = 0xdf,
        _a$6[Char.Tਟ] = 0xe0,
        _a$6[Char.Tਠ] = 0xe1,
        _a$6[Char.Dਡ] = 0xe2,
        _a$6[Char.Dਢ] = 0xe3,
        _a$6[Char.Nਣ] = 0xe4,
        _a$6[Char.Tਤ] = 0xe5,
        _a$6[Char.Tਥ] = 0xe6,
        _a$6[Char.Dਦ] = 0xe7,
        _a$6[Char.Dਧ] = 0xe8,
        _a$6[Char.Nਨ] = 0xe9,
        _a$6[Char.Pਪ] = 0xea,
        _a$6[Char.Fਫ] = 0xeb,
        _a$6[Char.Bਬ] = 0xec,
        _a$6[Char.Bਭ] = 0xed,
        _a$6[Char.Mਮ] = 0xee,
        _a$6[Char.Yਯ] = 0xef,
        _a$6[Char.Rਰ] = 0xf0,
        _a$6[Char.Lਲ] = 0xf1,
        _a$6[Char.Vਵ] = 0xf2,
        _a$6[Char.Rੜ] = 0xf3,
        _a$6[Char.SPairiBindiਸ਼] = 0xf4,
        _a$6[Char.KPairiBindiਖ਼] = 0xf5,
        _a$6[Char.GPairiBindiਗ਼] = 0xf6,
        _a$6[Char.JPairiBindiਜ਼] = 0xf7,
        _a$6[Char.FPairiBindiਫ਼] = 0xf8,
        _a$6[Char.LPairiBindiਲ਼] = 0xff,
        //[Char.PairiBindi]: 0xe6,
        //[Char.Dot]: 0x50,
        //[Char.PairiHaha]: 0x48,
        //[Char.PairiHahaDulainkar]: 0xa7,
        _a$6[Char.PairiRara] = 0xcc,
        _a$6[Char.PairiRaraLeft] = 0x7a,
        //[Char.PairiRaraPairiBindi]: 0x71,
        _a$6[Char.PairiChacha] = 0x7b,
        _a$6[Char.PairiTenka] = 0x7c,
        _a$6[Char.PairiVava] = 0xc9,
        //[Char.PairiYaiya]: 0xcf,
        _a$6[Char.PairiTata] = 0x7d,
        _a$6[Char.PairiNana] = 0xa5,
        //[Char.HalfYaiyaLeft]: 0x77,
        _a$6[Char.TippiLeft] = 0xa7,
        _a$6[Char.Tippi] = 0xbf,
        //[Char.TippiRight]: 0x5e,
        //[Char.Visagra]: 0x00,
        //[Char.AddakAbove]: 0x26,
        //[Char.AddakRight]: 0x25,
        //[Char.AddakRight2]: 0xa4,
        //[Char.AdakBindi]: 0x0A01,
        _a$6[Char.Bindi] = 0xba,
        //[Char.Bindi2]: 0x2c6,
        //[Char.Yakash]: 0x00,
        _a$6[Char.Kana] = 0xc5,
        _a$6[Char.KanaBindi] = 0xbb,
        _a$6[Char.Sihari] = 0xc7,
        _a$6[Char.Bihari] = 0xc6,
        _a$6[Char.BihariBindi] = 0xc4,
        //[Char.Aunkar]: 0x55,
        //[Char.Aunkar2]:0xfc,
        _a$6[Char.Dulainkar] = 0xb1,
        _a$6[Char.Dulainkar2] = 0xc8,
        _a$6[Char.Lavan] = 0xb6,
        _a$6[Char.Dulavan] = 0xcb,
        //[Char.Hora]: 0x7e,
        _a$6[Char.Kanaura] = 0xcf,
        //[Char.Kanaura2]: 0xf8,
        //[Char.Virama]: 0x40,
        //[Char.Udaat]: 0x00,
        _a$6[Char.Danda] = 0xa2,
        _a$6[Char.Danda2] = 0xcd,
        //[Char.DandaLong]: 0xa2,
        _a$6[Char.DoubleDanda] = 0xa3,
        _a$6[Char.DoubleDanda2] = 0xa8,
        _a$6[Char.GZero] = 0x30,
        _a$6[Char.GOne] = 0x31,
        _a$6[Char.GTwo] = 0x32,
        _a$6[Char.GThree] = 0x33,
        _a$6[Char.GFour] = 0x34,
        _a$6[Char.GFive] = 0x35,
        _a$6[Char.GSix] = 0x36,
        _a$6[Char.GSeven] = 0x37,
        _a$6[Char.GEight] = 0x38,
        _a$6[Char.GNine] = 0x39,
        _a$6[Char.EnglishZero] = 0x40,
        _a$6[Char.EnglishOne] = 0x41,
        _a$6[Char.EnglishTwo] = 0x42,
        _a$6[Char.EnglishThree] = 0x43,
        _a$6[Char.EnglishFour] = 0x44,
        _a$6[Char.EnglishFive] = 0x45,
        _a$6[Char.EnglishSix] = 0x46,
        _a$6[Char.EnglishSeven] = 0x47,
        _a$6[Char.EnglishEight] = 0x48,
        _a$6[Char.EnglishNine] = 0x49,
        _a$6[Char.Nu] = 0xf9,
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
        _a$6[Char.Colon] = 0x3a,
        _a$6[Char.SemiColon] = 0x3b,
        //[Char.Unknown1]: 0xb4,
        _a$6[Char.TopRightExtention] = 0xce,
        _a$6[Char.SingleQuoteCurlyLeft] = 0xd2,
        //[Char.SingleQuoteCurlyLeft2]: 0xa7,
        _a$6[Char.SingleQuoteCurlyRight] = 0xd3,
        //[Char.SingleQuoteCurlyRight2]: 0xa1,
        //[Char.DoubleQuoteCurlyLeft]: 0x2122,
        //[Char.DoubleQuoteCurlyRight]: 0x23, 
        //[Char.SquareBracketLeft]: 0x5b,
        //[Char.SquareBracketLeft2]: 0x7b,
        //[Char.SquareBracketRight]: 0x5d,
        //[Char.SquareBracketRight2]: 0x7d,
        _a$6[Char.KakaPairiRara] = 0xb4,
        _a$6[Char.UਉBindi] = 0xaa,
        _a$6[Char.LalaDulainkar] = 0xac,
        _a$6[Char.LalaAunkar] = 0xab,
        _a$6[Char.LalaTippi] = 0xa6,
        _a$6[Char.TਥAunkar] = 0x00,
        _a$6[Char.CਚAunkar] = 0x00,
        _a$6);

    var _a$7;
    var unicodeMapping = (_a$7 = {},
        _a$7[Char.IkOnkarVersion1] = 0x0A74,
        //[Char.IkOnkarVersion1b]: ,
        //[Char.IkOnkarVersion2a]: ,
        //[Char.IkOnkarVersion2b]: ,
        //[Char.IkOnkarVersion3]: ,
        _a$7[Char.Uੳ] = 0x0A73,
        _a$7[Char.Uਉ] = 0x0A09,
        _a$7[Char.Uਊ] = 0x0A0A,
        _a$7[Char.Oਓ] = 0x0A13,
        _a$7[Char.Aਅ] = 0x0A05,
        _a$7[Char.Aਆ] = 0x0A06,
        _a$7[Char.Aਐ] = 0x0A10,
        _a$7[Char.Oਔ] = 0x0A14,
        _a$7[Char.Eੲ] = 0x0A72,
        _a$7[Char.Eਇ] = 0x0A07,
        _a$7[Char.Eਈ] = 0x0A08,
        _a$7[Char.Eਏ] = 0x0A0F,
        _a$7[Char.Sਸ] = 0x0A38,
        _a$7[Char.Hਹ] = 0x0A39,
        _a$7[Char.Kਕ] = 0x0A15,
        _a$7[Char.Kਖ] = 0x0A16,
        _a$7[Char.Gਗ] = 0x0A17,
        _a$7[Char.Gਘ] = 0x0A18,
        _a$7[Char.Nਙ] = 0x0A19,
        _a$7[Char.Cਚ] = 0x0A1A,
        _a$7[Char.Cਛ] = 0x0A1B,
        _a$7[Char.Jਜ] = 0x0A1C,
        _a$7[Char.Jਝ] = 0x0A1D,
        _a$7[Char.Nਞ] = 0x0A1E,
        _a$7[Char.Tਟ] = 0x0A1F,
        _a$7[Char.Tਠ] = 0x0A20,
        _a$7[Char.Dਡ] = 0x0A21,
        _a$7[Char.Dਢ] = 0x0A22,
        _a$7[Char.Nਣ] = 0x0A23,
        _a$7[Char.Tਤ] = 0x0A24,
        _a$7[Char.Tਥ] = 0x0A25,
        _a$7[Char.Dਦ] = 0x0A26,
        _a$7[Char.Dਧ] = 0x0A27,
        _a$7[Char.Nਨ] = 0x0A28,
        _a$7[Char.Pਪ] = 0x0A2A,
        _a$7[Char.Fਫ] = 0x0A2B,
        _a$7[Char.Bਬ] = 0x0A2C,
        _a$7[Char.Bਭ] = 0x0A2D,
        _a$7[Char.Mਮ] = 0x0A2E,
        _a$7[Char.Yਯ] = 0x0A2F,
        _a$7[Char.Rਰ] = 0x0A30,
        _a$7[Char.Lਲ] = 0x0A32,
        _a$7[Char.Vਵ] = 0x0A35,
        _a$7[Char.Rੜ] = 0x0A5C,
        _a$7[Char.SPairiBindiਸ਼] = 0x0A36,
        _a$7[Char.KPairiBindiਖ਼] = 0x0A59,
        _a$7[Char.GPairiBindiਗ਼] = 0x0A5A,
        _a$7[Char.JPairiBindiਜ਼] = 0x0A5B,
        _a$7[Char.FPairiBindiਫ਼] = 0x0A5E,
        _a$7[Char.LPairiBindiਲ਼] = 0x0A33,
        _a$7[Char.PairiBindi] = 0x0A3C,
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
        _a$7[Char.Tippi] = 0x0A70,
        _a$7[Char.Bindi] = 0x0A02,
        _a$7[Char.Visagra] = 0x0A03,
        _a$7[Char.AddakRight] = 0x0A71,
        //[Char.Addak2]: 0x00,
        //[Char.AdakBindi]: 0x00,
        //[Char.Bindi]:
        _a$7[Char.Yakash] = 0x0A75,
        _a$7[Char.Kana] = 0x0A3E,
        // [Char.KanaBindi]: 
        _a$7[Char.Sihari] = 0x0A3F,
        _a$7[Char.Bihari] = 0x0A40,
        _a$7[Char.Aunkar] = 0x0A41,
        _a$7[Char.Dulainkar] = 0x0A42,
        _a$7[Char.Lavan] = 0x0A47,
        _a$7[Char.Dulavan] = 0x0A48,
        _a$7[Char.Hora] = 0x0A4B,
        _a$7[Char.Kanaura] = 0x0A4C,
        _a$7[Char.Virama] = 0x0A4D,
        _a$7[Char.Udaat] = 0x0A51,
        _a$7[Char.Danda] = 0x0964,
        _a$7[Char.DoubleDanda] = 0x0965,
        _a$7[Char.GZero] = 0x0A66,
        _a$7[Char.GOne] = 0x0A67,
        _a$7[Char.GTwo] = 0x0A68,
        _a$7[Char.GThree] = 0x0A69,
        _a$7[Char.GFour] = 0x0A6A,
        _a$7[Char.GFive] = 0x0A6B,
        _a$7[Char.GSix] = 0x0A6C,
        _a$7[Char.GSeven] = 0x0A6D,
        _a$7[Char.GEight] = 0x0A6E,
        _a$7[Char.GNine] = 0x0A6F,
        _a$7[Char.EnglishZero] = 0x30,
        _a$7[Char.EnglishOne] = 0x31,
        _a$7[Char.EnglishTwo] = 0x32,
        _a$7[Char.EnglishThree] = 0x33,
        _a$7[Char.EnglishFour] = 0x34,
        _a$7[Char.EnglishFive] = 0x35,
        _a$7[Char.EnglishSix] = 0x36,
        _a$7[Char.EnglishSeven] = 0x37,
        _a$7[Char.EnglishEight] = 0x38,
        _a$7[Char.EnglishNine] = 0x39,
        //[Char.Nu]: ,
        //[Char.Khanda]: ,
        _a$7[Char.Divide] = 0xf7,
        _a$7[Char.Multiply] = 0xd7,
        //[Char.FlowerDesign1]: ,
        //[Char.FlowerDesign2]: ,
        //[Char.FlowerDesign3]: ,
        //[Char.FlowerDesign4]: ,
        //[Char.FlowerDesign5]: ,
        _a$7[Char.KThind] = 0xff,
        _a$7[Char.Colon] = 0x3a,
        _a$7[Char.SemiColon] = 0x3b,
        _a$7[Char.SingleQuoteCurlyLeft] = 0x2018,
        _a$7[Char.SingleQuoteCurlyRight] = 0x2019,
        _a$7[Char.DoubleQuoteCurlyLeft] = 0x201c,
        _a$7[Char.DoubleQuoteCurlyRight] = 0x201d,
        _a$7);

    var moveAcrossChaSet = [
        [[Char.PairiHaha], [Char.PairiHaha2], [Char.Virama, Char.Hਹ]],
        [[Char.PairiRara], [Char.PairiRaraLeft], [Char.Virama, Char.Rਰ]],
        [[Char.PairiChacha], [Char.Virama, Char.Cਚ]],
        [[Char.PairiTenka], [Char.Virama, Char.Tਟ]],
        [[Char.PairiVava], [Char.PairiVava2], [Char.Virama, Char.Vਵ]],
        [[Char.PairiYaiya], [Char.Virama, Char.Yਯ, Char.Virama, Char.Yਯ]],
        [[Char.PairiTata], [Char.Virama, Char.Tਤ]],
        [[Char.PairiNana], [Char.Virama, Char.Nਨ]],
        [[Char.PairiRaraPairiBindi], [Char.PairiRara, Char.PairiBindi],
            [Char.PairiRara, Char.PairiBindi2], [Char.PairiBindi, Char.Virama, Char.Rਰ], [Char.PairiBindi2, Char.Virama, Char.Rਰ]],
    ];
    var ikOnkarVersion1 = [[Char.IkOnkarVersion1], [Char.IkOnkarVersion1a, Char.IkOnkarVersion1b], [Char.IkOnkarVersion1a], [Char.GOne, Char.Onkar1]];
    var ikOnkarVersion2 = [[Char.IkOnkarVersion2], [Char.IkOnkarVersion2a, Char.IkOnkarVersion2b], [Char.IkOnkarVersion2a], [Char.GOne, Char.Onkar2]];
    var ikOnkarVersion3 = [[Char.IkOnkarVersion3]];
    var compositions = __spreadArrays(moveAcrossChaSet, [
        ikOnkarVersion1,
        ikOnkarVersion2,
        ikOnkarVersion3,
        __spreadArrays(ikOnkarVersion1, ikOnkarVersion2, ikOnkarVersion3, [[Char.IkOnkarVersion4], [Char.IkOnkarVersion5]]),
        [[Char.GOne], [Char.GOne1]],
        [[Char.Bindi], [Char.Bindi2]],
        [[Char.Bihari], [Char.Bihari2]],
        [[Char.Sihari], [Char.Sihari2]],
        [[Char.Lavan], [Char.Lavan2]],
        [[Char.Dulavan], [Char.Dulavan2]],
        [[Char.Kana], [Char.Kana2]],
        [[Char.HalfYaiyaRight], [Char.Virama, Char.Yਯ]],
        [[Char.AdakBindi], [Char.AddakRight, Char.Bindi]],
        [[Char.Aਆ], [Char.Aਅ, Char.Kana]],
        [[Char.Aਆ, Char.Bindi], [Char.Aਅ, Char.KanaBindi]],
        [[Char.Eਇ], [Char.Sihari, Char.Eੲ], [Char.Sihari2, Char.Eੲ]],
        [[Char.Eਈ], [Char.Eੲ, Char.Bihari]],
        [[Char.Uਉ], [Char.Uੳ, Char.Aunkar]],
        [[Char.Uਊ], [Char.Uੳ, Char.Dulainkar]],
        [[Char.Oਓ], [Char.Oਓ2]],
        [[Char.Oਓ], [Char.Oਓ2], [Char.Onkar1], [Char.Onkar2]],
        [[Char.Eਏ], [Char.Eੲ, Char.Lavan], [Char.Eੲ, Char.Lavan2]],
        [[Char.Aਐ], [Char.Aਅ, Char.Dulavan], [Char.Aਅ, Char.Dulavan2]],
        [[Char.Oਔ], [Char.Aਅ, Char.KanauraRight], [Char.Aਅ, Char.Kanaura]],
        [[Char.LPairiBindiਲ਼], [Char.Lਲ, Char.PairiBindi]],
        [[Char.SPairiBindiਸ਼], [Char.Sਸ, Char.PairiBindi]],
        [[Char.KPairiBindiਖ਼], [Char.Kਖ, Char.PairiBindi]],
        [[Char.GPairiBindiਗ਼], [Char.Gਗ, Char.PairiBindi]],
        [[Char.JPairiBindiਜ਼], [Char.Jਜ, Char.PairiBindi]],
        [[Char.FPairiBindiਫ਼], [Char.Fਫ, Char.PairiBindi]],
        [[Char.DoubleDanda], [Char.Danda, Char.Danda], [Char.DoubleDanda2]],
        [[Char.Dulainkar], [Char.Dulainkar2], [Char.Dulainkar3]],
        [[Char.Aunkar], [Char.Aunkar2], [Char.Aunkar3]],
        [[Char.Danda], [Char.Danda2], [Char.Danda3], [Char.DandaLong]],
        [[Char.KanaBindi], [Char.Kana, Char.Bindi]],
        [[Char.AddakRight], [Char.AddakRight2]],
        [[Char.AddakAbove], [Char.AddakRight], [Char.AddakRight2], [Char.AddakLeft]],
        [[Char.IkOnkarVersion1], [Char.IkOnkarVersion1a, Char.IkOnkarVersion1b], [Char.IkOnkarVersion1a]],
        [[Char.PairiBindi], [Char.PairiBindi2]],
        [[Char.Tippi], [Char.Tippi2], [Char.TippiRight], [Char.TippiLeft]],
        [[Char.Nu], [Char.Nਨ, Char.Dulainkar, Char.Tippi], [Char.Nਨ, Char.Tippi, Char.Dulainkar], [Char.NanaDulainkar, Char.Tippi]],
        [[Char.NanaDulainkar], [Char.Nਨ, Char.Dulainkar]],
        [[Char.FlowerDesign1], [Char.FlowerDesign2], [Char.FlowerDesign3], [Char.FlowerDesign4], [Char.FlowerDesign5]],
        [[Char.PairiHahaDulainkar], [Char.Virama, Char.Hਹ, Char.Dulainkar]],
        [[Char.BihariBindi], [Char.BihariBindi2], [Char.Bihari, Char.Bindi], [Char.Bihari2, Char.Bindi]],
        [[Char.Hora], [Char.Hora2]],
        [[Char.Kanaura], [Char.Kanaura2], [Char.KanauraRight]],
        [[Char.SingleQuoteCurlyLeft], [Char.SingleQuoteCurlyLeft2]],
        [[Char.SingleQuoteCurlyRight], [Char.SingleQuoteCurlyRight2]],
        [[Char.DoubleQuoteCurlyRight], [Char.DoubleQuoteCurlyRight2]],
        [[Char.Khanda], [Char.Khanda2]],
        [[Char.Colon], [Char.ColonFancy]],
        [[Char.SemiColon], [Char.SemiColon2], [Char.SemiColon3]],
        [[Char.RaraAunkar], [Char.Rਰ, Char.Aunkar], [Char.Rਰ, Char.Aunkar2]],
        [[Char.KakaPairiRara], [Char.Kਕ, Char.PairiRara], [Char.Kਕ, Char.Virama, Char.Rਰ]],
        [[Char.Uਉ], [Char.Uੳ, Char.Aunkar]],
        [[Char.LalaDulainkar], [Char.Lਲ, Char.Dulainkar], [Char.Lਲ, Char.Dulainkar2]],
        [[Char.LalaAunkar], [Char.Lਲ, Char.Aunkar], [Char.Lਲ, Char.Aunkar2]],
        [[Char.LalaTippi], [Char.Lਲ, Char.Tippi], [Char.Tippi2]],
        [[Char.TਥAunkar], [Char.Tਥ, Char.Aunkar], [Char.Tਥ, Char.Aunkar2]],
        [[Char.CਚAunkar], [Char.Cਚ, Char.Aunkar], [Char.Cਚ, Char.Aunkar2]],
        [[Char.Hai], [Char.Hai2], [Char.Hਹ, Char.Dulavan]],
        [[Char.UਉBindi], [Char.Uਉ, Char.Bindi], [Char.Uੳ, Char.Aunkar, Char.Bindi]],
    ]);
    var fontConvertorConfigs = {
        "Arial Unicode MS": {
            moveRightCharacters: [Char.Sihari],
            characterCodes: unicodeMapping
        },
        "AnmolUni": {
            moveRightCharacters: [Char.Sihari],
            characterCodes: unicodeMapping
        },
        "AnmolLipi": {
            moveRightCharacters: [],
            characterCodes: anmolCharCodes
        },
        "DrChatrikWeb": {
            moveRightCharacters: [],
            characterCodes: drChatrikMappings
        },
        "Awaze": {
            moveRightCharacters: [],
            characterCodes: awazeMappings
        },
        "Satluj": {
            moveRightCharacters: [],
            characterCodes: satlujMappings
        },
        "Asees": {
            moveRightCharacters: [],
            characterCodes: aseesCharCodes
        },
        "Joy": {
            moveRightCharacters: [],
            characterCodes: joyCharCodes
        },
        "GurbaniLipi": {
            moveRightCharacters: [],
            characterCodes: merge(anmolCharCodes, gurbaniLipi)
        },
        "GurmukhiLys020": {
            moveRightCharacters: [],
            characterCodes: anmolCharCodes
        },
    };
    function convert(str, toFontName, fromFontName) {
        var to = fontConvertorConfigs[toFontName];
        var from = fontConvertorConfigs[fromFontName];
        var mapperConfig = getMapper(to, from, compositions, moveAcrossChaSet);
        return convertStringUsingMapper(mapperConfig, str);
    }

    exports.convert = convert;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
