namespace Convertor {
    export function convertString(mapperConfig: IMapperConfig, stringToConvert: string): string {
        let {mapper, maxWidth, moveRightChars, moveLeftChars } = mapperConfig;

        let output: string[] = [];

        let charToAddOnRight = "";

        for (let i = 0; i < stringToConvert.length; i++) {
            let j = maxWidth + 1;
            let matchFound = false;

            let charToMatch = "";
            while (matchFound === false && j--) {
                charToMatch = stringToConvert.substr(i, j);

                if (charToMatch in mapper) {
                    matchFound = true;
                    i = i + (j - 1);
                }
            }

            let charToAdd;

            if (matchFound) {
                charToAdd = mapper[charToMatch];
            } else {
                charToAdd = stringToConvert[i];
            }

            if (charToAddOnRight) {
                output.push(charToAdd, charToAddOnRight);
                charToAddOnRight = null;
            } else if (moveRightChars.indexOf(charToAdd) > -1) {
                charToAddOnRight = charToAdd;
            } else if (moveLeftChars.indexOf(charToAdd) > -1 && output.length) {
                let lastChar = output.pop();
                output.push(charToAdd, lastChar);
            } else {
                output.push(charToAdd);
            }
        }

        if (charToAddOnRight) {
            output.push(charToAddOnRight);
        }
        return output.join("");

    }
    
    export function getMapper(to: IMapping, from: IMapping, compositions: { [key: number]: number[] }): IMapperConfig {
        let mappingLength = Math.max(to.characterCodes.length, from.characterCodes.length);

        let mapper: any = {};

        for (let i = 0; i < mappingLength; i++) {
            let fromChar = from.characterCodes[i];
            let toChar = to.characterCodes[i];

            if (fromChar && toChar) {
                mapper[getCharFromUnicode(fromChar)] = getCharFromUnicode(toChar);
            }
        }
        let maxWidth = 0;

        for (let c in compositions) {
            if (compositions.hasOwnProperty(c)) {
                let compositionChar = compositions[c];
                maxWidth = Math.max(maxWidth, compositionChar.length);
                let toCharCodes = [];

                if (to.characterCodes[c]) {
                    toCharCodes = [to.characterCodes[c]]
                } else {
                    for (let code of compositionChar) {
                        let toCode = to.characterCodes[code];

                        if (toCode) {
                            toCharCodes.push(toCode);
                        } else {
                            //onsole.error(`No code in to for ${code}`);
                        }
                    }
                }

                let toMulipleChar = getCharFromUnicode(...toCharCodes);

                let fromCompositeCharCode = from.characterCodes[c];

                if (fromCompositeCharCode && !(fromCompositeCharCode in mapper)) {
                    mapper[getCharFromUnicode(fromCompositeCharCode)] = toMulipleChar;
                }

                let fromCharCodes: number[] = [];

                let invalid = false;
                for (let code of compositionChar) {
                    let fromCode = from.characterCodes[code];

                    if (fromCode) {
                        fromCharCodes.push(fromCode);
                    } else {
                        invalid = true;
                        //console.error(`No code in from for ${code}`);
                    }
                }

                if (!invalid) {
                    let fromSingleChars = getCharFromUnicode(...fromCharCodes)
                    
                    if(!(fromSingleChars in mapper)){
                        mapper[fromSingleChars] = toMulipleChar;
                    }                    
                }
            }
        }

        let moveLeftCharIndexes = from.moveRightCharacters.filter(a => to.moveRightCharacters.indexOf(a) === -1);
        let moveRightCharIndexes = to.moveRightCharacters.filter(a => from.moveRightCharacters.indexOf(a) === -1);

        return {
            mapper,
            maxWidth,
            moveLeftChars: moveLeftCharIndexes.map(c => getCharFromUnicode(to.characterCodes[c])),
            moveRightChars: moveRightCharIndexes.map(c => getCharFromUnicode(to.characterCodes[c]))
        };
    }

    function getCharFromUnicode(...unicodes: number[]): string {
        return unicodes.map(c => String.fromCharCode(c)).join("");
    }

    export interface IMapping {
        characterCodes: number[];
        moveRightCharacters: number[];
    }

    export interface IMapperConfig {
        mapper;
        maxWidth: number
        moveLeftChars: string[];
        moveRightChars: string[];
    }
}