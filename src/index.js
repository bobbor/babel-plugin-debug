/**
 * Copyright 2016, Philipp Paul<philipp.paul@deliveryhero.at>
 */

/**
 * This is a Babel plugin that replaces all instances of "debug" with
 * "if(process.env.DEBUG === true" to allow dead-code removal in
 * minifiers and to make it easier to write debug and dev-specific code.
 */

module.exports = function(babel) {
    var t = babel.types;

    var DEV_EXPRESSION = t.ifStatement(
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
            t.booleanLiteral(true)
        ),
        t.emptyStatement()
    );

    return {
        visitor: {
            Identifier: function(path) {
                if (t.isIdentifier(path.node, { name: 'debug'})) {
                    path.replaceWith(DEV_EXPRESSION);
                }
            }
        }
    };
};