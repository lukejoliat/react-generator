"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const name_variations_1 = require("../name-variations");
const generate = (fields, schema) => {
    const { ref, refs, model, models, singleParam } = (0, name_variations_1.buildNameVariations)(schema);
    const template = `
export interface ${model} ${fields}
    `;
    return {
        template,
        fileName: `${model}.ts`,
    };
};
exports.generate = generate;
