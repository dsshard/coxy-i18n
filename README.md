# @coxy/i18n

**Component localization for React**  
Minimize the use of large global translation files. Each component manages its own translations individually, making the localization process simple and scalable.

---

## 🚀 Features

- **Component-level** localization.
- No need for a massive centralized translations file.
- Easy integration into any React component.
- **Bulk export** and **import** of translations.
- Lightweight and straightforward to maintain.

---

## 📦 Installation

```bash
yarn add @coxy/i18n
```

or

```bash
npm install @coxy/i18n
```

---

## ⚙️ Quick Setup

### 1. Wrap your app with `I18nProvider`

```tsx
import { I18nProvider } from '@coxy/i18n'

<I18nProvider fallback="en" language="es">
  <App />
</I18nProvider>
```

| Prop       | Description                                    |
|:-----------|:-----------------------------------------------|
| `fallback` | Default language if the translation is missing |
| `language` | Active application language                    |

---

### 2. Connect translations inside your component

1. Create a translation file (e.g., `index.i18n.json`) next to the component.
2. Use the `useI18n` hook.

```tsx
import { useI18n } from '@coxy/i18n'
import locales from './index.i18n.json'

const MyComponent = () => {
  const { t } = useI18n(locales)

  return <div>{t('title', { test: 123 })}</div>
}
```

**Example `index.i18n.json` content:**

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

🛠 **Important:**
- Only **flat keys** are supported. Nested keys like `user.profile.title` are **not** supported.
- If a translation is missing, the `fallback` language will be used.
- Values support interpolation using `{{placeholder}}` syntax.

---

## 🛠 Translation Management

### 📤 Export all translations

```bash
yarn i18n-dump --path ./ --output localizations --mode split
```

| Option         | Description                              |
|:---------------|:-----------------------------------------|
| `--path`       | Path to the folder with components       |
| `--output`     | Folder to save exported translations     |
| `--mode split` | Split translations into individual files |

---

### 📥 Import translations

```bash
yarn i18n-restore --path ./ --baseDir localizations --mode split
```

| Option         | Description                        |
|:---------------|:-----------------------------------|
| `--path`       | Path to the folder with components |
| `--baseDir`    | Folder with translations           |
| `--mode split` | Restore from individual files      |

---

## 📚 Advanced Usage

- **Dynamically change language**

```tsx
import { I18nContext } from '@coxy/i18n'
import { useContext } from 'react'

const { setLanguage } = useContext(I18nContext)

setLanguage('en')
```

---

## 🎯 Best Practices

- Keep translations **flat** (no nested objects).
- Place one `.i18n.json` file per component.
- Use meaningful and consistent keys (`title`, `button.save`, `error.notFound`).
- Run `i18n-dump` before merging feature branches.

---

## 🧩 Usage Examples

**Localized buttons:**

```tsx
const { t } = useI18n(locales)

return (
  <div>
    <h1>{t('pageTitle')}</h1>
    <button>{t('saveButton')}</button>
    <button>{t('cancelButton')}</button>
  </div>
)
```

**index.i18n.json:**

```json
{
  "en": {
    "pageTitle": "Page Title",
    "saveButton": "Save",
    "cancelButton": "Cancel"
  },
  "es": {
    "pageTitle": "Título de página",
    "saveButton": "Guardar",
    "cancelButton": "Cancelar"
  }
}
```

---

# 🧠 Summary

| Feature             | How to use                 |
|---------------------|----------------------------|
| Localization        | Per component `.i18n.json` |
| Export translations | `yarn i18n-dump`           |
| Import translations | `yarn i18n-restore`        |
| Change language     | `useContext(I18nContext)`  |

---

> ✨ **Fun fact:**  
> Component-based localization reduces conflicts and review time during team development, especially in large projects.

