import { buildNameVariations } from "../name-variations";

export const generate = (schema) => {
  const { ref, refs, model, models, singleParam } = buildNameVariations(schema);

  const template = `
import React, { useState, useEffect } from 'react';
import { get${model} as getById, get${models} as get, create${model} as create, update${model} as update, delete${model} as del } from './${refs}-service';
import { ${model} } from './${model}';

export const use${models} = () => {
    const [${refs}, set${models}] = useState<${model}[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
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
                set${models}([...${refs}, ${ref}])
            })
            .catch(e => {
                console.error(e);
                setIsError(true);
            });
    }

    const update${model} = (${singleParam}) => {
        update(${ref})
            .then(() => {
                setIsLoading(false);
                const ${refs}Copy = ${refs}.map(x => {
                    if (x.id === ${ref}.id) {
                        return ${ref};
                    }
                })
                set${models}(${refs}Copy);
            })
            .catch(e => {
                console.error(e);
                setIsError(true);
            });
    }

    const delete${model} = (${singleParam}) => {
        del(${ref})
            .then(() => {
                setIsLoading(false);
                set${models}(${refs}.filter(x => x.id !== ${ref.id}))
            })
            .catch(e => {
                console.error(e);
                setIsError(true);
            });
    }

    return { data: ${refs}, isLoading, isError, create${model}, update${model}, delete${model} };
}

export const use${model} = () => {
    const [${ref}, set${model}] = useState<${model}>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getById()
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
                set${model}(data);
            })
            .catch(e => {
                console.error(e);
                setIsError(true);
            });
    },[]);

    const update${model} = (${singleParam}) => {
        update(${ref})
            .then(() => {
                setIsLoading(false);
                set${model}(${ref});
            })
            .catch(e => {
                console.error(e);
                setIsError(true);
            });
    }

    return { data: ${refs}, isLoading, isError, update${model} };
}
`;

  return {
    template,
    fileName: `use${models}.tsx`,
  };
};
