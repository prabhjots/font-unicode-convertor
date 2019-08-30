const PunjabiFontConvertor = require("../dist/convertor");
console.log(PunjabiFontConvertor)

function convert(s) {
    return PunjabiFontConvertor.convert(s, "Arial Unicode MS", "AnmolLipi");
}

function match(a, b) {
    expect(PunjabiFontConvertor.convert(a, "Arial Unicode MS", "AnmolLipi")).toBe(b);
}

test("basic test", () => {
    expect(convert("s")).toBe("ਸ");
})

test('convert sihary tests', () => {
    expect(convert("is")).toBe("ਸਿ");
    expect(convert("iml")).toBe("ਮਿਲ");
    expect(convert("il iK")).toBe("ਲਿ ਖਿ");
    //expect(convert("iliK")).toBe("ਲਿਖਿ");
});