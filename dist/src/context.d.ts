import React, { PropsWithChildren } from 'react';
type ContextProps = {
    language: string | null;
    fallback: string | null;
    dangerouslySetText?: string;
    replaceUndefinedKey?: (key: string) => string;
    setLanguage?: (key: string) => void;
    setFallback?: (key: string) => void;
};
export declare const I18nContext: React.Context<{
    language: any;
    fallback: any;
    dangerouslySetText: any;
    replaceUndefinedKey: any;
    setLanguage: any;
    setFallback: any;
}>;
export declare const I18nProvider: (props: PropsWithChildren<ContextProps>) => React.JSX.Element;
export {};
