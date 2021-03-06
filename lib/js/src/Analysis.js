// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

var List                                 = require("bs-platform/lib/js/list.js");
var $$Array                              = require("bs-platform/lib/js/array.js");
var Block                                = require("bs-platform/lib/js/block.js");
var Curry                                = require("bs-platform/lib/js/curry.js");
var React                                = require("react");
var Analysers                            = require("./Analysers.js");
var Caml_array                           = require("bs-platform/lib/js/caml_array.js");
var Pervasives                           = require("bs-platform/lib/js/pervasives.js");
var ReasonReact                          = require("reason-react/lib/js/src/ReasonReact.js");
var SeedAnalytocs                        = require("./SeedAnalytocs.js");
var IndividualPatientAnalysisResultTable = require("./IndividualPatientAnalysisResultTable.js");

function str(prim) {
  return prim;
}

function numberOfStagesInPatients(patients) {
  return List.fold_left((function (n, patient) {
                var stageN = List.fold_left((function (n, journey) {
                        return n + List.length(journey[/* stages */1]) | 0;
                      }), 0, patient[/* journeys */1]);
                return n + stageN | 0;
              }), 0, patients);
}

function processChunk(self, name, processor, elements, chunkLength, param) {
  var analyserResultRef = param[1];
  var currentIndex = param[0];
  var arrLength = elements.length;
  Curry._1(self[/* send */4], /* Parsing */Block.__(0, [currentIndex]));
  var upperBound = ((currentIndex + chunkLength | 0) + 1 | 0) > arrLength ? arrLength - 1 | 0 : currentIndex + chunkLength | 0;
  var passedRef = analyserResultRef[0][/* passed */2];
  var failedRef = analyserResultRef[0][/* failed */3];
  for(var i = currentIndex; i <= upperBound; ++i){
    var element = Caml_array.caml_array_get(elements, i);
    var result = Curry._2(processor, elements, element);
    if (result) {
      failedRef = /* :: */[
        /* record */[
          /* element */element,
          /* failure */result[0]
        ],
        failedRef
      ];
    } else {
      passedRef = /* :: */[
        element,
        passedRef
      ];
    }
  }
  analyserResultRef[0] = /* record */[
    /* name */name,
    /* elements */elements,
    /* passed */List.rev(passedRef),
    /* failed */List.rev(failedRef)
  ];
  if ((upperBound + 1 | 0) < arrLength) {
    setTimeout((function () {
            return processChunk(self, name, processor, elements, chunkLength, /* tuple */[
                        upperBound + 1 | 0,
                        analyserResultRef
                      ]);
          }), 0);
    return /* () */0;
  } else {
    return Curry._1(self[/* send */4], /* Finish */Block.__(1, [analyserResultRef[0]]));
  }
}

function $$process(self, name, processor, patients) {
  var analyserResult = [/* record */[
      /* name */name,
      /* elements : array */[],
      /* passed : [] */0,
      /* failed : [] */0
    ]];
  Curry._1(self[/* send */4], /* Parsing */Block.__(0, [0]));
  return processChunk(self, name, processor, patients, 1000, /* tuple */[
              0,
              analyserResult
            ]);
}

var component = ReasonReact.reducerComponent("Analyser");

