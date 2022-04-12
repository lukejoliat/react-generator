#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generator = void 0;
const service_generator_1 = require("./generators/service-generator");
const model_generator_1 = require("./generators/model-generator");
const detail_component_generator_1 = require("./generators/detail-component-generator");
const list_component_generator_1 = require("./generators/list-component-generator");
const fs_1 = require("fs");
const inquirer_1 = require("inquirer");
const generator = (model, dir) => {
    const courseInteface = () => { };
    const courseSchema = {
        model: "course",
        modelPlural: "courses",
    };
    const config = {
        name: "Workshop Config",
        application: "dashboard",
        scope: "acme",
    };
    const detailComponentResult = (0, detail_component_generator_1.generate)(courseSchema);
    const listComponentResult = (0, list_component_generator_1.generate)(courseSchema);
    const modelResult = (0, model_generator_1.generate)(model, courseSchema);
    const result = (0, service_generator_1.generate)(courseSchema, config);
    if (!(0, fs_1.existsSync)(dir)) {
        (0, fs_1.mkdirSync)(dir);
    }
    (0, fs_1.writeFile)(dir + "/" + result.fileName, result.template, (err) => {
        if (err)
            console.log(err);
    });
    (0, fs_1.writeFile)(dir + "/" + modelResult.fileName, modelResult.template, (err) => {
        if (err)
            console.log(err);
    });
    (0, fs_1.writeFile)(dir + "/" + modelResult.fileName, modelResult.template, (err) => {
        if (err)
            console.log(err);
    });
    (0, fs_1.writeFile)(dir + "/" + detailComponentResult.fileName, detailComponentResult.template, (err) => {
        if (err)
            console.log(err);
    });
    (0, fs_1.writeFile)(dir + "/" + listComponentResult.fileName, listComponentResult.template, (err) => {
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
    {
        type: "editor",
        name: "schema",
        message: "Please enter your schema:",
    },
]).then((answers) => {
    if (!answers || !answers.generate)
        console.error("There was an error.");
    if (answers.generate === true)
        (0, exports.generator)(answers.schema, answers.path);
    console.log(answers.schema);
});
