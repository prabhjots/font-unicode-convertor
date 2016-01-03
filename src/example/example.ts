declare var fromText: any, toText: any, fromUnicodeText: any, fromText: any, toUnicodeText: any, fromFont: any, toFont: any;

var punjabiMappingConfig = PunjabiMappings.fontConvertorConfigs;

function changeMapperConverText(){
    convertText();
}


function convertText() {  
   fromText.style.fontFamily = fromFont.value
    toText.style.fontFamily = toFont.value    
    var mapperConfig = Convertor.getMapper(punjabiMappingConfig[toFont.value] ,punjabiMappingConfig[fromFont.value], PunjabiMappings.compositions);     
    
    toText.value = Convertor.convertString(mapperConfig,fromText.value);
    
    fromUnicodeText.value = getUnicodes(fromText.value);
    toUnicodeText.value = getUnicodes(toText.value);
}


function convertUnicodesToChar() {
    fromText.value = getChars(fromUnicodeText.value);
    toText.value = getChars(toUnicodeText.value);
}

function getChars(unicodesString) {
    var unicodes = (unicodesString || "").split(" ");
    var chars = [];

    for (var i = 0; i < unicodes.length; i++) {
        chars.push(String.fromCharCode(parseInt(unicodes[i], 16)));
    }

    return chars.join("");
}



function getUnicodes(stringToConvert) {
    stringToConvert = stringToConvert || ""
    var unicodes = [];

    for (var x = 0; x < stringToConvert.length; x++) {
        unicodes.push(stringToConvert.charCodeAt(x).toString(16));
    }

    return unicodes.join(" ");
}
