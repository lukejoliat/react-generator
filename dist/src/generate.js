#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generator = void 0;
const service_generator_1 = require("./generators/service-generator");
const model_generator_1 = require("./generators/model-generator");
const detail_component_generator_1 = require("./generators/detail-component-generator");
const list_component_generator_1 = require("./generators/list-component-generator");
const hook_generator_1 = require("./generators/hook-generator");
const component_test_generator_1 = require("./generators/component-test-generator");
const fs_1 = require("fs");
const inquirer_1 = require("inquirer");
const generator = (schemaInfo, dir, choice) => {
    const courseSchema = {
        model: schemaInfo.schemaNameSing,
        modelPlural: schemaInfo.schemaNamePlural,
    };
    const config = {
        name: "Workshop Config",
        application: "dashboard",
        scope: "acme",
    };
    const generateOutputDirectory = (dir) => {
        if (!dir)
            dir = "src";
        if (!(0, fs_1.existsSync)(dir)) {
            (0, fs_1.mkdirSync)(dir);
        }
    };
    const generateStack = (dir) => {
        console.log("generating stack");
        const detailComponentResult = (0, detail_component_generator_1.generate)(courseSchema);
        const listComponentResult = (0, list_component_generator_1.generate)(courseSchema);
        const testComponentResult = (0, component_test_generator_1.generate)(courseSchema);
        const modelResult = (0, model_generator_1.generate)(schemaInfo.schema, courseSchema);
        const hookComponentResult = (0, hook_generator_1.generate)(courseSchema);
        const serviceResult = (0, service_generator_1.generate)(courseSchema, config);
        (0, fs_1.writeFile)(dir + "/" + serviceResult.fileName, serviceResult.template, (err) => {
            if (err)
                console.log(err);
        });
        (0, fs_1.writeFile)(dir + "/" + modelResult.fileName, modelResult.template, (err) => {
            if (err)
                console.log(err);
        });
        (0, fs_1.writeFile)(dir + "/" + testComponentResult.fileName, testComponentResult.template, (err) => {
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
        (0, fs_1.writeFile)(dir + "/" + hookComponentResult.fileName, hookComponentResult.template, (err) => {
            if (err)
                console.log(err);
        });
    };
    const generateComponent = (dir) => {
        const detailComponentResult = (0, detail_component_generator_1.generate)(courseSchema);
        const testComponentResult = (0, component_test_generator_1.generate)(courseSchema);
        const modelResult = (0, model_generator_1.generate)(schemaInfo.schema, courseSchema);
        (0, fs_1.writeFile)(dir + "/" + modelResult.fileName, modelResult.template, (err) => {
            if (err)
                console.log(err);
        });
        (0, fs_1.writeFile)(dir + "/" + testComponentResult.fileName, testComponentResult.template, (err) => {
            if (err)
                console.log(err);
        });
        (0, fs_1.writeFile)(dir + "/" + detailComponentResult.fileName, detailComponentResult.template, (err) => {
            if (err)
                console.log(err);
        });
    };
    const generateTest = (dir) => {
        const testComponentResult = (0, component_test_generator_1.generate)(courseSchema);
        const modelResult = (0, model_generator_1.generate)(schemaInfo.schema, courseSchema);
        (0, fs_1.writeFile)(dir + "/" + modelResult.fileName, modelResult.template, (err) => {
            if (err)
                console.log(err);
        });
        (0, fs_1.writeFile)(dir + "/" + testComponentResult.fileName, testComponentResult.template, (err) => {
            if (err)
                console.log(err);
        });
    };
    const generateService = (dir) => {
        const serviceComponentResult = (0, service_generator_1.generate)(courseSchema, config);
        const modelResult = (0, model_generator_1.generate)(schemaInfo.schema, courseSchema);
        (0, fs_1.writeFile)(dir + "/" + modelResult.fileName, modelResult.template, (err) => {
            if (err)
                console.log(err);
        });
        (0, fs_1.writeFile)(dir + "/" + serviceComponentResult.fileName, serviceComponentResult.template, (err) => {
            if (err)
                console.log(err);
        });
    };
    const generateHook = (dir) => {
        const serviceResult = (0, service_generator_1.generate)(courseSchema, config);
        const hookResult = (0, hook_generator_1.generate)(courseSchema);
        const modelResult = (0, model_generator_1.generate)(schemaInfo.schema, courseSchema);
        (0, fs_1.writeFile)(dir + "/" + modelResult.fileName, modelResult.template, (err) => {
            if (err)
                console.log(err);
        });
        (0, fs_1.writeFile)(dir + "/" + serviceResult.fileName, serviceResult.template, (err) => {
            if (err)
                console.log(err);
        });
        (0, fs_1.writeFile)(dir + "/" + hookResult.fileName, hookResult.template, (err) => {
            if (err)
                console.log(err);
        });
    };
    const generateApi = (dir) => {
        console.log("Nothing to generate yet.");
    };
    generateOutputDirectory(dir);
    switch (choice) {
        case "stack":
            generateStack(dir);
            break;
        case "component":
            generateComponent(dir);
            break;
        case "test":
            generateTest(dir);
            break;
        case "service":
            generateService(dir);
            break;
        case "hook":
            generateHook(dir);
            break;
        case "api":
            generateApi(dir);
            break;
        default:
            generateStack(dir);
            break;
    }
};
exports.generator = generator;
(0, inquirer_1.prompt)([
    {
        type: "list",
        name: "select",
        message: "What would you like to generate?",
        choices: ["component", "test", "service", "hook", "api", "stack"],
    },
    {
        type: "input",
        name: "path",
        message: "please specify your output directory:",
    },
    {
        type: "editor",
        name: "schema",
        message: "Please enter your schema:",
        validate(text) {
            if (!text.includes("id:"))
                return "ID is required.";
            return true;
        },
    },
    {
        type: "input",
        name: "schemaNameSing",
        message: "Please enter your schema name singular:",
    },
    {
        type: "input",
        name: "schemaNamePlural",
        message: "Please enter your schema name plural:",
    },
]).then((answers) => {
    const { path, schema, select, schemeNameSing, schemaNamePlural } = answers;
    if (!select)
        console.error("There was an error.");
    (0, exports.generator)({ schema, schemeNameSing, schemaNamePlural }, path, select);
});
