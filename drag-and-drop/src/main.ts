import { $ } from './query'
import './style.css'
import './components/DraggableElement'
import './components/DraggendContainer'

type UUID = `${string}-${string}-${string}-${string}-${string}`

interface Items {
  id: UUID
  content: string
}

const items: Items[] = Array.from({ length: 10 }).map((_, i) => ({ id: window.crypto.randomUUID(), content: `item numero ${i + 1}` }))

const $draggablesContainer = $('#items-draggables')!
console.log($draggablesContainer)
$draggablesContainer.innerHTML += items.map(item => `<draggable-element data-id="${item.id}">${item.content}</draggable-element>`).join('')
