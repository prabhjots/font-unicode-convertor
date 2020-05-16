(ns prabnz.font-converter.converter-test
  (:require [clojure.test :refer [is deftest]]
            [prabnz.font-converter.core :as c]))

(defn anmol-unicode [a b]
  (let [converted (c/convert {:source-text a
                              :target-font "unicode"
                              :source-font "anmol"})]
    (is (= converted b))
    (is (= (seq converted) (seq b)))))

(deftest anmol->unicode
  (anmol-unicode "(AprySn)" "(ਅਪਰੇਸ਼ਨ)")
  (anmol-unicode "(tIm)" "(ਟੀਮ)")
  (anmol-unicode "(bIbI" "(ਬੀਬੀ")
  (anmol-unicode "." ".")
  (anmol-unicode "[" "।")
  (anmol-unicode "AglI" "ਅਗਲੀ")
  (anmol-unicode "AgvweI" "ਅਗਵਾਈ")
  (anmol-unicode "Aqy" "ਅਤੇ")
  (anmol-unicode "Adwlq" "ਅਦਾਲਤ")
  (anmol-unicode "Anumwn" "ਅਨੁਮਾਨ")
  (anmol-unicode "ArjI" "ਅਰਜੀ")
  (anmol-unicode "AMkVy" "ਅੰਕੜੇ")
  (anmol-unicode "AMSk" "ਅੰਸ਼ਕ")
  (anmol-unicode "AwieAw" "ਆਇਆ")
  (anmol-unicode "AweI" "ਆਈ")
  (anmol-unicode "AweI.jI." "ਆਈ.ਜੀ.")
  (anmol-unicode "AweIAW" "ਆਈਆਂ")
  (anmol-unicode "Awey" "ਆਏ")
  (anmol-unicode "AwpxI" "ਆਪਣੀ")
  (anmol-unicode "Awpxy" "ਆਪਣੇ")
  (anmol-unicode "iek" "ਇਕ")
  (anmol-unicode "iejwzq" "ਇਜਾਜ਼ਤ")
  (anmol-unicode "ienHW" "ਇਨ੍ਹਾਂ")
  (anmol-unicode "ies" "ਇਸ")
  (anmol-unicode "iesy" "ਇਸੇ")
  (anmol-unicode "ieh" "ਇਹ")
  (anmol-unicode "iehI" "ਇਹੀ")
  (anmol-unicode "ieMny" "ਇੰਨੇ")
  (anmol-unicode "ie~Qy" "ਇੱਥੇ")
  (anmol-unicode "aukq" "ਉਕਤ")
  (anmol-unicode "aunHW" "ਉਨ੍ਹਾਂ")
  (anmol-unicode "aus" "ਉਸ")
  (anmol-unicode "ausdy" "ਉਸਦੇ")
  (anmol-unicode "auh" "ਉਹ")
  (anmol-unicode "au~c" "ਉੱਚ")
  (anmol-unicode "au~c-Adwlq" "ਉੱਚ-ਅਦਾਲਤ")
  (anmol-unicode "au~qy" "ਉੱਤੇ")
  (anmol-unicode "eykV" "ਏਕੜ")
  (anmol-unicode "AYs.pI." "ਐਸ.ਪੀ.")
  (anmol-unicode "EQy" "ਓਥੇ")
  (anmol-unicode "keI" "ਕਈ")
  (anmol-unicode "kqlW" "ਕਤਲਾਂ")
  (anmol-unicode "kr" "ਕਰ")
  (anmol-unicode "krky" "ਕਰਕੇ")
  (anmol-unicode "krdy" "ਕਰਦੇ")
  (anmol-unicode "krn" "ਕਰਨ")
  (anmol-unicode "krvwieAw" "ਕਰਵਾਇਆ")
  (anmol-unicode "krvwaux" "ਕਰਵਾਉਣ")
  (anmol-unicode "kwrn" "ਕਾਰਨ")
  (anmol-unicode "kwrvweI" "ਕਾਰਵਾਈ")
  (anmol-unicode "kwrsyvw" "ਕਾਰਸੇਵਾ")
  (anmol-unicode "ik" "ਕਿ")
  (anmol-unicode "ikswn" "ਕਿਸਾਨ")
  (anmol-unicode "ikhw" "ਕਿਹਾ")
  (anmol-unicode "kIqw" "ਕੀਤਾ")
  (anmol-unicode "kIqI" "ਕੀਤੀ")
  (anmol-unicode "ku~l" "ਕੁੱਲ")
  (anmol-unicode "ky" "ਕੇ")
  (anmol-unicode "kyNdr" "ਕੇਂਦਰ")
  (anmol-unicode "kyNdrI" "ਕੇਂਦਰੀ")
  (anmol-unicode "kort" "ਕੋਰਟ")
  (anmol-unicode "kol" "ਕੋਲ")
  (anmol-unicode "koloN" "ਕੋਲੋਂ")
  (anmol-unicode "koiSS" "ਕੋਸ਼ਿਸ਼")
  (anmol-unicode "kOr" "ਕੌਰ")
  (anmol-unicode "kOr," "ਕੌਰ,")
  (anmol-unicode "k~cy" "ਕੱਚੇ")
  (anmol-unicode "KbrKwny" "ਖਬਰਖਾਨੇ")
  (anmol-unicode "KbrW" "ਖਬਰਾਂ")
  (anmol-unicode "Krwb" "ਖਰਾਬ")
  (anmol-unicode "Kws" "ਖਾਸ")
  (anmol-unicode "KUbI" "ਖੂਬੀ")
  (anmol-unicode "geI" "ਗਈ")
  (anmol-unicode "gey" "ਗਏ")
  (anmol-unicode "gvwhW" "ਗਵਾਹਾਂ")
  (anmol-unicode "gvwhIAW" "ਗਵਾਹੀਆਂ")
  (anmol-unicode "igAw" "ਗਿਆ")
  (anmol-unicode "igxqI" "ਗਿਣਤੀ")
  (anmol-unicode "gurmIq" "ਗੁਰਮੀਤ")
  (anmol-unicode "gYr-kwƒnI" "ਗੈਰ-ਕਾਨੂੰਨੀ")
  (anmol-unicode "gYrkwƒnI" "ਗੈਰਕਾਨੂੰਨੀ")
  (anmol-unicode "g~l" "ਗੱਲ")
  (anmol-unicode "Gr" "ਘਰ")
  (anmol-unicode "Grw" "ਘਰਾ")
  (anmol-unicode "GrW" "ਘਰਾਂ")
  (anmol-unicode "c" "ਚ")
  (anmol-unicode "crn" "ਚਰਨ")
  (anmol-unicode "cu~k" "ਚੁੱਕ")
  (anmol-unicode "cu~ky" "ਚੁੱਕੇ")
  (anmol-unicode "cMfIgVH:" "ਚੰਡੀਗੜ੍ਹ:")
  (anmol-unicode "c~l" "ਚੱਲ")
  (anmol-unicode "CwpymwrI" "ਛਾਪੇਮਾਰੀ")
  (anmol-unicode "Cy" "ਛੇ")
  (anmol-unicode "jdoNik" "ਜਦੋਂਕਿ")
  (anmol-unicode "jvwb" "ਜਵਾਬ")
  (anmol-unicode "jw" "ਜਾ")
  (anmol-unicode "jW" "ਜਾਂ")
  (anmol-unicode "jWc" "ਜਾਂਚ")
  (anmol-unicode "jwiezw" "ਜਾਇਜ਼ਾ")
  (anmol-unicode "jwx" "ਜਾਣ")
  (anmol-unicode "jwxkwrI" "ਜਾਣਕਾਰੀ")
  (anmol-unicode "jwn" "ਜਾਨ")
  (anmol-unicode "jwvy" "ਜਾਵੇ")
  (anmol-unicode "jwvy[" "ਜਾਵੇ।")
  (anmol-unicode "ijlHy" "ਜਿਲ੍ਹੇ")
  (anmol-unicode "ijs" "ਜਿਸ")
  (anmol-unicode "ij~Qy" "ਜਿੱਥੇ")
  (anmol-unicode "jIAW" "ਜੀਆਂ")
  (anmol-unicode "juVy" "ਜੁੜੇ")
  (anmol-unicode "jo" "ਜੋ")
  (anmol-unicode "Jony" "ਝੋਨੇ")
  (anmol-unicode "tu~ty;" "ਟੁੱਟੇ;")
  (anmol-unicode "tolI" "ਟੋਲੀ")
  (anmol-unicode "TwixAW" "ਠਾਣਿਆਂ")
  (anmol-unicode "fyNgU" "ਡੇਂਗੂ")
  (anmol-unicode "fygU" "ਡੇਗੂ")
  (anmol-unicode "qbwh" "ਤਬਾਹ")
  (anmol-unicode "qbwhI" "ਤਬਾਹੀ")
  (anmol-unicode "qrn" "ਤਰਨ")
  (anmol-unicode "qrHW" "ਤਰ੍ਹਾਂ")
  (anmol-unicode "qS~dd" "ਤਸ਼ੱਦਦ")
  (anmol-unicode "qW" "ਤਾਂ")
  (anmol-unicode "qwrn" "ਤਾਰਨ")
  (anmol-unicode "iqMn" "ਤਿੰਨ")
  (anmol-unicode "qy" "ਤੇ")
  (anmol-unicode "qoN" "ਤੋਂ")
  (anmol-unicode "qOr" "ਤੌਰ")
  (anmol-unicode "q~k" "ਤੱਕ")
  (anmol-unicode "QwvW" "ਥਾਵਾਂ")
  (anmol-unicode "dbwA" "ਦਬਾਅ")
  (anmol-unicode "dirAw" "ਦਰਿਆ")
  (anmol-unicode "dirAwvW" "ਦਰਿਆਵਾਂ")
  (anmol-unicode "dsqy" "ਦਸਤੇ")
  (anmol-unicode "dw" "ਦਾ")
  (anmol-unicode "dwAvw" "ਦਾਅਵਾ")
  (anmol-unicode "dwKl" "ਦਾਖਲ")
  (anmol-unicode "idnW" "ਦਿਨਾਂ")
  (anmol-unicode "idnIN" "ਦਿਨੀਂ")
  (anmol-unicode "id~qw" "ਦਿੱਤਾ")
  (anmol-unicode "id~qI" "ਦਿੱਤੀ")
  (anmol-unicode "dI" "ਦੀ")
  (anmol-unicode "dy" "ਦੇ")
  (anmol-unicode "dyx" "ਦੇਣ")
  (anmol-unicode "dOrwn" "ਦੌਰਾਨ")
  (anmol-unicode "idRS[" "ਦਿ੍ਰਸ਼।")
  (anmol-unicode "d~sxXog" "ਦੱਸਣਯੋਗ")
  (anmol-unicode "d~isAw" "ਦੱਸਿਆ")
  (anmol-unicode "d~sI" "ਦੱਸੀ")
  (anmol-unicode "njdIkI" "ਨਜਦੀਕੀ")
  (anmol-unicode "ndI" "ਨਦੀ")
  (anmol-unicode "nSr" "ਨਸ਼ਰ")
  (anmol-unicode "nw" "ਨਾ")
  (anmol-unicode "nW" "ਨਾਂ")
  (anmol-unicode "nwl" "ਨਾਲ")
  (anmol-unicode "nukswn" "ਨੁਕਸਾਨ")
  (anmol-unicode "nukswn;" "ਨੁਕਸਾਨ;")
  (anmol-unicode "nukswny" "ਨੁਕਸਾਨੇ")
  (anmol-unicode "ƒ" "ਨੂੰ")
  (anmol-unicode "ny" "ਨੇ")
  (anmol-unicode "peI" "ਪਈ")
  (anmol-unicode "pey" "ਪਏ")
  (anmol-unicode "pqI" "ਪਤੀ")
  (anmol-unicode "pr" "ਪਰ")
  (anmol-unicode "prvwr" "ਪਰਵਾਰ")
  (anmol-unicode "prvwrk" "ਪਰਵਾਰਕ")
  (anmol-unicode "pSU" "ਪਸ਼ੂ")
  (anmol-unicode "pSUAW" "ਪਸ਼ੂਆਂ")
  (anmol-unicode "phuMc" "ਪਹੁੰਚ")
  (anmol-unicode "pwxI" "ਪਾਣੀ")
  (anmol-unicode "pwV" "ਪਾੜ")
  (anmol-unicode "ipMf" "ਪਿੰਡ")
  (anmol-unicode "puAwD" "ਪੁਆਧ")
  (anmol-unicode "puils" "ਪੁਲਿਸ")
  (anmol-unicode "pu~qr" "ਪੁੱਤਰ")
  (anmol-unicode "pu~qr)" "ਪੁੱਤਰ)")
  (anmol-unicode "pUrI" "ਪੂਰੀ")
  (anmol-unicode "pMjwb" "ਪੰਜਾਬ")
  (anmol-unicode "p~ky" "ਪੱਕੇ")
  (anmol-unicode "PirAwd" "ਫਰਿਆਦ")
  (anmol-unicode "Psl" "ਫਸਲ")
  (anmol-unicode "PslW" "ਫਸਲਾਂ")
  (anmol-unicode "PYsly" "ਫੈਸਲੇ")
  (anmol-unicode "bxwieAw" "ਬਣਾਇਆ")
  (anmol-unicode "bxwaux" "ਬਣਾਉਣ")
  (anmol-unicode "bdly" "ਬਦਲੇ")
  (anmol-unicode "brswqI" "ਬਰਸਾਤੀ")
  (anmol-unicode "bwAd" "ਬਾਅਦ")
  (anmol-unicode "bwbw" "ਬਾਬਾ")
  (anmol-unicode "ibAwn" "ਬਿਆਨ")
  (anmol-unicode "ibaUro" "ਬਿਊਰੋ")
  (anmol-unicode "bIqy" "ਬੀਤੇ")
  (anmol-unicode "bIbI" "ਬੀਬੀ")
  (anmol-unicode "burI" "ਬੁਰੀ")
  (anmol-unicode "bu~dkI" "ਬੁੱਦਕੀ")
  (anmol-unicode "bMd" "ਬੰਦ")
  (anmol-unicode "bMnH" "ਬੰਨ੍ਹ")
  (anmol-unicode "BrwvW," "ਭਰਾਵਾਂ,")
  (anmol-unicode "BWrI" "ਭਾਂਰੀ")
  (anmol-unicode "Bwjpw" "ਭਾਜਪਾ")
  (anmol-unicode "BwrqI" "ਭਾਰਤੀ")
  (anmol-unicode "BwvyN" "ਭਾਵੇਂ")
  (anmol-unicode "Byj" "ਭੇਜ")
  (anmol-unicode "mrn" "ਮਰਨ")
  (anmol-unicode "mry;" "ਮਰੇ;")
  (anmol-unicode "mwmilAW" "ਮਾਮਲਿਆਂ")
  (anmol-unicode "mwmly" "ਮਾਮਲੇ")
  (anmol-unicode "mwr" "ਮਾਰ")
  (anmol-unicode "mwrc" "ਮਾਰਚ")
  (anmol-unicode "imldy" "ਮਿਲਦੇ")
  (anmol-unicode "muAvzw" "ਮੁਅਵਜ਼ਾ")
  (anmol-unicode "mukdmyN" "ਮੁਕਦਮੇਂ")
  (anmol-unicode "mukMml" "ਮੁਕੰਮਲ")
  (anmol-unicode "mujrm" "ਮੁਜਰਮ")
  (anmol-unicode "muqwbk" "ਮੁਤਾਬਕ")
  (anmol-unicode "muhwlI" "ਮੁਹਾਲੀ")
  (anmol-unicode "muzrm" "ਮੁਜ਼ਰਮ")
  (anmol-unicode "mOq" "ਮੌਤ")
  (anmol-unicode "rkby" "ਰਕਬੇ")
  (anmol-unicode "rhI" "ਰਹੀ")
  (anmol-unicode "rhy" "ਰਹੇ")
  (anmol-unicode "rwm" "ਰਾਮ")
  (anmol-unicode "rwhIN" "ਰਾਹੀਂ")
  (anmol-unicode "irSqydwr" "ਰਿਸ਼ਤੇਦਾਰ")
  (anmol-unicode "irSqydwrW" "ਰਿਸ਼ਤੇਦਾਰਾਂ")
  (anmol-unicode "irhw" "ਰਿਹਾ")
  (anmol-unicode "rok" "ਰੋਕ")
  (anmol-unicode "ropV" "ਰੋਪੜ")
  (anmol-unicode "r~Kx" "ਰੱਖਣ")
  (anmol-unicode "r~Ky" "ਰੱਖੇ")
  (anmol-unicode "r~d" "ਰੱਦ")
  (anmol-unicode "leI" "ਲਈ")
  (anmol-unicode "llcwaux" "ਲਲਚਾਉਣ")
  (anmol-unicode "lweI" "ਲਾਈ")
  (anmol-unicode "lwey" "ਲਾਏ")
  (anmol-unicode "ilAw" "ਲਿਆ")
  (anmol-unicode "iliKAw" "ਲਿਖਿਆ")
  (anmol-unicode "lY" "ਲੈ")
  (anmol-unicode "l~K" "ਲੱਖ")
  (anmol-unicode "vwly" "ਵਾਲੇ")
  (anmol-unicode "ivc" "ਵਿਚ")
  (anmol-unicode "ivcly" "ਵਿਚਲੇ")
  (anmol-unicode "ivcoN" "ਵਿਚੋਂ")
  (anmol-unicode "ividAwrQI" "ਵਿਦਿਆਰਥੀ")
  (anmol-unicode "iv~c" "ਵਿੱਚ")
  (anmol-unicode "vI" "ਵੀ")
  (anmol-unicode "vyKdw" "ਵੇਖਦਾ")
  (anmol-unicode "vyly" "ਵੇਲੇ")
  (anmol-unicode "vVy" "ਵੜੇ")
  (anmol-unicode "v~fI" "ਵੱਡੀ")
  (anmol-unicode "v~D" "ਵੱਧ")
  (anmol-unicode "v~loN" "ਵੱਲੋਂ")
  (anmol-unicode "ShId" "ਸ਼ਹੀਦ")
  (anmol-unicode "Swml" "ਸ਼ਾਮਲ")
  (anmol-unicode "iSkwieqkrqw" "ਸ਼ਿਕਾਇਤਕਰਤਾ")
  (anmol-unicode "stwP" "ਸਟਾਫ")
  (anmol-unicode "sqluj" "ਸਤਲੁਜ")
  (anmol-unicode "sn" "ਸਨ")
  (anmol-unicode "sn[" "ਸਨ।")
  (anmol-unicode "smyq" "ਸਮੇਤ")
  (anmol-unicode "srkwr" "ਸਰਕਾਰ")
  (anmol-unicode "swbq" "ਸਾਬਤ")
  (anmol-unicode "swl" "ਸਾਲ")
  (anmol-unicode "swlW" "ਸਾਲਾਂ")
  (anmol-unicode "swhmxy" "ਸਾਹਮਣੇ")
  (anmol-unicode "isAwsq" "ਸਿਆਸਤ")
  (anmol-unicode "isMG" "ਸਿੰਘ")
  (anmol-unicode "isMG," "ਸਿੰਘ,")
  (anmol-unicode "is~K" "ਸਿੱਖ")
  (anmol-unicode "sI" "ਸੀ")
  (anmol-unicode "sI," "ਸੀ,")
  (anmol-unicode "sI.AweI.ey." "ਸੀ.ਆਈ.ਏ.")
  (anmol-unicode "sI.Awr.pI." "ਸੀ.ਆਰ.ਪੀ.")
  (anmol-unicode "sI.bI.AweI" "ਸੀ.ਬੀ.ਆਈ")
  (anmol-unicode "sI.bI.AweI." "ਸੀ.ਬੀ.ਆਈ.")
  (anmol-unicode "sI[" "ਸੀ।")
  (anmol-unicode "suDweI" "ਸੁਧਾਈ")
  (anmol-unicode "suprIm" "ਸੁਪਰੀਮ")
  (anmol-unicode "sUbw" "ਸੂਬਾ")
  (anmol-unicode "syvwmukq" "ਸੇਵਾਮੁਕਤ")
  (anmol-unicode "sONpI" "ਸੌਂਪੀ")
  (anmol-unicode "hn" "ਹਨ")
  (anmol-unicode "hn[" "ਹਨ।")
  (anmol-unicode "hirAwxw" "ਹਰਿਆਣਾ")
  (anmol-unicode "hronW" "ਹਰੋਨਾਂ")
  (anmol-unicode "ihq" "ਹਿਤ")
  (anmol-unicode "ihrwsq" "ਹਿਰਾਸਤ")
  (anmol-unicode "hI" "ਹੀ")
  (anmol-unicode "hux" "ਹੁਣ")
  (anmol-unicode "hyT" "ਹੇਠ")
  (anmol-unicode "hY" "ਹੈ")
  (anmol-unicode "hY," "ਹੈ,")
  (anmol-unicode "hY[" "ਹੈ।")
  (anmol-unicode "ho" "ਹੋ")
  (anmol-unicode "hoieAw" "ਹੋਇਆ")
  (anmol-unicode "hoeI" "ਹੋਈ")
  (anmol-unicode "hoey" "ਹੋਏ")
  (anmol-unicode "hox" "ਹੋਣ")
  (anmol-unicode "hor" "ਹੋਰ")
  (anmol-unicode "hornW" "ਹੋਰਨਾਂ")
  (anmol-unicode "hovygI[" "ਹੋਵੇਗੀ।")
  (anmol-unicode "hzwr" "ਹਜ਼ਾਰ")
  (anmol-unicode "hVW" "ਹੜਾਂ")
  (anmol-unicode "hVH" "ਹੜ੍ਹ")
  (anmol-unicode "hVH:" "ਹੜ੍ਹ:")
  (anmol-unicode "izkrXog" "ਜ਼ਿਕਰਯੋਗ"))






