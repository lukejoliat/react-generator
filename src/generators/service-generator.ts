import { Config, Schema } from "../meta-models";
import { buildNameVariations } from "../name-variations";

const baseURI = '/api';

export const generate = (schema: Schema, { scope }: Config) => {
    const { ref, refs, model, models, singleParam } = buildNameVariations(schema);
    const template = `
import ${model} from '..';

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
    }
};