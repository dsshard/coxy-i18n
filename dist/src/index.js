"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useI18N = exports.mergeContent = exports.processI18N = exports.I18nProvider = exports.I18nContext = void 0;
const react_1 = require("react");
const context_1 = require("./context");
Object.defineProperty(exports, "I18nContext", { enumerable: true, get: function () { return context_1.I18nContext; } });
Object.defineProperty(exports, "I18nProvider", { enumerable: true, get: function () { return context_1.I18nProvider; } });
function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}
function hasI18nKey(content, options) {
    const { key } = options;
    return !!content[key];
}
function processI18N(content, options) {
    const { variables, key } = options;
    let response = content[key];
    if (!variables) {
        return response;
    }
    Object.keys(variables).forEach((variable) => {
        const reg = new RegExp(`{{${variable}}}`, 'g');
        response = response.replace(reg, String(variables[variable]));
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
        Object.assign(response, obj[options.fallback] || {}, obj[options.language] || {});
    });
    return response;
}
exports.mergeContent = mergeContent;
function useI18N(...objects) {
    const context = (0, react_1.useContext)(context_1.I18nContext);
    const section = (0, react_1.useMemo)(() => mergeContent(objects, {
        language: context.language,
        fallback: context.fallback
    }), [context]);
    const t = (0, react_1.useCallback)((key, variables) => {
        const options = {
            key,
            variables
        };
        const isKey = hasI18nKey(section, options);
        if (!isKey && context.replaceUndefinedKey) {
            return context.replaceUndefinedKey(key);
        }
        if (isKey && context.dangerouslySetText) {
            return context.dangerouslySetText;
        }
        return processI18N(section, options);
    }, [context]);
    return { t, hasKey: hasI18nKey, language: context.language };
}
exports.useI18N = useI18N;
