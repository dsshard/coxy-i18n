"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nProvider = exports.I18nContext = void 0;
exports.useI18N = useI18N;
const react_1 = require("react");
const i18n_process_1 = require("@coxy/i18n-process");
const context_1 = require("./context");
Object.defineProperty(exports, "I18nContext", { enumerable: true, get: function () { return context_1.I18nContext; } });
Object.defineProperty(exports, "I18nProvider", { enumerable: true, get: function () { return context_1.I18nProvider; } });
function useI18N(...objects) {
    const context = (0, react_1.useContext)(context_1.I18nContext);
    const section = (0, react_1.useMemo)(() => (0, i18n_process_1.mergeContent)(objects, {
        language: context.language,
        fallback: context.fallback
    }), [context]);
    const t = (0, react_1.useCallback)((key, variables) => {
        const options = {
            key,
            variables
        };
        const isKey = (0, i18n_process_1.hasI18nKey)(section, options);
        if (!isKey && context.replaceUndefinedKey) {
            return context.replaceUndefinedKey(key);
        }
        if (isKey && context.dangerouslySetText) {
            return context.dangerouslySetText;
        }
        return (0, i18n_process_1.processI18N)(section, options);
    }, [context]);
    return { t, hasKey: i18n_process_1.hasI18nKey, language: context.language };
}
