import { type Routes } from '../../lib/types'

export const applications: Routes[] = [
  { link: '/', element: '<app-index></app-index>', name: 'Index' },
  { link: '/monkidoro', element: '<app-monkidoro></app-monkidoro>', name: 'Monkidoro' },
  { link: '/monki-drag-drop', element: '<app-monki-drag-drop></app-monki-drag-drop>', name: 'Monki drag and drop' },
  { link: '/monki-tips', element: '<app-monki-tips></app-monki-tips>', name: 'Monki tips' }
]
