/**
 * 
 * @param {IMapperConfig} config 
 * @param {string} stringToConvert 
 */
export function convertStringUsingMapper(config, stringToConvert) {

    const output = [];

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

        let charToAdd;

        if (matchFound) {
            charToAdd = config.mapper[charToMatch];
        } else {
            charToAdd = stringToConvert[i];
        }

        if (config.moveRightChars.indexOf(charToAdd) > -1) {
            if (charToAddOnRight) {
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
                charToAddOnRight = "";
                charToMoveRightIndex = 0;
            }
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

/**
 * 
 * @param {string[]} chars 
 * @param {string[]} moveLeftAcrossChars 
 * @param {string} characterToAdd 
 * @param {string[]} onRightChars 
 */
function insertCharOnLeft(chars, moveLeftAcrossChars, characterToAdd, onRightChars) {
    const lastChar = chars.pop();

    if (lastChar) {
        if (moveLeftAcrossChars.indexOf(lastChar) > -1) {
            onRightChars.unshift(lastChar);
            insertCharOnLeft(chars, moveLeftAcrossChars, characterToAdd, onRightChars);
        } else {
            chars.push(characterToAdd, lastChar);
            chars.push(...onRightChars);
        }
    } else {
        chars.push(characterToAdd);
        chars.push(...onRightChars);
    }
}

/**
 * 
 * @param {IMapping} to 
 * @param {IMapping} from 
 * @param {string[][][]} groups 
 * @param {string[][][]} tightGroups 
 * @returns {IMapperConfig}
 */
export function getMapper(to, from, groups, tightGroups) {
    /**@type {*} */
    const mapper = {};

    for (const i in to.characterCodes) {
        const fromChar = from.characterCodes[i];
        const toChar = to.characterCodes[i];

        if (fromChar && toChar) {
            mapper[fromChar] = toChar;
        }
    }

    let maxWidth = 1;

    for (const compositionCharArrays of groups) {

        const toCharacter = getCompositionCharacters(compositionCharArrays, to.characterCodes)[0];

        if (toCharacter) {
            const fromCharacters = getCompositionCharacters(compositionCharArrays, from.characterCodes);

            for (const fromChar of fromCharacters) {
                maxWidth = Math.max(maxWidth, fromChar.length);

                if (!(fromChar in mapper)) {
                    mapper[fromChar] = toCharacter;
                }
            }
        }
    }

    const moveLeftCharIndexes = from.moveRightCharacters.filter(a => to.moveRightCharacters.indexOf(a) === -1);
    const moveRightCharIndexes = to.moveRightCharacters.filter(a => from.moveRightCharacters.indexOf(a) === -1);

    const moveAcrossCharacters = tightGroups
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

/**
 * 
 * @param {string[][]} compositionCharArrays 
 * @param {IChars} codes 
 */
function getCompositionCharacters(compositionCharArrays, codes) {
    const characters = [];

    for (const compositionChar of compositionCharArrays) {
        let isValid = true;
        const charCodes = [];
        for (const code of compositionChar) {
            const toCode = codes[code];

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


