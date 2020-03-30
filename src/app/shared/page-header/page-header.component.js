import {css, html, LitElement} from "lit-element";
import style from "./page-header.component.scss";

export class PageHeaderComponent extends LitElement {
  static get styles() {
    return css([style]);
  }

  render() {
    return html`
    <div class="header">
        <div class="title">
            <slot></slot>
        </div>
    </div>

    `;
  }
}
