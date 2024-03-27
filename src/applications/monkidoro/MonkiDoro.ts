import ShadowError from '../../../lib/errors/ShadowError'
import './MonkidoroTimer'

export default class MonkiDoro extends HTMLElement {
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
        background-color: #ffd200;
        color: black
    }
    hr {
     border: .5px solid #dcaa00; 
      margin: 1% 15%;
  }
  `

  connectedCallback (): void {
    this.render()
  }

  render (): void {
    if (!this.shadowRoot) throw new ShadowError()

    this.shadowRoot.innerHTML = /** Html */`
        <style>${MonkiDoro.Styles}</style>
        <app-header data-title="🍌 Monkidoro timer 🍅"></app-header>
        <hr>
        <monkidoro-timer></monkidoro-timer>
        <app-footer></app-footer>
    `
  }
}

customElements.define('app-monkidoro', MonkiDoro)
