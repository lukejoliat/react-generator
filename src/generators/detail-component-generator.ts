import { Schema } from "../meta-models";
import { buildNameVariations } from "../name-variations";

export const generate = (schema: Schema) => {
  const { ref, refs, model, models, singleParam } = buildNameVariations(schema);

  const template = `
import React, { FC } from 'react';
import { ${model} } from './${model}';

interface ${model}DetailProps {
    ${ref}: ${model}
}

const ${model}Detail: FC<${model}DetailProps> = ({ ${ref} }) => {
    return (
        // component code here...
    );
}

export default ${model}Detail;
  `;

  return {
    template,
    fileName: `${model}Detail.tsx`,
  };
};
