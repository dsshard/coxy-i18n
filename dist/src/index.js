"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUseI18N = exports.mergeContent = exports.processI18N = void 0;
const react_1 = require("react");
function processI18N(content, options) {
    const { variables, key } = options;
    let response = content[key];
    if (!variables) {
        return response;
    }
    Object.keys(variables).forEach((variable) => {
        const val = variables[variable];
        response = response.replace(`{{${variable}}}`, String(val));
    });
    return response;
}
exports.processI18N = processI18N;
function mergeContent(contents, options) {
    const response = {};
    contents.forEach((obj) => {
        Object.assign(response, obj[options.defaultLang], obj[options.selectedLang]);
    });
    return response;
}
exports.mergeContent = mergeContent;
function createUseI18N(options) {
    return function i18N(...objects) {
        const section = mergeContent(objects, options);
        const t = (0, react_1.useCallback)((key, variables) => processI18N(section, {
            key,
            variables
        }), [options.selectedLang]);
        return { t, language: options.selectedLang };
    };
}
exports.createUseI18N = createUseI18N;
