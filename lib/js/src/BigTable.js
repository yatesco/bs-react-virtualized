// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

var List        = require("bs-platform/lib/js/list.js");
var $$Array     = require("bs-platform/lib/js/array.js");
var React       = require("react");
var Pervasives  = require("bs-platform/lib/js/pervasives.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

function str(prim) {
  return prim;
}

var component = ReasonReact.statelessComponent("BigTable");

function make(rows, _) {
  console.log("TYPED ROWS:");
  console.log(rows);
  var trs = List.map((function (x) {
          var match = x[/* departure */4];
          return React.createElement("tr", {
                      key: Pervasives.string_of_int(x[/* id */0])
                    }, React.createElement("td", undefined, x[/* patientId */2]), React.createElement("td", undefined, x[/* spellId */1]), React.createElement("td", undefined, x[/* arrival */3].toISOString()), React.createElement("td", undefined, match ? match[0].toISOString() : " "), React.createElement("td", undefined, x[/* ward */5]), React.createElement("td", undefined, x[/* specialty */6]), React.createElement("td", undefined, x[/* consultant */7]));
        }), rows);
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("table", undefined, React.createElement("thead", undefined, React.createElement("tr", undefined, React.createElement("th", undefined, "Patient"), React.createElement("th", undefined, "Journey"), React.createElement("th", undefined, "Arrival"), React.createElement("th", undefined, "Departure"), React.createElement("th", undefined, "Ward"), React.createElement("th", undefined, "Category"), React.createElement("th", undefined, "Consultant"))), React.createElement("tbody", undefined, $$Array.of_list(trs)));
    });
  return newrecord;
}

exports.str       = str;
exports.component = component;
exports.make      = make;
/* component Not a pure module */
