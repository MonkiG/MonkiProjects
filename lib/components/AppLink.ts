import AttributeError from '../errors/AttributeError'
import ShadowError from '../errors/ShadowError'
import { $ } from '../query'

export default class AppLink extends HTMLElement {
  href: string
  text: string
  back?: boolean
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.href = this.dataset.href ?? ''
    this.text = this.dataset.text ?? ''
    this.back = this.hasAttribute('data-back')
    if (!this.href || !this.text) throw new AttributeError()
  }

  connectedCallback (): void {
    this.render()
  }

  #handleClick (): void {
    const anchor = $('a', this.shadowRoot)
    const router = window.history
    if (!anchor) throw new Error('Element not found')
    if (this.back === true) {
      router.back()
      return
    }
    anchor.addEventListener('click', (e) => {
      e.preventDefault()
      router.pushState({}, '', this.href)
      const routeChangeEvent = new Event('routechange')
      window.dispatchEvent(routeChangeEvent)
    })
  }

  render (): void {
    if (!this.shadowRoot) throw new ShadowError()
    this.shadowRoot.innerHTML = /** Html */`
        <a href=${this.href}>${this.text}</a>
    `
    this.#handleClick()
  }
}

customElements.define('app-link', AppLink)
