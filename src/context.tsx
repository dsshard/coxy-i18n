import React, { createContext, PropsWithChildren } from 'react'

type ContextProps = {
  language: string | null,
  fallback: string | null,
  dangerouslySetText?: string
  replaceUndefinedKey?: (key: string) => string
}

export const I18nContext = createContext({
  language: null,
  fallback: null,
  dangerouslySetText: undefined,
  replaceUndefinedKey: undefined
})

export const I18nProvider = (props: PropsWithChildren<ContextProps>) => {
  const { children, fallback, language, dangerouslySetText, replaceUndefinedKey } = props
  return (
    <I18nContext.Provider value={{ fallback, language, dangerouslySetText, replaceUndefinedKey }}>
      {children}
    </I18nContext.Provider>
  )
}

