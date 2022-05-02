#!/usr/bin/env node

import { Schema } from "./meta-models";
import { generate as serviceGenerator } from "./generators/service-generator";
import { generate as modelGenerator } from "./generators/model-generator";
import { generate as detailComponentGenerator } from "./generators/detail-component-generator";
import { generate as listComponentGenerator } from "./generators/list-component-generator";
import { generate as hookGenerator } from "./generators/hook-generator";
import { generate as componentTestGenerator } from "./generators/component-test-generator";
import { existsSync, mkdirSync, writeFile } from "fs";
import { prompt } from "inquirer";
import { camelCase } from "./name-variations";
import { COMBOS } from "./constants";

const generateOutputDirectory = (dir: string) => {
  if (!dir) dir = "src";
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
};

export const generator = (schemaInfo: any, dir: string, choice: string) => {
  const schema: Schema = {
    model: schemaInfo.schemaNameSing,
    modelPlural: schemaInfo.schemaNamePlural,
  };

  const generators = {
    detailComponentGenerator,
    listComponentGenerator,
    modelGenerator,
    hookGenerator,
    serviceGenerator,
    componentTestGenerator,
  };

  const combo = COMBOS[choice.toUpperCase()];
  combo.push("model");

  generateOutputDirectory(dir);

  combo.forEach((generator: string) => {
    const gName = `${camelCase(generator)}Generator`;
    const result =
      generator === "model"
        ? generators[gName](schemaInfo.schema, schema)
        : generators[gName](schema);
    writeFile(dir + "/" + result.fileName, result.template, (err) => {
      if (err) console.log(err);
    });
  });
};

prompt([
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
    validate(text: string) {
      if (!text.includes("id:")) return "ID is required.";
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
  if (!select) console.error("There was an error.");
  try {
    generator({ schema, schemaNameSing, schemaNamePlural }, path, select);
  } catch (error) {
    console.error(error);
  }
});
