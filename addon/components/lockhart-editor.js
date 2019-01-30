import Component from '@ember/component';

import { DOMParser } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { EditorState } from 'prosemirror-state';
import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import MenuBuilder from '../utils/menu-builder';
import layout from '../templates/components/lockhart-editor';

export default Component.extend({
  layout,

  classNames: ['lockhart'],

  _setupPlugins(schema) {
    console.log('Schema', schema)
    let plugins = [new MenuBuilder(schema).getFullMenu()];

    return plugins.concat(new Plugin({
      props: {
        attributes: { class: 'lockhart__editor' }
      }
    }))
  },

  _buildState(schema) {
    //let doc = DOMParser.fromSchema(schema).parse(
      //document.querySelector('.lockhart__content')
    //);
    return EditorState.create({
      schema,
      //doc,
      plugins: this._setupPlugins(schema)
    });
  },

  didInsertElement() {
    let view = new EditorView(this.element, {
      state: this._buildState(schema)
    });
  }
});
