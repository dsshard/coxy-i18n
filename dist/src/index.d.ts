type ParamValues = Record<string, string | number | undefined>;
type Options<T> = {
    variables?: ParamValues;
    key: keyof T;
};
type CreateOptions = {
    defaultLang: string;
    selectedLang: string;
};
export declare function processI18N<T>(content: T, options: Options<T>): string;
export declare function mergeContent<T>(contents: Array<T>, options: CreateOptions): T[keyof T];
type ReturnI18n<T> = {
    t: (key: keyof T[keyof T], variables?: ParamValues) => string;
    language: string;
};
export declare function createUseI18N(options: CreateOptions): <T>(...objects: Array<T>) => ReturnI18n<T>;
export {};
