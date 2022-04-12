"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const name_variations_1 = require("../name-variations");
const baseURI = "/api";
const generate = (schema, { scope }) => {
    const { ref, refs, model, models, singleParam } = (0, name_variations_1.buildNameVariations)(schema);
    const template = `
import { ${model} } from './${model}';

export const get${model} = (id: string) => {
    return fetch(\`${baseURI}/\${id}\`);
}

export const get${models} = () => {
    return fetch(\`${baseURI}/${refs}\`)
}

export const update${model} = (${singleParam}) => {
    return fetch(\`${baseURI}/${refs}/\${${ref}.id}\`, { method: 'PUT', headers: { 'Content-Type': 'application/json' } });
}

export const create${model} = (${singleParam}) => {
    return fetch(\`${baseURI}/${refs}\`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
}

export const delete${model} = (${singleParam}) => {
    return fetch(\`${baseURI}/${refs}/\${${ref}.id}\`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
}
    `;
    return {
        template,
        title: `${models} Service`,
        fileName: `${refs}-service.ts`,
    };
};
exports.generate = generate;
