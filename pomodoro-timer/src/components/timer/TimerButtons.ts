import ShadowError from '../../Errors/ShadowError'
import { type timersTypes } from './types'

export default class TimerButtons extends HTMLElement {
  activeButton: timersTypes
  constructor () {
    super()
    this.attachShadow({
      mode: 'open'
    })
    this.activeButton = this.dataset.timerType as timersTypes
  }

  static Styles = /* Css */`
    :host {
        display: flex;
        justify-content: space-around;
    }

    button {
        color: inherit;
        background-color: inherit;
        font-size: 1em;
        border: none 5px;
        padding: 1% 2%;
        border-radius: 5px;
        cursor: pointer
    }

    .active {
        font-weight: bold;
        background: none rgba(0, 0, 0, 0.25);
    }
  `
  static get observedAttributes (): string[] {
    return ['data-timer-type']
  }

  attributeChangedCallback (name: string, _oldV: string, newV: string): void {
    if (name === 'data-timer-type') {
      this.activeTimer = newV as timersTypes
    }

    this.render()
  }

  connectedCallback (): void {
    this.render()
  }

  render (): void {
    if (!this.shadowRoot) throw new ShadowError()
    this.shadowRoot.innerHTML = /* HTML */`
        <style>${TimerButtons.Styles}</style>
        <button ${this.activeTimer === 'pomodoro' ? 'class="active"' : ''}>Pomodoro</button>
        <button ${this.activeTimer === 'short' ? 'class="active"' : ''}>Short Break</button>
        <button ${this.activeTimer === 'long' ? 'class="active"' : ''}>Long Break</button>
    `
  }
}

customElements.define('timer-buttons', TimerButtons)
