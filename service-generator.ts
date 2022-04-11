import { Config, Schema } from "./meta-models";
import { buildNameVariations } from "./name-variations";

const model = '';
const models = '';
const baseURI = '';

export const generate = (schema: Schema, { scope }: Config) => {
    const { ref, refs, model, models, singleParam } = buildNameVariations(schema);
    const template = `


    export const get${model}(id: string) {
        return fetch(${baseURI}/${models}/id);
    }
    
    export const get${models}() {
        return fetch(${baseURI}/${models})
    }
    
    export const update${model}(${singleParam}) {
        return fetch(${baseURI}/${models}/${model.id}, { method: 'PUT', headers: { 'Content-Type': 'application/json' } });
    }
    
    export const create${model}(${singleParam}) {
        return fetch(${baseURI}/${models}, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
    }
    
    export const delete${model}(${model}) {
        return fetch(${baseURI}/${models}/${model.id}, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
    }
    `;

    return {
        template,
        title: `${models} Service`,
        fileName: `libs/core-data/src/lib/services/${refs}/${refs}-service.ts`,
    }
};