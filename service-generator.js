"use strict";
exports.__esModule = true;
exports.generate = void 0;
var name_variations_1 = require("./name-variations");
var model = '';
var models = '';
var baseURI = '';
var generate = function (schema, _a) {
    var scope = _a.scope;
    var _b = (0, name_variations_1.buildNameVariations)(schema), ref = _b.ref, refs = _b.refs, model = _b.model, models = _b.models, singleParam = _b.singleParam;
    var template = "\n\n\n    export const get".concat(model, "(id: string) {\n        return fetch(").concat(baseURI, "/").concat(models, "/id);\n    }\n    \n    export const get").concat(models, "() {\n        return fetch(").concat(baseURI, "/").concat(models, ")\n    }\n    \n    export const update").concat(model, "(").concat(singleParam, ") {\n        return fetch(").concat(baseURI, "/").concat(models, "/").concat(model.id, ", { method: 'PUT', headers: { 'Content-Type': 'application/json' } });\n    }\n    \n    export const create").concat(model, "(").concat(singleParam, ") {\n        return fetch(").concat(baseURI, "/").concat(models, ", { method: 'POST', headers: { 'Content-Type': 'application/json' } });\n    }\n    \n    export const delete").concat(model, "(").concat(model, ") {\n        return fetch(").concat(baseURI, "/").concat(models, "/").concat(model.id, ", { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });\n    }\n    ");
    return {
        template: template,
        title: "".concat(models, " Service"),
        fileName: "libs/core-data/src/lib/services/".concat(refs, "/").concat(refs, "-service.ts")
    };
};
exports.generate = generate;
