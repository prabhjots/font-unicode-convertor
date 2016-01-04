namespace PunjabiMappings {
    const enum Char {
        AdakBindi,      //$ਁ GURMUKHI SIGN ADAK BINDI
        Bindi,          // $ਂ GURMUKHI SIGN BINDI
        Visagra,        // $ਃ GURMUKHI SIGN VISARGA
        Aਅ,             // ਅ GURMUKHI LETTER A = aira
        Aਆ,             // ਆ GURMUKHI LETTER AA
        Eਇ,             // ਇ GURMUKHI LETTER I
        Eਈ,             // ਈ GURMUKHI LETTER II
        Uਉ,             // ਉ GURMUKHI LETTER U
        Uਊ,             // ਊ GURMUKHI LETTER UU	
        Eਏ,             // ਏ GURMUKHI LETTER EE
        Aਐ,             // ਐ GURMUKHI LETTER AI
        Oਓ,             // ਓ GURMUKHI LETTER OO
        Oਔ,             // ਔ GURMUKHI LETTER AU
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
        LPairiBindiਲ਼,   // ਲ਼ GURMUKHI LETTER LLA
        Vਵ,             // ਵ GURMUKHI LETTER VA
        SPairiBindiਸ਼,   // ਸ਼ GURMUKHI LETTER SHA
        Sਸ,             // ਸ GURMUKHI LETTER SA
        Hਹ,             // ਹ GURMUKHI LETTER HA
        PairiBindi,     // $਼ GURMUKHI SIGN NUKTA = pairin bindi 
        Kana,           // $ਾ GURMUKHI VOWEL SIGN AA = kanna
        Sihari,         // $ਿ GURMUKHI VOWEL SIGN I= sihari
        Bihari,         // $ੀ GURMUKHI VOWEL SIGN II= bihari
        Aunkar,         // $ੁ GURMUKHI VOWEL SIGN U = aunkar
        Dulainkar,      // $ੂ GURMUKHI VOWEL SIGN UU= dulainkar
        Lavan,          // $ੇ GURMUKHI VOWEL SIGN EE= lanvan
        Dulavan,        // $ੈ GURMUKHI VOWEL SIGN AI= dulanvan
        Hora,           // $ੋ GURMUKHI VOWEL SIGN OO= hora
        Kanaura,        // $ੌ GURMUKHI VOWEL SIGN AU= kanaura
        Virama,         // $੍ GURMUKHI SIGN VIRAMA
        PairiRara,      // pair wich rara
        Udaat,          // $ੑ GURMUKHI SIGN UDAAT // todo: confirm
        KPairiBindiਖ਼,   // ਖ਼ GURMUKHI LETTER KHHA≡  ਖ $਼
        GPairiBindiਗ਼,   // ਗ਼ GURMUKHI LETTER GHHA≡ ਗ $਼
        JPairiBindiਜ਼,   // ਜ਼ GURMUKHI LETTER ZA≡  ਜ $਼
        Rੜ,             // ੜ GURMUKHI LETTER RRA
        FPairiBindiਫ਼,   // ਫ਼ GURMUKHI LETTER FA≡ ਫ $਼
        Danda,          // । danda
        DoubleDanda,    // ॥ double danda    
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
        Tippi,          // $ੰ GURMUKHI TIPPI • nasalization
        Addak,          // $ੱ GURMUKHI ADDAK • doubles following consonant
        Addak2,
        Eੲ,             // ੲ GURMUKHI IRI • base for vowels
        Uੳ,             // ੳ GURMUKHI URA • base for vowels
        Aੴ,            // ੴ GURMUKHI EK ONKAR • God is One
        AੴPart1,
        AੴPart2,
        Yakash,         // $ੵ GURMUKHI SIGN YAKASH  
        KanaBindi,      // kana ate bindi
        PairiHaha,      // pair wich haha' }   
        AਆBindi
    }

    export let compositions = {
        [Char.AdakBindi]: [[Char.Addak, Char.Bindi]],
        [Char.Aਆ]: [[Char.Aਅ, Char.Kana]],
        [Char.AਆBindi]: [[Char.Aਆ, Char.Bindi], [Char.Aਅ, Char.KanaBindi]],
        [Char.Eਇ]: [[Char.Sihari, Char.Eੲ]],
        [Char.Eਈ]: [[Char.Eੲ, Char.Bihari]],
        [Char.Uਉ]: [[Char.Uੳ, Char.Aunkar]],
        [Char.Uਊ]: [[Char.Uੳ, Char.Dulainkar]],
        [Char.Eਏ]: [[Char.Eੲ, Char.Lavan]],
        [Char.Aਐ]: [[Char.Aਅ, Char.Dulavan]],
        [Char.Oਔ]: [[Char.Aਅ, Char.Aunkar]],
        [Char.LPairiBindiਲ਼]: [[Char.Lਲ, Char.PairiBindi]],
        [Char.SPairiBindiਸ਼]: [[Char.Sਸ, Char.PairiBindi]],
        [Char.KPairiBindiਖ਼]: [[Char.Kਖ, Char.PairiBindi]],
        [Char.GPairiBindiਗ਼]: [[Char.Gਗ, Char.PairiBindi]],
        [Char.JPairiBindiਜ਼]: [[Char.Jਜ, Char.PairiBindi]],
        [Char.FPairiBindiਫ਼]: [[Char.Fਫ, Char.PairiBindi]],
        [Char.DoubleDanda]: [[Char.Danda, Char.Danda]],
        [Char.KanaBindi]: [[Char.Kana, Char.Bindi]],
        [Char.PairiHaha]: [[Char.Virama, Char.Hਹ]],
        [Char.PairiRara]: [[Char.Virama, Char.Rਰ]],
        [Char.Addak2]: [[Char.Addak]],
        [Char.AੴPart1]: [[Char.Aੴ]],
        [Char.Aੴ]: [[Char.AੴPart1, Char.AੴPart2]],
    };

    let unicodeMapping = {
        [Char.AdakBindi]: 0x0A01,
        [Char.Bindi]: 0x0A02,
        [Char.Visagra]: 0x0A03,
        [Char.Aਅ]: 0x0A05,
        [Char.Aਆ]: 0x0A06,
        [Char.Eਇ]: 0x0A07,
        [Char.Eਈ]: 0x0A08,
        [Char.Uਉ]: 0x0A09,
        [Char.Uਊ]: 0x0A0A,
        [Char.Eਏ]: 0x0A0F,
        [Char.Aਐ]: 0x0A10,
        [Char.Oਓ]: 0x0A13,
        [Char.Oਔ]: 0x0A14,
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
        [Char.LPairiBindiਲ਼]: 0x0A33,
        [Char.Vਵ]: 0x0A35,
        [Char.SPairiBindiਸ਼]: 0x0A36,
        [Char.Sਸ]: 0x0A38,
        [Char.Hਹ]: 0x0A39,
        [Char.PairiBindi]: 0x0A3C,
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
        [Char.KPairiBindiਖ਼]: 0x0A59,
        [Char.GPairiBindiਗ਼]: 0x0A5A,
        [Char.JPairiBindiਜ਼]: 0x0A5B,
        [Char.Rੜ]: 0x0A5C,
        [Char.FPairiBindiਫ਼]: 0x0A5E,
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
        [Char.Tippi]: 0x0A70,
        [Char.Addak]: 0x0A71,
        [Char.Eੲ]: 0x0A72,
        [Char.Uੳ]: 0x0A73,
        [Char.Aੴ]: 0x0A74,
        [Char.Yakash]: 0x0A75
    };

    let anmolMapping = {
        [Char.AdakBindi]: 0x0A01,
        [Char.Bindi]: 0x4e,
        [Char.Aਅ]: 0x41,
        [Char.Oਓ]: 0x45,
        [Char.Kਕ]: 0x6b,
        [Char.Kਖ]: 0x4b,
        [Char.Gਗ]: 0x67,
        [Char.Gਘ]: 0x47,
        //[Char.Nਙ]:   ,
        [Char.Cਚ]: 0x63,
        [Char.Cਛ]: 0x43,
        [Char.Jਜ]: 0x6a,
        [Char.Jਝ]: 0x4a,
        //[Char.Nਞ]:  0x ,
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
        [Char.LPairiBindiਲ਼]: 0x4c,
        [Char.Vਵ]: 0x76,
        [Char.SPairiBindiਸ਼]: 0x53,
        [Char.Sਸ]: 0x73,
        [Char.Hਹ]: 0x68,
        [Char.PairiBindi]: 0x01,
        [Char.Kana]: 0x77,
        [Char.Sihari]: 0x69,
        [Char.Bihari]: 0x49,
        [Char.Aunkar]: 0x75,
        [Char.Dulainkar]: 0x55,
        [Char.Lavan]: 0x79,
        [Char.Dulavan]: 0x59,
        [Char.Hora]: 0x6f,
        [Char.Kanaura]: 0x4f,
        [Char.PairiRara]: 0x52,
        [Char.JPairiBindiਜ਼]: 0x7a,
        [Char.Rੜ]: 0x56,
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
        [Char.Tippi]: 0x4d,
        [Char.Addak]: 0x60,
        [Char.Eੲ]: 0x65,
        [Char.Uੳ]: 0x61,
        [Char.KanaBindi]: 0x57,
        [Char.PairiHaha]: 0x48,
        [Char.Addak2]: 0x7e,
        [Char.AੴPart1]: 0x3c,
        [Char.AੴPart2]: 0x3e,
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
        }
    };
}
