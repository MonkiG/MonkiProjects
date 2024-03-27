export default class AttributeError extends Error {
  constructor () {
    super()
    this.name = 'Attribute error'
    this.message = 'This element doesn\'t have the attribute needed'
  }
}
