// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

var List        = require("bs-platform/lib/js/list.js");
var Block       = require("bs-platform/lib/js/block.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Hashtbl     = require("bs-platform/lib/js/hashtbl.js");
var QFIUtil     = require("./QFIUtil.js");
var Caml_obj    = require("bs-platform/lib/js/caml_obj.js");
var Caml_array  = require("bs-platform/lib/js/caml_array.js");
var Caml_float  = require("bs-platform/lib/js/caml_float.js");
var ArrayLabels = require("bs-platform/lib/js/arrayLabels.js");

function buildOne(mappings, index, row) {
  var maxMappingIndex = List.hd(List.rev(List.sort(Caml_obj.caml_compare, /* :: */[
                mappings[/* spellId */0],
                /* :: */[
                  mappings[/* patientId */1],
                  /* :: */[
                    mappings[/* arrivalDate */2],
                    /* :: */[
                      mappings[/* arrivalTime */3],
                      /* :: */[
                        mappings[/* departureDate */4],
                        /* :: */[
                          mappings[/* departureTime */5],
                          /* :: */[
                            mappings[/* ward */6],
                            /* :: */[
                              mappings[/* specialty */7],
                              /* :: */[
                                mappings[/* consultant */8],
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ])));
  var rowLength = row.length;
  var mappingIndexesIsValid = +(rowLength > maxMappingIndex);
  var thisOrThat = function (a, b) {
    var match = +(a.length === 0);
    if (match !== 0) {
      return b;
    } else {
      return a;
    }
  };
  if (mappingIndexesIsValid !== 0) {
    var admissionSome = QFIUtil.parseDateTime(Caml_array.caml_array_get(row, mappings[/* arrivalDate */2]), Caml_array.caml_array_get(row, mappings[/* arrivalTime */3]));
    if (admissionSome) {
      var spellId = Caml_array.caml_array_get(row, mappings[/* spellId */0]);
      var match = +(spellId.length > 0);
      if (match !== 0) {
        var patientId = Caml_array.caml_array_get(row, mappings[/* patientId */1]);
        var match$1 = +(patientId.length > 0);
        if (match$1 !== 0) {
          var departure = QFIUtil.parseDateTime(Caml_array.caml_array_get(row, mappings[/* departureDate */4]), Caml_array.caml_array_get(row, mappings[/* departureTime */5]));
          var stage_001 = /* spellId */Caml_array.caml_array_get(row, mappings[/* spellId */0]);
          var stage_002 = /* patientId */Caml_array.caml_array_get(row, mappings[/* patientId */1]);
          var stage_003 = /* arrival */admissionSome[0];
          var stage_005 = /* ward */thisOrThat(Caml_array.caml_array_get(row, mappings[/* ward */6]), "default ward");
          var stage_006 = /* specialty */thisOrThat(Caml_array.caml_array_get(row, mappings[/* specialty */7]), "default specialty");
          var stage_007 = /* consultant */thisOrThat(Caml_array.caml_array_get(row, mappings[/* consultant */8]), "default consultant");
          var stage = /* record */[
            /* id */index,
            stage_001,
            stage_002,
            stage_003,
            /* departure */departure,
            stage_005,
            stage_006,
            stage_007
          ];
          return /* Ok */Block.__(0, [stage]);
        } else {
          return /* Failed */Block.__(1, [/* record */[
                      /* index */index,
                      /* row */row,
                      /* reasons : :: */[
                        "A patientId must be provided",
                        /* [] */0
                      ]
                    ]]);
        }
      } else {
        return /* Failed */Block.__(1, [/* record */[
                    /* index */index,
                    /* row */row,
                    /* reasons : :: */[
                      "A spellId must be provided",
                      /* [] */0
                    ]
                  ]]);
      }
    } else {
      return /* Failed */Block.__(1, [/* record */[
                  /* index */index,
                  /* row */row,
                  /* reasons : :: */[
                    "Invalid admission date",
                    /* [] */0
                  ]
                ]]);
    }
  } else {
    return /* Failed */Block.__(1, [/* record */[
                /* index */index,
                /* row */row,
                /* reasons : :: */[
                  "One or more mappings is outside the row",
                  /* [] */0
                ]
              ]]);
  }
}

function build(mappings, rows) {
  console.log("building stages from rows");
  var counter = [0];
  var match = ArrayLabels.fold_left((function (param, row) {
          var rejections = param[/* rejections */1];
          var stages = param[/* stages */0];
          var result = buildOne(mappings, counter[0], row);
          counter[0] = counter[0] + 1 | 0;
          if (result.tag) {
            return /* record */[
                    /* stages */stages,
                    /* rejections : :: */[
                      result[0],
                      rejections
                    ]
                  ];
          } else {
            return /* record */[
                    /* stages : :: */[
                      result[0],
                      stages
                    ],
                    /* rejections */rejections
                  ];
          }
        }), /* record */[
        /* stages : [] */0,
        /* rejections : [] */0
      ], rows);
  console.log("built stages from rows");
  return /* record */[
          /* stages */List.rev(match[/* stages */0]),
          /* rejections */List.rev(match[/* rejections */1])
        ];
}

function collectBy(theList, f) {
  var FinallyItWorks = QFIUtil.Collector[/* Make */0](/* module */[
        /* l */theList,
        /* f */f
      ]);
  return Curry._3(FinallyItWorks[/* collect */0], /* None */0, /* None */0, /* () */0);
}

function collectByPatientAndVisitNumber(l) {
  console.log("collecting patients and journeys from rows");
  var byPatients = collectBy(l, (function (stage) {
          return stage[/* patientId */2];
        }));
  var patients = Hashtbl.fold((function (patientId, _, patientIds) {
          return /* :: */[
                  patientId,
                  patientIds
                ];
        }), byPatients, /* [] */0);
  var sortStages = function (a) {
    return List.sort((function (a, b) {
                  return Caml_float.caml_float_compare(a[/* arrival */3].getTime(), b[/* arrival */3].getTime());
                }), a);
  };
  var sortJourneys = function (a) {
    return List.sort((function (a, b) {
                  return Caml_float.caml_float_compare(List.hd(a[/* stages */1])[/* arrival */3].getTime(), List.hd(b[/* stages */1])[/* arrival */3].getTime());
                }), a);
  };
  var sortPatients = function (a) {
    return List.sort((function (a, b) {
                  return Caml_float.caml_float_compare(List.hd(List.hd(a[/* journeys */1])[/* stages */1])[/* arrival */3].getTime(), List.hd(List.hd(b[/* journeys */1])[/* stages */1])[/* arrival */3].getTime());
                }), a);
  };
  var unsortedResults = List.fold_left((function (acc, patientId) {
          var stages = Hashtbl.find(byPatients, patientId);
          var byVisit = collectBy(stages, (function (stage) {
                  return stage[/* spellId */1];
                }));
          var unSortedJourneys = Hashtbl.fold((function (visitId, stages, journeys) {
                  return /* :: */[
                          /* record */[
                            /* id */visitId,
                            /* stages */sortStages(stages)
                          ],
                          journeys
                        ];
                }), byVisit, /* [] */0);
          var journeys = sortJourneys(unSortedJourneys);
          var patient = /* record */[
            /* id */patientId,
            /* journeys */journeys
          ];
          return /* :: */[
                  patient,
                  acc
                ];
        }), /* [] */0, patients);
  var result = sortPatients(unsortedResults);
  console.log("collected patients and journeys from rows");
  return result;
}

exports.buildOne                       = buildOne;
exports.build                          = build;
exports.collectBy                      = collectBy;
exports.collectByPatientAndVisitNumber = collectByPatientAndVisitNumber;
/* No side effect */