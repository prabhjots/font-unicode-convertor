(ns prabnz.punjabi-font-converter.app
  (:require [prabnz.punjabi-font-converter.core :as converter]
            [reagent.core :as reagent]
            [reagent.dom :as rdom]))

(defn set-localstorage-item!
  "Set `key' in browser's localStorage to `val`."
  [key val]
  (.setItem (.-localStorage js/window) key val))

(defn get-localstorage-item
  "Returns value of `key' from browser's localStorage."
  [key]
  (.getItem (.-localStorage js/window) key))

(defonce data-atom (reagent/atom {:source-font (or (get-localstorage-item :source-font) "anmol")
                                  :target-font (or (get-localstorage-item :target-font) "unicode")
                                  :source-text ""
                                  :target-text ""
                                  :target-text-manually-changed false}))

(defn- convert-text [data]
  (assoc data :target-text (converter/convert data)))

(defn- dispatch [[type key value]]
  (case type
    :change
    (let [target-text-manually-changed  (= key :target-text)
          data                          (-> @data-atom
                                            (assoc key value
                                                   :target-text-manually-changed target-text-manually-changed))

          converted-data                (if target-text-manually-changed
                                          data
                                          (convert-text data))]
      (when (or (= key :source-font) (= key :target-font))
        (set-localstorage-item! key value))
      (reset! data-atom converted-data))))


(def fonts [{:key "anmol"       :font-family "AnmolLipi"        :text "Anmol"}
            {:key "unicode"     :font-family "AnmolUni, Arial Unicode MS" :text "Unicode"}
            {:key "chatrik"     :font-family "DrChatrikWeb"     :text "Dr Chatrik"}
            {:key "awaze"       :font-family "Awaze"            :text "Awaze"}
            {:key "satluj"      :font-family "Satluj"           :text "Satluj"}
            {:key "asees"       :font-family "Asees"            :text "Asees"}
            {:key "joy"         :font-family "Joy"              :text "Joy"}
            {:key "gurbanilipi" :font-family "GurbaniLipi"      :text "Gurbani Lipi"}])

(def font-family (->> fonts
                      (map (fn [font] [(:key font) (:font-family font)]))
                      (into {})))

(defn- root []
  (let [data           @data-atom
        source-font    (:source-font data)
        target-font    (:target-font data)
        source-text    (:source-text data)
        target-text    (:target-text data)
        target-text-manually-changed (:target-text-manually-changed data)
        debug          (:debug data)]
    [:<>
     [:h1 {:on-click (fn [_e] (dispatch [:change :debug (not debug)]))}
      "Punjabi Font Converter"]
     [:div.font-selector
      [:select {:on-change (fn [e] (dispatch [:change :source-font (.-value (.-target e))]))
                :value     source-font}
       (for [opt fonts]
         [:option {:key (:key opt) :value (:key opt)} (:text opt)])]
      "to"
      [:select {:on-change (fn [e] (dispatch [:change :target-font (.-value (.-target e))]))
                :value     target-font}
       (for [opt fonts]
         [:option {:key (:key opt) :value (:key opt)} (:text opt)])]]
     [:div.row
      [:div.col
       [:div.col-header]
       [:textarea {:auto-capitalize "off"
                   :auto-correct    "off"
                   :spell-check     "false"
                   :auto-complete   "off"
                   :placeholder "..."
                   :style {:font-family (font-family source-font)}
                   :value source-text
                   :on-change (fn [e] (dispatch [:change :source-text (.-value (.-target e))]))}]]
      [:div.col
       [:div.col-header
         "Output"]
       [:textarea {:auto-capitalize "off"
                   :auto-correct    "off"
                   :spell-check     "false"
                   :auto-complete   "off"
                   :placeholder "..."
                   :style {:font-family (font-family target-font)
                           :background-color (if target-text-manually-changed "#ffffcc" "inherit")}
                   :value target-text
                   :id "targetText"
                   :on-change (fn [e] (dispatch [:change :target-text (.-value (.-target e))]))}]]]
     
     [:div
       [:button {:on-click (fn [e])
                 (.select (js/document.querySelector "#targetText"))
                 (js/document.execCommand "copy")}
          "Select and copy"]]
     (when debug
       [:pre {:style {:width "100%" :overflow-x :auto}}
        [:code
         [:div "{"]
         (for [[k v] data]
           [:div (str (pr-str k) " " (pr-str v) ",")])
         [:div "}"]]])
     [:footer]]))


(defn- mount-root []
  (rdom/render [root] (.getElementById js/document "app")))

(defn init []
  (mount-root))
