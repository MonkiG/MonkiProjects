type link = `/${string}`
type element = `<${string}></${string}>`

interface Routes {
  link: link
  element: element
}
// hacer un observer
export default class AppRouter extends HTMLElement {
  routes: Routes[]
  path: string

  constructor (routes: Routes[]) {
    super()
    this.routes = (this.dataset.routes ? JSON.parse(this.dataset.routes) : routes) || []
    this.path = window.location.pathname
  }

  static observedAttributes = ['data-routes']

  attributeChangedCallback (nameV: string, _oldV: string, newV: string): void {
    if (nameV === 'data-routes') this.routes = JSON.parse(newV)
    this.init()
  }

  connectedCallback (): void {
    this.init()
  }

  // Event for buttons
  onRouteChange (e: Event): void {
    const target = e.target as Window & { location: Location }
    if (!target) return
    const newRoute = target.location.pathname
    this.path = newRoute
    this.init()
  }

  init (): void {
    this.routes.forEach(route => {
      if (route.link === this.path) {
        this.innerHTML = route.element
      }
    })

    window.addEventListener('routechange', (e) => { this.onRouteChange(e) })
    window.addEventListener('popstate', (e) => { this.onRouteChange(e) })
  }
}

customElements.define('app-router', AppRouter)
