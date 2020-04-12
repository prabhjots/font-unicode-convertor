(ns sikhsiyasat.font-converter.app
  (:require [sikhsiyasat.font-converter.core :as converter]
            [reagent.core :as reagent]))

(defonce data-atom (reagent/atom {:source-font "AnmolLipi"
                                  :target-font "AnmolUni"
                                  :source-text ""
                                  :target-text ""}))

(defn convert-text [data]
  (assoc data :target-text (converter/convert data)))

(defn dispatch [[_type key value]]
  (let [data (-> @data-atom
                 (assoc key value)
                 (convert-text))]
    (reset! data-atom data)))

(defn options []
  [:<>
   [:option {:value "AnmolLipi"} "Anmol Lipi"]
   [:option {:value "AnmolUni"} "Anmol Uni"]
   [:option {:value "Arial Unicode MS"} "Unicode"]
   [:option {:value "DrChatrikWeb"} "Dr Chatrik"]
   [:option {:value "Awaze"} "Awaze"]
   [:option {:value "Satluj"} "Satluj"]
   [:option {:value "Asees"} "Asees"]
   [:option {:value "Joy"} "Joy"]
   [:option {:value "GurbaniLipi"} "Gurbani Lipi"]])

(defn root []
  (let [data           @data-atom
        textarea-props {:auto-capitalize "off"
                        :auto-correct    "off"
                        :rows            7
                        :cols            200
                        :spell-check     "false"
                        :auto-complete   "off"}
        source-font    (:source-font data)
        target-font    (:target-font data)
        source-text    (:source-text data)
        target-text    (:target-text data)]
    [:<>
     [:h1 "Punjabi Font Convertor"]
     [:div.row
      [:div.col
        [:select {:on-change (fn [e] (dispatch [:change :source-font (.-value (.-target e))]))
                  :value     source-font}
          [options]]
        [:textarea (assoc textarea-props
                          :style {:font-family source-font}
                          :value source-text
                          :on-change (fn [e] (dispatch [:change :source-text (.-value (.-target e))])))]]
      [:div {:class "col"}
        [:select {:on-change (fn [e] (dispatch [:change :target-font (.-value (.-target e))]))
                  :value     target-font}
          [options]]
        [:textarea (assoc textarea-props
                          :style {:font-family target-font}
                          :read-only true
                          :value target-text)]]]
     [:hr]
     [:pre {:style {:width "100%" :overflow-x :auto}}
       [:code 
         [:div "{"]
         (for [[k v] data]
           [:div (str (pr-str k) " " (pr-str v) ",")])
         [:div "}"]]]]))

(defn mount-root []
  (reagent/render [root] (.getElementById js/document "app")))

(defn init []
  (mount-root))
