#!/usr/bin/env node

import { Config, Schema } from "./meta-models";
import { generate } from "./generators/service-generator";
import { generate as generateModel } from "./generators/model-generator";
import { generate as generateDetailComponent } from "./generators/detail-component-generator";
import { generate as generateListComponent } from "./generators/list-component-generator";
import { generate as generateHooks } from "./generators/hook-generator";
import { existsSync, mkdirSync, writeFile } from "fs";
import { prompt, Separator } from "inquirer";

export const generator = (model: any, dir: string) => {
  const courseInteface = () => {};

  const courseSchema: Schema = {
    model: "course",
    modelPlural: "courses",
  };

  const config: Config = {
    name: "Workshop Config",
    application: "dashboard",
    scope: "acme",
  };

  const detailComponentResult = generateDetailComponent(courseSchema);
  const listComponentResult = generateListComponent(courseSchema);
  const modelResult = generateModel(model, courseSchema);
  const hookComponentResult = generateHooks(courseSchema);
  const result = generate(courseSchema, config);

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
  writeFile(dir + "/" + result.fileName, result.template, (err) => {
    if (err) console.log(err);
  });
  writeFile(dir + "/" + modelResult.fileName, modelResult.template, (err) => {
    if (err) console.log(err);
  });
  writeFile(dir + "/" + modelResult.fileName, modelResult.template, (err) => {
    if (err) console.log(err);
  });
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

// generate:
// component & test
// component
// test
// service and hook
// context
// mock api

prompt([
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
  if (!answers || !answers.generate) console.error("There was an error.");
  if (answers.generate === true) generator(answers.schema, answers.path);
  console.log(answers.schema);
});
