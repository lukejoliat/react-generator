"use strict";
exports.__esModule = true;
exports.generate = void 0;
var name_variations_1 = require("../name-variations");
var baseURI = '/api';
var generate = function (schema, _a) {
    var scope = _a.scope;
    var _b = (0, name_variations_1.buildNameVariations)(schema), ref = _b.ref, refs = _b.refs, model = _b.model, models = _b.models, singleParam = _b.singleParam;
    var template = "\nimport ".concat(model, " from '..';\n\nexport const get").concat(model, " = (id: string) => {\n    return fetch(`").concat(baseURI, "/${id}`);\n}\n\nexport const get").concat(models, " = () => {\n    return fetch(`").concat(baseURI, "/").concat(refs, "`)\n}\n\nexport const update").concat(model, " = (").concat(singleParam, ") => {\n    return fetch(`").concat(baseURI, "/").concat(refs, "/${").concat(ref, ".id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' } });\n}\n\nexport const create").concat(model, " = (").concat(singleParam, ") => {\n    return fetch(`").concat(baseURI, "/").concat(refs, "`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });\n}\n\nexport const delete").concat(model, " = (").concat(singleParam, ") => {\n    return fetch(`").concat(baseURI, "/").concat(refs, "/${").concat(ref, ".id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });\n}\n    ");
    return {
        template: template,
        title: "".concat(models, " Service"),
        fileName: "".concat(refs, "-service.ts")
    };
};
exports.generate = generate;
