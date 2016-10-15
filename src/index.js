/**
 * Copyright 2016, Philipp Paul<philipp.paul@deliveryhero.at>
 */

/**
 * This is a Babel plugin that replaces all instances of "debug" with
 * "if(process.env.DEBUG === true" to allow dead-code removal in
 * minifiers and to make it easier to write debug and dev-specific code.
 */

module.exports = function (babel) {
  var t = babel.types;

  function unnamedReplacement(body) {
    return t.ifStatement(
        t.binaryExpression(
            '===',
            t.memberExpression(
                t.memberExpression(
                    t.identifier('process'),
                    t.identifier('env'),
                    false
                ),
                t.identifier('DEBUG'),
                false
            ),
            t.stringLiteral('true')
        ),
        body
    );
  }

  function namedReplacement(body, name) {
    return t.ifStatement(
        t.logicalExpression('||',
            t.binaryExpression(
                '===',
                t.memberExpression(
                    t.memberExpression(
                        t.identifier('process'),
                        t.identifier('env'),
                        false
                    ),
                    t.identifier('DEBUG'),
                    false
                ),
                t.stringLiteral('true')
            ),
            t.binaryExpression(
                '===',
                t.memberExpression(
                    t.memberExpression(
                        t.identifier('process'),
                        t.identifier('env'),
                        false
                    ),
                    t.identifier('DEBUG'),
                    false
                ),
                t.stringLiteral(name)
            )
        ),
        body
    );
  }

  return {
    visitor: {
      LabeledStatement: function (path) {
        if (path.node.label.name === 'debug') {
          path.replaceWith(unnamedReplacement(path.node.body))
        } else if (/^debug_([a-z_]+)$/g.test(path.node.label.name)) {
          var match = /^debug_([a-z_]+)$/g.exec(path.node.label.name);
          path.replaceWith(namedReplacement(
              path.node.body,
              match[1]
          ))
        }
      }
    }
  };
};
