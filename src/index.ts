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

export function processI18N <T> (content: T, options: Options<T>): string {
  const { variables, key } = options
  let response = content[key as string]

  if (!variables) {
    return response
  }

  Object.keys(variables).forEach((variable) => {
    const val = variables[variable]
    response = response.replace(`{{${variable}}}`, String(val))
  })
  return response
}

export function mergeContent<T> (contents: Array<T>, options: CreateOptions): T[keyof T] {
  const response = {} as T[keyof T]

  contents.forEach((obj) => {
    Object.assign(response, obj[options.defaultLang], obj[options.selectedLang])
  })
  return response
}

export function createUseI18N (options: CreateOptions) {
  return function i18N<T> (...objects: Array<T>): {
    t: (key: keyof T[keyof T], variables?: ParamValues) => string,
    language: string
  } {
    const section = mergeContent(objects, options)

    const t = useCallback((key: keyof T[keyof T], variables?: ParamValues): string =>
      processI18N(section, {
        key,
        variables
      }), [options.selectedLang])

    return { t, language: options.selectedLang }
  }
}
