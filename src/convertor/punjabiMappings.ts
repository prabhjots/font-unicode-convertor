namespace PunjabiMappings {
    const enum Char {
        ੴ,            // ੴ GURMUKHI EK ONKAR • God is One
        AO1,
        AO2,
        Uੳ,             // ੳ GURMUKHI URA • base for vowels
        Uਉ,             // ਉ GURMUKHI LETTER U
        Uਊ,             // ਊ GURMUKHI LETTER UU	
        Oਓ,             // ਓ GURMUKHI LETTER OO
        Aਅ,             // ਅ GURMUKHI LETTER A = aira
        Aਆ,             // ਆ GURMUKHI LETTER AA
        AਆBindi,
        Aਐ,
        Oਔ,             // ਔ GURMUKHI LETTER AU   // ਐ GURMUKHI LETTER AI
        Eੲ,             // ੲ GURMUKHI IRI • base for vowels
        Eਇ,             // ਇ GURMUKHI LETTER I
        Eਈ,             // ਈ GURMUKHI LETTER II
        Eਏ,             // ਏ GURMUKHI LETTER EE
        Sਸ,             // ਸ GURMUKHI LETTER SA
        Hਹ,             // ਹ GURMUKHI LETTER HA
        Kਕ,             // ਕ GURMUKHI LETTER KA
        Kਖ,             // ਖ GURMUKHI LETTER KHA
        Gਗ,             // ਗ GURMUKHI LETTER GA
        Gਘ,             // ਘ GURMUKHI LETTER GHA
        Nਙ,             // ਙ GURMUKHI LETTER NGA
        Cਚ,             // ਚ GURMUKHI LETTER CA
        Cਛ,             // ਛ GURMUKHI LETTER CHA
        Jਜ,             // ਜ GURMUKHI LETTER JA
        Jਝ,             // ਝ GURMUKHI LETTER JHA
        Nਞ,             // ਞ GURMUKHI LETTER NYA
        Tਟ,             // ਟ GURMUKHI LETTER TTA
        Tਠ,             // ਠ GURMUKHI LETTER TTHA
        Dਡ,             // ਡ GURMUKHI LETTER DDA
        Dਢ,             // ਢ GURMUKHI LETTER DDHA
        Nਣ,             // ਣ GURMUKHI LETTER NNA
        Tਤ,             // ਤ GURMUKHI LETTER TA
        Tਥ,             // ਥ GURMUKHI LETTER THA
        Dਦ,             // ਦ GURMUKHI LETTER DA
        Dਧ,             // ਧ GURMUKHI LETTER DHA
        Nਨ,             // ਨ GURMUKHI LETTER NA
        Pਪ,             // ਪ GURMUKHI LETTER PA
        Fਫ,             // ਫ GURMUKHI LETTER PHA
        Bਬ,             // ਬ GURMUKHI LETTER BA
        Bਭ,             // ਭ GURMUKHI LETTER BHA
        Mਮ,             // ਮ GURMUKHI LETTER MA
        Yਯ,             // ਯ GURMUKHI LETTER YA
        Rਰ,             // ਰ GURMUKHI LETTER RA
        Lਲ,             // ਲ GURMUKHI LETTER LA
        Vਵ,             // ਵ GURMUKHI LETTER VA
        Rੜ,             // ੜ GURMUKHI LETTER RRA       
        SPairiBindiਸ਼,   // ਸ਼ GURMUKHI LETTER SHA
        KPairiBindiਖ਼,   // ਖ਼ GURMUKHI LETTER KHHA≡  ਖ $਼
        GPairiBindiਗ਼,   // ਗ਼ GURMUKHI LETTER GHHA≡ ਗ $਼
        JPairiBindiਜ਼,   // ਜ਼ GURMUKHI LETTER ZA≡  ਜ $਼
        FPairiBindiਫ਼,   // ਫ਼ GURMUKHI LETTER FA≡ ਫ $਼
        LPairiBindiਲ਼,   // ਲ਼ GURMUKHI LETTER LLA
        PairiBindi,     // $਼ GURMUKHI SIGN NUKTA = pairin bindi 
        PairiBindi2,
        Dot,
        PairiHaha,      // pair wich haha'   
        PairiRara,      // pair wich rara
        Tippi,          // $ੰ GURMUKHI TIPPI • nasalization
        Tippi2,
        Bindi,          // $ਂ GURMUKHI SIGN BINDI
        Visagra,        // $ਃ GURMUKHI SIGN VISARGA
        Addak,          // $ੱ GURMUKHI ADDAK • doubles following consonant
        Addak2,
        AdakBindi,      //$ਁ GURMUKHI SIGN ADAK BINDI
        Yakash,         // $ੵ GURMUKHI SIGN YAKASH  
        Kana,           // $ਾ GURMUKHI VOWEL SIGN AA = kanna
        KanaBindi,      // kana ate bindi
        Sihari,         // $ਿ GURMUKHI VOWEL SIGN I= sihari
        Bihari,         // $ੀ GURMUKHI VOWEL SIGN II= bihari
        Aunkar,         // $ੁ GURMUKHI VOWEL SIGN U = aunkar
        Dulainkar,      // $ੂ GURMUKHI VOWEL SIGN UU= dulainkar
        Lavan,          // $ੇ GURMUKHI VOWEL SIGN EE= lanvan
        Dulavan,        // $ੈ GURMUKHI VOWEL SIGN AI= dulanvan
        Hora,           // $ੋ GURMUKHI VOWEL SIGN OO= hora
        Kanaura,        // $ੌ GURMUKHI VOWEL SIGN AU= kanaura
        Virama,         // $੍ GURMUKHI SIGN VIRAMA
        Udaat,          // $ੑ GURMUKHI SIGN UDAAT // todo: confirm
        Danda,          // । danda
        Danda2,
        Danda3,
        DoubleDanda,    // ॥ double danda    
        DoubleDanda2,
        Zero,           // ੦ GURMUKHI DIGIT ZERO
        One,            // ੧ GURMUKHI DIGIT ONE
        Two,            // ੨ GURMUKHI DIGIT TWO
        Three,          // ੩ GURMUKHI DIGIT THREE
        Four,           // ੪ GURMUKHI DIGIT FOUR
        Five,           // ੫ GURMUKHI DIGIT FIVE
        Six,            // ੬ GURMUKHI DIGIT SIX
        Seven,          // ੭ GURMUKHI DIGIT SEVEN
        Eight,          // ੮ GURMUKHI DIGIT EIGHT
        Nine,           // ੯ GURMUKHI DIGIT NINE
        
    }

    export let compositions = [
        [[Char.AdakBindi], [Char.Addak, Char.Bindi]],
        [[Char.Aਆ], [Char.Aਅ, Char.Kana]],
        [[Char.AਆBindi], [Char.Aਆ, Char.Bindi], [Char.Aਅ, Char.KanaBindi]],
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

    let unicodeMapping = {
        [Char.ੴ]: 0x0A74,
        [Char.Uੳ]: 0x0A73,
        [Char.Uਉ]: 0x0A09,
        [Char.Uਊ]: 0x0A0A,
        [Char.Oਓ]: 0x0A13,
        [Char.Aਅ]: 0x0A05,
        [Char.Aਆ]: 0x0A06,
        [Char.Aਐ]: 0x0A10,
        [Char.Oਔ]: 0x0A14,
        [Char.Eੲ]: 0x0A72,
        [Char.Eਇ]: 0x0A07,
        [Char.Eਈ]: 0x0A08,
        [Char.Eਏ]: 0x0A0F,
        [Char.Sਸ]: 0x0A38,
        [Char.Hਹ]: 0x0A39,
        [Char.Kਕ]: 0x0A15,
        [Char.Kਖ]: 0x0A16,
        [Char.Gਗ]: 0x0A17,
        [Char.Gਘ]: 0x0A18,
        [Char.Nਙ]: 0x0A19,
        [Char.Cਚ]: 0x0A1A,
        [Char.Cਛ]: 0x0A1B,
        [Char.Jਜ]: 0x0A1C,
        [Char.Jਝ]: 0x0A1D,
        [Char.Nਞ]: 0x0A1E,
        [Char.Tਟ]: 0x0A1F,
        [Char.Tਠ]: 0x0A20,
        [Char.Dਡ]: 0x0A21,
        [Char.Dਢ]: 0x0A22,
        [Char.Nਣ]: 0x0A23,
        [Char.Tਤ]: 0x0A24,
        [Char.Tਥ]: 0x0A25,
        [Char.Dਦ]: 0x0A26,
        [Char.Dਧ]: 0x0A27,
        [Char.Nਨ]: 0x0A28,
        [Char.Pਪ]: 0x0A2A,
        [Char.Fਫ]: 0x0A2B,
        [Char.Bਬ]: 0x0A2C,
        [Char.Bਭ]: 0x0A2D,
        [Char.Mਮ]: 0x0A2E,
        [Char.Yਯ]: 0x0A2F,
        [Char.Rਰ]: 0x0A30,
        [Char.Lਲ]: 0x0A32,
        [Char.Vਵ]: 0x0A35,
        [Char.Rੜ]: 0x0A5C,
        [Char.SPairiBindiਸ਼]: 0x0A36,
        [Char.KPairiBindiਖ਼]: 0x0A59,
        [Char.GPairiBindiਗ਼]: 0x0A5A,
        [Char.JPairiBindiਜ਼]: 0x0A5B,
        [Char.FPairiBindiਫ਼]: 0x0A5E,
        [Char.LPairiBindiਲ਼]: 0x0A33,
        [Char.PairiBindi]: 0x0A3C,
        [Char.Tippi]: 0x0A70,
        [Char.Bindi]: 0x0A02,
        [Char.Visagra]: 0x0A03,
        [Char.Addak]: 0x0A71,
        [Char.AdakBindi]: 0x0A01,
        [Char.Yakash]: 0x0A75,
        [Char.Kana]: 0x0A3E,
        [Char.Sihari]: 0x0A3F,
        [Char.Bihari]: 0x0A40,
        [Char.Aunkar]: 0x0A41,
        [Char.Dulainkar]: 0x0A42,
        [Char.Lavan]: 0x0A47,
        [Char.Dulavan]: 0x0A48,
        [Char.Hora]: 0x0A4B,
        [Char.Kanaura]: 0x0A4C,
        [Char.Virama]: 0x0A4D,
        [Char.Udaat]: 0x0A51,
        [Char.Danda]: 0x0964,
        [Char.DoubleDanda]: 0x0965,
        [Char.Zero]: 0x0A66,
        [Char.One]: 0x0A67,
        [Char.Two]: 0x0A68,
        [Char.Three]: 0x0A69,
        [Char.Four]: 0x0A6A,
        [Char.Five]: 0x0A6B,
        [Char.Six]: 0x0A6C,
        [Char.Seven]: 0x0A6D,
        [Char.Eight]: 0x0A6E,
        [Char.Nine]: 0x0A6F,
    };

    let anmolMapping = {
        [Char.AO1]: 0x3c,
        [Char.AO2]: 0x3e,
        [Char.Uੳ]: 0x61,
        [Char.Oਓ]: 0x45,
        [Char.Aਅ]: 0x41,
        [Char.Eੲ]: 0x65,
        [Char.Sਸ]: 0x73,
        [Char.Hਹ]: 0x68,
        [Char.Kਕ]: 0x6b,
        [Char.Kਖ]: 0x4b,
        [Char.Gਗ]: 0x67,
        [Char.Gਘ]: 0x47,
        [Char.Nਙ]: 0x7c,
        [Char.Cਚ]: 0x63,
        [Char.Cਛ]: 0x43,
        [Char.Jਜ]: 0x6a,
        [Char.Jਝ]: 0x4a,
        [Char.Nਞ]: 0x5c,
        [Char.Tਟ]: 0x74,
        [Char.Tਠ]: 0x54,
        [Char.Dਡ]: 0x66,
        [Char.Dਢ]: 0x46,
        [Char.Nਣ]: 0x78,
        [Char.Tਤ]: 0x71,
        [Char.Tਥ]: 0x51,
        [Char.Dਦ]: 0x64,
        [Char.Dਧ]: 0x44,
        [Char.Nਨ]: 0x6e,
        [Char.Pਪ]: 0x70,
        [Char.Fਫ]: 0x50,
        [Char.Bਬ]: 0x62,
        [Char.Bਭ]: 0x42,
        [Char.Mਮ]: 0x6d,
        [Char.Yਯ]: 0x58,
        [Char.Rਰ]: 0x72,
        [Char.Lਲ]: 0x6c,
        [Char.Vਵ]: 0x76,
        [Char.Rੜ]: 0x56,
        [Char.SPairiBindiਸ਼]: 0x53,
        [Char.KPairiBindiਖ਼]: 0x5e,
        [Char.JPairiBindiਜ਼]: 0x7a,
        [Char.FPairiBindiਫ਼]: 0x26,
        [Char.LPairiBindiਲ਼]: 0x4c,
        [Char.PairiBindi]: 0xe6,
        [Char.Dot]: 0x2e,
        [Char.PairiHaha]: 0x48,
        [Char.PairiRara]: 0x52,
        [Char.Tippi]: 0x4d,
        [Char.Addak]: 0x60,
        [Char.Addak2]: 0x7e,
        [Char.AdakBindi]: 0x0A01,
        [Char.Bindi]: 0x4e,
        [Char.Kana]: 0x77,
        [Char.KanaBindi]: 0x57,
        [Char.Sihari]: 0x69,
        [Char.Bihari]: 0x49,
        [Char.Aunkar]: 0x75,
        [Char.Dulainkar]: 0x55,
        [Char.Lavan]: 0x79,
        [Char.Dulavan]: 0x59,
        [Char.Hora]: 0x6f,
        [Char.Kanaura]: 0x4f,
        [Char.Virama]: 0x40,
        [Char.Danda]: 0x5b,
        [Char.DoubleDanda]: 0x5d,
        [Char.Zero]: 0x30,
        [Char.One]: 0x31,
        [Char.Two]: 0x32,
        [Char.Three]: 0x33,
        [Char.Four]: 0x34,
        [Char.Five]: 0x35,
        [Char.Six]: 0x36,
        [Char.Seven]: 0x37,
        [Char.Eight]: 0x38,
        [Char.Nine]: 0x39,
    }

    let drChatrikMappings = {
        [Char.AO1]: 0xc3,
        [Char.AO2]: 0xc4,
        [Char.Uੳ]: 0x41,
        [Char.Aਅ]: 0x61,
        [Char.Eੲ]: 0x65,
        [Char.Sਸ]: 0x73,
        [Char.Hਹ]: 0x68,
        [Char.Kਕ]: 0x6b,
        [Char.Kਖ]: 0x4b,
        [Char.Gਗ]: 0x67,
        [Char.Gਘ]: 0x47,
        [Char.Nਙ]: 0xd5,
        [Char.Cਚ]: 0x63,
        [Char.Cਛ]: 0x43,
        [Char.Jਜ]: 0x6a,
        [Char.Jਝ]: 0x4a,
        [Char.Nਞ]: 0xd6,
        [Char.Tਟ]: 0x74,
        [Char.Tਠ]: 0x54,
        [Char.Dਡ]: 0x7a,
        [Char.Dਢ]: 0x5a,
        [Char.Nਣ]: 0x78,
        [Char.Tਤ]: 0x71,
        [Char.Tਥ]: 0x51,
        [Char.Dਦ]: 0x64,
        [Char.Dਧ]: 0x44,
        [Char.Nਨ]: 0x6e,
        [Char.Pਪ]: 0x70,
        [Char.Fਫ]: 0x50,
        [Char.Bਬ]: 0x62,
        [Char.Bਭ]: 0x42,
        [Char.Mਮ]: 0x6d,
        [Char.Yਯ]: 0x58,
        [Char.Rਰ]: 0x72,
        [Char.Lਲ]: 0x6c,
        [Char.Vਵ]: 0x76,
        [Char.Rੜ]: 0x56,
        [Char.SPairiBindiਸ਼]: 0xc8,
        [Char.KPairiBindiਖ਼]: 0xc9,
        [Char.GPairiBindiਗ਼]: 0xca,
        [Char.JPairiBindiਜ਼]: 0xcb,
        [Char.FPairiBindiਫ਼]: 0xcc,       
        [Char.LPairiBindiਲ਼]: 0xdc,
        [Char.PairiBindi]: 0xe6,
        [Char.PairiBindi]: 0xe6,
        [Char.PairiBindi2]: 0x4c,
        [Char.Dot]: 0x5b,
        [Char.PairiHaha]: 0x48,
        [Char.PairiRara]: 0x52,
        [Char.Tippi]: 0x4d,
        [Char.Tippi2]: 0x53,
        [Char.Bindi]: 0x4e,
        [Char.Addak]: 0x57,
        [Char.Addak2]: 0x77,
        [Char.AdakBindi]: 0x0A01,
        [Char.Kana]: 0x66,
        [Char.KanaBindi]: 0x46,
        [Char.Sihari]: 0x69,
        [Char.Bihari]: 0x49,
        [Char.Aunkar]: 0x75,
        [Char.Dulainkar]: 0x55,
        [Char.Lavan]: 0x79,
        [Char.Dulavan]: 0x59,
        [Char.Hora]: 0x6f,
        [Char.Kanaura]: 0x4f,
        [Char.Virama]: 0xd9,  
        [Char.Danda]: 0x2e,
        [Char.Danda2]: 0x7c,
        [Char.Danda3]:0xbb,
        [Char.DoubleDanda]: 0x5d,
        [Char.DoubleDanda2]:0xab,
        [Char.Zero]: 0x30,
        [Char.One]: 0x31,
        [Char.Two]: 0x32,
        [Char.Three]: 0x33,
        [Char.Four]: 0x34,
        [Char.Five]: 0x35,
        [Char.Six]: 0x36,
        [Char.Seven]: 0x37,
        [Char.Eight]: 0x38,
        [Char.Nine]: 0x39,
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


    export let fontConvertorConfigs = {
        "Unicode": {
            moveRightCharacters: [Char.Sihari],
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
}
