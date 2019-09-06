import * as Convertor from "./convertor";
import {mappings, tightGroups, groups } from "./punjabiMapping.json"
export var punjabiMapping = {mappings, tightGroups, groups };

function findMapping(name: string) {
    let nameToUse = getNameToUseForMapping(name);
    return mappings.filter(m => m.name == nameToUse)[0];
}

function getNameToUseForMapping(name: string) {
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

var allGroups = tightGroups.concat(groups);

function memoize<T extends Function>(func: T) {
    var memo: any = {};
    var slice = Array.prototype.slice;

    return function () {
        var args: any = slice.call(arguments);

        if (args in memo)
            return memo[args];
        else
            return (memo[args] = func.apply(null, args));

    }
}

var getMapper: any = memoize(function getMapper(to: string, from: string) {
    return Convertor.getMapper(findMapping(to), findMapping(from), allGroups, tightGroups);
})

export function convert(str: string, toFontName: string, fromFontName: string) {
    var mapperConfig = getMapper(getNameToUseForMapping(toFontName), getNameToUseForMapping(fromFontName))
    return Convertor.convertStringUsingMapper(mapperConfig, str);
}


