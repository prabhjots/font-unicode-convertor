//@ts-check
import * as Convertor from "./convertor";
import { mappings, tightGroups, groups } from "./mappings/punjabiMappings"

/**
 * @param {IMapping} name
 * @returns {IMapping} 
 */
function findMapping(name) {
    const nameToUse = getNameToUseForMapping(name);
    return mappings.filter(m => m.name == nameToUse)[0];
}

function getNameToUseForMapping(name) {
    switch (name) {
        case "Arial Unicode MS":
        case "AnmolUni":
            return "unicode";
        case "AnmolLipi":
            return "anmol";
        case "DrChatrikWeb": return "chatrik";

        default:
            return name && name.toLowerCase();
    }
}

const allGroups = tightGroups.concat(groups);


function memoize(func) {
    const memo = {};
    const slice = Array.prototype.slice;

    /** @type {any} */
    let memoized;

    memoized = function () {
        const args = slice.call(arguments);

        if (args in memo)
            return memo[args];
        else
            return (memo[args] = func.apply(null, args));

    };

    return memoized;
}

const getMapper = memoize(function getMapper(/**@type {String} */toFontName, /**@type {String} */fromFontName) {
    const to = findMapping(toFontName);
    if (!to) {
        console.error("Could not find mapping for", toFontName)
        return
    }
    const from = findMapping(fromFontName);
    if (!from) {
        console.error("Could not find mapping for", fromFontName)
        return
    }
    return Convertor.getMapper(to, from, allGroups, tightGroups);
})

/**
 * 
 * @param {string} str 
 * @param {string} toFontName 
 * @param {string} fromFontName 
 */
export function convert(str, toFontName, fromFontName) {
    const mapperConfig = getMapper(getNameToUseForMapping(toFontName), getNameToUseForMapping(fromFontName))
    if (!mapperConfig) {
        return ""
    }
    return Convertor.convertStringUsingMapper(mapperConfig, str);
}


