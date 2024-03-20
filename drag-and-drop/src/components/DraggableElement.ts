class DraggableElement extends HTMLElement {
  id: string
  constructor () {
    super()
    this.id = this.dataset.id ?? crypto.randomUUID()
    this.setAttribute('draggable', 'true')
    this.style.display = 'block'
  }

  handleEvent (event: Event): void {
    const type = event.type

    if (type === 'dblclick') this.#handleDoubleClick()
    if (type === 'focusout') this.#handleFocusOut()
    if (type === 'input') this.#handleInput()
    if (type === 'dragstart') this.#handleDragStart(event)
  }

  connectedCallback (): void {
    this.addEventListener('dblclick', this)
    this.addEventListener('focusout', this)
    this.addEventListener('input', this)
    this.addEventListener('dragstart', this)
  }

  disconnectedCallback (): void {
    this.removeEventListener('dblclick', this)
    this.removeEventListener('focusout', this)
    this.removeEventListener('input', this)
    this.removeEventListener('dragstart', this)
  }

  #handleDoubleClick (): void {
    this.setAttribute('contenteditable', 'true')
    this.focus()
  }

  #handleFocusOut (): void {
    this.removeAttribute('contenteditable')
  }

  #handleInput (): void {
    const text = this.textContent
    if (text === '') {
      this.style.height = '1.5em'
      this.style.width = '1.5em'
    } else {
      this.style.height = ''
      this.style.width = ''
    }
  }

  #handleDragStart (e: DragEventInit): void {
    const dataTransfer = e.dataTransfer
    if (!dataTransfer) throw new Error('No data transfer found')

    dataTransfer.setData('text/plain', this.id)
    dataTransfer.setData('text/html', this.outerHTML)
    dataTransfer.dropEffect = 'move'
    dataTransfer.effectAllowed = 'copyMove'
  }
}

customElements.define('draggable-element', DraggableElement)
