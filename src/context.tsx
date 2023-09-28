import React, { createContext, PropsWithChildren, useState } from 'react'

type ContextProps = {
  language: string | null,
  fallback: string | null,
  dangerouslySetText?: string
  replaceUndefinedKey?: (key: string) => string
  setLanguage?: (key: string) => void
}

export const I18nContext = createContext({
  language: null,
  fallback: null,
  dangerouslySetText: undefined,
  replaceUndefinedKey: undefined,
  setLanguage: undefined
})

export const I18nProvider = (props: PropsWithChildren<ContextProps>) => {
  const { children, fallback, language, dangerouslySetText, replaceUndefinedKey } = props
  const [lang, setLanguage] = useState(language)

  return (
    <I18nContext.Provider value={{
      fallback,
      language: lang,
      dangerouslySetText,
      replaceUndefinedKey,
      setLanguage
    }}>
      {children}
    </I18nContext.Provider>
  )
}

