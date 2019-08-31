const PunjabiFontConvertor = require("../dist/convertor");

function toUnicode(s) {
    return PunjabiFontConvertor.convert(s, "Arial Unicode MS", "AnmolLipi");
}

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