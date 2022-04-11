// arguments...
// inquirer?

import { Config, Schema } from "./meta-models";
import { generate } from "./generators/service-generator";
import { writeFile } from 'fs';
import { prompt, Separator } from 'inquirer';

export const generator = () => {
    const courseSchema: Schema = {
        model: 'course',
        modelPlural: 'courses',
      };

    const config: Config = {
        name: 'Workshop Config',
        application: 'dashboard',
        scope: 'acme',
    };
    
    const result = generate(courseSchema, config);
    writeFile(result.fileName, result.template, (err) => {
        if (err) console.log(err);
    });
}

  prompt([
    {
      type: 'confirm',
      name: 'generate',
      message: 'Would you like to generate?'
    },
    {
      type: '',
      name: 'path',
      message: 'please specify your output directory:'
    }
  ])
  .then((answers) => {
    if (!answers || !answers.generate) console.error("There was an error.")
    if (answers.generate === true) generator()
    else return;
  });