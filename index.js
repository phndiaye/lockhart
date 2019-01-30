'use strict';

module.exports = {
  name: require('./package').name,

  isDeveloppingAddon() {
    return true;
  },

  included(app) {
    app.import('vendor/lockhart-editor.css');
  }
};
