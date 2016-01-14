namespace PunjabiFontConvertor {
    export const enum Char {
        IkOnkarVersion1,   // ੴ GURMUKHI EK ONKAR • God is One                
        IkOnkarVersion1a,
        IkOnkarVersion1b,
        IkOnkarVersion2,
        IkOnkarVersion2a,
        IkOnkarVersion2b,
        IkOnkarVersion3,
        Uੳ,             // ੳ GURMUKHI URA • base for vowels
        Uਉ,             // ਉ GURMUKHI LETTER U
        Uਊ,             // ਊ GURMUKHI LETTER UU	
        Oਓ,             // ਓ GURMUKHI LETTER OO
        Aਅ,             // ਅ GURMUKHI LETTER A = aira
        Aਆ,             // ਆ GURMUKHI LETTER AA
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
        PairiHahaDulainkar,   
        PairiRara,      // pair wich rara
        PairiRaraPairiBindi,
        PairiChacha,
        PairiTenka,
        PairiVava,
        PairiYaiya,
        PairiTata,
        PairiNana,
        HalfYaiya,
        Tippi,          // $ੰ GURMUKHI TIPPI • nasalization
        Tippi2,
        Bindi,          // $ਂ GURMUKHI SIGN BINDI
        Bindi2,
        Visagra,        // $ਃ GURMUKHI SIGN VISARGA
        AddakAbove,
        AddakRight,          // $ੱ GURMUKHI ADDAK • doubles following consonant
        AddakRight2,
        AdakBindi,      //$ਁ GURMUKHI SIGN ADAK BINDI
        Yakash,         // $ੵ GURMUKHI SIGN YAKASH  
        Kana,           // $ਾ GURMUKHI VOWEL SIGN AA = kanna
        KanaBindi,      // kana ate bindi
        Sihari,         // $ਿ GURMUKHI VOWEL SIGN I= sihari
        Bihari,         // $ੀ GURMUKHI VOWEL SIGN II= bihari
        Aunkar,         // $ੁ GURMUKHI VOWEL SIGN U = aunkar
        Aunkar2,
        Dulainkar,      // $ੂ GURMUKHI VOWEL SIGN UU= dulainkar
        Dulainkar2,
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
        GZero,           // ੦ GURMUKHI DIGIT ZERO
        GOne,            // ੧ GURMUKHI DIGIT ONE
        GTwo,            // ੨ GURMUKHI DIGIT TWO
        GThree,          // ੩ GURMUKHI DIGIT THREE
        GFour,           // ੪ GURMUKHI DIGIT FOUR
        GFive,           // ੫ GURMUKHI DIGIT FIVE
        GSix,            // ੬ GURMUKHI DIGIT SIX
        GSeven,          // ੭ GURMUKHI DIGIT SEVEN
        GEight,          // ੮ GURMUKHI DIGIT EIGHT
        GNine,           // ੯ GURMUKHI DIGIT NINE   
        Nu,
        Divide,
        Multiply,
        Khanda,   
        FlowerDesign1,
        FlowerDesign2,
        FlowerDesign3,
        FlowerDesign4,
        FlowerDesign5,
        Diamond,
        KThind,
        Colon,
        Unknown1,
        TopRightExtention,
             
    }
}
