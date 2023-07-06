import React, { PropsWithChildren } from 'react';
type ContextProps = {
    language: string | null;
    fallback: string | null;
    dangerouslySetText?: string;
    replaceUndefinedKey?: (key: string) => string;
};
export declare const I18nContext: React.Context<{
    language: any;
    fallback: any;
    dangerouslySetText: any;
    replaceUndefinedKey: any;
}>;
export declare const I18nProvider: (props: PropsWithChildren<ContextProps>) => React.JSX.Element;
export {};
