#!/usr/bin/env node

var assert = require("assert");
var fs = require("fs");
var getStdin = require("get-stdin");
var jsonic = require("jsonic");
var program = require("commander");
var sortJson = require("good-sort-json");
var packagejson = require("../package.json");
var inflect = require("inflect-json");

var allowedInflection = ["none", "pascalcase"];

program
  .version(packagejson.version)
  .option("-s, --spaces <amount>", "Number of spaces for indentation", parseInt)
  .option("-i, --inflection <none|pascalcase>", "Inflection type, defaults to none")
  .option("--no-sort", "Don't sort")
  .usage("[options] [file ...]")
  .parse(process.argv);

var spaces = program.spaces;
if (spaces === undefined) {
  spaces = 4;
}
var spaces = spaces;
var sort = program.sort;
var inflection = program.inflection || allowedInflection[0];
assert([allowedInflection].indexOf(inflection), `Inflection ${inflection} not allowed`);

if (program.args.length) {
  program.args.forEach(parse);
} else {
  getStdin()
    .then((src) => {
      const result = parseString(src);
      process.stdout.write(result);
    })
    .catch((err) => {
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
  if (inflection === "pascalcase") {
    js = inflect.pascalcase(js);
  }
  if (sort) {
    return sortJson(js, { space: spaces }) + "\n";
  } else {
    return JSON.stringify(js, null, spaces) + "\n";
  }
}
