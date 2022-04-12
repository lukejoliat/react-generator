import { Schema } from "../meta-models";
import { buildNameVariations } from "../name-variations";

export const generate = (fields, schema: Schema) => {
  const { ref, refs, model, models, singleParam } = buildNameVariations(schema);
  const template = `
export interface ${model} ${fields}
    `;
  return {
    template,
    fileName: `${model}.ts`,
  };
};
