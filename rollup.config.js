import typescript from 'rollup-plugin-typescript';
export default {
    input: 'src/punjabi/punjabiFontConvertor.ts',
    output: {
        file: 'dist/convertor.js',
        format: 'umd',
        name: "PunjabiFontConvertor"
    },
    plugins: [
        typescript()
      ]
};


