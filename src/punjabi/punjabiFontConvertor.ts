import * as Convertor from "../convertor/convertor";
import { mappings as m } from "./mapping"

function findMapping(name) {
    let nameToUse = getNameToUseForMapping(name);
    return m.mappings.filter(m => m.name == nameToUse)[0];
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

var tightGroups = m.tightGroups;
var groups = [... m.tightGroups, m.groups];

function memoize(func) {
    var memo = {};
    var slice = Array.prototype.slice;
  
    return function() {
      var args = slice.call(arguments);
  
      if (args in memo)
        return memo[args];
      else
        return (memo[args] = func.apply(this, args));
  
    }
  }

var getMapper:any = memoize(function getMapper(to:string, from:string){
    return Convertor.getMapper(findMapping(to), findMapping(from), groups, tightGroups);
})

export function convert(str: string, toFontName: string, fromFontName: string) {
    var mapperConfig = getMapper(getNameToUseForMapping(toFontName), getNameToUseForMapping(fromFontName))
    return Convertor.convertStringUsingMapper(mapperConfig, str);
}


