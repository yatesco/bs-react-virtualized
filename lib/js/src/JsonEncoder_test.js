// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

var Jest        = require("bs-jest/lib/js/src/jest.js");
var List        = require("bs-platform/lib/js/list.js");
var $$Array     = require("bs-platform/lib/js/array.js");
var Caml_array  = require("bs-platform/lib/js/caml_array.js");
var JsonEncoder = require("./JsonEncoder.js");

function stageToJs(stage) {
  var match = stage[/* departure */4];
  return {
          id: stage[/* id */0],
          spellId: stage[/* spellId */1],
          patientId: stage[/* patientId */2],
          arrival: stage[/* arrival */3].toISOString(),
          ward: stage[/* ward */5],
          departure: match ? match[0].toISOString() : "",
          specialty: "aSpecialty",
          consultant: "aConsultant"
        };
}

function journeyToJs(journey) {
  return {
          id: journey[/* id */0],
          stages: $$Array.of_list(List.map(stageToJs, journey[/* stages */1]))
        };
}

function patientToJs(patient) {
  return {
          id: patient[/* id */0],
          journeys: $$Array.of_list(List.map(journeyToJs, patient[/* journeys */1]))
        };
}

var departureDate = new Date(2012, 11, 10);

var exampleStage_003 = /* arrival */new Date(2011, 7, 10);

var exampleStage_004 = /* departure : Some */[departureDate];

var exampleStage = /* record */[
  /* id */0,
  /* spellId */"aSpell",
  /* patientId */"aPatient",
  exampleStage_003,
  exampleStage_004,
  /* ward */"aWard",
  /* specialty */"aSpecialty",
  /* consultant */"aConsultant"
];

describe("encodeStage", (function () {
        Jest.test("happyCase", (function () {
                var encoding = JsonEncoder.encodeStage(exampleStage);
                return Jest.Expect[/* toEqual */12](stageToJs(exampleStage), Jest.Expect[/* expect */0](encoding));
              }));
        return Jest.test("withoutDepartureDate", (function () {
                      var newrecord = exampleStage.slice();
                      newrecord[/* departure */4] = /* None */0;
                      var encoding = JsonEncoder.encodeStage(newrecord);
                      return Jest.Expect[/* toEqual */12](stageToJs(newrecord), Jest.Expect[/* expect */0](encoding));
                    }));
      }));

describe("encodeJourney", (function () {
        return Jest.test("happyCase", (function () {
                      var newrecord = exampleStage.slice();
                      newrecord[/* id */0] = 0;
                      var newrecord$1 = exampleStage.slice();
                      newrecord$1[/* id */0] = 1;
                      var newrecord$2 = exampleStage.slice();
                      newrecord$2[/* id */0] = 2;
                      var journey_001 = /* stages : :: */[
                        newrecord,
                        /* :: */[
                          newrecord$1,
                          /* :: */[
                            newrecord$2,
                            /* [] */0
                          ]
                        ]
                      ];
                      var journey = /* record */[
                        /* id */"0",
                        journey_001
                      ];
                      var encoding = JsonEncoder.encodeJourney(journey);
                      return Jest.Expect[/* toEqual */12](journeyToJs(journey), Jest.Expect[/* expect */0](encoding));
                    }));
      }));

describe("encodePatient", (function () {
        return Jest.test("happyCase", (function () {
                      var newrecord = exampleStage.slice();
                      newrecord[/* id */0] = 0;
                      var newrecord$1 = exampleStage.slice();
                      newrecord$1[/* id */0] = 1;
                      var newrecord$2 = exampleStage.slice();
                      newrecord$2[/* id */0] = 2;
                      var journey1_001 = /* stages : :: */[
                        newrecord,
                        /* :: */[
                          newrecord$1,
                          /* [] */0
                        ]
                      ];
                      var journey1 = /* record */[
                        /* id */"1",
                        journey1_001
                      ];
                      var journey2_001 = /* stages : :: */[
                        newrecord$2,
                        /* [] */0
                      ];
                      var journey2 = /* record */[
                        /* id */"2",
                        journey2_001
                      ];
                      var patient_001 = /* journeys : :: */[
                        journey1,
                        /* :: */[
                          journey2,
                          /* [] */0
                        ]
                      ];
                      var patient = /* record */[
                        /* id */"0",
                        patient_001
                      ];
                      var encoding = JsonEncoder.encodePatient(patient);
                      return Jest.Expect[/* toEqual */12](patientToJs(patient), Jest.Expect[/* expect */0](encoding));
                    }));
      }));

describe("encodePatients", (function () {
        return Jest.test("happyCase", (function () {
                      var newrecord = exampleStage.slice();
                      newrecord[/* id */0] = 0;
                      var newrecord$1 = exampleStage.slice();
                      newrecord$1[/* id */0] = 1;
                      var journey1_001 = /* stages : :: */[
                        newrecord,
                        /* [] */0
                      ];
                      var journey1 = /* record */[
                        /* id */"1",
                        journey1_001
                      ];
                      var journey2_001 = /* stages : :: */[
                        newrecord$1,
                        /* [] */0
                      ];
                      var journey2 = /* record */[
                        /* id */"2",
                        journey2_001
                      ];
                      var patient1_001 = /* journeys : :: */[
                        journey1,
                        /* [] */0
                      ];
                      var patient1 = /* record */[
                        /* id */"0",
                        patient1_001
                      ];
                      var patient2_001 = /* journeys : :: */[
                        journey2,
                        /* [] */0
                      ];
                      var patient2 = /* record */[
                        /* id */"1",
                        patient2_001
                      ];
                      var encoding = JsonEncoder.encodePatients(/* :: */[
                            patient1,
                            /* :: */[
                              patient2,
                              /* [] */0
                            ]
                          ]);
                      return Jest.Expect[/* toEqual */12](/* array */[
                                  patientToJs(patient1),
                                  patientToJs(patient2)
                                ], Jest.Expect[/* expect */0](encoding));
                    }));
      }));

describe("handles large lists", (function () {
        return Jest.test("happyCase", (function () {
                      var newrecord = exampleStage.slice();
                      newrecord[/* id */0] = 0;
                      var journey_001 = /* stages : :: */[
                        newrecord,
                        /* [] */0
                      ];
                      var journey = /* record */[
                        /* id */"1",
                        journey_001
                      ];
                      var patient_001 = /* journeys : :: */[
                        journey,
                        /* [] */0
                      ];
                      var patient = /* record */[
                        /* id */"0",
                        patient_001
                      ];
                      var patients = Caml_array.caml_make_vect(100000, patient);
                      var encoding = JsonEncoder.encodePatients($$Array.to_list(patients));
                      return Jest.Expect[/* toBe */2](100000, Jest.Expect[/* expect */0](encoding.length));
                    }));
      }));

exports.stageToJs     = stageToJs;
exports.journeyToJs   = journeyToJs;
exports.patientToJs   = patientToJs;
exports.departureDate = departureDate;
exports.exampleStage  = exampleStage;
/* departureDate Not a pure module */