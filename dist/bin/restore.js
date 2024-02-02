#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
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
    .addOption(new commander_1.Option('-m, --merge', 'merge content').default(true))
    .option('-p, --path [dir]', 'path for root dir')
    .requiredOption('-d, --dir [name] ', 'base directory for restore');
program.parse();
const opts = program.opts();
const rootPath = ((_a = opts === null || opts === void 0 ? void 0 : opts.path) === null || _a === void 0 ? void 0 : _a.replace(/\/$/, '')) || '.';
const baseDir = (_b = opts === null || opts === void 0 ? void 0 : opts.dir) === null || _b === void 0 ? void 0 : _b.replace(/\/$/, '');
const mode = opts.mode;
const isMerge = opts.merge;
const isInline = opts.inline;
if (isInline && mode === 'single') {
    throw new Error('inline mode working only for mode split');
}
function prepareIsInlineMode(data) {
    if (!isInline)
        return data;
    return Object.keys(data).reduce((acc, el) => {
        const [path, key] = el.split(config_1.DELIMITER);
        if (!acc[path])
            acc[path] = {};
        acc[path][key] = data[el];
        return acc;
    }, {});
}
async function run() {
    const dirForFiles = path_1.default.resolve(rootPath, baseDir);
    let result = {};
    if (mode === 'split') {
        const files = await (0, fast_glob_1.default)(`${dirForFiles}/*.json`);
        if (!files.length) {
            console.log('Files not found. use: [lang].json format file');
            return;
        }
        files.forEach((file) => {
            const fileName = path_1.default.parse(file).base;
            const locale = fileName.split('.')[0];
            const fileDataRaw = fs_1.default.readFileSync(file).toString();
            const fileData = prepareIsInlineMode(JSON.parse(fileDataRaw));
            const filePathKeys = Object.keys(fileData);
            filePathKeys.forEach((filePathLocale) => {
                if (!result[filePathLocale])
                    result[filePathLocale] = {};
                result[filePathLocale][locale] = fileData[filePathLocale];
            });
        });
    }
    if (mode === 'single') {
        const fileDataRaw = fs_1.default.readFileSync(path_1.default.resolve(dirForFiles, 'locales.json')).toString();
        if (!fileDataRaw.length) {
            console.log('Files not found. use: locales.json format file');
            return;
        }
        result = JSON.parse(fileDataRaw);
    }
    Object.keys(result).forEach((filePath) => {
        const filePathForSave = path_1.default.resolve(rootPath, filePath);
        let fileData = result[filePath];
        if (isMerge) {
            const fileDataRaw = fs_1.default.readFileSync(filePathForSave).toString();
            if (fileDataRaw.length) {
                const raw = JSON.parse(fileDataRaw);
                fileData = Object.assign({}, raw, fileData);
            }
        }
        fs_1.default.writeFileSync(filePathForSave, JSON.stringify(fileData, null, 2), 'utf-8');
    });
}
void run();
