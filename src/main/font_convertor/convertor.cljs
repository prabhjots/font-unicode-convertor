(ns font-convertor.convertor
  (:require [font-convertor.punjabi-mappings :refer [mappings groups tight-groups all-groups]]
            [clojure.string]
            ["./convertor" :as js-convertor]))

(defn find-mapping [name]
  (println name)
  (cond 
    (or (= name "Arial Unicode MS") (= name "AnmolUni"))
    (mappings "unicode")

    (= name "AnmolLipi")
    (mappings "anmol")

    (= name "DrChatrikWeb")
    (mappings "chatrik")

    :else 
    (mappings (clojure.string/lower-case name))))


(defn get-mapper [from-font to-font]
  (let [to (find-mapping to-font)
        from (find-mapping from-font)
        from-chars (from "characterCodes")
        mapper (reduce
                (fn [m [key val]]
                  (if-let [from-val (from-chars key)]
                    (assoc m from-val val)
                    m))
                (to "characterCodes")
                {})]
    (println mapper)))


(defn convert [string-to-convert to-font from-font]
  (if-let [mapper (get-mapper from-font to-font)]
    mapper
    ;(js-convertor/convertStringUsingMapper mapper string-to-convert)
    ""))
