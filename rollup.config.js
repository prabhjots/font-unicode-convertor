import typescript from "rollup-plugin-typescript";
import json from "rollup-plugin-json";

export default {
    input: "src/punjabiFontConvertor.ts",
    output: {
        file: "dist/convertor.js",
        format: "umd",
        name: "PunjabiFontConvertor"
    },
    plugins: [
         json({
             include: "src/punjabiMapping.json",
             preferConst: false, 
              compact: true, 
          }),
        typescript({
            "resolveJsonModule": true,
            "esModuleInterop": true,
            "moduleResolution": "node"
        })
    ]
};


