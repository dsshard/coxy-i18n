#!/usr/bin/env node

import glob from 'fast-glob'
import { Command, Option } from 'commander'

import path from 'path'
import fs from 'fs'

import { DELIMITER } from './config'

const program = new Command()

program
  .version('0.1.0')
  .description('CLI utils for i18n')
  .addOption(new Option('-m, --mode [type]', 'set mode').choices(['single', 'split']).default('single'))
  .addOption(new Option('-i, --inline', 'is inline mode').default(false))
  .option('-p, --path [dir]', 'path for root dir')
  .requiredOption('-d, --dir [name] ', 'output dir')

program.parse()

const opts = program.opts()

const rootPath = opts?.path?.replace(/\/$/, '') || '.'
const outDir = `${rootPath}/${opts.dir}`.replace(/\/$/, '')
const mode = opts.mode
const isInline = opts.inline

if (isInline && mode === 'single') {
  throw new Error('inline mode working only for mode split')
}

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir)
}

function prepareIsInlineMode (data: Record<string, Record<string, string>>):
  Record<string, string> | Record<string, Record<string, string>> {
  if (!isInline) return data

  return Object.keys(data).reduce((acc, path) => {
    const elements = data[path]
    Object.keys(elements).forEach((elementKey) => {
      const value = elements[elementKey]
      const newPath = `${String(path)}${DELIMITER}${String(elementKey)}`
      acc[newPath] = value
    })
    return acc
  }, {})
}

async function run () {
  const files = await glob(`${rootPath}/**/*.i18n.json`, {
    cwd: process.cwd(),
    absolute: false,
    onlyFiles: true
  })

  const result = {}
  files.forEach((fileName) => {
    const keyName = fileName.replace(rootPath, '.')
    const data = fs.readFileSync(fileName).toString('utf-8')
    result[keyName] = JSON.parse(data)
  })

  if (!files.length) {
    // eslint-disable-next-line no-console
    console.log('Files not found. use: *.i18n.json format file')
    return
  }

  fs.readdirSync(outDir).forEach((f) => fs.rmSync(`${outDir}/${f}`))

  if (mode === 'split') {
    const locales = {}

    Object.keys(result).forEach((fileName) => {
      const localLocales = Object.keys(result[fileName])

      localLocales.forEach((locale) => {
        if (!locales[locale]) locales[locale] = {}
        locales[locale][fileName] = {}
        locales[locale][fileName] = result[fileName][locale]
      })
    })

    Object.keys(locales).forEach((locale) => {
      const writeData = JSON.stringify(prepareIsInlineMode(locales[locale]), null, 2)
      fs.writeFileSync(path.resolve(outDir, `${locale}.json`), writeData, 'utf-8')
    })
  }

  if (mode === 'single') {
    const writeData = JSON.stringify(prepareIsInlineMode(result), null, 2)
    fs.writeFileSync(path.resolve(outDir, 'locales.json'), writeData, 'utf-8')
  }
}

void run()
