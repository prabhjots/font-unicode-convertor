import * as React from "react";
import * as ReactDOM from "react-dom";
import * as p from '../dist/convertor'

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

function getCharName(i: number){
    return Char[i];
}

function getChar(code){
    return String.fromCharCode(code)
}
var mappings = {}
var i =0;
var tightGroups = p.compositions.map(set => {
    return set.map(s => {
        return s.map(getCharName)
    })
})

console.log(JSON.stringify(tightGroups))

for( var name of p.moveAcrossChaSet){

    
}

function getCodes(f){
    var c ={}
    for(var i = 0; i< 200; i++){
        if(f[i]){
            c[getCharName(i)] = getChar(f[i])
        }
    }
    return c;
}
console.log(JSON.stringify(mappings))
ReactDOM.render(<div>Hello World</div>, document.getElementById("root"))
