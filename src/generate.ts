#!/usr/bin/env node

import { Config, Schema } from "./meta-models";
import { generate as serviceGenerator } from "./generators/service-generator";
import { generate as modelGenerator } from "./generators/model-generator";
import { generate as detailComponentGenerator } from "./generators/detail-component-generator";
import { generate as listComponentGenerator } from "./generators/list-component-generator";
import { generate as hookGenerator } from "./generators/hook-generator";
import { generate as testGenerator } from "./generators/component-test-generator";
import { existsSync, mkdirSync, writeFile } from "fs";
import { prompt } from "inquirer";

export const generator = (schemaInfo: any, dir: string, choice: string) => {
  const courseSchema: Schema = {
    model: schemaInfo.schemaNameSing,
    modelPlural: schemaInfo.schemaNamePlural,
  };

  const config: Config = {
    name: "Workshop Config",
    application: "dashboard",
    scope: "acme",
  };

  const generateOutputDirectory = (dir: string) => {
    if (!dir) dir = "src";
    if (!existsSync(dir)) {
      mkdirSync(dir);
    }
  };

  const generateStack = (dir) => {
    console.log("generating stack");

    const detailComponentResult = detailComponentGenerator(courseSchema);
    const listComponentResult = listComponentGenerator(courseSchema);
    const testComponentResult = testGenerator(courseSchema);
    const modelResult = modelGenerator(schemaInfo.schema, courseSchema);
    const hookComponentResult = hookGenerator(courseSchema);
    const serviceResult = serviceGenerator(courseSchema, config);

    writeFile(
      dir + "/" + serviceResult.fileName,
      serviceResult.template,
      (err) => {
        if (err) console.log(err);
      }
    );
    writeFile(dir + "/" + modelResult.fileName, modelResult.template, (err) => {
      if (err) console.log(err);
    });
    writeFile(
      dir + "/" + testComponentResult.fileName,
      testComponentResult.template,
      (err) => {
        if (err) console.log(err);
      }
    );
    writeFile(
      dir + "/" + detailComponentResult.fileName,
      detailComponentResult.template,
      (err) => {
        if (err) console.log(err);
      }
    );
    writeFile(
      dir + "/" + listComponentResult.fileName,
      listComponentResult.template,
      (err) => {
        if (err) console.log(err);
      }
    );
    writeFile(
      dir + "/" + hookComponentResult.fileName,
      hookComponentResult.template,
      (err) => {
        if (err) console.log(err);
      }
    );
  };

  const generateComponent = (dir) => {
    const detailComponentResult = detailComponentGenerator(courseSchema);
    const testComponentResult = testGenerator(courseSchema);
    const modelResult = modelGenerator(schemaInfo.schema, courseSchema);

    writeFile(dir + "/" + modelResult.fileName, modelResult.template, (err) => {
      if (err) console.log(err);
    });
    writeFile(
      dir + "/" + testComponentResult.fileName,
      testComponentResult.template,
      (err) => {
        if (err) console.log(err);
      }
    );
    writeFile(
      dir + "/" + detailComponentResult.fileName,
      detailComponentResult.template,
      (err) => {
        if (err) console.log(err);
      }
    );
  };

  const generateTest = (dir) => {
    const testComponentResult = testGenerator(courseSchema);
    const modelResult = modelGenerator(schemaInfo.schema, courseSchema);

    writeFile(dir + "/" + modelResult.fileName, modelResult.template, (err) => {
      if (err) console.log(err);
    });
    writeFile(
      dir + "/" + testComponentResult.fileName,
      testComponentResult.template,
      (err) => {
        if (err) console.log(err);
      }
    );
  };

  const generateService = (dir) => {
    const serviceComponentResult = serviceGenerator(courseSchema, config);
    const modelResult = modelGenerator(schemaInfo.schema, courseSchema);

    writeFile(dir + "/" + modelResult.fileName, modelResult.template, (err) => {
      if (err) console.log(err);
    });
    writeFile(
      dir + "/" + serviceComponentResult.fileName,
      serviceComponentResult.template,
      (err) => {
        if (err) console.log(err);
      }
    );
  };

  const generateHook = (dir) => {
    const serviceResult = serviceGenerator(courseSchema, config);
    const hookResult = hookGenerator(courseSchema);
    const modelResult = modelGenerator(schemaInfo.schema, courseSchema);

    writeFile(dir + "/" + modelResult.fileName, modelResult.template, (err) => {
      if (err) console.log(err);
    });
    writeFile(
      dir + "/" + serviceResult.fileName,
      serviceResult.template,
      (err) => {
        if (err) console.log(err);
      }
    );
    writeFile(dir + "/" + hookResult.fileName, hookResult.template, (err) => {
      if (err) console.log(err);
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
  const { path, schema, select, schemeNameSing, schemaNamePlural } = answers;
  if (!select) console.error("There was an error.");
  generator({ schema, schemeNameSing, schemaNamePlural }, path, select);
});
