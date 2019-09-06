// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"OtiD":[function(require,module,exports) {
exports.samples = [{
  "Unicode": "ਲਿਖਿਆ",
  "AnmolLipi": "iliKAw",
  "DrChatrikWeb": "iliKaf",
  "Satluj": "ÇñÇÖÁÅ",
  "Asees": "fbfynk",
  "Joy": "fbfynk",
  "GurbaniLipi": "iliKAw",
  "GurmukhiLys020": "iliKAw"
}, {
  "Unicode": "ਵਿਦਿਆਰਥੀ",
  "AnmolLipi": "ividAwrQI",
  "DrChatrikWeb": "ividafrQI",
  "Satluj": "ÇòÇçÁÅðæÆ",
  "Asees": "ftfdnkoEh",
  "Joy": "ftfdnkoEh"
}, {
  "Unicode": ".",
  "AnmolLipi": ".",
  "DrChatrikWeb": "[",
  "Satluj": ".",
  "Asees": ".",
  "Joy": "H"
}, {
  "Unicode": "ਸਿਖਿੱਆ",
  "AnmolLipi": "isiK~Aw",
  "DrChatrikWeb": "isiKwaf",
  "Satluj": "ÇÃÇÖੱÁÅ",
  "Asees": ".",
  "Joy": "Z"
}];
},{}],"Qgfq":[function(require,module,exports) {
"use strict";

var _samples = require("./samples");

var el = React.createElement;
ReactDOM.render(el("table", {
  className: "table"
}, el("thead", null, el("tr", null, el("th", {
  scope: "col"
}, "Unicode"), el("th", {
  scope: "col"
}, "Anmol"), el("th", {
  scope: "col"
}, "Dr Chartik"), el("th", {
  scope: "col"
}, "Satluj"), el("th", {
  scope: "col"
}, "Joy"), el("th", {
  scope: "col"
}, "Asees"), el("th", {
  scope: "col"
}, "Gurbani Lipi"))), el("tbody", null, _samples.samples.map(function (s) {
  return el("tr", null, el("th", null, s.Unicode), el("th", {
    style: {
      fontFamily: "AnmolLipi"
    }
  }, s.AnmolLipi), el("th", {
    style: {
      fontFamily: "DrChatrikWeb"
    }
  }, s.DrChatrikWeb), el("th", {
    style: {
      fontFamily: "Satluj"
    }
  }, s.Satluj), el("th", {
    style: {
      fontFamily: "Joy"
    }
  }, s.Joy), el("th", {
    style: {
      fontFamily: "Asees"
    }
  }, s.Asees), el("th", {
    style: {
      fontFamily: "GurbaniLipi"
    }
  }, s.GurbaniLipi));
}))), document.getElementById('root'));
},{"./samples":"OtiD"}]},{},["Qgfq"], null)