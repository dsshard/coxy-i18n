"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nProvider = exports.I18nContext = void 0;
const react_1 = __importStar(require("react"));
exports.I18nContext = (0, react_1.createContext)({
    language: null,
    fallback: null,
    dangerouslySetText: undefined,
    replaceUndefinedKey: undefined,
    setLanguage: undefined,
    setFallback: undefined
});
const I18nProvider = (props) => {
    const { children, fallback, language, dangerouslySetText, replaceUndefinedKey } = props;
    const [currentLang, setLanguage] = (0, react_1.useState)(language);
    const [fallbackLang, setFallback] = (0, react_1.useState)(fallback);
    (0, react_1.useEffect)(() => {
        setLanguage(language);
    }, [language]);
    (0, react_1.useEffect)(() => {
        setFallback(fallback);
    }, [fallback]);
    return (react_1.default.createElement(exports.I18nContext.Provider, { value: {
            fallback: fallbackLang,
            language: currentLang,
            dangerouslySetText,
            replaceUndefinedKey,
            setLanguage,
            setFallback
        } }, children));
};
exports.I18nProvider = I18nProvider;
