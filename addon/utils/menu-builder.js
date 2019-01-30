import { menuBar, MenuItem } from 'prosemirror-menu';
import { toggleMark } from 'prosemirror-commands';

const faIcon = (name) => {
  let node = document.createElement('i');
  node.setAttribute('class', `fa fa-${name}`);
  return { dom: node };
};

/**
 * Builds a relevant menu based on the schema's default marks.
 */
class MenuBuilder {

  /**
   * @constructor
   * @param {Schema} schema - The Prosemirror Schema
   */
  constructor(schema) {
    this.schema = schema;
  }

  getFullMenu() {
    return menuBar({
      floating: false,
      content: this._buildMenuItems().fullMenu
    });
  }

  /*
   * Given a schema, build the relevant menu items by looking into its default
   * marks.
   *
   */
  _buildMenuItems() {
    let r = {}, type;
    console.log(this.schema.marks);

    if (type = this.schema.marks.strong) {
      r.toggleStrong = this._buildMarkupItem(type, {
        title: 'Bold', icon: faIcon('bold')
      });
    }

    if (type = this.schema.marks.em) {
      r.toggleEm = this._buildMarkupItem(type, {
        title: "Italic", icon: faIcon('italic')
      });
    }

    let compact = (array) => array.filter(x => x);
    r.inlineMenu = compact([r.toggleStrong, r.toggleEm, r.toggleLink]);
    r.fullMenu = [r.inlineMenu];
    return r;
  }

  _buildMarkupItem(markType, options) {
    let passedOptions = {
      active: function(state) {
        return this._setMarkupAsActive(state, markType)
      }.bind(this),
      enable: true
    }

    for (let prop in options) {
      passedOptions[prop] = options[prop]
    }

    return this._buildMenuItem(toggleMark(markType), passedOptions)
  }

  _setMarkupAsActive(state, type) {
    let { from, $from, to, empty } = state.selection;

    if (empty) {
      return type.isInSet(state.storedMarks || $from.marks());
    } else {
      return state.doc.rangeHasMark(from, to, type);
    }
  }

  _buildMenuItem(cmd, options) {
    let passedOptions = {
      label: options.title,
      run: cmd
    }

    for (let prop in options) {
      passedOptions[prop] = options[prop];
    }

    if ((!options.enable || options.enable === true) && !options.select) {
      passedOptions[options.enable ? 'enable' : 'select'] = state => cmd(state);
    }

    return new MenuItem(passedOptions)
  }
};

export default MenuBuilder;
