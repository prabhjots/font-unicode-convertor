# font-unicode-convertor
Converting unicodes for punjabi

Live demo at https://prabhjots.github.io/font-unicode-convertor/

Test Page at https://prabhjots.github.io/font-unicode-convertor/test/visual.html

## Dev notes

Build

```bash
tsc && npx rollup --config
```

Create Visual Test

```bash
cd test
parcel build visual.html --no-minify --no-source-maps --no-content-hash
```
