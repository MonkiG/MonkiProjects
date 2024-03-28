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
    if (!this.routes.length) throw new Error('Element should have an array of Routes')
  }

  connectedCallback (): void {
    this.init()
  }

  // Event for buttons
  //   onRouteChange (e: Event): void {
  //     const target = e.target as Window & { location: Location }
  //     if (!target) return
  //     const newRoute = target.location.pathname
  //     this.path = newRoute
  //   }

  init (): void {
    this.routes.forEach(route => {
      if (route.link === this.path) {
        this.innerHTML = route.element
      }
    })

    // window.addEventListener('routechange', this.onRouteChange.bind(this))
    // window.addEventListener('popstate', this.onRouteChange.bind(this))
  }
}

customElements.define('app-router', AppRouter)
