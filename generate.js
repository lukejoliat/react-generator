"use strict";
// arguments...
// inquirer?
exports.__esModule = true;
exports.generator = void 0;
var service_generator_1 = require("./service-generator");
var fs_1 = require("fs");
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
    (0, fs_1.writeFile)(result.fileName, result.template, function (err) {
        if (err)
            console.log(err);
    });
};
exports.generator = generator;
(0, exports.generator)();
