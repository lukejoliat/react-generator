import { Schema } from "../meta-models";
import { buildNameVariations } from "../name-variations";

export const generate = (schema: Schema) => {
  const { ref, refs, model, models, singleParam } = buildNameVariations(schema);

  const template = `
import React, { FC } from 'react';
import { ${model} } from './${model}';

interface ${model}ListProps {
    ${refs}: ${model}[];
}

const ${model}List: FC<${model}ListProps> = ({ ${refs} }) => {
    return (
        // component code here...
    );
}

export default ${model}List;
  `;

  return {
    template,
    fileName: `${model}List.tsx`,
  };
};
