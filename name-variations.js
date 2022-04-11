"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.buildNameVariations = exports.addParams = exports.buildMultiParam = exports.buildSingleParam = exports.buildBase = exports.constantCase = exports.snakeCase = exports.kebabCase = exports.camelCase = exports.pascalCase = exports.startCase = exports.strip = exports.transformPipe = exports.addUnderscores = exports.addDashes = exports.stripSpaces = exports.stripUnderscores = exports.stripDashes = exports.replace = exports.capitalizeWords = exports.decapitalize = exports.capitalize = exports.uppercase = exports.lowercase = exports.EMPTY = exports.SPACE = exports.UNDERSCORE = exports.DASH = void 0;
// PHASE ONE: Basic string manipulation
exports.DASH = '-';
exports.UNDERSCORE = '_';
exports.SPACE = ' ';
exports.EMPTY = '';
// casing
var lowercase = function (s) { return s.toLowerCase(); };
exports.lowercase = lowercase;
var uppercase = function (s) { return s.toUpperCase(); };
exports.uppercase = uppercase;
var capitalize = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };
exports.capitalize = capitalize;
var decapitalize = function (s) { return s.charAt(0).toLowerCase() + s.slice(1); };
exports.decapitalize = decapitalize;
var capitalizeWords = function (s) {
    return s.split(exports.SPACE).map(exports.capitalize).join(exports.SPACE);
};
exports.capitalizeWords = capitalizeWords;
// replacing
var replace = function (s, targ, sub) { return s.split(targ).join(sub); };
exports.replace = replace;
var stripDashes = function (s) { return (0, exports.replace)(s, exports.DASH, exports.SPACE); };
exports.stripDashes = stripDashes;
var stripUnderscores = function (s) { return (0, exports.replace)(s, exports.UNDERSCORE, exports.SPACE); };
exports.stripUnderscores = stripUnderscores;
var stripSpaces = function (s) { return (0, exports.replace)(s, exports.SPACE, exports.EMPTY); };
exports.stripSpaces = stripSpaces;
var addDashes = function (s) { return (0, exports.replace)(s, exports.SPACE, exports.DASH); };
exports.addDashes = addDashes;
var addUnderscores = function (s) { return (0, exports.replace)(s, exports.SPACE, exports.UNDERSCORE); };
exports.addUnderscores = addUnderscores;
// PHASE TWO: Functional programming FTW
var _pipe = function (a, b) { return function (arg) { return b(a(arg)); }; };
var transformPipe = function () {
    var ops = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ops[_i] = arguments[_i];
    }
    return ops.reduce(_pipe);
};
exports.transformPipe = transformPipe;
// interlacing
exports.strip = (0, exports.transformPipe)(exports.stripDashes, exports.stripUnderscores);
exports.startCase = (0, exports.transformPipe)(exports.strip, exports.capitalizeWords);
exports.pascalCase = (0, exports.transformPipe)(exports.startCase, exports.stripSpaces);
exports.camelCase = (0, exports.transformPipe)(exports.pascalCase, exports.decapitalize);
exports.kebabCase = (0, exports.transformPipe)(exports.strip, exports.addDashes, exports.lowercase);
exports.snakeCase = (0, exports.transformPipe)(exports.strip, exports.addUnderscores, exports.lowercase);
exports.constantCase = (0, exports.transformPipe)(exports.strip, exports.addUnderscores, exports.uppercase);
var buildBase = function (schema) { return ({
    ref: (0, exports.camelCase)(schema.model),
    refs: (0, exports.camelCase)(schema.modelPlural),
    model: (0, exports.pascalCase)(schema.model),
    models: (0, exports.pascalCase)(schema.modelPlural),
    selector: (0, exports.kebabCase)(schema.model),
    selectors: (0, exports.kebabCase)(schema.modelPlural)
}); };
exports.buildBase = buildBase;
var buildSingleParam = function (v) { return "".concat(v.ref, ": ").concat(v.model); };
exports.buildSingleParam = buildSingleParam;
var buildMultiParam = function (v) { return "".concat(v.refs, ": ").concat(v.model, "[]"); };
exports.buildMultiParam = buildMultiParam;
var addParams = function (variations) { return (__assign(__assign({}, variations), { singleParam: (0, exports.buildSingleParam)(variations), multiParam: (0, exports.buildMultiParam)(variations) })); };
exports.addParams = addParams;
exports.buildNameVariations = (0, exports.transformPipe)(exports.buildBase, exports.addParams);
