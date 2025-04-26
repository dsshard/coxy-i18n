#!/usr/bin/env node

import glob from 'fast-glob'
import { Command, Option } from 'commander'

import path from 'node:path'
import fs from 'node:fs'

import { DELIMITER } from './config'

const program = new Command()

program
  .version('0.1.0')
  .description('CLI utils for i18n')
  .addOption(new Option('-m, --mode [type]', 'set mode').choices(['single', 'split']).default('single'))
  .addOption(new Option('-i, --inline', 'is inline mode').default(false))
  .addOption(new Option('-me, --merge', 'merge content').default(true))
  .option('-p, --path [dir]', 'path for root dir')
  .requiredOption('-d, --dir [name] ', 'base directory for restore')

program.parse()

const opts = program.opts()
const rootPath = opts?.path?.replace(/\/$/, '') || '.'
const baseDir = opts?.dir?.replace(/\/$/, '')
const mode = opts.mode
const isMerge = opts.merge
const isInline = opts.inline

if (isInline && mode === 'single') {
  throw new Error('inline mode working only for mode split')
}

function prepareIsInlineMode (data: Record<string, Record<string, string>>): Record<string, Record<string, string>> {
  if (!isInline) return data

  return Object.keys(data).reduce((acc, el) => {
    const [path, key] = el.split(DELIMITER)
    if (!acc[path]) acc[path] = {}
    acc[path][key] = data[el]
    return acc
  }, {})
}

async function run () {
  const dirForFiles = path.resolve(rootPath, baseDir)

  let result = {}

  if (mode === 'split') {
    const files = await glob(`${dirForFiles}/*.json`)
    if (!files.length) {
      // eslint-disable-next-line no-console
      console.log('Files not found. use: [lang].json format file')
      return
    }
    for (const file of files) {
      const fileName = path.parse(file).base
      const locale = fileName.split('.')[0]
      const fileDataRaw = fs.readFileSync(file).toString()
      const fileData = prepareIsInlineMode(JSON.parse(fileDataRaw))
      const filePathKeys = Object.keys(fileData)
      for (const filePathLocale of filePathKeys) {
        if (!result[filePathLocale]) result[filePathLocale] = {}

        result[filePathLocale][locale] = fileData[filePathLocale]
      }
    }
  }

  if (mode === 'single') {
    const fileDataRaw = fs.readFileSync(path.resolve(dirForFiles, 'locales.json')).toString()

    if (!fileDataRaw.length) {
      // eslint-disable-next-line no-console
      console.log('Files not found. use: locales.json format file')
      return
    }

    result = JSON.parse(fileDataRaw)
  }

  for (const filePath of Object.keys(result)) {
    const filePathForSave = path.resolve(rootPath, filePath)
    let fileData = result[filePath]

    if (isMerge) {
      const fileDataRaw = fs.readFileSync(filePathForSave).toString()
      if (fileDataRaw.length) {
        const raw = JSON.parse(fileDataRaw)
        fileData = Object.assign({}, raw, fileData)
      }
    }

    fs.writeFileSync(filePathForSave, JSON.stringify(fileData, null, 2), 'utf-8')
  }
}

void run()
