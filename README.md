# @coxy/i18n

Component localization for react. Allows you to translate components individually, without storing huge localization files. Try. It's comfortable.

You can upload all translations with one command into one or several files. Then create a new translation file and import back into all files.

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

return <div>{t('title', {test: 123})}</div>
```

in `index.i18n.json` write

```json
{
  "en": {
    "title": "Title string {{test}}"
  },
  "es": {
    "title": "Cadena de título {{test}}"
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


