#!/usr/bin/env node

var fs = require("fs");
var sortJson = require("good-sort-json");
var jsonic = require("jsonic");
var program = require("commander");
var packagejson = require("./package.json");
var getStdin = require("get-stdin")

program
    .version(packagejson.version)
    .option("-s, --spaces [amount]", "Number of spaces for indentation")
    .option("--no-sort", "Don't sort")
    .usage("<file>")
    .parse(process.argv);

var spaces = program.spaces;
if (spaces === undefined) {
    spaces = "4";
}
var spaces = parseInt(spaces);
var sort = program.sort;

if (program.args.length) {
    program.args.forEach(parse);
} else {
    getStdin().then((src) => {
        const result = parseString(src);
        process.stdout.write(result);
    }).catch((err) => {
        console.err(err);
        process.exit(1);
    });
}

function parse(path) {
    var str = fs.readFileSync(path).toString();
    const json = parseString(str);
    fs.writeFileSync(path, json);
}

function parseString(str) {
    var js = jsonic(str);
    if (sort) {
        return sortJson(js, { space: spaces }) + "\n";
    } else {
        return JSON.stringify(js, null, spaces) + "\n";
    }
}