function make(elements, name, processor, onFinish, _) {
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function (self) {
      var arr = $$Array.of_list(elements);
      $$process(self, name, processor, arr);
      return /* NoUpdate */0;
    });
  newrecord[/* render */9] = (function (self) {
      var match = self[/* state */2][/* progress */1];
      switch (match) {
        case 0 : 
            return "Not started";
        case 1 : 
            var match$1 = self[/* state */2][/* currentIndex */0];
            return React.createElement("div", undefined, React.createElement("progress", {
                            className: "progress",
                            max: Pervasives.string_of_int(List.length(elements)),
                            value: Pervasives.string_of_int(self[/* state */2][/* currentIndex */0])
                          }, (
                            match$1 !== 0 ? Pervasives.string_of_float(100 / (List.length(elements) / self[/* state */2][/* currentIndex */0])) : "0"
                          ) + "%"));
        case 2 : 
            var match$2 = self[/* state */2][/* analyserResult */2];
            var tmp;
            if (match$2) {
              var r = match$2[0];
              tmp = "Completed, " + (Pervasives.string_of_int(List.length(r[/* passed */2])) + (", failed:" + Pervasives.string_of_int(List.length(r[/* failed */3]))));
            } else {
              tmp = "waiting for analyser to finish";
            }
            return React.createElement("div", undefined, React.createElement("progress", {
                            className: "progress",
                            max: "100",
                            value: "100"
                          }), tmp);
        
      }
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* currentIndex */0,
              /* progress : NotStarted */0,
              /* analyserResult : Some */[/* record */[
                  /* name */name,
                  /* elements : array */[],
                  /* passed : [] */0,
                  /* failed : [] */0
                ]]
            ];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      if (typeof action === "number") {
        return /* Update */Block.__(0, [/* record */[
                    /* currentIndex */state[/* currentIndex */0],
                    /* progress : InProgress */1,
                    /* analyserResult */state[/* analyserResult */2]
                  ]]);
      } else if (action.tag) {
        var result = action[0];
        return /* UpdateWithSideEffects */Block.__(3, [
                  /* record */[
                    /* currentIndex */state[/* currentIndex */0],
                    /* progress : Finished */2,
                    /* analyserResult : Some */[result]
                  ],
                  (function () {
                      return Curry._1(onFinish, result);
                    })
                ]);
      } else {
        return /* Update */Block.__(0, [/* record */[
                    /* currentIndex */action[0],
                    /* progress : InProgress */1,
                    /* analyserResult */state[/* analyserResult */2]
                  ]]);
      }
    });
  return newrecord;
}

var Analyser = /* module */[
  /* processChunk */processChunk,
  /* process */$$process,
  /* component */component,
  /* make */make
];

var component$1 = ReasonReact.reducerComponent("AnalysisOverview");

var defaultState = /* record */[
  /* currentAnalyser */0,
  /* results : [] */0,
  /* expandedAnalysers : [] */0
];

