#!/usr/bin/env node

var fs = require("fs");
var program = require("commander");

program
    .version("0.0.0")
    .usage("<file>")
    .parse(process.argv);

program.args.forEach(parse);

function parse(path) {
    var str = fs.readFileSync(path).toString();
    eval("var js = " + str);
    var json = JSON.stringify(js, null, 2);
    fs.writeFileSync(path, json);
}
