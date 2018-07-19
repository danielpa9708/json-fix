#!/usr/bin/env node

const assert = require("assert");
const fs = require("fs");
const getStdin = require("get-stdin");
const jsonic = require("jsonic");
const program = require("commander");
const sortJson = require("good-sort-json");
const packagejson = require("../package.json");
const inflect = require("inflect-json");

const allowedInflection = ["none", "pascalcase"];

program
  .version(packagejson.version)
  .option("-s, --spaces <amount>", "Number of spaces for indentation", parseInt)
  .option("-i, --inflection <none|pascalcase>", "Inflection type, defaults to none")
  .option("--no-sort", "Don't sort")
  .usage("[options] [file ...]")
  .parse(process.argv);

let spaces = program.spaces;
if (spaces === undefined) {
  spaces = 4;
}
const sort = program.sort;
const inflection = program.inflection || allowedInflection[0];
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
  const str = fs.readFileSync(path).toString();
  const json = parseString(str);
  fs.writeFileSync(path, json);
}

function parseString(str) {
  let js = jsonic(str);
  if (inflection === "pascalcase") {
    js = inflect.pascalcase(js);
  }
  if (sort) {
    return sortJson(js, { space: spaces }) + "\n";
  } else {
    return JSON.stringify(js, null, spaces) + "\n";
  }
}
