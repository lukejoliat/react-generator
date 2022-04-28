"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const name_variations_1 = require("../name-variations");
const generate = (schema) => {
    const { ref, refs, model, models, singleParam } = (0, name_variations_1.buildNameVariations)(schema);
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
exports.generate = generate;
