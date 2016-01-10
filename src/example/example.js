function changeMapperConverText() {
    convertText();
}
function convertText() {
    fromText.style.fontFamily = fromFont.value;
    toText.style.fontFamily = toFont.value;
    toText.value = PunjabiFontConvertor.convert(fromText.value, toFont.value, fromFont.value);
    fromUnicodeText.value = getUnicodes(fromText.value);
    toUnicodeText.value = getUnicodes(toText.value);
    onScroll();
}
function convertUnicodesToChar() {
    fromText.value = getChars(fromUnicodeText.value);
    toText.value = getChars(toUnicodeText.value);
}
function getChars(unicodesString) {
    var unicodes = (unicodesString || "").split(" ");
    var chars = [];
    for (var i = 0; i < unicodes.length; i++) {
        var charCode = parseInt(unicodes[i], 16);
        
        if(charCode != 0x20 && charCode != 0xfffd){
          chars.push(String.fromCharCode(charCode));
        }
        
    }
    return chars.join(" ");
}
function getUnicodes(stringToConvert) {
    stringToConvert = stringToConvert || "";
    var unicodes = [];
    for (var x = 0; x < stringToConvert.length; x++) {
        unicodes.push(stringToConvert.charCodeAt(x).toString(16));
    }
    return unicodes.join(" ");
}


function onScroll(){
    toText.scrollTop =  ( fromText.scrollTop *  toText.scrollHeight)/ fromText.scrollHeight;
}
