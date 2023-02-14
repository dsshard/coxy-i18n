import { useCallback } from 'react'

type ParamValues = Record<string, string | number | undefined>

type Options<T> = {
  variables?: ParamValues,
  key: keyof T
}

type CreateOptions = {
  defaultLang: string,
  selectedLang: string
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
    Object.assign(response, obj[options.defaultLang], obj[options.selectedLang])
  })
  return response
}

type ReturnI18n<T> = {
  t: (key: keyof T[keyof T], variables?: ParamValues) => string,
  language: string
}

export function createUseI18N (options: CreateOptions): <T>(...objects: Array<T>) => ReturnI18n<T> {
  return function i18N (...objects) {
    const section = mergeContent(objects, options)

    const t = useCallback((key, variables): string =>
      processI18N(section, {
        key,
        variables
      }), [options.selectedLang])

    return { t, language: options.selectedLang }
  }
}
