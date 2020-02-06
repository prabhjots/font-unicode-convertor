(ns font-convertor.app
  (:require [font-convertor.convertor :as convertor]))

(defn init []
  (println (convertor/convert "AA" "unicode" "anmol")))
