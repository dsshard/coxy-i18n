import React, { createContext, PropsWithChildren } from 'react'

type ContextProps = {
  language: string | null,
  fallback: string | null,
  dangerouslySetText?: string
}

export const I18nContext = createContext({
  language: null,
  fallback: null,
  dangerouslySetText: undefined
})

export const I18nProvider = (props: PropsWithChildren & ContextProps) => {
  const { fallback, language, dangerouslySetText } = props
  return (
    <I18nContext.Provider value={{ fallback, language, dangerouslySetText }}>
      {props.children}
    </I18nContext.Provider>
  )
}

