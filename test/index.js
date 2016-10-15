const path    = require('path');
const fs      = require('fs');
const assert  = require('assert');
const babel   = require('babel-core');
const plugin  = require('../src');

const trim = (str) => str.replace(/^\s+|\s+$/, '');

describe('babel-plugin-debug', () => {
    const fixturesDir = path.join(__dirname, 'fixtures');
    const options = {
        plugins: [plugin]
    };

    fs.readdirSync(fixturesDir).map((caseName) => {
        it('works for the ' + caseName + ' case', () => {
            const fixtureDir = path.join(fixturesDir, caseName);
            const actualPath    = path.join(fixtureDir, 'src.js');
            const expectedPath  = path.join(fixtureDir, 'result.js');

            const actual    = babel.transformFileSync(actualPath, options).code;
            const expected  = fs.readFileSync(expectedPath, 'utf8');

            assert.equal(trim(actual), trim(expected));
        });
    });
});
