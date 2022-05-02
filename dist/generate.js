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
const name_variations_1 = require("./name-variations");
const constants_1 = require("./constants");
const generateOutputDirectory = (dir) => {
    if (!dir)
        dir = "src";
    if (!(0, fs_1.existsSync)(dir)) {
        (0, fs_1.mkdirSync)(dir);
    }
};
const generator = (schemaInfo, dir, choice) => {
    const schema = {
        model: schemaInfo.schemaNameSing,
        modelPlural: schemaInfo.schemaNamePlural,
    };
    const generators = {
        detailComponentGenerator: detail_component_generator_1.generate,
        listComponentGenerator: list_component_generator_1.generate,
        modelGenerator: model_generator_1.generate,
        hookGenerator: hook_generator_1.generate,
        serviceGenerator: service_generator_1.generate,
        componentTestGenerator: component_test_generator_1.generate,
    };
    const combo = constants_1.COMBOS[choice.toUpperCase()];
    combo.push("model");
    generateOutputDirectory(dir);
    combo.forEach((generator) => {
        const gName = `${(0, name_variations_1.camelCase)(generator)}Generator`;
        const result = generator === "model"
            ? generators[gName](schemaInfo.schema, schema)
            : generators[gName](schema);
        (0, fs_1.writeFile)(dir + "/" + result.fileName, result.template, (err) => {
            if (err)
                console.log(err);
        });
    });
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
    const { path, schema, select, schemaNameSing, schemaNamePlural } = answers;
    if (!select)
        console.error("There was an error.");
    try {
        (0, exports.generator)({ schema, schemaNameSing, schemaNamePlural }, path, select);
    }
    catch (error) {
        console.error(error);
    }
});
