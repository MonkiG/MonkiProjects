import AttributeError from '../../../lib/errors/AttributeError'
import ShadowError from '../../../lib/errors/ShadowError'
import { type Timers, type timersTypes } from './types'

export default class MonkidoroTimer extends HTMLElement {
  timers: Timers = {
    pomodoro: {
      name: 'pomodoro',
      time: 25
    },
    short: {
      name: 'Short break',
      time: 5
    },
    long: {
      name: 'Long break',
      time: 15
    }
  }

  timerInterval: any
  activeTimer: timersTypes = 'pomodoro'
  isActive: boolean = false
  time = this.timers[this.activeTimer].time * 60

  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static Styles = /* Css */`
    :host {
      height: 100%;
      margin: 1% 25%;
      display: flex;
      justify-content: center;
    }

    section {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: #fff4;
      padding: 2%;
      width: 90%;
      height: 50%;
      border-radius: 2%
    }

    span {
      display: block;
      font-size: 4em;
      text-align: center;
      padding: 5%
    }

    div:first-of-type{
      display: flex;
      justify-content: space-around;
    }

    div:last-of-type {
      display: flex;
      justify-content: center;
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
      background: none rgba(0, 0, 0, 0.1);
    }
  `
  connectedCallback (): void {
    this.render()
  }

  #addListeners (): void {
    if (!this.shadowRoot) throw new ShadowError()
    const initButton = this.shadowRoot.querySelector('[data-rol="init"]')
    const spanTime = this.shadowRoot.querySelector('span')
    const timerButtons = this.shadowRoot.querySelectorAll<HTMLButtonElement>('[data-timer]')

    if (!initButton || !spanTime || !timerButtons) throw new Error('No element found')

    initButton.addEventListener('click', () => {
      if (this.isActive) {
        this.#pauseTimer()
      } else {
        this.#initTimer()
      }
      this.isActive = !this.isActive
      this.render()
    })

    timerButtons.forEach(button => {
      button.addEventListener('click', () => {
        clearInterval(this.timerInterval as number | undefined)
        this.isActive = false
        initButton.innerHTML = 'Start'
        const { timer } = button.dataset
        if (!timer) throw new AttributeError()
        this.activeTimer = timer as timersTypes
        this.time = this.timers[timer as timersTypes].time * 60
        // spanTime.innerHTML = this.#formatTime(this.time)
        this.render()
      })
    })
  }

  #initTimer (): void {
    this.timerInterval = setInterval(() => {
      this.time -= 1
      this.render()
    }, 1000)
  }

  #pauseTimer (): void {
    clearInterval(this.timerInterval as number)
  }

  #formatTime (seconds: number): string {
    const minutes = seconds / 60
    const secondsRemaining = seconds % 60

    return `${Math.floor(minutes)}:${secondsRemaining < 10 ? 0 : ''}${secondsRemaining}`
  }

  render (): void {
    if (!this.shadowRoot) throw new ShadowError()
    this.shadowRoot.innerHTML = /* Html */`
      <style>${MonkidoroTimer.Styles}</style>
        <section>
          <div>
            <button ${this.activeTimer === 'pomodoro' ? 'class="active"' : ''} data-timer="pomodoro">Pomodoro</button>
            <button ${this.activeTimer === 'short' ? 'class="active"' : ''} data-timer="short">Short Break</button>
            <button ${this.activeTimer === 'long' ? 'class="active"' : ''} data-timer="long">Long Break</button>
          </div>
          <span>${this.#formatTime(this.time)}</span>
          <div>
            <button data-rol="init">${!this.isActive ? 'Start' : 'Pause'}</button>
          </div>
        </section>
    `
    this.#addListeners()
  }
}

customElements.define('monkidoro-timer', MonkidoroTimer)
