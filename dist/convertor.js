(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.PunjabiFontConvertor = {}));
}(this, function (exports) { 'use strict';

    function convertStringUsingMapper(config, stringToConvert) {
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
            if (config.moveRightChars.indexOf(charToAdd) > -1) {
                if (charToAddOnRight) {
                    output.push(charToAddOnRight);
                }
                charToAddOnRight = charToAdd;
                charToMoveRightIndex = 0;
            }
            else if (charToAddOnRight) {
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
    function insertCharOnLeft(chars, moveLeftAcrossChars, characterToAdd, onRightChars) {
        var lastChar = chars.pop();
        if (lastChar) {
            if (moveLeftAcrossChars.indexOf(lastChar) > -1) {
                onRightChars.unshift(lastChar);
                insertCharOnLeft(chars, moveLeftAcrossChars, characterToAdd, onRightChars);
            }
            else {
                chars.push(characterToAdd, lastChar);
                chars.push.apply(chars, onRightChars);
            }
        }
        else {
            chars.push(characterToAdd);
            chars.push.apply(chars, onRightChars);
        }
    }
    function getMapper(to, from, groups, tightGroups) {
        var mapper = {};
        for (var i in to.characterCodes) {
            var fromChar = from.characterCodes[i];
            var toChar = to.characterCodes[i];
            if (fromChar && toChar) {
                mapper[fromChar] = toChar;
            }
        }
        var maxWidth = 1;
        for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
            var compositionCharArrays = groups_1[_i];
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
        var moveAcrossCharacters = tightGroups
            .map(function (a) { return getCompositionCharacters(a, to.characterCodes); })
            .reduce(function (a, b) { return a.concat(b); }, []);
        return {
            mapper: mapper,
            maxWidth: maxWidth,
            moveLeftChars: moveLeftCharIndexes.map(function (c) { return to.characterCodes[c]; }),
            moveAcrossCharacters: moveAcrossCharacters,
            moveRightChars: moveRightCharIndexes.map(function (c) { return to.characterCodes[c]; }),
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
                characters.push(charCodes.join(""));
            }
        }
        return characters;
    }
    //# sourceMappingURL=convertor.js.map

    var tightGroups=[[["PairiHaha"],["PairiHaha2"],["Virama","Hਹ"]],[["PairiRara"],["PairiRaraLeft"],["Virama","Rਰ"]],[["PairiChacha"],["Virama","Cਚ"]],[["PairiTenka"],["Virama","Tਟ"]],[["PairiVava"],["PairiVava2"],["Virama","Vਵ"]],[["PairiYaiya"],["Virama","Yਯ","Virama","Yਯ"]],[["PairiTata"],["Virama","Tਤ"]],[["PairiNana"],["Virama","Nਨ"]],[["PairiRaraPairiBindi"],["PairiRara","PairiBindi"],["PairiRara","PairiBindi2"],["PairiBindi","Virama","Rਰ"],["PairiBindi2","Virama","Rਰ"]]];var groups=[[["PairiHaha"],["PairiHaha2"],["Virama","Hਹ"]],[["PairiRara"],["PairiRaraLeft"],["Virama","Rਰ"]],[["PairiChacha"],["Virama","Cਚ"]],[["PairiTenka"],["Virama","Tਟ"]],[["PairiVava"],["PairiVava2"],["Virama","Vਵ"]],[["PairiYaiya"],["Virama","Yਯ","Virama","Yਯ"]],[["PairiTata"],["Virama","Tਤ"]],[["PairiNana"],["Virama","Nਨ"]],[["PairiRaraPairiBindi"],["PairiRara","PairiBindi"],["PairiRara","PairiBindi2"],["PairiBindi","Virama","Rਰ"],["PairiBindi2","Virama","Rਰ"]],[["IkOnkarVersion1"],["IkOnkarVersion1a","IkOnkarVersion1b"],["IkOnkarVersion1a"],["GOne","Onkar1"]],[["IkOnkarVersion2"],["IkOnkarVersion2a","IkOnkarVersion2b"],["IkOnkarVersion2a"],["GOne","Onkar2"]],[["IkOnkarVersion3"]],[["IkOnkarVersion1"],["IkOnkarVersion1a","IkOnkarVersion1b"],["IkOnkarVersion1a"],["GOne","Onkar1"],["IkOnkarVersion2"],["IkOnkarVersion2a","IkOnkarVersion2b"],["IkOnkarVersion2a"],["GOne","Onkar2"],["IkOnkarVersion3"],["IkOnkarVersion4"],["IkOnkarVersion5"]],[["GOne"],["GOne1"]],[["Bindi"],["Bindi2"]],[["Bihari"],["Bihari2"]],[["Sihari"],["Sihari2"]],[["Lavan"],["Lavan2"]],[["Dulavan"],["Dulavan2"]],[["Kana"],["Kana2"]],[["HalfYaiyaRight"],["Virama","Yਯ"]],[["AdakBindi"],["AddakRight","Bindi"]],[["Aਆ"],["Aਅ","Kana"]],[["Aਆ","Bindi"],["Aਅ","KanaBindi"]],[["Eਇ"],["Sihari","Eੲ"],["Sihari2","Eੲ"]],[["Eਈ"],["Eੲ","Bihari"]],[["Uਉ"],["Uੳ","Aunkar"]],[["Uਊ"],["Uੳ","Dulainkar"]],[["Oਓ"],["Oਓ2"]],[["Oਓ"],["Oਓ2"],["Onkar1"],["Onkar2"]],[["Eਏ"],["Eੲ","Lavan"],["Eੲ","Lavan2"]],[["Aਐ"],["Aਅ","Dulavan"],["Aਅ","Dulavan2"]],[["Oਔ"],["Aਅ","KanauraRight"],["Aਅ","Kanaura"]],[["LPairiBindiਲ਼"],["Lਲ","PairiBindi"]],[["SPairiBindiਸ਼"],["Sਸ","PairiBindi"]],[["KPairiBindiਖ਼"],["Kਖ","PairiBindi"]],[["GPairiBindiਗ਼"],["Gਗ","PairiBindi"]],[["JPairiBindiਜ਼"],["Jਜ","PairiBindi"]],[["FPairiBindiਫ਼"],["Fਫ","PairiBindi"]],[["DoubleDanda"],["Danda","Danda"],["DoubleDanda2"]],[["Dulainkar"],["Dulainkar2"],["Dulainkar3"]],[["Aunkar"],["Aunkar2"],["Aunkar3"]],[["Danda"],["Danda2"],["Danda3"],["DandaLong"]],[["KanaBindi"],["KanaBindi2"],["Kana","Bindi"]],[["AddakRight"],["AddakRight2"]],[["AddakAbove"],["AddakRight"],["AddakRight2"],["AddakLeft"]],[["IkOnkarVersion1"],["IkOnkarVersion1a","IkOnkarVersion1b"],["IkOnkarVersion1a"]],[["PairiBindi"],["PairiBindi2"]],[["Tippi"],["Tippi2"],["TippiRight"],["TippiLeft"]],[["Nu"],["Nਨ","Dulainkar","Tippi"],["Nਨ","Tippi","Dulainkar"],["NanaDulainkar","Tippi"]],[["NanaDulainkar"],["Nਨ","Dulainkar"]],[["FlowerDesign1"],["FlowerDesign2"],["FlowerDesign3"],["FlowerDesign4"],["FlowerDesign5"]],[["PairiHahaDulainkar"],["Virama","Hਹ","Dulainkar"]],[["BihariBindi"],["BihariBindi2"],["Bihari","Bindi"],["Bihari2","Bindi"]],[["Hora"],["Hora2"]],[["Kanaura"],["Kanaura2"],["KanauraRight"]],[["SingleQuoteCurlyLeft"],["SingleQuoteCurlyLeft2"]],[["SingleQuoteCurlyRight"],["SingleQuoteCurlyRight2"]],[["DoubleQuoteCurlyRight"],["DoubleQuoteCurlyRight2"]],[["Khanda"],["Khanda2"]],[["Colon"],["ColonFancy"]],[["SemiColon"],["SemiColon2"],["SemiColon3"]],[["RaraAunkar"],["Rਰ","Aunkar"],["Rਰ","Aunkar2"]],[["KakaPairiRara"],["Kਕ","PairiRara"],["Kਕ","Virama","Rਰ"]],[["Uਉ"],["Uੳ","Aunkar"]],[["LalaDulainkar"],["Lਲ","Dulainkar"],["Lਲ","Dulainkar2"]],[["LalaAunkar"],["Lਲ","Aunkar"],["Lਲ","Aunkar2"]],[["LalaTippi"],["Lਲ","Tippi"],["Tippi2"]],[["TਥAunkar"],["Tਥ","Aunkar"],["Tਥ","Aunkar2"]],[["CਚAunkar"],["Cਚ","Aunkar"],["Cਚ","Aunkar2"]],[["Hai"],["Hai2"],["Hਹ","Dulavan"]],[["UਉBindi"],["Uਉ","Bindi"],["Uੳ","Aunkar","Bindi"]],[["Dash"],["Dash2"]]];var mappings=[{name:"unicode",moveRightCharacters:["Sihari"],characterCodes:{IkOnkarVersion1:"ੴ","Uੳ":"ੳ","Uਉ":"ਉ","Uਊ":"ਊ","Oਓ":"ਓ","Aਅ":"ਅ","Aਆ":"ਆ","Aਐ":"ਐ","Oਔ":"ਔ","Eੲ":"ੲ","Eਇ":"ਇ","Eਈ":"ਈ","Eਏ":"ਏ","Sਸ":"ਸ","Hਹ":"ਹ","Kਕ":"ਕ","Kਖ":"ਖ","Gਗ":"ਗ","Gਘ":"ਘ","Nਙ":"ਙ","Cਚ":"ਚ","Cਛ":"ਛ","Jਜ":"ਜ","Jਝ":"ਝ","Nਞ":"ਞ","Tਟ":"ਟ","Tਠ":"ਠ","Dਡ":"ਡ","Dਢ":"ਢ","Nਣ":"ਣ","Tਤ":"ਤ","Tਥ":"ਥ","Dਦ":"ਦ","Dਧ":"ਧ","Nਨ":"ਨ","Pਪ":"ਪ","Fਫ":"ਫ","Bਬ":"ਬ","Bਭ":"ਭ","Mਮ":"ਮ","Yਯ":"ਯ","Rਰ":"ਰ","Lਲ":"ਲ","Vਵ":"ਵ","Rੜ":"ੜ","SPairiBindiਸ਼":"ਸ਼","KPairiBindiਖ਼":"ਖ਼","GPairiBindiਗ਼":"ਗ਼","JPairiBindiਜ਼":"ਜ਼","FPairiBindiਫ਼":"ਫ਼","LPairiBindiਲ਼":"ਲ਼",PairiBindi:"਼",Dot:".",Tippi:"ੰ",Bindi:"ਂ",Visagra:"ਃ",AddakRight:"ੱ",Yakash:"ੵ",Kana:"ਾ",Sihari:"ਿ",Bihari:"ੀ",Aunkar:"ੁ",Dulainkar:"ੂ",Lavan:"ੇ",Dulavan:"ੈ",Hora:"ੋ",Kanaura:"ੌ",Virama:"੍",Udaat:"ੑ",Danda:"।",Danda2:"|",DoubleDanda:"॥",GZero:"੦",GOne:"੧",GTwo:"੨",GThree:"੩",GFour:"੪",GFive:"੫",GSix:"੬",GSeven:"੭",GEight:"੮",GNine:"੯",EnglishZero:"0",EnglishOne:"1",EnglishTwo:"2",EnglishThree:"3",EnglishFour:"4",EnglishFive:"5",EnglishSix:"6",EnglishSeven:"7",EnglishEight:"8",EnglishNine:"9",Divide:"÷",Multiply:"×",KThind:"ÿ",Colon:":",SemiColon:";",SingleQuoteCurlyLeft:"‘",SingleQuoteCurlyRight:"’",DoubleQuoteCurlyLeft:"“",DoubleQuoteCurlyRight:"”",Dash:"-"}},{name:"anmol",moveRightCharacters:[],characterCodes:{IkOnkarVersion1a:"<",IkOnkarVersion1b:">",IkOnkarVersion2a:"Å",IkOnkarVersion2b:"Æ",IkOnkarVersion3:"¡","Uੳ":"a","Oਓ":"E","Aਅ":"A","Eੲ":"e","Sਸ":"s","Hਹ":"h","Kਕ":"k","Kਖ":"K","Gਗ":"g","Gਘ":"G","Nਙ":"|","Cਚ":"c","Cਛ":"C","Jਜ":"j","Jਝ":"J","Nਞ":"\\","Tਟ":"t","Tਠ":"T","Dਡ":"f","Dਢ":"F","Nਣ":"x","Tਤ":"q","Tਥ":"Q","Dਦ":"d","Dਧ":"D","Nਨ":"n","Pਪ":"p","Fਫ":"P","Bਬ":"b","Bਭ":"B","Mਮ":"m","Yਯ":"X","Rਰ":"r","Lਲ":"l","Vਵ":"v","Rੜ":"V","SPairiBindiਸ਼":"S","KPairiBindiਖ਼":"^","GPairiBindiਗ਼":"Z","JPairiBindiਜ਼":"z","FPairiBindiਫ਼":"&","LPairiBindiਲ਼":"L",PairiBindi:"æ",Dot:".",PairiHaha:"H",PairiHahaDulainkar:"§",PairiRara:"R",PairiRaraPairiBindi:"®",PairiChacha:"ç",PairiTenka:"†",PairiVava:"Í",PairiYaiya:"Ï",PairiTata:"œ",PairiNana:"˜",HalfYaiyaRight:"Î",Tippi:"M",Bindi:"N",Bindi2:"ˆ",AddakAbove:"`",AddakRight:"~",AddakRight2:"¤",AdakBindi:"ਁ",Kana:"w",KanaBindi:"W",Sihari:"i",Bihari:"I",Aunkar:"u",Aunkar2:"ü",Dulainkar:"U",Dulainkar2:"¨",Lavan:"y",Dulavan:"Y",Hora:"o",Kanaura:"O",Virama:"@",Danda:"[",DoubleDanda:"]",DoubleDanda2:"Ò",GZero:"ú",GOne:"ñ",GTwo:"ò",GThree:"ó",GFour:"ô",GFive:"õ",GSix:"ö",GSeven:"÷",GEight:"ø",GNine:"ù",EnglishZero:"0",EnglishOne:"1",EnglishTwo:"2",EnglishThree:"3",EnglishFour:"4",EnglishFive:"5",EnglishSix:"6",EnglishSeven:"7",EnglishEight:"8",EnglishNine:"9",Nu:"ƒ",Divide:"‹",Multiply:"¿",Khanda:"Ç",FlowerDesign1:"Œ",FlowerDesign2:"‚",FlowerDesign3:"‰",FlowerDesign4:"Ó",FlowerDesign5:"Ô",Diamond:"•",KThind:"ÿ",Colon:":",ColonFancy:"Ú",SemiColon:";",Unknown1:"´",TopRightExtention:"Ø",SingleQuoteCurlyLeft:"‘",SingleQuoteCurlyRight:"’",DoubleQuoteCurlyLeft:"“",DoubleQuoteCurlyRight:"”",Dash:"-"}},{name:"chatrik",moveRightCharacters:[],characterCodes:{IkOnkarVersion1a:"Ã",IkOnkarVersion1b:"Ä","Uੳ":"A","Aਅ":"a","Eੲ":"e","Sਸ":"s","Hਹ":"h","Kਕ":"k","Kਖ":"K","Gਗ":"g","Gਘ":"G","Nਙ":"Õ","Cਚ":"c","Cਛ":"C","Jਜ":"j","Jਝ":"J","Nਞ":"Ö","Tਟ":"t","Tਠ":"T","Dਡ":"z","Dਢ":"Z","Nਣ":"x","Tਤ":"q","Tਥ":"Q","Dਦ":"d","Dਧ":"D","Nਨ":"n","Pਪ":"p","Fਫ":"P","Bਬ":"b","Bਭ":"B","Mਮ":"m","Yਯ":"X","Rਰ":"r","Lਲ":"l","Vਵ":"v","Rੜ":"V","SPairiBindiਸ਼":"È","KPairiBindiਖ਼":"É","GPairiBindiਗ਼":"Ê","JPairiBindiਜ਼":"Ë","FPairiBindiਫ਼":"Ì","LPairiBindiਲ਼":"Ü",PairiBindi:"æ",PairiBindi2:"L",Dot:"[",PairiHaha:"H",PairiRara:"R",Tippi:"M",Tippi2:"S",Bindi:"N",AddakRight:"w",AddakRight2:"W",AdakBindi:"ਁ",Kana:"f",KanaBindi:"F",Sihari:"i",Bihari:"I",Aunkar:"u",Dulainkar:"U",Lavan:"y",Dulavan:"Y",Hora:"o",Kanaura:"O",Virama:"Ù",Danda:".",Danda2:"|",Danda3:"»",DoubleDanda:"]",DoubleDanda2:"«",GZero:"ú",GOne:"ñ",GTwo:"ò",GThree:"ó",GFour:"ô",GFive:"õ",GSix:"ö",GSeven:"÷",GEight:"ø",GNine:"ù",EnglishZero:"0",EnglishOne:"1",EnglishTwo:"2",EnglishThree:"3",EnglishFour:"4",EnglishFive:"5",EnglishSix:"6",EnglishSeven:"7",EnglishEight:"8",EnglishNine:"9",Colon:":",ColonFancy:"Ú",SemiColon:";",SingleQuoteCurlyLeft:"‘",SingleQuoteCurlyRight:"’",DoubleQuoteCurlyLeft:"“",DoubleQuoteCurlyRight:"”",Dash:"-"}},{name:"awaze",moveRightCharacters:[],characterCodes:{IkOnkarVersion3:"÷",Onkar1:"Ø",Onkar2:"£","Uੳ":"u","Oਓ":"o","Aਅ":"a","Eੲ":"e","Eਏ":"´","Sਸ":"s","Hਹ":"h","Kਕ":"c","Kਖ":"k","Gਗ":"g","Gਘ":"G","Nਙ":"L","Cਚ":"C","Cਛ":"x","Jਜ":"j","Jਝ":"J","Nਞ":"M","Tਟ":"t","Tਠ":"T","Dਡ":"D","Dਢ":"Q","Nਣ":"N","Tਤ":"V","Tਥ":"W","Dਦ":"d","Dਧ":"Y","Nਨ":"n","Pਪ":"p","Fਫ":"f","Bਬ":"b","Bਭ":"B","Mਮ":"m","Yਯ":"y","Rਰ":"r","Lਲ":"l","Vਵ":"v","Rੜ":"R","SPairiBindiਸ਼":"S","KPairiBindiਖ਼":"K","GPairiBindiਗ਼":"Z","JPairiBindiਜ਼":"z","FPairiBindiਫ਼":"F",PairiBindi:"æ",Dot:"P",PairiHaha:"H",PairiRara:"q",PairiChacha:"ç",PairiTenka:"†",PairiVava:"X",PairiYaiya:"Ï",PairiTata:"œ",PairiNana:"˜",HalfYaiyaLeft:"w",Tippi:"*",TippiRight:"^",Bindi:":",Bindi2:"ˆ",AddakAbove:"&",AddakRight:"%",AdakBindi:"ਁ",Kana:"A",KanaBindi:";",Sihari:"i",Bihari:"I",BihariBindi:"ƒ",Aunkar:"U",Aunkar2:"ü",Dulainkar:"<",Lavan:"E",Dulavan:">",Hora:"~",Kanaura:"O",Kanaura2:"ø",Virama:"@",Danda:".",DandaLong:"¢",DoubleDanda:"|",GZero:"‚",GOne:"⁄",GTwo:"¤",GThree:"‹",GFour:"›",GFive:"",GSix:"",GSeven:"‡",GEight:"°",EnglishZero:"0",EnglishOne:"1",EnglishTwo:"2",EnglishThree:"3",EnglishFour:"4",EnglishFive:"5",EnglishSix:"6",EnglishSeven:"7",EnglishEight:"8",EnglishNine:"9",Nu:"˜",NanaDulainkar:"¶",Multiply:"¿",Khanda:"˚",Khanda2:"∂",FlowerDesign1:"Œ",FlowerDesign3:"‰",FlowerDesign4:"Ó",FlowerDesign5:"Ô",Diamond:"•",KThind:"ÿ",Colon:"\\",SemiColon:"ß",SemiColon2:"«",SemiColon3:"…",Unknown1:"´",TopRightExtention:"Ø",SingleQuoteCurlyLeft:"`",SingleQuoteCurlyLeft2:"§",SingleQuoteCurlyRight:"$",SingleQuoteCurlyRight2:"¡",DoubleQuoteCurlyLeft:"™",DoubleQuoteCurlyRight:"#",SquareBracketLeft:"[",SquareBracketLeft2:"{",SquareBracketRight:"]",SquareBracketRight2:"}",Dash:"-"}},{name:"satluj",moveRightCharacters:[],characterCodes:{IkOnkarVersion1:"ý","Uੳ":"À","UਉBindi":"ª","Oਓ":"ú","Aਅ":"Á","Eੲ":"Â","Sਸ":"Ã","Hਹ":"Ô","Kਕ":"Õ","Kਖ":"Ö","Gਗ":"×","Gਘ":"Ø","Nਙ":"Ù","Cਚ":"Ú","Cਛ":"Û","Jਜ":"Ü","Jਝ":"Þ","Nਞ":"ß","Tਟ":"à","Tਠ":"á","Dਡ":"â","Dਢ":"ã","Nਣ":"ä","Tਤ":"å","Tਥ":"æ","Dਦ":"ç","Dਧ":"è","Nਨ":"é","Pਪ":"ê","Fਫ":"ë","Bਬ":"ì","Bਭ":"í","Mਮ":"î","Yਯ":"ï","Rਰ":"ð","Lਲ":"ñ","Vਵ":"ò","Rੜ":"ó","SPairiBindiਸ਼":"ô","KPairiBindiਖ਼":"õ","GPairiBindiਗ਼":"ö","JPairiBindiਜ਼":"÷","FPairiBindiਫ਼":"ø","LPairiBindiਲ਼":"ÿ",Dot:".",PairiRara:"Ì",PairiRaraLeft:"z",PairiChacha:"{",PairiTenka:"|",PairiVava:"É",PairiTata:"}",PairiNana:"¥",TippiLeft:"§",Tippi:"¿",Bindi:"º",Kana:"Å",KanaBindi:"»",Sihari:"Ç",Bihari:"Æ",BihariBindi:"Ä",Dulainkar:"±",Dulainkar2:"È",Lavan:"¶",Dulavan:"Ë",Kanaura:"Ï",Danda:"¢",Danda2:"Í",DoubleDanda:"£",DoubleDanda2:"¨",GZero:"0",GOne:"1",GTwo:"2",GThree:"3",GFour:"4",GFive:"5",GSix:"6",GSeven:"7",GEight:"8",GNine:"9",EnglishZero:"@",EnglishOne:"A",EnglishTwo:"B",EnglishThree:"C",EnglishFour:"D",EnglishFive:"E",EnglishSix:"F",EnglishSeven:"G",EnglishEight:"H",EnglishNine:"I",Nu:"ù",Colon:":",SemiColon:";",TopRightExtention:"Î",SingleQuoteCurlyLeft:"Ò",SingleQuoteCurlyRight:"Ó",KakaPairiRara:"´",LalaDulainkar:"¬",LalaAunkar:"«",LalaTippi:"¦",Dash:"-"}},{name:"asees",moveRightCharacters:[],characterCodes:{IkOnkarVersion1:"Å",IkOnkarVersion1a:"‹",IkOnkarVersion2:"Æ",IkOnkarVersion3:"¡",IkOnkarVersion4:"å",IkOnkarVersion5:">","Uੳ":"T","Oਓ":"U","Aਅ":"n","Eੲ":"J","Sਸ":";","Hਹ":"j","Kਕ":"e","Kਖ":"y","Gਗ":"r","Gਘ":"x","Nਙ":"C","Cਚ":"u","Cਛ":"S","Jਜ":"i","Jਝ":"M","Nਞ":"R","Tਟ":"N","Tਠ":"m","Dਡ":"v","Dਢ":"Y","Nਣ":"D","Tਤ":"s","Tਥ":"E","Dਦ":"d","Dਧ":"X","Nਨ":"B","Pਪ":"g","Fਫ":"c","Bਬ":"p","Bਭ":"G","Mਮ":"w","Yਯ":":","Rਰ":"o","Lਲ":"b","Vਵ":"t","Rੜ":"V","SPairiBindiਸ਼":"P","KPairiBindiਖ਼":"\\","GPairiBindiਗ਼":"}","JPairiBindiਜ਼":"I","FPairiBindiਫ਼":"|","LPairiBindiਲ਼":"+",PairiBindi:"a",Dot:"H",PairiHaha:"Q",PairiHahaDulainkar:"§",PairiRara:"q",PairiRaraLeft:"®",PairiChacha:"ç",PairiTenka:"†",PairiVava:"_",PairiYaiya:"Ï",PairiTata:"œ",PairiNana:"˜",HalfYaiyaRight:"Î",Tippi:"z",Bindi:"A",Bindi2:"ˆ",AddakAbove:"Z",AddakRight:"~",AddakRight2:"¤",Kana:"k",KanaBindi:"K",Sihari:"f",Bihari:"h",Aunkar:"[",Dulainkar:"{",Dulainkar2:"¨",Lavan:"/",Dulavan:"?",Hora:"'",Kanaura:"\"",DoubleDanda:"]",DoubleDanda2:"Ò",GZero:"ú",GOne:"ñ",GTwo:"ò",GThree:"ó",GFour:"ô",GFive:"õ",GSix:"ö",GSeven:"÷",GEight:"ø",GNine:"ù",EnglishZero:"0",EnglishOne:"1",EnglishTwo:"2",EnglishThree:"3",EnglishFour:"4",EnglishFive:"5",EnglishSix:"6",EnglishSeven:"7",EnglishEight:"8",EnglishNine:"9",Nu:"ƒ",RaraAunkar:"W",Multiply:"%",Khanda:"Ç",FlowerDesign1:"Œ",FlowerDesign2:"‚",FlowerDesign3:"‰",FlowerDesign4:"Ó",FlowerDesign5:"Ô",KThind:"ÿ",Colon:"L",ColonFancy:"Ú",SemiColon:"l",TopRightExtention:"F",SingleQuoteCurlyLeft:"‘",SingleQuoteCurlyRight:"’",DoubleQuoteCurlyLeft:"“",DoubleQuoteCurlyRight:"”",DoubleQuoteCurlyRight2:"@"}},{name:"joy",moveRightCharacters:[],characterCodes:{IkOnkarVersion1:"˝","Uੳ":"T","UਉBindi":"™","Oਓ":"U","Oਓ2":"˙","Aਅ":"n","Eੲ":"J","Sਸ":";","Hਹ":"j","Kਕ":"e","Kਖ":"y","Gਗ":"r","Gਘ":"x","Nਙ":"C","Cਚ":"u","Cਛ":"S","Jਜ":"i","Jਝ":"M","Nਞ":"R","Tਟ":"N","Tਠ":"m","Dਡ":"v","Dਢ":"Y","Nਣ":"D","Tਤ":"s","Tਥ":"E","Dਦ":"d","Dਧ":"X","Nਨ":"B","Pਪ":"g","Fਫ":"c","Bਬ":"p","Bਭ":"G","Mਮ":"w","Yਯ":":","Rਰ":"o","Lਲ":"b","Vਵ":"t","Rੜ":"V","SPairiBindiਸ਼":"Ù","KPairiBindiਖ਼":"ı","GPairiBindiਗ਼":"ˆ","JPairiBindiਜ਼":"˜","FPairiBindiਫ਼":"¯","LPairiBindiਲ਼":"ˇ",Dot:"H",PairiHaha:"Q",PairiHaha2:"∑",PairiRara:"Ã",PairiRaraLeft:"q",PairiVava:"`",PairiVava2:"…",HalfYaiyaRight:"›",Tippi:"z",Tippi2:"ø",TippiRight:"≥",Bindi:"∫",Bindi2:"A",AddakLeft:"æ",AddakAbove:"Z",AddakRight:"µ",Kana:"k",Kana2:"≈",KanaBindi:"K",KanaBindi2:"ª",Sihari:"f",Sihari2:"«",Bihari:"h",Bihari2:"∆",BihariBindi:"]",BihariBindi2:"ƒ",Aunkar:"[",Aunkar2:"∞",Aunkar3:"π",Dulainkar:"{",Dulainkar2:"±",Dulainkar3:"»",Lavan:"/",Lavan2:"∂",Dulavan:"?",Dulavan2:"+",Hora:"Ø",Hora2:"'",Kanaura:"\"",Kanaura2:"Ω",KanauraRight:"œ",Danda:"Õ",Danda2:".",GZero:" ",GOne:"¡",GOne1:"I",GTwo:"¢",GThree:"£",GFour:"¤",GSix:"¦",GSeven:"§",GNine:"©",EnglishZero:"0",EnglishOne:"1",EnglishTwo:"2",EnglishThree:"3",EnglishFour:"4",EnglishFive:"5",EnglishSix:"6",EnglishSeven:"7",EnglishEight:"8",EnglishNine:"9",Nu:"˘",SemiColon:"l",TopRightExtention:"Œ",SingleQuoteCurlyLeft:"“",SingleQuoteCurlyRight:"”",DoubleQuoteCurlyLeft:"š",DoubleQuoteCurlyRight:"@",KakaPairiRara:"¥",LalaDulainkar:"¨",LalaAunkar:"´","TਥAunkar":"˚","CਚAunkar":"¸",Hai:"W",Hai2:"˛",Colon:"L",Dash:"-",Dash2:"F"}}];

    var punjabiMapping = { mappings: mappings, tightGroups: tightGroups, groups: groups };
    function findMapping(name) {
        var nameToUse = getNameToUseForMapping(name);
        return mappings.filter(function (m) { return m.name == nameToUse; })[0];
    }
    function getNameToUseForMapping(name) {
        switch (name) {
            case "Arial Unicode MS":
            case "AnmolUni":
                return "unicode";
            case "AnmolLipi":
                return "anmol";
            case "DrChatrikWeb": return "chatrik";
            default:
                return name && name.toLowerCase();
        }
    }
    var allGroups = tightGroups.concat(groups);
    function memoize(func) {
        var memo = {};
        var slice = Array.prototype.slice;
        return function () {
            var args = slice.call(arguments);
            if (args in memo)
                return memo[args];
            else
                return (memo[args] = func.apply(null, args));
        };
    }
    var getMapper$1 = memoize(function getMapper$1(toFontName, fromFontName) {
        var to = findMapping(toFontName);
        if (!to) {
            console.error("Could not find mapping for", toFontName);
        }
        var from = findMapping(fromFontName);
        if (!from) {
            console.error("Could not find mapping for", fromFontName);
        }
        return getMapper(to, from, allGroups, tightGroups);
    });
    function convert(str, toFontName, fromFontName) {
        var mapperConfig = getMapper$1(getNameToUseForMapping(toFontName), getNameToUseForMapping(fromFontName));
        return convertStringUsingMapper(mapperConfig, str);
    }
    //# sourceMappingURL=punjabiFontConvertor.js.map

    exports.convert = convert;
    exports.punjabiMapping = punjabiMapping;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
