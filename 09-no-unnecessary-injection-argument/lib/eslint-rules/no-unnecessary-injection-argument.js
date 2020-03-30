module.exports = {
  create: function(context) {
    // TODO write your implementation here
    return {
      Property(node) {
        let { key, value } = node;
        if (key.type !== 'Identifier') return;
        if (value.type !== 'CallExpression') return;

        let { callee } = value;
        if (callee.type !== 'Identifier') return;
        if (!['inject', 'service'].includes(callee.name)) return;

        let arg = value.arguments[0];
        if (!arg) return;
        if (arg.type !== 'Literal') return;
        if (arg.value !== key.name) return;

        context.report({
          node,
          message: 'Unnecessary injection argument',
        });
      }
    };
  }
};
