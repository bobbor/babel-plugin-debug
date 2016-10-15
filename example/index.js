#!/usr/bin/env node
const plugin = require('../');
require("babel-register")({
  extensions: [".es"],
  plugins: [plugin]
});
require('./example.es')();
