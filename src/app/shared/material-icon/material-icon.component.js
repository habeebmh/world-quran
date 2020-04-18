import {css, html, LitElement} from "lit-element";
import style from "./marerial-icon.component.scss";

export class MaterialIconComponent extends LitElement {
  static get properties() {
    return {
      decoration: {type: String},
      icon: {type: String}
    }
  }

  constructor() {
    super();
    this.decoration = '';
    this.icon = '';
  }

  static get styles() {
    return css([style]);
  }

  render() {
    return html`<span class="material-icons ${this.decoration}">${this.icon}</span>`;
  }

  firstUpdated() {

  }

}

customElements.define('quran-material-icon', MaterialIconComponent);
