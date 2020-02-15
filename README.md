# font-unicode-converter
Utility to convert different fonts for the Punjabi Language. 

## Reason
Unicode support was eventually added by microsoft and characters were allocated between 2560 - 2680

By this time different font authors already created different punjabi fonts which used character ranges. All of these fonts chose a different character sets so changing one font to another is not very easy. 

This utility will provide a solution to this problem by tranforming the actual characters when changing font. 

## Convertor
Convertor is a JS library which could be found at [https://raw.githubusercontent.com/prabhjots/font-unicode-convertor/master/public/js/convertor.js]()

It exposes a single function 

`PunjabiFontConvertor.convert(text, targetFont, sourceFont)`

```javascript
var inAnmol = "gurmuKI";
var inUnicode = PunjabiFontConvertor.convert(inAnmol, "unicode", "anmol") 
console.log(inUnicode) // "ਗੁਰਮੁਖੀ"
```


## Online Editor
Online editor is available at [https://prabhjots.github.io/font-unicode-convertor/public/index.html]()

## Character Set
To view different character set provided by different fonts see [https://prabhjots.github.io/font-unicode-convertor/public/GurmukhiCharCatalog.html]()

Note: You will need to install the fonts at your machine to be able to see them on the page. 


## Dev notes
To run the app in the watch mode
```bash
npm install
npx shadow-cljs watch frontend
```

To create a release
```bash
npx shadow-cljs release frontend
```
this will create `convertor.js` and `main.js` in the root directory