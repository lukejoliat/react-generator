"use strict";
// arguments...
// inquirer?
exports.__esModule = true;
exports.generator = void 0;
var service_generator_1 = require("./service-generator");
var generator = function () {
    var courseSchema = {
        model: 'course',
        modelPlural: 'courses'
    };
    var config = {
        name: 'Workshop Config',
        application: 'dashboard',
        scope: 'acme'
    };
    var result = (0, service_generator_1.generate)(courseSchema, config);
    console.log(result);
};
exports.generator = generator;
