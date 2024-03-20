export default class ShadowError extends Error {
  constructor () {
    super()
    this.name = 'Shadow root error'
    this.message = 'This element doesn\'t have a Shadow dom'
  }
}
