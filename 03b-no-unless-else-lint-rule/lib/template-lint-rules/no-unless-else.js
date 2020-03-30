const Rule = require('ember-template-lint').Rule;

module.exports = class extends Rule {
  visitor() {
    // TODO write your implementation here
    return {
      BlockStatement(node) {
        if (node.path.type === 'PathExpression' && node.path.original === 'unless' && node.inverse) {
          const { line, column } = node.path.loc.start;
          this.log({
            message: 'Found unless/else',
            line,
            column,
            source: this.sourceForNode(node)
          });
        }
      }
    };
  }
};
