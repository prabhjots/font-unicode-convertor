(ns sikhsiyasat.font-converter.app
  (:require [sikhsiyasat.font-converter.core :as converter]
            [reagent.core :as reagent]))

(defonce data-atom (reagent/atom {:source-font "AnmolLipi"
                                  :target-font "AnmolUni"
                                  :source-text ""
                                  :target-text ""
                                  :target-text-manually-changed false}))

(defn convert-text [data]
  (assoc data :target-text (converter/convert data)))

(defn dispatch [[type key value]]
  (case type
    :change
    (let [target-text-manually-changed  (= key :target-text)
          data                          (-> @data-atom
                                            (assoc key value
                                                   :target-text-manually-changed target-text-manually-changed))
                   
          converted-data                (if target-text-manually-changed
                                            data
                                            (convert-text data))]
        (reset! data-atom converted-data))))


(def fonts [{:key 0 :value "AnmolLipi"    :text "Anmol"}
            {:key 1 :value "AnmolUni"     :text "Unicode"}
            {:key 2 :value "DrChatrikWeb" :text "Dr Chatrik"}
            {:key 3 :value "Awaze"        :text "Awaze"}
            {:key 4 :value "Satluj"       :text  "Satluj"}
            {:key 5 :value "Asees"        :text "Asees"}
            {:key 6 :value "Joy"          :text  "Joy"}
            {:key 7 :value "GurbaniLipi"  :text "Gurbani Lipi"}])

(defn root []
  (let [data           @data-atom
        source-font    (:source-font data)
        target-font    (:target-font data)
        source-text    (:source-text data)
        target-text    (:target-text data)
        target-text-manually-changed (:target-text-manually-changed data)
        debug          (:debug data)]
    [:<>
      [:h1 {:on-click (fn [_e] (dispatch [:change :debug (not debug)]))} 
       "Punjabi Font Convertor"]
      [:div.row
        [:div.col
          [:select {:on-change (fn [e] (dispatch [:change :source-font (.-value (.-target e))]))
                    :value     source-font}
            (for [opt fonts]
              [:option opt (:text opt)])]
          [:textarea {:auto-capitalize "off"
                      :auto-correct    "off"
                      :spell-check     "false"
                      :auto-complete   "off"  
                      :placeholder "..."
                      :style {:font-family source-font}
                      :value source-text
                      :on-change (fn [e] (dispatch [:change :source-text (.-value (.-target e))]))}]]
        [:div.col
          [:select {:on-change (fn [e] (dispatch [:change :target-font (.-value (.-target e))]))
                    :value     target-font}
            (for [opt fonts]
              [:option opt (:text opt)])]
          [:textarea {:auto-capitalize "off"
                      :auto-correct    "off"
                      :spell-check     "false"
                      :auto-complete   "off" 
                      :placeholder "..."
                      :style {:font-family target-font
                              :background-color (if target-text-manually-changed "#ffffcc" "inherit")}
                      :value target-text
                      :on-change (fn [e] (dispatch [:change :target-text (.-value (.-target e))]))}]]]
      (when debug
        [:pre {:style {:width "100%" :overflow-x :auto}}
          [:code 
            [:div "{"]
            (for [[k v] data]
              [:div (str (pr-str k) " " (pr-str v) ",")])
            [:div "}"]]])
      [:footer]]))
 

(defn mount-root []
  (reagent/render [root] (.getElementById js/document "app")))

(defn init []
  (mount-root))
