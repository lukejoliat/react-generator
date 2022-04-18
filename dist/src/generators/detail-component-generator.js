"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const name_variations_1 = require("../name-variations");
const generate = (schema) => {
    const { ref, refs, model, models, singleParam } = (0, name_variations_1.buildNameVariations)(schema);
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
exports.generate = generate;