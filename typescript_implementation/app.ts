import { convert } from "./punjabiFontConverter"

const $sourceFontName = <HTMLSelectElement>document.getElementById("sourceFontName")!;
const $targetFontName = <HTMLSelectElement>document.getElementById("targetFontName")!;
const $sourceText = <HTMLTextAreaElement>document.getElementById("sourceText")!;
const $targetText = <HTMLTextAreaElement>document.getElementById("targetText")!;

function setTarget() {
  $targetText.value = convert($sourceText.value, $sourceFontName.value, $targetFontName.value)
}


$sourceFontName.onchange = setTarget
$targetFontName.onchange = setTarget
$sourceText.onchange = setTarget
$sourceText.onkeyup = setTarget