import React, { createContext, type PropsWithChildren, useEffect, useState } from 'react'

type ContextProps = {
  language: string | null
  fallback: string | null
  dangerouslySetText?: string
  replaceUndefinedKey?: (key: string) => string
  setLanguage?: (key: string) => void
  setFallback?: (key: string) => void
}

export const I18nContext = createContext({
  language: null,
  fallback: null,
  dangerouslySetText: undefined,
  replaceUndefinedKey: undefined,
  setLanguage: undefined,
  setFallback: undefined,
})

export const I18nProvider = (props: PropsWithChildren<ContextProps>) => {
  const { children, fallback, language, dangerouslySetText, replaceUndefinedKey } = props
  const [currentLang, setLanguage] = useState(language)
  const [fallbackLang, setFallback] = useState(fallback)

  useEffect(() => {
    setLanguage(language)
  }, [language])

  useEffect(() => {
    setFallback(fallback)
  }, [fallback])

  return (
    <I18nContext.Provider
      value={{
        fallback: fallbackLang,
        language: currentLang,
        dangerouslySetText,
        replaceUndefinedKey,
        setLanguage,
        setFallback,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}
