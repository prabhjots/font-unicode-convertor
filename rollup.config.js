import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";

export default {
    input: "src/punjabiFontConvertor.ts",
    output: {
        file: "dist/convertor.js",
        format: "umd",
        name: "PunjabiFontConvertor"
    },
    plugins: [
        json({
            include: "src/mappings/*.json",
            preferConst: false,
            compact: true,
            namedExports: false
        }),
        typescript()
    ]
};


