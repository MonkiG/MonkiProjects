import './../lib/components/AppHeader'
import './../lib/components/AppFooter'
import './applications/monkidoro/MonkiDoro'
import './applications/monki-drag-drop/MonkiDragDrop'
import './style.css'
import { $ } from '../lib/query'

const body = $('body')!

const path = window.location.pathname

if (path === '/') {
  body.innerHTML = '<h1>Home</h1>'
}
if (path === '/monki-drag-drop') {
  body.innerHTML = '<app-monki-drag-drop></app-monki-drag-drop>'
}
if (path === '/monkidoro') {
  body.innerHTML = '<app-monkidoro></app-monkidoro>'
}
