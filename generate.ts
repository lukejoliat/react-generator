// arguments...
// inquirer?

import { Config, Schema } from "./meta-models";
import { generate } from "./service-generator";

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
    console.log(result);
}