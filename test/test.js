const PunjabiFontConvertor = require("../dist/convertor");
const _ = require("lodash");

function toUnicode(s) {
    return PunjabiFontConvertor.convert(s, "Arial Unicode MS", "AnmolLipi");
}

var samples = [
    { "Unicode": "ਲਿਖਿਆ", "AnmolLipi": "iliKAw", "DrChatrikWeb": "iliKaf", "Satluj": "ÇñÇÖÁÅ", "Asees": "fbfynk", "Joy": "fbfynk", "GurbaniLipi": "iliKAw", "GurmukhiLys020": "iliKAw" },
    { "Unicode": "ਵਿਦਿਆਰਥੀ", "AnmolLipi": "ividAwrQI", "DrChatrikWeb": "ividafrQI", "Satluj": "ÇòÇçÁÅðæÆ", "Asees": "ftfdnkoEh", "Joy": "ftfdnkoEh"}
]


test("basic samples", () => {
    for (var sample of samples) {
        for (var to in sample) {
            if (sample.hasOwnProperty(to)) {
                for (var from in sample) {
                    if (sample.hasOwnProperty(from) && to != from) {
                        expect(PunjabiFontConvertor.convert(sample[from], to, from)).toBe(sample[to])
                    }
                }
            }
        }
    }
})


test("basic test", () => {
    expect(toUnicode("s")).toBe("ਸ");
})

test('convert sihary tests', () => {
    expect(toUnicode("is")).toBe("ਸਿ");
    expect(toUnicode("iml")).toBe("ਮਿਲ");
    expect(toUnicode("il iK")).toBe("ਲਿ ਖਿ");
    expect(toUnicode("iliK")).toBe("ਲਿਖਿ");
    expect(toUnicode("iliKAw")).toBe("ਲਿਖਿਆ");
    expect(toUnicode("ividAwrQI")).toBe("ਵਿਦਿਆਰਥੀ");
    expect(toUnicode("isiK~Aw")).toBe("ਸਿਖਿੱਆ");
});


/**
 *
 *     <select id="fromFont" onchange="convertText()">
        <option value="AnmolLipi">Anmol Lipi</option>
        <option value="AnmolUni">Anmol Uni</option>
        <option value="Arial Unicode MS">Unicode</option>
        <option value="DrChatrikWeb">Dr Chatrik</option>
        <option value="Awaze">Awaze</option>
        <option value="Satluj">Satluj</option>
        <option value="Asees">Asees</option>
        <option value="Joy">Joy</option>
        <option value="GurbaniLipi">Gurbany Lipi</option>
        <option value="GurmukhiLys020">Gurmukhi Lys 020</option>
 */