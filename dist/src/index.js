"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUseI18N = exports.mergeContent = exports.processI18N = void 0;
const react_1 = require("react");
function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}
function processI18N(content, options) {
    const { variables, key } = options;
    let response = content[key];
    if (!variables) {
        return response;
    }
    Object.keys(variables).forEach((variable) => {
        const val = variables[variable];
        const reg = new RegExp(`{{${variable}}}`, 'g');
        response = response.replace(reg, String(val));
    });
    const testMatch = response.match(/(\[.+])/);
    if (testMatch && testMatch[0]) {
        const replaceString = testMatch[0];
        const parseExpression = replaceString.match(/\[(.+)]/);
        if (parseExpression && parseExpression[1] && parseExpression[1].indexOf('|') > -1) {
            const [counter, ...strings] = parseExpression[1].split('|');
            if ((strings === null || strings === void 0 ? void 0 : strings.length) > 0) {
                const counterData = Number(counter);
                response = response.replace(replaceString, declOfNum(counterData, strings));
            }
        }
    }
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
