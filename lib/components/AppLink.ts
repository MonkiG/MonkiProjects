import AttributeError from '../errors/AttributeError'
import ShadowError from '../errors/ShadowError'
import { $ } from '../query'

export default class AppLink extends HTMLElement {
  href: string
  text: string
  color?: string
  back?: boolean
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.href = this.dataset.href ?? ''
    this.text = this.dataset.text ?? ''
    this.color = this.dataset.text
    this.back = this.hasAttribute('data-back')
    if (!this.href || !this.text) throw new AttributeError()
  }

  styles = /** Css */`
    :host{
      border: 1px solid black;
      border-radius: 3px;
      padding: 0.5rem;
      position: relative;
      font-family: 'Montserrat';
      cursor: pointer;
      box-sizing: border-box;
    }
    :host(:hover) {
      background-color: #ffde4430;
    }
    a{
      display: inline-block;
      text-decoration: none;
      text-align: center;
      width: 100%;
      color: ${this.color ? this.color : 'black'};
    }
    @media(prefers-color-scheme: dark){
      a{
        color: white;
      }

      :host {
        border: 1px solid #ffd200;
      }
    }
    @media(530px >= width){
      :host {
        padding: 0.5rem 0;
      }
    }
  `

  connectedCallback (): void {
    this.render()
    this.addEventListener('click', this.onClick.bind(this))
  }

  onClick (): void {
    const router = window.history
    if (this.back === true) {
      router.back()
      return
    }
    router.pushState({}, '', this.href)
    const routeChangeEvent = new Event('routechange')
    window.dispatchEvent(routeChangeEvent)
  }

  #handleClick (): void {
    const anchor = $('a', this.shadowRoot)

    if (!anchor) throw new Error('Element not found')

    anchor.addEventListener('click', (e) => {
      e.preventDefault()
    })
  }

  render (): void {
    if (!this.shadowRoot) throw new ShadowError()
    this.shadowRoot.innerHTML = /** Html */`
        <style>${this.styles}</style>
        <a href=${this.href}>${this.text}</a>
    `
    this.#handleClick()
  }
}

customElements.define('app-link', AppLink)
