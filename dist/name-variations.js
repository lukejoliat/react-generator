"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildNameVariations = exports.addParams = exports.buildMultiParam = exports.buildSingleParam = exports.buildBase = exports.constantCase = exports.snakeCase = exports.kebabCase = exports.camelCase = exports.pascalCase = exports.startCase = exports.strip = exports.transformPipe = exports.addUnderscores = exports.addDashes = exports.stripSpaces = exports.stripUnderscores = exports.stripDashes = exports.replace = exports.capitalizeWords = exports.decapitalize = exports.capitalize = exports.uppercase = exports.lowercase = exports.EMPTY = exports.SPACE = exports.UNDERSCORE = exports.DASH = void 0;
// PHASE ONE: Basic string manipulation
exports.DASH = '-';
exports.UNDERSCORE = '_';
exports.SPACE = ' ';
exports.EMPTY = '';
// casing
const lowercase = (s) => s.toLowerCase();
exports.lowercase = lowercase;
const uppercase = (s) => s.toUpperCase();
exports.uppercase = uppercase;
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
exports.capitalize = capitalize;
const decapitalize = (s) => s.charAt(0).toLowerCase() + s.slice(1);
exports.decapitalize = decapitalize;
const capitalizeWords = (s) => s.split(exports.SPACE).map(exports.capitalize).join(exports.SPACE);
exports.capitalizeWords = capitalizeWords;
// replacing
const replace = (s, targ, sub) => s.split(targ).join(sub);
exports.replace = replace;
const stripDashes = (s) => (0, exports.replace)(s, exports.DASH, exports.SPACE);
exports.stripDashes = stripDashes;
const stripUnderscores = (s) => (0, exports.replace)(s, exports.UNDERSCORE, exports.SPACE);
exports.stripUnderscores = stripUnderscores;
const stripSpaces = (s) => (0, exports.replace)(s, exports.SPACE, exports.EMPTY);
exports.stripSpaces = stripSpaces;
const addDashes = (s) => (0, exports.replace)(s, exports.SPACE, exports.DASH);
exports.addDashes = addDashes;
const addUnderscores = (s) => (0, exports.replace)(s, exports.SPACE, exports.UNDERSCORE);
exports.addUnderscores = addUnderscores;
// PHASE TWO: Functional programming FTW
const _pipe = (a, b) => (arg) => b(a(arg));
const transformPipe = (...ops) => ops.reduce(_pipe);
exports.transformPipe = transformPipe;
// interlacing
exports.strip = (0, exports.transformPipe)(exports.stripDashes, exports.stripUnderscores);
exports.startCase = (0, exports.transformPipe)(exports.strip, exports.capitalizeWords);
exports.pascalCase = (0, exports.transformPipe)(exports.startCase, exports.stripSpaces);
exports.camelCase = (0, exports.transformPipe)(exports.pascalCase, exports.decapitalize);
exports.kebabCase = (0, exports.transformPipe)(exports.strip, exports.addDashes, exports.lowercase);
exports.snakeCase = (0, exports.transformPipe)(exports.strip, exports.addUnderscores, exports.lowercase);
exports.constantCase = (0, exports.transformPipe)(exports.strip, exports.addUnderscores, exports.uppercase);
const buildBase = (schema) => ({
    ref: (0, exports.camelCase)(schema.model),
    refs: (0, exports.camelCase)(schema.modelPlural),
    model: (0, exports.pascalCase)(schema.model),
    models: (0, exports.pascalCase)(schema.modelPlural),
    selector: (0, exports.kebabCase)(schema.model),
    selectors: (0, exports.kebabCase)(schema.modelPlural),
});
exports.buildBase = buildBase;
const buildSingleParam = (v) => `${v.ref}: ${v.model}`;
exports.buildSingleParam = buildSingleParam;
const buildMultiParam = (v) => `${v.refs}: ${v.model}[]`;
exports.buildMultiParam = buildMultiParam;
const addParams = (variations) => ({
    ...variations,
    singleParam: (0, exports.buildSingleParam)(variations),
    multiParam: (0, exports.buildMultiParam)(variations),
});
exports.addParams = addParams;
exports.buildNameVariations = (0, exports.transformPipe)(exports.buildBase, exports.addParams);
