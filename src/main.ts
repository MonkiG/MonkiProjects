import './../lib/components/AppHeader'
import './../lib/components/AppFooter'
import './../lib/components/AppRouter'
import './../lib/components/AppLink'

import './applications/monkidoro/MonkiDoro'
import './applications/monki-drag-drop/MonkiDragDrop'
import './applications/monki-tips/MonkiTips'

import './style.css'
import { applications } from './applications/applications'
import { $ } from '../lib/query'

const router = $('app-router')

if (!router) throw new Error('Element not found')

router.setAttribute('data-routes', JSON.stringify(applications))
