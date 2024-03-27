import ShadowError from '../../../lib/errors/ShadowError'
import './DraggableElement'
import './DraggendContainer'

export default class MonkiDragDrop extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static Styles = /** Css */`
    :host {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align;items: center;
        height: 100%;
    }
    section {
        border: solid 1px black;
        height: 100%;
        display: flex
    }
    draggable-container{
        border: solid 1px red;
        width: 50%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: auto;
        place-items: center;
    }
    draggable-element{
        text-align: left; 
        border: 1px solid red;
        cursor: move;
    }
  `
  connectedCallback (): void {
    this.render()
  }

  render (): void {
    if (!this.shadowRoot) throw new ShadowError()

    this.shadowRoot.innerHTML = /** Html */`
        <style>${MonkiDragDrop.Styles}</style>
        <app-header data-title="🍌 Monki drag and drop 🤚"></app-header>
        <section>
            <draggable-container id="items-draggables">
                <draggable-element data-id="1">test</draggable-element>
            </draggable-container>
            <draggable-container>

            </draggable-container>
        </section>
        <app-footer></app-footer>
    `
  }
}

customElements.define('app-monki-drag-drop', MonkiDragDrop)
