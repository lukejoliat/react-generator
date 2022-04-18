"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const name_variations_1 = require("../name-variations");
const generate = (schema) => {
    const { ref, refs, model, models, singleParam } = (0, name_variations_1.buildNameVariations)(schema);
    const template = `
import React, { useState, useEffect } from 'react';
import { get${models} as get, create${model} as create, update${model} as update, delete${model} as delete } from './${refs}-service';

export const use${models} = () => {
    const [${models}, set${models}] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    usEffect(() => {
        setIsLoading(true);
        get()
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
                set${models}(data);
            })
            .catch(e => {
                console.error(e);
                setIsError(true);
            });
    },[]);

    const create${model} = (${singleParam}) => {
        create(${ref})
            .then(() => {
                setIsLoading(false);
                set${models}([...${models}, ${ref}])
            })
            .catch(e => {
                console.error(e);
                setIsError(true);
            });
    }

    update${model} = (${singleParam}) => {
        update(${ref})
            .then(() => {
                setIsLoading(false);
                const ${models}Copy = ${models}.map(x => {
                    if (x.id === ${ref}.id) {
                        return $ref;
                    }
                })
                set${models}(${models}Copy);
            })
            .catch(e => {
                console.error(e);
                setIsError(true);
            });
    }

    delete${model} = (${singleParam}) => {
        delete(${ref.id})
            .then(() => {
                setIsLoading(false);
                set${models}(${models}.filter(x => x.id !== ${ref.id}))
            })
            .catch(e => {
                console.error(e);
                setIsError(true);
            });
    }

    return { data: ${models}, isLoading: loading, isError: error, create${model}, update${model}, delete${model}, delete${models} };
}
`;
    return {
        template,
        fileName: `use${models}.tsx`,
    };
};
exports.generate = generate;
