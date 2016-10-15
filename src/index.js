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

    function replacement(body, scope) {
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
                scope
                    ? t.stringLiteral(scope)
                    : t.booleanLiteral(true)
            ),
            body
        );
    }

    return {
        visitor: {
            LabeledStatement: function(path) {
                if(path.node.label.name === 'debug') {
                    path.replaceWith(replacement(path.node.body))
                } else if(/^debug_([a-z_]+)$/g.test(path.node.label.name)) {
                    var match = /^debug_([a-z_]+)$/g.exec(path.node.label.name);
                    path.replaceWith(replacement(
                        path.node.body,
                        match[1]
                    ))
                }
            }
        }
    };
};
