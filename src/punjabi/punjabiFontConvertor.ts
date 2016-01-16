///<reference path="./charEnum" />
///<reference path="./mappings/anmolFontMappings" />
///<reference path="./mappings/unicodeFontMappings" />
///<reference path="./mappings/drChatrikFontMappings" />
///<reference path="./mappings/awazeFont" />
namespace PunjabiFontConvertor {
    let moveAcrossChaSet = [
        [[Char.PairiHaha], [Char.Virama, Char.Hਹ]],
        [[Char.PairiRara], [Char.Virama, Char.Rਰ]],
        [[Char.PairiChacha], [Char.Virama, Char.Cਚ]],
        [[Char.PairiTenka], [Char.Virama, Char.Tਟ]],
        [[Char.PairiVava], [Char.Virama, Char.Vਵ]],
        [[Char.PairiYaiya], [Char.Virama, Char.Yਯ, Char.Virama, Char.Yਯ]], // not sure about this.
        [[Char.PairiTata], [Char.Virama, Char.Tਤ]],
        [[Char.PairiNana], [Char.Virama, Char.Nਨ]],
        [[Char.PairiRaraPairiBindi], [Char.PairiRara, Char.PairiBindi],
            [Char.PairiRara, Char.PairiBindi2], [Char.PairiBindi, Char.Virama, Char.Rਰ], [Char.PairiBindi2, Char.Virama, Char.Rਰ]],
    ];

    let ikOnkarVersion1 = [[Char.IkOnkarVersion1], [Char.IkOnkarVersion1a, Char.IkOnkarVersion1b], [Char.IkOnkarVersion1a], [Char.GOne, Char.Onkar1]];
    let ikOnkarVersion2 = [[Char.IkOnkarVersion2], [Char.IkOnkarVersion2a, Char.IkOnkarVersion2b], [Char.IkOnkarVersion2a], [Char.GOne, Char.Onkar2]];
    let ikOnkarVersion3 = [[Char.IkOnkarVersion3]];

    let compositions: number[][][] = [
        ...moveAcrossChaSet,
        ikOnkarVersion1,
        ikOnkarVersion2,
        ikOnkarVersion3,
        [...ikOnkarVersion1, ...ikOnkarVersion2, ...ikOnkarVersion3],
        [[Char.HalfYaiyaRight], [Char.Virama, Char.Yਯ]],
        [[Char.AdakBindi], [Char.AddakRight, Char.Bindi]],
        [[Char.Aਆ], [Char.Aਅ, Char.Kana]],
        [[Char.Aਆ, Char.Bindi], [Char.Aਅ, Char.KanaBindi]],
        [[Char.Eਇ], [Char.Sihari, Char.Eੲ]],
        [[Char.Eਈ], [Char.Eੲ, Char.Bihari]],
        [[Char.Uਉ], [Char.Uੳ, Char.Aunkar]],
        [[Char.Uਊ], [Char.Uੳ, Char.Dulainkar]],
        [[Char.Oਓ], [Char.Onkar1], [Char.Onkar2]],
        [[Char.Eਏ], [Char.Eੲ, Char.Lavan]],
        [[Char.Aਐ], [Char.Aਅ, Char.Dulavan]],
        [[Char.Oਔ], [Char.Aਅ, Char.Kanaura]],
        [[Char.LPairiBindiਲ਼], [Char.Lਲ, Char.PairiBindi]],
        [[Char.SPairiBindiਸ਼], [Char.Sਸ, Char.PairiBindi]],
        [[Char.KPairiBindiਖ਼], [Char.Kਖ, Char.PairiBindi]],
        [[Char.GPairiBindiਗ਼], [Char.Gਗ, Char.PairiBindi]],
        [[Char.JPairiBindiਜ਼], [Char.Jਜ, Char.PairiBindi]],
        [[Char.FPairiBindiਫ਼], [Char.Fਫ, Char.PairiBindi]],
        [[Char.DoubleDanda], [Char.Danda, Char.Danda], [Char.DoubleDanda2]],
        [[Char.Dulainkar], [Char.Dulainkar2]],
        [[Char.Aunkar], [Char.Aunkar2]],
        [[Char.Danda], [Char.Danda2], [Char.Danda3], [Char.DandaLong]],
        [[Char.KanaBindi], [Char.Kana, Char.Bindi]],
        [[Char.AddakRight], [Char.AddakRight2]],
        [[Char.AddakAbove], [Char.AddakRight], [Char.AddakRight2]],
        [[Char.IkOnkarVersion1], [Char.IkOnkarVersion1a, Char.IkOnkarVersion1b], [Char.IkOnkarVersion1a]],
        [[Char.PairiBindi], [Char.PairiBindi2]],
        [[Char.Tippi], [Char.Tippi2], [Char.TippiRight]],
        [[Char.Nu], [Char.Nਨ, Char.Dulainkar, Char.Tippi], [Char.Nਨ, Char.Tippi, Char.Dulainkar], [Char.NanaDulainkar, Char.Tippi]],
        [[Char.NanaDulainkar], [Char.Nਨ, Char.Dulainkar]],
        [[Char.FlowerDesign1], [Char.FlowerDesign2], [Char.FlowerDesign3], [Char.FlowerDesign4], [Char.FlowerDesign5]],
        [[Char.PairiHahaDulainkar], [Char.Virama, Char.Hਹ, Char.Dulainkar]],
        [[Char.BihariBindi], [Char.Bihari, Char.Bindi]],
        [[Char.Kanaura], [Char.Kanaura2]],
        [[Char.SingleQuoteCurlyLeft], [Char.SingleQuoteCurlyLeft2]],
        [[Char.SingleQuoteCurlyRight], [Char.SingleQuoteCurlyRight2]],
        [[Char.Khanda], [Char.Khanda2]],

    ];

    let fontConvertorConfigs: { [key: string]: Convertor.IMapping } = {
        "Unicode": {
            moveRightCharacters: [Char.Sihari],
            characterCodes: makeArray(PunjabiFontConvertor.unicodeMapping)
        },
        "AnmolUni": {
            moveRightCharacters: [Char.Sihari],
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

    export function convert(str: string, toFontName: string, fromFontName: string) {
        let to = fontConvertorConfigs[toFontName];
        let from = fontConvertorConfigs[fromFontName];
        var mapperConfig = Convertor.getMapper(to, from, compositions, moveAcrossChaSet);

        return Convertor.convertStringUsingMapper(mapperConfig, str);
    }

    function makeArray(...configs: any[]) {
        var c: number[] = [];

        for (let a of configs) {
            for (var x in a) {
                if (a.hasOwnProperty(x)) {
                    c[x] = a[x];
                }
            }
        }
        return c;
    }
}
