const PunjabiFontConvertor = require("../dist/convertor");
const _ = require("lodash");

function toUnicode(s) {
    return PunjabiFontConvertor.convert(s, "Arial Unicode MS", "AnmolLipi");
}

var samples = [
    { "Unicode": "ਲਿਖਿਆ", "AnmolLipi": "iliKAw", "DrChatrikWeb": "iliKaf", "Satluj": "ÇñÇÖÁÅ", "Asees": "fbfynk", "Joy": "fbfynk", "GurbaniLipi": "iliKAw", "GurmukhiLys020": "iliKAw" },
    { "Unicode": "ਵਿਦਿਆਰਥੀ", "AnmolLipi": "ividAwrQI", "DrChatrikWeb": "ividafrQI", "Satluj": "ÇòÇçÁÅðæÆ", "Asees": "ftfdnkoEh", "Joy": "ftfdnkoEh" },
    { "Unicode": ".", "AnmolLipi": ".", "DrChatrikWeb": "[", "Satluj": ".", "Asees": ".", /*"Joy": "d" */ },


]

function getCodes(str){
    var codes = [];
    for(var i = 0 ; i < str.length; i++){
        codes.push(str.charCodeAt(i).toString(16));
    }
    return codes.join(" ");
}

expect.extend({
    checkFontConvert(sample) {
        for (var to in sample) {
            if (sample.hasOwnProperty(to)) {
                for (var from in sample) {
                    if (sample.hasOwnProperty(from) && to != from) {
                        var fromText = sample[from];
                        var expected = sample[to];
                        var received = PunjabiFontConvertor.convert(fromText, to, from);

                        if (expected != received) {
                            return {
                                message: () => `Converting ${from} -> ${to} for ${fromText}\n`
                                    + `Expected: ${this.utils.printExpected(expected)}\n`
                                    + `Received: ${this.utils.printReceived(received)}\n\n`
                                    + `       From Codes : ${getCodes(fromText)}\n`
                                    + `To Expected Codes : ${getCodes(expected)}\n`
                                    + `  To Actual Codes : ${getCodes(received)}\n` ,
                                pass: false,
                            };
                        }
                    }
                }
            }
        }
        return {
            message: () =>
                `passed for ${sample.Unicode}`,
            pass: true,
        };
    }
});

test("test samples", () => {
    samples.forEach(sample => expect(sample).checkFontConvert())
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