#!/usr/bin/env node

var fs = require("fs");
var jsonic = require("jsonic");
var program = require("commander");
var stringify = require("json-stable-stringify");
var packagejson = require("./package.json");

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

program.args.forEach(parse);

function parse(path) {
    var str = fs.readFileSync(path).toString();
    var js = jsonic(str);
    var json = "";
    if (sort) {
        json = stringify(js, { space: spaces });
    } else {
        json = JSON.stringify(js, null, spaces) + "\n";
    }
    fs.writeFileSync(path, json);
}
