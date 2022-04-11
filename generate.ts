// arguments...
// inquirer?

import { Config, Schema } from "./meta-models";
import { generate } from "./service-generator";
import { writeFile } from 'fs';

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

generator();