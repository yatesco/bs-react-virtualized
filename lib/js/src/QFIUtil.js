// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

var List        = require("bs-platform/lib/js/list.js");
var $$Array     = require("bs-platform/lib/js/array.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Hashtbl     = require("bs-platform/lib/js/hashtbl.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");

function parseDate(s) {
  var re = new RegExp("([0-9]+)/([0-9]+)/([0-9]+)");
  var result = re.exec(s);
  var parsingResult = result !== null ? /* Some */[$$Array.to_list(result)] : /* None */0;
  if (parsingResult) {
    var match = parsingResult[0];
    if (match) {
      var match$1 = match[1];
      if (match$1) {
        var match$2 = match$1[1];
        if (match$2) {
          var match$3 = match$2[1];
          if (match$3 && !match$3[1]) {
            return /* Some */[new Date(Date.UTC(Caml_format.caml_float_of_string(match$3[0]), Caml_format.caml_int_of_string(match$2[0]) - 1 | 0, Caml_format.caml_float_of_string(match$1[0])))];
          } else {
            return /* None */0;
          }
        } else {
          return /* None */0;
        }
      } else {
        return /* None */0;
      }
    } else {
      return /* None */0;
    }
  } else {
    return /* None */0;
  }
}

function parseDateTime(s, time) {
  var date = parseDate(s);
  if (date) {
    var date$1 = date[0];
    var re = new RegExp("([0-9]+):([0-9]+)");
    var result = re.exec(time);
    var parsingResult = result !== null ? /* Some */[$$Array.to_list(result)] : /* None */0;
    if (parsingResult) {
      var match = parsingResult[0];
      if (match) {
        var match$1 = match[1];
        if (match$1) {
          var match$2 = match$1[1];
          if (match$2 && !match$2[1]) {
            return /* Some */[new Date(Date.UTC(date$1.getFullYear(), date$1.getMonth(), date$1.getDate(), Caml_format.caml_float_of_string(match$1[0]), Caml_format.caml_float_of_string(match$2[0])))];
          } else {
            return /* None */0;
          }
        } else {
          return /* None */0;
        }
      } else {
        return /* None */0;
      }
    } else {
      return /* None */0;
    }
  } else {
    return /* None */0;
  }
}

function Make(C) {
  var collect = function ($staropt$star, $staropt$star$1, _) {
    var l = $staropt$star ? $staropt$star[0] : C[/* l */0];
    var f = $staropt$star$1 ? $staropt$star$1[0] : C[/* f */1];
    var result = Hashtbl.create(/* Some */[/* true */1], List.length(l));
    List.iter((function (item) {
            var k = Curry._1(f, item);
            var match = Hashtbl.mem(result, k);
            var r = match !== 0 ? Hashtbl.find(result, k) : /* [] */0;
            return Hashtbl.replace(result, k, /* :: */[
                        item,
                        r
                      ]);
          }), l);
    return result;
  };
  return /* module */[/* collect */collect];
}

var Collector = /* module */[/* Make */Make];

exports.parseDate     = parseDate;
exports.parseDateTime = parseDateTime;
exports.Collector     = Collector;
/* No side effect */
