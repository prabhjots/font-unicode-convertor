(ns sikhsiyasat.font-converter.core
  (:require [clojure.string]
            [clojure.set :refer [difference]]
            ["./converter" :as js-converter]))

(defn- get-matching-chars [name-groups name->char]
  (->> name-groups
       (map (fn [names]
              (let [chars (into [] (map (fn [m] (name->char m)) names))]
                (if (some nil? chars)
                  ""
                  (clojure.string/join "" chars)))))
       (filter seq)))

(defn- get-group-mapper [groups name->source-char name->target-char]
  (let [groups (for [sub-group   groups
                     target-char (take 1 (get-matching-chars sub-group name->target-char))
                     source-char (get-matching-chars sub-group name->source-char)]
                 (when (or (= (count target-char) 1) (= (count source-char) 1))
                   [source-char target-char]))]
    (into {} groups)))

(defn- get-mapper [name->source-char name->target-char]
  (reduce
   (fn [m [name target-char]]
     (if-let [source-val (name->source-char name)]
       (assoc m source-val target-char)
       m))
   {}
   name->target-char))

(defn- get-mapper-config [mappings all-groups tight-groups source-font-name target-font-name]
  (let [target-font             (mappings target-font-name)
        name->target-char       (target-font "characterCodes")
        source-font             (mappings source-font-name)
        name->source-char       (source-font "characterCodes")

        mapper                  (get-mapper name->source-char name->target-char)

        group-mapper            (get-group-mapper all-groups name->source-char name->target-char)
        merged-mapper           (merge-with (fn [a _b] a) mapper group-mapper)

        target-move-right-chars (set (map #(name->target-char %1) (target-font "moveRightCharacters")))
        source-move-right-chars (set (map #(name->target-char %1) (source-font "moveRightCharacters")))
        move-left-chars         (difference source-move-right-chars target-move-right-chars)
        move-right-chars        (difference target-move-right-chars source-move-right-chars)
        move-across-chars       (set (for [sub-group tight-groups
                                           char      (get-matching-chars sub-group name->target-char)]
                                       char))

        max-width-key           (apply max-key count (keys group-mapper))
        max-width               (if max-width-key (count max-width-key) 1)]
    (clj->js {:mapper            merged-mapper
              :move-left-chars   move-left-chars
              :move-right-chars  move-right-chars
              :max-width         max-width
              :move-across-chars move-across-chars})))

(def get-mapper-config-memo (memoize get-mapper-config))

(defn ^:export convert [{:keys [source-text source-font target-font mappings all-groups tight-groups]}]
  (if-let [mapper (get-mapper-config-memo mappings all-groups tight-groups source-font target-font)]
    (js-converter/convertStringUsingMapper mapper source-text)
    ""))




