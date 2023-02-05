#!/usr/bin/env node

import glob from 'fast-glob'
import { Command, Option } from 'commander'

import path from 'path'
import fs from 'fs'

const program = new Command()

program
  .version('0.1.0')
  .description('CLI utils for i18n')
  .addOption(new Option('-m, --mode [type]', 'set mode').choices(['single', 'split']).default('single'))
  .option('-p, --path [dir]', 'path for root dir')
  .requiredOption('-b, --baseDir [name] ', 'base directory for restore')

program.parse()

const opts = program.opts()
const rootPath = opts.path.replace(/\/$/, '') || '.'
const baseDir = opts.baseDir.replace(/\/$/, '')
const mode = opts.mode

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
    files.forEach((file) => {
      const fileName = path.parse(file).base
      const locale = fileName.split('.')[0]
      const fileDataRaw = fs.readFileSync(file).toString()
      const fileData = JSON.parse(fileDataRaw)
      const filePathLocale = Object.keys(fileData)[0]

      if (!result[filePathLocale]) result[filePathLocale] = {}

      result[filePathLocale][locale] = fileData[filePathLocale]
    })
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

  Object.keys(result).forEach((filePath) => {
    const filePathForSave = path.resolve(rootPath, filePath)
    const fileData = result[filePath]

    fs.writeFileSync(filePathForSave, JSON.stringify(fileData, null, 2), 'utf-8')
  })
}

void run()
