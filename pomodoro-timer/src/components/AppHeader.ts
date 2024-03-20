import ShadowError from '../Errors/ShadowError'

class AppHeader extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static Styles = /* Css */`
    :host {
      width: 100%;
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

    hr {
        border: .5px solid rgba(147, 37, 37, 0.9);
        margin: 1% 15%;
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
            <h1>🍌Monki Pomodoro timer 🍅</h1>
            <hr/>
        </header>
    `
  }
}

customElements.define('app-header', AppHeader)
