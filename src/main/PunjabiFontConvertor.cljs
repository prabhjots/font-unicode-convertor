(ns PunjabiFontConvertor
  (:require [font-convertor.convertor]))
(defn ^:export convert [text target-font source-font]
  (font-convertor.convertor/convert text target-font source-font))