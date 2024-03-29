#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fast_glob_1 = __importDefault(require("fast-glob"));
const commander_1 = require("commander");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const config_1 = require("./config");
const program = new commander_1.Command();
program
    .version('0.1.0')
    .description('CLI utils for i18n')
    .addOption(new commander_1.Option('-m, --mode [type]', 'set mode').choices(['single', 'split']).default('single'))
    .addOption(new commander_1.Option('-i, --inline', 'is inline mode').default(false))
    .option('-p, --path [dir]', 'path for root dir')
    .requiredOption('-d, --dir [name] ', 'output dir');
program.parse();
const opts = program.opts();
const rootPath = ((_a = opts === null || opts === void 0 ? void 0 : opts.path) === null || _a === void 0 ? void 0 : _a.replace(/\/$/, '')) || '.';
const outDir = `${rootPath}/${opts.dir}`.replace(/\/$/, '');
const mode = opts.mode;
const isInline = opts.inline;
if (isInline && mode === 'single') {
    throw new Error('inline mode working only for mode split');
}
if (!fs_1.default.existsSync(outDir)) {
    fs_1.default.mkdirSync(outDir);
}
function prepareIsInlineMode(data) {
    if (!isInline)
        return data;
    return Object.keys(data).reduce((acc, path) => {
        const elements = data[path];
        Object.keys(elements).forEach((elementKey) => {
            const value = elements[elementKey];
            const newPath = `${String(path)}${config_1.DELIMITER}${String(elementKey)}`;
            acc[newPath] = value;
        });
        return acc;
    }, {});
}
async function run() {
    const files = await (0, fast_glob_1.default)(`${rootPath}/**/*.i18n.json`, {
        cwd: process.cwd(),
        absolute: false,
        onlyFiles: true
    });
    const result = {};
    files.forEach((fileName) => {
        const keyName = fileName.replace(rootPath, '.');
        const data = fs_1.default.readFileSync(fileName).toString('utf-8');
        result[keyName] = JSON.parse(data);
    });
    if (!files.length) {
        console.log('Files not found. use: *.i18n.json format file');
        return;
    }
    fs_1.default.readdirSync(outDir).forEach((f) => fs_1.default.rmSync(`${outDir}/${f}`));
    if (mode === 'split') {
        const locales = {};
        Object.keys(result).forEach((fileName) => {
            const localLocales = Object.keys(result[fileName]);
            localLocales.forEach((locale) => {
                if (!locales[locale])
                    locales[locale] = {};
                locales[locale][fileName] = {};
                locales[locale][fileName] = result[fileName][locale];
            });
        });
        Object.keys(locales).forEach((locale) => {
            const writeData = JSON.stringify(prepareIsInlineMode(locales[locale]), null, 2);
            fs_1.default.writeFileSync(path_1.default.resolve(outDir, `${locale}.json`), writeData, 'utf-8');
        });
    }
    if (mode === 'single') {
        const writeData = JSON.stringify(prepareIsInlineMode(result), null, 2);
        fs_1.default.writeFileSync(path_1.default.resolve(outDir, 'locales.json'), writeData, 'utf-8');
    }
}
void run();
