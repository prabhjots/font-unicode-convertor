interface IMapperConfig {
    mapper: {
        [key: string]: string;
    };
    maxWidth: number
    moveLeftChars: string[];
    moveRightChars: string[];
    moveAcrossCharacters: string[];
}

interface IMapping {
    characterCodes: IChars;
    moveRightCharacters: string[];
    moveRightAcrossCharacterSet?: string[];
}

interface IChars {
    [key: string]: string
}