# babel-plugin-debug

[![Build Status](https://travis-ci.org/bobbor/babel-plugin-debug.svg?branch=master)](https://travis-ci.org/bobbor/babel-plugin-debug)
[![npm](https://img.shields.io/npm/v/babel-plugin-debug.svg)](https://npmjs.com/package/babel-plugin-debug)
[![Code Climate](https://codeclimate.com/github/bobbor/babel-plugin-debug/badges/gpa.svg)](https://codeclimate.com/github/bobbor/babel-plugin-debug)
[![Coverage Status](https://coveralls.io/repos/github/bobbor/babel-plugin-debug/badge.svg)](https://coveralls.io/github/bobbor/babel-plugin-debug)  
[![NPM](https://nodei.co/npm/babel-plugin-debug.png)](https://nodei.co/npm/babel-plugin-debug/)

this plugin replaces debug-statements with environment related if-statements which can be garbage-collected by minifiers
  
## how it works

#### example:

    debug: {
        // log something for development
    }

will be converted to

    if(process.env.DEBUG === 'true') {
        // log something for development
    }

so, when the transpiled code is run, the code block will only be executed when run the environment variable `DEBUG` is set.

## use with webpack

when used with webpack you can use the `webpack.DefinePlugin` to pass the `DEBUG` variable

    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'DEBUG': `"${process.env.DEBUG}"`
          }
        })
      ]
      
#### example

    debug: {
        // log something for development
    }
    
and webpack is run with

    DEBUG=true webpack
    
this yields the following output:

    if(true) {
        // log something for development
    }
    
which then can be collected by minifiers

---
when webpack is run with

    webpack
    
then this yields the following output

    if(false) {
        // log something for development
    }
    
where as then the whole block will be thrown to trash by minifiers


### little extra: named debugs

sometimes you want to give scopes to your debug statements so you can do the following:

    debug_myblock: {
        // some debug
    }

then you can enable these with the following

    DEBUG=myblock webpack

this generates the following JS

    if(process.env.DEBUG === 'true' || process.env.DEBUG === 'myblock') {
    
    }

**NOTE**: all scopes are enabled when used with `DEBUG=true` (obviously)
