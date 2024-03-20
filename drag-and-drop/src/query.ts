export const $ = (
  element: string,
  context = document
): HTMLElement | null => context.querySelector(element)

export const $$ = (
  element: string,
  context: Element | Document = document
): NodeListOf<Element> | null => context.querySelectorAll(element)
