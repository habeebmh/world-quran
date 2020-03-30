import {LitElement, html, css} from 'lit-element';
import style from './body.component.scss';


export class BodyComponent extends LitElement {
  static get properties() {
    return {
      translation: {type: String},
      chapters: {type: Array}
    };
  }

  static get styles() {
    return css([style]);
  }

  render() {
    return html`
    <div class="container">
      <slot></slot>
    </div>
    `;
  }
}
