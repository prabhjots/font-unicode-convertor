(ns PunjabiFontConvertor
  (:require [font-convertor.convertor]))
(defn ^:export convert [text target-font source-font]
  (font-convertor.convertor/convert {:source-text text 
                                     :target-font target-font 
                                     :source-font source-font}))
