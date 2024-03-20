import ShadowError from '../Errors/ShadowError'

class AppFooter extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static Styles = `
    :host {
        text-align: center;
        width: 100%;
    }

    footer {
        padding: 2%
    }
    
    a {
        margin: 0 5px;
        text-decoration: inherit;
        color: inherit;
    }
  `

  connectedCallback (): void {
    this.render()
  }

  render (): void {
    if (!this.shadowRoot) throw new ShadowError()
    this.shadowRoot.innerHTML = /* Html */`
        <style>${AppFooter.Styles}</style>
        <footer>
            Created by <a href="https://twitter.com/ElMonkiG_" target="_blank" rel="noreferrer">@ElMonkiG_ 🥰</a>
        </footer>
    `
  }
}

customElements.define('app-footer', AppFooter)
