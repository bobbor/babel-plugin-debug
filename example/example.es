module.exports = function() {
  console.log('DEBUG: ', process.env.DEBUG, '\n-----------------');

  console.log('production output');

  debug: {
    console.log('debug output');
  }

  debug_scope: {
    console.log('debug output with scope')
  }


  console.log('-----------------\n\n');
};
