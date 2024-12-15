import { useCallback, useContext, useMemo } from 'react'
import { hasI18nKey, mergeContent, processI18N } from '@coxy/i18n-process'

import { I18nContext, I18nProvider } from './context'

export { I18nContext, I18nProvider }

type ParamValues = Record<string, string | number | undefined>

type Ret<T> = {
  t: (key: keyof T[keyof T], variables?: ParamValues) => string
  language: string
}

export function useI18N<C>(c: C): Ret<C>
export function useI18N<C, O>(c: C, o: O): Ret<C & O>
export function useI18N<C, O, X>(c: C, o: O, x: X): Ret<C & O & X>
export function useI18N<C, O, X, Y>(c: C, o: O, x: X, y: Y): Ret<C & O & X & Y>
export function useI18N<C, O, X, Y, S>(c: C, o: O, x: X, y: Y, s: S): Ret<C & O & X & Y & S>
export function useI18N<C, O, X, Y, S, E>(c: C, o: O, x: X, y: Y, s: S, e: E): Ret<C & O & X & Y & S & E>

export function useI18N<T> (...objects: Array<T>) {
  const context = useContext(I18nContext)
  const section = useMemo(() => mergeContent(objects, {
    language: context.language,
    fallback: context.fallback
  }), [context])

  type Key = keyof T[keyof T]
  const t = useCallback((key: Key, variables?: ParamValues): string => {
    const options = {
      key,
      variables
    }

    const isKey = hasI18nKey(section, options)
    if (!isKey && context.replaceUndefinedKey) {
      return context.replaceUndefinedKey(key)
    }

    if (isKey && context.dangerouslySetText) {
      return context.dangerouslySetText
    }

    return processI18N(section, options)
  }, [context])

  return { t, hasKey: hasI18nKey, language: context.language } as const
}
