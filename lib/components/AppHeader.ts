import AttributeError from '../errors/AttributeError'
import ShadowError from '../errors/ShadowError'

class AppHeader extends HTMLElement {
  title: string
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.title = this.dataset.title ?? ''
    if (!this.title) throw new AttributeError()
  }

  static Styles = /* Css */`
    :host {
      width: 100%;
      text-align: center;
      position: relative;
    }

    header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        padding: 1%;
    }

    h1 {
      margin: 0;
    }

  `
  connectedCallback (): void {
    this.render()
  }

  render (): void {
    if (!this.shadowRoot) throw new ShadowError()
    this.shadowRoot.innerHTML = /* Html */`
        <style>${AppHeader.Styles}</style>
        <header>
            <h1>${this.title} </h1>
            <slot name="logo"></slot>
            <slot name="children"></slot>
        </header>
    `
  }
}

customElements.define('app-header', AppHeader)
