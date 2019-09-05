import typescript from "rollup-plugin-typescript";
import json from "rollup-plugin-json";

export default {
    input: "src/punjabi/punjabiFontConvertor.ts",
    output: {
        file: "dist/convertor.js",
        format: "umd",
        name: "PunjabiFontConvertor"
    },
    plugins: [
        json({
            include: "src/punjabi/mapping.json",
            preferConst: false, 
            compact: true, 
        }),
        typescript()
    ]
};


