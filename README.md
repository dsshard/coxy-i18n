# @coxy/i18n

### Install

```shell
yarn add @coxy/i18n
```


### Setup 

1. Wrap main component `I18nProvider`

```javascript
<I18nProvider fallback="en" language="es">  
    <AppComponent />
</I18nProvider>
```

2. In AppComponent

Create `index.i18n.json` file in a component folder and include.

```javascript
import locales from './index.i18n.json'

const { t } = useI18n(locales)

return <div>{t('title')}</div>
```

in `index.i18n.json` write

```json
{
  "en": {
    "title": "Title string"
  },
  "es": {
    "title": "Cadena de título"
  }
}
```


### Dump all translations
```
yarn i18n-dump --path ./ --output localizations --mode split
```

### Restore all translations
```
yarn i18n-restore --path ./ --baseDir localizations --mode split
```


