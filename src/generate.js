"use strict";
// arguments...
// inquirer?
exports.__esModule = true;
exports.generator = void 0;
var service_generator_1 = require("./generators/service-generator");
var fs_1 = require("fs");
var inquirer_1 = require("inquirer");
var generator = function () {
  var courseSchema = {
    model: "course",
    modelPlural: "courses",
  };
  var config = {
    name: "Workshop Config",
    application: "dashboard",
    scope: "acme",
  };
  var result = (0, service_generator_1.generate)(courseSchema, config);
  (0, fs_1.writeFile)(result.fileName, result.template, function (err) {
    if (err) console.log(err);
  });
};
exports.generator = generator;
(0, inquirer_1.prompt)([
  {
    type: "confirm",
    name: "generate",
    message: "Would you like to generate?",
  },
  {
    type: "",
    name: "path",
    message: "please specify your output directory:",
  },
]).then(function (answers) {
  if (!answers || !answers.generate) console.error("There was an error.");
  if (answers.generate === true) (0, exports.generator)();
  else return;
});
