'use strict';

const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: require('./package').name,

  isDeveloppingAddon() {
    return true;
  },

  included(app) {
    this.import('node_modules/font-awesome/css/font-awesome.min.css');
    app.import('vendor/lockhart-editor.css');
  },

  treeForPublic() {
    let trees = [];
    let publicTree = this._super.treeForPublic.apply(this, arguments);

    if (publicTree) {
      trees.push(publicTree);
    }

    trees.push(
      new Funnel('node_modules/font-awesome/fonts/', {
        srcDir: '/',
        include: ['**/*.woff', '**/*.woff2'],
        destDir: 'fonts'
      })
    );

    return mergeTrees(trees);
  }
};
