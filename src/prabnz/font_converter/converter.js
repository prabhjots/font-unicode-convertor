export function convertStringUsingMapper(config, stringToConvert) {
    const maxWidth = config["max-width"];
    const mapper = config["mapper"];
    const moveRightChars = config["move-right-chars"];
    const moveAcrossCharacters = config["move-across-chars"];
    const moveLeftChars = config["move-left-chars"]

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
