import '@polymer/paper-dialog/paper-dialog.js'

import {LitElement, html, css} from 'lit-element';
import style from './verse-symbol-tooltip.component.scss'

export class VerseSymbolTooltipComponent extends LitElement {
  static get properties() {
    return {
      name: {type: String}
    }
  }

  constructor() {
    super();
    this.name = '';
  }

  static get styles() {
    return css([style]);
  }

  render() {
    return html`
    <div @click="${() => this.openDialog()}">
      <slot name="button"></slot>
    </div>
    <paper-dialog id="${this.name}" modal>
      <slot name="content" class="content"></slot>
      <div class="buttons">
        <button class="button" @click="${() => this.closeDialog()}">Close</button>
      </div>
    </paper-dialog>
    `;
  }

  openDialog() {
    const dialog = this.shadowRoot.querySelector(`paper-dialog[id="${this.name}"]`);
    dialog.open();
  }

  closeDialog() {
    const dialog = this.shadowRoot.querySelector(`paper-dialog[id="${this.name}"]`);
    dialog.close();
  }
}
customElements.define('quran-verse-symbol-tooltip', VerseSymbolTooltipComponent);
