import React, { PropsWithChildren } from 'react';
type ContextProps = {
    language: string | null;
    fallback: string | null;
};
export declare const I18nContext: React.Context<{
    language: any;
    fallback: any;
}>;
export declare const I18nProvider: (props: PropsWithChildren & ContextProps) => React.JSX.Element;
export {};
