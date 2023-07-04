import React, { createContext, PropsWithChildren } from 'react'

type ContextProps = {
  language: string | null,
  fallback: string | null
}

export const I18nContext = createContext({
  language: null,
  fallback: null
})

export const I18nProvider = (props: PropsWithChildren & ContextProps) => {
  const { fallback, language } = props
  return (
    <I18nContext.Provider value={{ fallback, language }}>{props.children}</I18nContext.Provider>
  )
}

