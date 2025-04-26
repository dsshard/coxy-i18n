import React, { PropsWithChildren } from 'react';

type ContextProps = {
    language: string | null;
    fallback: string | null;
    dangerouslySetText?: string;
    replaceUndefinedKey?: (key: string) => string;
    setLanguage?: (key: string) => void;
    setFallback?: (key: string) => void;
};
declare const I18nContext: React.Context<{
    language: any;
    fallback: any;
    dangerouslySetText: any;
    replaceUndefinedKey: any;
    setLanguage: any;
    setFallback: any;
}>;
declare const I18nProvider: (props: PropsWithChildren<ContextProps>) => React.JSX.Element;

type ParamValues = Record<string, string | number | undefined>;
type Ret<T> = {
    t: (key: keyof T[keyof T], variables?: ParamValues) => string;
    language: string;
};
declare function useI18N<C>(c: C): Ret<C>;
declare function useI18N<C, O>(c: C, o: O): Ret<C & O>;
declare function useI18N<C, O, X>(c: C, o: O, x: X): Ret<C & O & X>;
declare function useI18N<C, O, X, Y>(c: C, o: O, x: X, y: Y): Ret<C & O & X & Y>;
declare function useI18N<C, O, X, Y, S>(c: C, o: O, x: X, y: Y, s: S): Ret<C & O & X & Y & S>;
declare function useI18N<C, O, X, Y, S, E>(c: C, o: O, x: X, y: Y, s: S, e: E): Ret<C & O & X & Y & S & E>;

export { I18nContext, I18nProvider, useI18N };
