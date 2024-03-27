export const $ = (
  element: string,
  context: any = document
): HTMLElement | null => context.querySelector(element)

export const $$ = (
  element: string,
  context: any = document
): NodeListOf<Element> | null => context.querySelectorAll(element)
