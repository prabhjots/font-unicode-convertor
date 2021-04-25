import * as convertor from "./fontConverter";
import tightGroups from "../src/prabnz/punjabi_font_converter/mappings/tight_groups.json";
import groups from "../src/prabnz/punjabi_font_converter/mappings/groups.json";
import anmol from "../src/prabnz/punjabi_font_converter/mappings/anmol.json";
import asees from "../src/prabnz/punjabi_font_converter/mappings/asees.json";
import awaze from "../src/prabnz/punjabi_font_converter/mappings/awaze.json";
import chatrik from "../src/prabnz/punjabi_font_converter/mappings/chatrik.json";
import joy from "../src/prabnz/punjabi_font_converter/mappings/joy.json";
import satluj from "../src/prabnz/punjabi_font_converter/mappings/satluj.json";
import unicode from "../src/prabnz/punjabi_font_converter/mappings/unicode.json";
import gurbaniLipi from "../src/prabnz/punjabi_font_converter/mappings/gurbani_lipi.json";


const allGroups = [...groups, ...tightGroups]

const mappings: convertor.Mappings = {
    anmol,
    asees,
    awaze,
    chatrik,
    joy,
    satluj,
    unicode,
    gurbaniLipi: {
        ...anmol,
        characterCodes: {
            ...anmol.characterCodes,
            ...gurbaniLipi.characterCodes
        }
    }
}

export function convert(sourceText, sourceFontName, targetFontName) {
    return convertor.convert({
        mappings,
        allGroups,
        tightGroups,
        sourceText,
        sourceFontName,
        targetFontName,
    })
}