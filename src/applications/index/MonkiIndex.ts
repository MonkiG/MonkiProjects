import ShadowError from '../../../lib/errors/ShadowError'
import { applications } from '../applications'

export default class MonkiIndex extends HTMLElement {
  pageApplications = applications
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static Styles = /** Css */`
    :host{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align;items: center;
      height: 100%;
      background-color: white;
      color: black;
      font-family: "Montserrat";
    }

    @media(prefers-color-scheme: dark) {
      :host {
        background-color: #20252c;
        color: white;
       
      }
    }
    main {
      height: 100%;
      border: 1px solid white;
      padding: 1em;
    }
    app-link {
      margin: 0 3px;
    }
  `

  connectedCallback (): void {
    this.render()
  }

  render (): void {
    if (!this.shadowRoot) throw new ShadowError()

    this.shadowRoot.innerHTML = /** Html */`
        <style>${MonkiIndex.Styles}</style>
        <app-header data-title="Monki Vanilla Projects">
          <img slot="logo" style="width: 3%; position: absolute; bottom: 10%; right: 33%; transform: rotate(20deg);" src="https://imgs.search.brave.com/sXYprDxK8_0Up5vaW62rpLfRGZ5J1rxgZsxrNEMqUes/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzRjL1R5cGVzY3Jp/cHRfbG9nb18yMDIw/LnN2Zw.svg"/>
          <img slot="logo" style="width: 3%; position: absolute; bottom: 10%; left: 33%; transform: rotate(-20deg);" src="https://imgs.search.brave.com/XVx3WyaXSz_IcTpX6PT7bANhw9PITQVPdyGkbUFS1b8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL0ovamF2YXNj/cmlwdC1qcy1sb2dv/LTI5NDk3MDE3MDIt/c2Vla2xvZ28uY29t/LnBuZw"/>
        </app-header>
        <main>
          ${this.pageApplications.map(app => `<app-link data-href="${app.link}" data-text="${app.name}"></app-link>`).join('')}
        </main>
        <app-footer></app-footer>
    `
  }
}

customElements.define('app-index', MonkiIndex)
