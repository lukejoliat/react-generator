"use strict";
// arguments...
// inquirer?
Object.defineProperty(exports, "__esModule", { value: true });
exports.generator = void 0;
const service_generator_1 = require("./generators/service-generator");
const fs_1 = require("fs");
const inquirer_1 = require("inquirer");
const generator = (dir) => {
    const courseSchema = {
        model: "course",
        modelPlural: "courses",
    };
    const config = {
        name: "Workshop Config",
        application: "dashboard",
        scope: "acme",
    };
    const result = (0, service_generator_1.generate)(courseSchema, config);
    if (!(0, fs_1.existsSync)(dir)) {
        (0, fs_1.mkdirSync)(dir);
    }
    (0, fs_1.writeFile)(dir + "/" + result.fileName, result.template, (err) => {
        if (err)
            console.log(err);
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
]).then((answers) => {
    if (!answers || !answers.generate)
        console.error("There was an error.");
    if (answers.generate === true)
        (0, exports.generator)(answers.path);
    else
        return;
});
