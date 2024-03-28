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
      border: 1px solid #ffd200;
      border-radius: 3px;
      padding: 0.5rem;
      position: relative;
      font-family: 'Montserrat';
      cursor: pointeR;
    }
    :host(:hover) {
      background-color: #ffde4430;
    }
    a{
      text-decoration: none;
      color: ${this.color ? this.color : 'inherit'};
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
