'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  const highlightedLanguages = [
    'bash',
    'clike',
    'glsl',
    'go',
    'ini',
    'javascript',
    'json',
    'markup',
    'protobuf',
    'ruby',
    'rust',
    'scss',
    'sql',
    'yaml',
  ];

  let app = new EmberApp(defaults, {
    name: 'cargo',

    babel6: {
      plugins: ['transform-object-rest-spread'],
    },
    'ember-prism': {
      theme: 'twilight',
      components: highlightedLanguages,
    },
    sassOptions: {
      includePaths: ['node_modules/normalize.css'],
    },
    cssModules: {
      extension: 'module.scss',
      intermediateOutputPath: 'app/styles/_modules.scss',
    },
    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg', 'ttf', 'woff', 'woff2'],
    },
  });

  class StripTestSelectorsTransform {
    transform(root) {
      this.syntax.traverse(root, {
        // TODO write your implementation here
        ElementNode(node) {
          node.attributes = node.attributes.filter((node) => {
            return !node.name.trim().startsWith('data-test-');
          });
        }

        // AttrNode(node) {
        //   if (node.name.startsWith('data-test-')) {
        //     return null;
        //   }
        // }
      });

      return root;
    }
  }

  app.registry.add('htmlbars-ast-plugin', {
    name: 'strip-test-selectors',
    plugin: StripTestSelectorsTransform,
  });

  return app.toTree();
};
