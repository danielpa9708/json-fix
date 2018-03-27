const cmd = require("node-cmd");
const expect = require("chai").expect;
const fs = require("fs-extra");
const path = require("path");
const util = require("util");

const get = util.promisify(cmd.get);

describe("json-fix", function () {
    const indexsrc = path.resolve(__dirname, "../index.js");
    before(async function() {
        await fs.ensureDir(path.join(__dirname, "fixture"));
    });
    after(async function() {
        await fs.remove(path.join(__dirname, "fixture"));
    });
    it("should work with exapmle", async function() {
        const testsrc =  path.join(__dirname, "fixture/test.json");
        const testjson =  "{a:3,b:2}"
        const command = `node ${indexsrc} ${testsrc}`;
        const expected = `{
  "a": 3,
  "b": 2
}
`;
        await fs.writeFile(testsrc, testjson);
        await get(command);
        const result = await fs.readFile(testsrc);
        expect(result.toString()).to.be.eq(expected);
    });
});