export function convertStringUsingMapper(config: IMapperConfig, stringToConvert: string): string {

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

        if (config.moveRightChars.indexOf(charToAdd) > -1) {
            if(charToAddOnRight){
                output.push(charToAddOnRight);
            }
            charToAddOnRight = charToAdd;
            charToMoveRightIndex = 0;
        } else if (charToAddOnRight) {
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
        } else  if (config.moveLeftChars.indexOf(charToAdd) > -1 && output.length) {
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

export function getMapper(to: IMapping, from: IMapping, groups: string[][][], tightGroups: string[][][]): IMapperConfig {
    let mapper: any = {};

    for (var i in to.characterCodes) {
        var fromChar = from.characterCodes[i];
        var toChar = to.characterCodes[i];

        if (fromChar && toChar) {
            mapper[fromChar] = toChar;
        }
    }

    let maxWidth = 1;

    for (let compositionCharArrays of groups) {

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

    let moveAcrossCharacters = tightGroups
        .map(a => getCompositionCharacters(a, to.characterCodes))
        .reduce((a, b) => a.concat(b), []);
    return {
        mapper,
        maxWidth,
        moveLeftChars: moveLeftCharIndexes.map(c => to.characterCodes[c]),
        moveAcrossCharacters,
        moveRightChars: moveRightCharIndexes.map(c => to.characterCodes[c]),
    };
}

function getCompositionCharacters(compositionCharArrays: string[][], codes: IChars) {
    let characters: string[] = [];

    for (let compositionChar of compositionCharArrays) {
        let isValid = true;
        let charCodes: string[] = [];
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
            characters.push(charCodes.join(""));
        }
    }
    return characters;
}


export interface IMapping {
    characterCodes: IChars;
    moveRightCharacters: string[];
    moveRightAcrossCharacterSet?: string[];
}

export interface IChars {
    [key: string]: string
}

export function merge(...configs: IChars[]): IChars {
    var c: IChars = {};

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