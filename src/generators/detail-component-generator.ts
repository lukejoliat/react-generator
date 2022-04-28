import { Schema } from "../meta-models";
import { buildNameVariations } from "../name-variations";

export const generate = (schema: Schema) => {
  const { ref, refs, model, models, singleParam } = buildNameVariations(schema);

  const template = `
import React, { FC } from 'react';
import { ${model} } from './${model}';
import { use${model} } from './use${models}';

interface ${model}DetailProps {
    id: string;
}

const ${model}Detail: FC<${model}DetailProps> = ({ id }) => {
    const { data, isLoading, isError } = use${model}(id);
    return (
        <h1>Detail Component</h1>
    );
}

export default ${model}Detail;
  `;

  return {
    template,
    fileName: `${model}Detail.tsx`,
  };
};
