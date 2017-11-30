#!/usr/bin/env node

var fs = require("fs");
var program = require("commander");
var packagejson = require("./package.json");

program
    .version(packagejson.version)
    .usage("<file>")
    .parse(process.argv);

program.args.forEach(parse);

function parse(path) {
    var str = fs.readFileSync(path).toString();
    eval("var js = " + str);
    var json = JSON.stringify(js, null, 4);
    fs.writeFileSync(path, json);
}
