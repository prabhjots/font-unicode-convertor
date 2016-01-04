///<reference path="./anmolFontMappings" />
///<reference path="./unicodeFontMappings" />
///<reference path="./drChatrikFontMappings" />
namespace PunjabiMappings {
   export let fontConvertorConfigs = {
        "Unicode": {
            moveRightCharacters: [Char.Sihari],
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

    export let compositions = [
        [[Char.AdakBindi], [Char.Addak, Char.Bindi]],
        [[Char.Aਆ], [Char.Aਅ, Char.Kana]],
        [[Char.Aਆ, Char.Bindi], [Char.Aਅ, Char.KanaBindi]],
        [[Char.Eਇ], [Char.Sihari, Char.Eੲ]],
        [[Char.Eਈ], [Char.Eੲ, Char.Bihari]],
        [[Char.Uਉ], [Char.Uੳ, Char.Aunkar]],
        [[Char.Uਊ], [Char.Uੳ, Char.Dulainkar]],
        [[Char.Eਏ], [Char.Eੲ, Char.Lavan]],
        [[Char.Aਐ], [Char.Aਅ, Char.Dulavan]],
        [[Char.Oਔ], [Char.Aਅ, Char.Aunkar]],
        [[Char.LPairiBindiਲ਼], [Char.Lਲ, Char.PairiBindi]],
        [[Char.SPairiBindiਸ਼], [Char.Sਸ, Char.PairiBindi]],
        [[Char.KPairiBindiਖ਼], [Char.Kਖ, Char.PairiBindi]],
        [[Char.GPairiBindiਗ਼], [Char.Gਗ, Char.PairiBindi]],
        [[Char.JPairiBindiਜ਼], [Char.Jਜ, Char.PairiBindi]],
        [[Char.FPairiBindiਫ਼], [Char.Fਫ, Char.PairiBindi]],
        [[Char.DoubleDanda], [Char.Danda, Char.Danda], [Char.DoubleDanda2]],
        [[Char.Danda], [Char.Danda2], [Char.Danda3]],
        [[Char.KanaBindi], [Char.Kana, Char.Bindi]],
        [[Char.PairiHaha], [Char.Virama, Char.Hਹ]],
        [[Char.PairiRara], [Char.Virama, Char.Rਰ]],
        [[Char.Addak2], [Char.Addak]],
        [[Char.ੴ], [Char.AO1, Char.AO2], [Char.AO1]],
        [[Char.PairiBindi], [Char.PairiBindi2]],
        [[Char.Tippi], [Char.Tippi2]],
    ];

   
    
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
