import {samples} from "../test/samples";
var el = React.createElement;

ReactDOM.render(
    el("table", { className: "table" },
        el("thead", null,
            el("tr", null,
                el("th", { scope: "col" }, "Unicode"),
                el("th", { scope: "col" }, "Anmol"),
                el("th", { scope: "col" }, "Dr Chartik"),
                el("th", { scope: "col" }, "Satluj"),
                el("th", { scope: "col" }, "Joy"),
                el("th", { scope: "col" }, "Asees"),
                el("th", { scope: "col" }, "Gurbani Lipi"))),
        el("tbody", null, samples.map(function (s) {
            return el("tr", null,
                el("th", null, s.Unicode),
                el("th", { style: { fontFamily: "AnmolLipi" } }, s.AnmolLipi),
                el("th", { style: { fontFamily: "DrChatrikWeb" } }, s.DrChatrikWeb),
                el("th", { style: { fontFamily: "Satluj" } }, s.Satluj),
                el("th", { style: { fontFamily: "Joy" } }, s.Joy),
                el("th", { style: { fontFamily: "Asees" } }, s.Asees),
                el("th", { style: { fontFamily: "GurbaniLipi" } }, s.GurbaniLipi));
        }))),
    document.getElementById('root'));