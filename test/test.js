const PunjabiFontConvertor = require("../dist/convertor");

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



