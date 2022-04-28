import { Schema } from "../meta-models";
import { buildNameVariations } from "../name-variations";

export const generate = (schema: Schema) => {
  const { ref, refs, model, models, singleParam } = buildNameVariations(schema);

  const template = `
import React, { FC } from 'react';
import { ${model} } from './${model}';
import { use${models} } from './use${models}';

interface ${model}ListProps {
    ${refs}: ${model}[];
}

const ${model}List: FC<${model}ListProps> = ({ ${refs} }) => {
  const { data, isLoading, isError } = use${models}();
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
