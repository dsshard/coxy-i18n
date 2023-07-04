import { useCallback, useContext } from 'react'

import { I18nContext } from './context'

type ParamValues = Record<string, string | number | undefined>

type Options<T> = {
  variables?: ParamValues,
  key: keyof T
}

type CreateOptions = {
  fallback: string,
  language: string
}

function declOfNum (number: number, titles: string[]): string {
  const cases = [2, 0, 1, 1, 1, 2]
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
}

export function processI18N <T> (content: T, options: Options<T>): string {
  const { variables, key } = options
  let response = content[key as string]

  if (!variables) {
    return response
  }

  Object.keys(variables).forEach((variable) => {
    const val = variables[variable]
    const reg = new RegExp(`{{${variable}}}`, 'g')
    response = response.replace(reg, String(val))
  })

  const testMatch = response.match(/(\[.+])/) // find [number|item1|item2|item3]
  if (testMatch && testMatch[0]) {
    const replaceString = testMatch[0]
    const parseExpression = replaceString.match(/\[(.+)]/) // find number|item1|item2|item3

    if (parseExpression && parseExpression[1] && parseExpression[1].indexOf('|') > -1) {
      const [counter, ...strings] = parseExpression[1].split('|') // to number, item1, item2, item3
      if (strings?.length > 0) {
        const counterData = Number(counter)
        response = response.replace(replaceString, declOfNum(counterData, strings))
      }
    }
  }

  return response
}

export function mergeContent<T> (contents: Array<T>, options: CreateOptions): T[keyof T] {
  const response = {} as T[keyof T]

  contents.forEach((obj) => {
    Object.assign(response, obj[options.fallback], obj[options.language])
  })
  return response
}

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
  const section = mergeContent(objects, {
    language: context.language,
    fallback: context.fallback
  })

  type Key = keyof T[keyof T]
  // prettier-ignore
  const t = useCallback((key: Key, variables?: ParamValues): string =>
    processI18N(section, {
      key,
      variables
    }), [context.language])

  return { t, language: context.language } as const
}
