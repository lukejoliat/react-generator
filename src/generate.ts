// arguments...
// inquirer?

import { Config, Schema } from "./meta-models";
import { generate } from "./generators/service-generator";
import { existsSync, mkdirSync, writeFile } from "fs";
import { prompt, Separator } from "inquirer";

export const generator = (dir: string) => {
  const courseSchema: Schema = {
    model: "course",
    modelPlural: "courses",
  };

  const config: Config = {
    name: "Workshop Config",
    application: "dashboard",
    scope: "acme",
  };

  const result = generate(courseSchema, config);
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
  writeFile(dir + "/" + result.fileName, result.template, (err) => {
    if (err) console.log(err);
  });
};

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
]).then((answers) => {
  if (!answers || !answers.generate) console.error("There was an error.");
  if (answers.generate === true) generator(answers.path);
  else return;
});
