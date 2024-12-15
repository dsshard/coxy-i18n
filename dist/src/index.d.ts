import { I18nContext, I18nProvider } from './context';
export { I18nContext, I18nProvider };
type ParamValues = Record<string, string | number | undefined>;
type Ret<T> = {
    t: (key: keyof T[keyof T], variables?: ParamValues) => string;
    language: string;
};
export declare function useI18N<C>(c: C): Ret<C>;
export declare function useI18N<C, O>(c: C, o: O): Ret<C & O>;
export declare function useI18N<C, O, X>(c: C, o: O, x: X): Ret<C & O & X>;
export declare function useI18N<C, O, X, Y>(c: C, o: O, x: X, y: Y): Ret<C & O & X & Y>;
export declare function useI18N<C, O, X, Y, S>(c: C, o: O, x: X, y: Y, s: S): Ret<C & O & X & Y & S>;
export declare function useI18N<C, O, X, Y, S, E>(c: C, o: O, x: X, y: Y, s: S, e: E): Ret<C & O & X & Y & S & E>;
