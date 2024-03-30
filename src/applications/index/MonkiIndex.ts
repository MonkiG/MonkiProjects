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
      height: 100%;
      background-color: white;
      color: black;
      font-family: "Montserrat";
      box-sizing: border-box;
      background-color: #eee;
    }
    header {
      text-align: center;

    }
    h1::before {
      content: url("/js.svg");
      display: inline-block;
      margin: 0 1%;
      vertical-align: -20%;
      transform: rotate(-20deg) ;
    }
    h1::after {
      content: url("ts.svg");
      display: inline-block;
      margin: 0 1%;
      vertical-align: -20%;
      transform: rotate(20deg) ;
    }
    main {
      height: 100%;
      padding: 1em;
      display: flex;
      align-items: start;
      flex-flow: row wrap;
    }
    app-link {
      margin: 0 3px;
    }

    /*Media queries*/

    @media(prefers-color-scheme: dark) {
      :host {
        background-color: #20252c;
        color: white;
       
      }
    }
    @media(530px >= width){
      body{
        height: 100vh;
      }
      h1 {
        font-size: 1.5em;
      }
      h1::before {
        transform: rotate(-20deg) scale(70%);
        vertical-align: -30%;
        margin-left: 0;
        
      }
      h1::after {
        transform: rotate(20deg) scale(70%);
        vertical-align: -30%;
        margin-right: 0;
        
      }
      main {
        margin: 0;
        padding: 0;
        flex-direction: column;
        justify-content: start;

      }
      app-link {
        width: 100%;
        margin: 1px 0;
      }
    }
  `

  connectedCallback (): void {
    this.render()
  }

  render (): void {
    if (!this.shadowRoot) throw new ShadowError()

    this.shadowRoot.innerHTML = /** Html */`
        <style>${MonkiIndex.Styles}</style>
        <header><h1>Monki Vanilla Projects</h1></header>
       
        <main>
          ${this.pageApplications.map(app => `<app-link data-href="${app.link}" data-text="${app.name}"></app-link>`).join('')}
        </main>
        <app-footer></app-footer>
    `
  }
}

customElements.define('app-index', MonkiIndex)
/**
 *  <app-header data-title="">
          <img slot="logo" style="width: 3%; position: absolute; bottom: 10%; right: 33%; transform: rotate(20deg);" src="https://imgs.search.brave.com/sXYprDxK8_0Up5vaW62rpLfRGZ5J1rxgZsxrNEMqUes/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzRjL1R5cGVzY3Jp/cHRfbG9nb18yMDIw/LnN2Zw.svg"/>
          <img slot="logo" style="width: 3%; position: absolute; bottom: 10%; left: 33%; transform: rotate(-20deg);" src="https://imgs.search.brave.com/XVx3WyaXSz_IcTpX6PT7bANhw9PITQVPdyGkbUFS1b8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL0ovamF2YXNj/cmlwdC1qcy1sb2dv/LTI5NDk3MDE3MDIt/c2Vla2xvZ28uY29t/LnBuZw"/>
        </app-header>
 */
