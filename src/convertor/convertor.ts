export function convertStringUsingMapperInternal(config: IMapperConfig, stringToConvert: string): string {

    let output: string[] = [];

    let charToAddOnRight = "";
    let charToMoveRightIndex = 0;

    for (let i = 0; i < stringToConvert.length; i++) {
        let j = config.maxWidth + 1;
        let matchFound = false;

        let charToMatch = "";
        while (matchFound === false && j--) {
            charToMatch = stringToConvert.substr(i, j);

            if (charToMatch in config.mapper) {
                matchFound = true;
                i = i + (j - 1);
            }
        }

        let charToAdd: string;

        if (matchFound) {
            charToAdd = config.mapper[charToMatch];
        } else {
            charToAdd = stringToConvert[i];
        }

        if (charToAddOnRight) {
            if (charToMoveRightIndex < 1) {
                charToMoveRightIndex = 1;
                output.push(charToAdd);
            } else if (config.moveAcrossCharacters.indexOf(charToAdd) > -1) {
                output.push(charToAdd);
            } else {
                output.push(charToAddOnRight, charToAdd);
                charToAddOnRight = null;
                charToMoveRightIndex = 0;
            }
        } else if (config.moveRightChars.indexOf(charToAdd) > -1) {
            charToAddOnRight = charToAdd;
        } else if (config.moveLeftChars.indexOf(charToAdd) > -1 && output.length) {
            insertCharOnLeft(output, config.moveAcrossCharacters, charToAdd, []);
        } else {
            output.push(charToAdd);
        }
    }

    if (charToAddOnRight) {
        output.push(charToAddOnRight);
    }
    return output.join("");

}

export function convertStringUsingMapper(config: IMapperConfig, stringToConvert: string): string {
    if (stringToConvert) {
        return stringToConvert.split(" ").map(s => convertStringUsingMapperInternal(config, s)).join(" ");
    }
    return "";
}

function insertCharOnLeft(chars: string[], moveLeftAcrossChars: string[], characterToAdd: string, onRightChars: string[]) {
    let lastChar = chars.pop();

    if (lastChar) {
        if (moveLeftAcrossChars.indexOf(lastChar) > -1) {
            onRightChars.unshift(lastChar);
            insertCharOnLeft(chars, moveLeftAcrossChars, characterToAdd, onRightChars);
        } else {
            chars.push(characterToAdd, lastChar, ...onRightChars);
        }
    } else {
        chars.push(characterToAdd, ...onRightChars);
    }
}

export function getMapper(to: IMapping, from: IMapping, compositions: number[][][], moveAcrossCharSet: number[][][]): IMapperConfig {
    let mapper: any = {};

    for (var i in to.characterCodes) {
        var fromChar = from.characterCodes[i];
        var toChar = to.characterCodes[i];

        if (fromChar && toChar) {
            mapper[getCharFromUnicode(fromChar)] = getCharFromUnicode(toChar);
        }
    }

    let maxWidth = 1;

    for (let compositionCharArrays of compositions) {

        let toCharacter = getCompositionCharacters(compositionCharArrays, to.characterCodes)[0];

        if (toCharacter) {
            let fromCharacters = getCompositionCharacters(compositionCharArrays, from.characterCodes);

            for (let fromChar of fromCharacters) {
                maxWidth = Math.max(maxWidth, fromChar.length);

                if (!(fromChar in mapper)) {
                    mapper[fromChar] = toCharacter;
                }
            }
        }
    }

    let moveLeftCharIndexes = from.moveRightCharacters.filter(a => to.moveRightCharacters.indexOf(a) === -1);
    let moveRightCharIndexes = to.moveRightCharacters.filter(a => from.moveRightCharacters.indexOf(a) === -1);

    let moveAcrossCharacters = moveAcrossCharSet
        .map(a => getCompositionCharacters(a, to.characterCodes))
        .reduce((a, b) => a.concat(b), []);
    return {
        mapper,
        maxWidth,
        moveLeftChars: moveLeftCharIndexes.map(c => getCharFromUnicode(to.characterCodes[c])),
        moveAcrossCharacters,
        moveRightChars: moveRightCharIndexes.map(c => getCharFromUnicode(to.characterCodes[c])),
    };
}

function getCompositionCharacters(compositionCharArrays: number[][], codes: ICharCodes) {
    let characters: string[] = [];

    for (let compositionChar of compositionCharArrays) {
        let isValid = true;
        let charCodes: number[] = [];
        for (let code of compositionChar) {
            let toCode = codes[code];

            if (toCode) {
                charCodes.push(toCode);
            } else {
                isValid = false;
                //onsole.error(`No code in to for ${code}`);
            }
        }

        if (isValid) {
            characters.push(getCharFromUnicode(...charCodes));
        }
    }
    return characters;
}

function getCharFromUnicode(...unicodes: number[]): string {
    return unicodes.map(c => String.fromCharCode(c)).join("");
}

export interface IMapping {
    characterCodes: ICharCodes;
    moveRightCharacters: number[];
    moveRightAcrossCharacterSet?: number[][];
}

export interface ICharCodes {
    [key: number]: number
}

export function merge(...configs: ICharCodes[]): ICharCodes {
    var c: ICharCodes = {};

    for (let a of configs) {
        for (var x in a) {
            c[x] = a[x];
        }
    }
    return c;
}

export interface IMapperConfig {
    mapper: {
        [key: string]: string;
    };
    maxWidth: number
    moveLeftChars: string[];
    moveRightChars: string[];
    moveAcrossCharacters: string[];
}