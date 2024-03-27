import { $ } from '../../../lib/query'

class DraggableContainer extends HTMLElement {
  parentShadow?: ParentNode | null
  constructor () {
    super()
    this.parentShadow = this.parentElement!.parentNode

    if (!this.parentShadow) throw new Error('No element found')
  }

  handleEvent (event: Event): void {
    const type = event.type
    if (type === 'dragover') event.preventDefault()
    if (type === 'drop') this.#handleDrop(event as DragEvent)
  }

  #handleDrop (e: DragEvent): void {
    const dataTransfer = e.dataTransfer
    const target = e.target as HTMLElement

    if (!dataTransfer) throw new Error('No data transfer found')

    const draggedElementId = dataTransfer.getData('text/plain')
    const draggedElement = $(`[data-id="${draggedElementId}"]`, this.parentShadow!)
    if (!draggedElement) throw new Error('No element found')
    target.appendChild(draggedElement)
  }

  connectedCallback (): void {
    this.addEventListener('dragover', this)
    this.addEventListener('drop', this)
  }
}

customElements.define('draggable-container', DraggableContainer)
