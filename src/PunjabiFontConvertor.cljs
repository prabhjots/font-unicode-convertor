(ns PunjabiFontConvertor
  (:require [sikhsiyasat.font-converter.core :as converter]))
(defn ^:export convert [text target-font source-font]
  (converter/convert {:source-text text 
                                     :target-font target-font 
                                     :source-font source-font}))
