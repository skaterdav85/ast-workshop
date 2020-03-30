const fs = require('fs');
const globby = require('globby');
const glimmer = require('@glimmer/syntax');

// find all template files in the `app/` folder
let templatePaths = globby.sync('app/**/*.hbs', {
  cwd: __dirname,
  absolute: true,
});

for (let templatePath of templatePaths) {
  // read the file content
  let template = fs.readFileSync(templatePath, 'utf8');

  // TODO write your implementation here
  let root = glimmer.preprocess(template);
  glimmer.traverse(root, {
    BlockStatement(node) {
      if (node.path.type === 'PathExpression' && node.path.original === 'unless' && node.inverse) {
        const { line, column } = node.path.loc.start;
        console.log(`Found unless/else in ${templatePath}:${line}:${column}`);
      }
    }
  })
}
