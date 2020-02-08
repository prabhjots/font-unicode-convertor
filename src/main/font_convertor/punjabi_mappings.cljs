(ns font-convertor.punjabi-mappings
  (:require [shadow.resource :as rc]
            [clojure.string]))

(defn read-str [s]
  (js->clj (js/JSON.parse s)))

(def tight-groups (read-str (rc/inline "./mappings/tight_groups.json")))

(def groups       (read-str (rc/inline "./mappings/groups.json")))

(def all-groups (concat groups tight-groups))

(def mappings {"anmol" (read-str (rc/inline "./mappings/anmol.json"))
                "asees" (read-str (rc/inline "./mappings/asees.json"))
                "awaze" (read-str (rc/inline "./mappings/awaze.json"))
                "chatrik" (read-str (rc/inline "./mappings/chatrik.json"))
                "joy" (read-str (rc/inline "./mappings/joy.json"))
                "satluj" (read-str (rc/inline "./mappings/satluj.json"))
                "unicode" (read-str (rc/inline "./mappings/unicode.json"))})