function make$1(analysers, elements, _) {
  var newrecord = component$1.slice();
  newrecord[/* render */9] = (function (self) {
      var currentIndex = self[/* state */2][/* currentAnalyser */0];
      var analysersCount = List.length(analysers);
      var currentIsValid = +(currentIndex < analysersCount);
      var tmp;
      if (currentIsValid) {
        var match = List.nth(analysers, currentIndex);
        var elements$1 = currentIndex ? List.nth(self[/* state */2][/* results */1], currentIndex - 1 | 0)[/* passed */2] : elements;
        tmp = ReasonReact.element(/* Some */[Pervasives.string_of_int(currentIndex)], /* None */0, make(elements$1, match[0], match[1], (function (result) {
                    return Curry._1(self[/* send */4], /* Start */Block.__(0, [
                                  currentIndex + 1 | 0,
                                  /* Some */[result]
                                ]));
                  }), /* array */[]));
      } else {
        tmp = ReasonReact.element(/* None */0, /* None */0, SeedAnalytocs.make(List.hd(List.rev(self[/* state */2][/* results */1]))[/* passed */2], /* array */[]));
      }
      return React.createElement("div", undefined, React.createElement("div", undefined, $$Array.of_list(List.map((function (result) {
                                var isExpanded = +(List.length(List.filter((function (name) {
                                                return +(name === result[/* name */0]);
                                              }))(self[/* state */2][/* expandedAnalysers */2])) !== 0);
                                var match = result[/* failed */3];
                                return React.createElement("div", undefined, React.createElement("h1", {
                                                className: "title"
                                              }, result[/* name */0]), React.createElement("div", {
                                                className: "level"
                                              }, React.createElement("div", {
                                                    className: "level-left"
                                                  }), React.createElement("div", {
                                                    className: "level-right"
                                                  }, React.createElement("div", {
                                                        className: "level-item"
                                                      }, "Processed: " + Pervasives.string_of_int(result[/* elements */1].length)), React.createElement("div", {
                                                        className: "level-item"
                                                      }, "Passed: " + Pervasives.string_of_int(List.length(result[/* passed */2])))), match ? React.createElement("div", {
                                                      className: "level-item",
                                                      onClick: (function () {
                                                          if (isExpanded) {
                                                            return Curry._1(self[/* send */4], /* Collapse */Block.__(2, [result[/* name */0]]));
                                                          } else {
                                                            return Curry._1(self[/* send */4], /* Expand */Block.__(1, [result[/* name */0]]));
                                                          }
                                                        })
                                                    }, "Failed: " + (Pervasives.string_of_int(List.length(result[/* failed */3])) + (" patients, representing " + (Pervasives.string_of_int(numberOfStagesInPatients(List.map((function (x) {
                                                                          return x[/* element */0];
                                                                        }), result[/* failed */3]))) + (" stages (Click to " + ((
                                                                isExpanded !== 0 ? "collapse" : "expand"
                                                              ) + ")")))))) : React.createElement("div", {
                                                      className: "level-item"
                                                    }, "All passed")), React.createElement("div", undefined, isExpanded !== 0 ? ReasonReact.element(/* None */0, /* None */0, IndividualPatientAnalysisResultTable.make(List.map((function (failure) {
                                                                return /* tuple */[
                                                                        failure[/* element */0],
                                                                        failure[/* failure */1]
                                                                      ];
                                                              }), result[/* failed */3]), /* array */[])) : null));
                              }), self[/* state */2][/* results */1]))), React.createElement("div", undefined, tmp));
    });
  newrecord[/* initialState */10] = (function () {
      return defaultState;
    });
  newrecord[/* reducer */12] = (function (action, state) {
      switch (action.tag | 0) {
        case 0 : 
            var analyserResult = action[1];
            var results = analyserResult ? List.concat(/* :: */[
                    state[/* results */1],
                    /* :: */[
                      /* :: */[
                        analyserResult[0],
                        /* [] */0
                      ],
                      /* [] */0
                    ]
                  ]) : state[/* results */1];
            return /* Update */Block.__(0, [/* record */[
                        /* currentAnalyser */action[0],
                        /* results */results,
                        /* expandedAnalysers */state[/* expandedAnalysers */2]
                      ]]);
        case 1 : 
            return /* Update */Block.__(0, [/* record */[
                        /* currentAnalyser */state[/* currentAnalyser */0],
                        /* results */state[/* results */1],
                        /* expandedAnalysers */List.concat(/* :: */[
                              state[/* expandedAnalysers */2],
                              /* :: */[
                                /* :: */[
                                  action[0],
                                  /* [] */0
                                ],
                                /* [] */0
                              ]
                            ])
                      ]]);
        case 2 : 
            var analyserName = action[0];
            return /* Update */Block.__(0, [/* record */[
                        /* currentAnalyser */state[/* currentAnalyser */0],
                        /* results */state[/* results */1],
                        /* expandedAnalysers */List.find_all((function (name) {
                                  return +(name !== analyserName);
                                }))(state[/* expandedAnalysers */2])
                      ]]);
        
      }
    });
  return newrecord;
}

var Table = /* module */[
  /* component */component$1,
  /* defaultState */defaultState,
  /* make */make$1
];

var component$2 = ReasonReact.statelessComponent("TypedAnalyst");

function make$2(elements, _) {
  var newrecord = component$2.slice();
  newrecord[/* render */9] = (function () {
      return ReasonReact.element(/* None */0, /* None */0, make$1(Analysers.analysers, elements, /* array */[]));
    });
  return newrecord;
}

var PatientsAnalser = /* module */[
  /* component */component$2,
  /* make */make$2
];

exports.str                      = str;
exports.numberOfStagesInPatients = numberOfStagesInPatients;
exports.Analyser                 = Analyser;
exports.Table                    = Table;
exports.PatientsAnalser          = PatientsAnalser;
/* component Not a pure module */
