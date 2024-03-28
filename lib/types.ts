export type link = `/${string}`
export type element = `<${string}></${string}>`

export interface Routes {
  link: link
  element: element
  name: string
}
