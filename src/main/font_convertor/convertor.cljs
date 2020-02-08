(ns font-convertor.convertor
  (:require [font-convertor.punjabi-mappings :as p-mappings]
            [clojure.string]
            [clojure.set :refer [difference]]
            ["./convertor" :as js-convertor]))

(defn mapping-name [name]
  (case name
    "Arial Unicode MS" "unicode"
    "AnmolUni"         "unicode"
    "AnmolLipi"        "anmol"
    "DrChatrikWeb"     "chatrik"
    (clojure.string/lower-case name)))

(defn find-mapping [name]
  (p-mappings/mappings (mapping-name name)))

(defn get-matching-chars [name-groups name->char]
  (->> name-groups
       (map (fn [names]
              (let [chars (into [] (map (fn [m] (name->char m)) names))]
                (if (some nil? chars)
                  ""
                  (clojure.string/join "" chars)))))
       (filter seq)))

(defn get-group-mapper [groups name->source-char name->target-char]
  (let [groups (for [sub-group   groups
                     target-char (take 1 (get-matching-chars sub-group name->target-char))
                     source-char (get-matching-chars sub-group name->source-char)]
                 [source-char target-char])]
    (into {} groups)))

(defn get-mapper [name->source-char name->target-char]
  (reduce
   (fn [m [name target-char]]
     (if-let [source-val (name->source-char name)]
       (assoc m source-val target-char)
       m))
   {}
   name->target-char))

(defn get-mapper-config [source-font-name target-font-name]
  (let [target-font             (find-mapping target-font-name)
        name->target-char       (target-font "characterCodes")
        source-font             (find-mapping source-font-name)
        name->source-char       (source-font "characterCodes")

        mapper                  (reduce
                                 (fn [m [name target-char]]
                                   (if-let [source-val (name->source-char name)]
                                     (assoc m source-val target-char)
                                     m))
                                 {}
                                 name->target-char)

        group-mapper            (get-group-mapper p-mappings/all-groups name->source-char name->target-char)
        merged-mapper           (merge mapper group-mapper)

        target-move-right-chars (set (map #(name->target-char %1) (target-font "moveRightCharacters")))
        source-move-right-chars (set (map #(name->target-char %1) (source-font "moveRightCharacters")))
        move-left-chars         (difference source-move-right-chars target-move-right-chars)
        move-right-chars        (difference target-move-right-chars source-move-right-chars)
        move-across-chars       (set (for [sub-group p-mappings/tight-groups
                                           char      (get-matching-chars sub-group name->source-char)]
                                       char))

        max-width-key           (apply max-key count (keys group-mapper))
        max-width               (if max-width-key (count max-width-key) 1)]
    (clj->js {:mapper            merged-mapper
              :move-left-chars   move-left-chars
              :move-right-chars  move-right-chars
              :max-width         max-width
              :move-across-chars move-across-chars})))

(def get-mapper-config-memo (memoize get-mapper-config))

(defn ^:export convert [text target-font source-font]
  (println text target-font source-font)
  (if-let [mapper (get-mapper-config-memo source-font target-font)]
    (js-convertor/convertStringUsingMapper mapper text)
    ""))


; following is for backward compatibility


(ns PunjabiFontConvertor
  (:require [font-convertor.convertor]))
(defn ^:export convert [text target-font source-font]
  (font-convertor.convertor/convert text target-font source-font))

