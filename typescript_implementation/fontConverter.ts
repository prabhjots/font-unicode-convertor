import { identity } from "@thi.ng/compose";


interface CharToCharMapper {
    [chars: string]: string
}

interface NameToCharMapper {
    [charName: string]: string
}


export interface Mappings {
    [key: string]: {
        characterCodes: NameToCharMapper,
        moveRightCharacters: string[]
    }
}

function getMatchingChars(nameGroups: string[][], nameToChar: NameToCharMapper) {
    return nameGroups
        .map(names => names.map(n => nameToChar[n]).join(""))
        .filter(identity);
}


function getGroupMapper(groups: string[][][], nameToSourceChar: NameToCharMapper, nameToTargetChar: NameToCharMapper) {
    var groupMapper: CharToCharMapper = {}
    for (var subGroup of groups) {
        var targetChar = getMatchingChars(subGroup, nameToTargetChar)[0];
        if(targetChar?.length){
            for (var sourceChar of getMatchingChars(subGroup, nameToSourceChar)) {
                if(sourceChar?.length){
                    groupMapper[sourceChar] = targetChar;
                }
            }
        }
    }
    return groupMapper;
}


function getMapper(source: NameToCharMapper, target: NameToCharMapper) {
    var mapper: CharToCharMapper = {}

    for (var charName in source) {
        const sourceChar = source[charName];
        const targetChar = target[charName];
        if (sourceChar && targetChar) {
            mapper[sourceChar] = targetChar;
        }
    }
    return mapper;
}



function getMapperConfig(mappings: Mappings, allGroups, tightGroups, sourceFontName, targetFontName) {
    const nameToTargetChar = mappings[targetFontName].characterCodes;
    const nameToSourceChar = mappings[sourceFontName].characterCodes;

    const mapper = getMapper(nameToSourceChar, nameToTargetChar);
    const groupMapper = getGroupMapper(allGroups, nameToSourceChar, nameToTargetChar);
    const mergedMapper = {...groupMapper, ...mapper};

    const maxWidth = 5;

    return {
        mapper: mergedMapper,
        moveLeftChars: [],
        moveRightChars: [],
        maxWidth,
        moveAcrossCharacters: []
    }
}

export function convert({ mappings, sourceFontName, targetFontName, sourceText, allGroups, tightGroups }) {
    const mapper = getMapperConfig(mappings, allGroups, tightGroups, sourceFontName, targetFontName);
    const result = convertStringUsingMapper(mapper, sourceText);
    return result;
}


export function convertStringUsingMapper({mapper, moveRightChars,moveLeftChars, moveAcrossCharacters, maxWidth}, stringToConvert) {

    const output = [];

    let charToAddOnRight = "";
    let charToMoveRightIndex = 0;

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

        if (moveRightChars.indexOf(charToAdd) > -1) {
            if (charToAddOnRight) {
                output.push(charToAddOnRight);
            }
            charToAddOnRight = charToAdd;
            charToMoveRightIndex = 0;
        } else if (charToAddOnRight) {
            if (charToMoveRightIndex < 1) {
                charToMoveRightIndex = 1;
                output.push(charToAdd);
            } else if (moveAcrossCharacters.indexOf(charToAdd) > -1) {
                output.push(charToAdd);
            } else {
                output.push(charToAddOnRight, charToAdd);
                charToAddOnRight = "";
                charToMoveRightIndex = 0;
            }
        } else if (moveLeftChars.indexOf(charToAdd) > -1 && output.length) {
            insertCharOnLeft(output, moveAcrossCharacters, charToAdd, []);
        } else {
            output.push(charToAdd);
        }
    }

    if (charToAddOnRight) {
        output.push(charToAddOnRight);
    }
    return output.join("");

}

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



