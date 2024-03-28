import ShadowError from '../../../lib/errors/ShadowError'
import { $, $$ } from '../../../lib/query'
import { type Currency, type Tip, type currency } from './types'

export default class MonkiTips extends HTMLElement {
  tipsOptions: Tip[] = [
    {
      value: 5,
      text: '5%',
      placeholder: 'Meh'
    },
    {
      value: 10,
      text: '10%',
      placeholder: 'Good'
    },
    {
      value: 15,
      text: '15%',
      placeholder: 'Really good'
    },
    {
      value: 20,
      text: '20%',
      placeholder: 'Excellent'
    }
  ]

  currenciesOptions: Currency[] = [
    {
      name: 'USD',
      rates: {
        MXN: 15.75,
        CAD: 1.49,
        EUR: 0.91,
        USD: 1.00
      }
    }, {
      name: 'MXN',
      rates: {
        MXN: 1.00,
        CAD: 0.08,
        EUR: 0.05,
        USD: 0.06
      }
    }, {
      name: 'EUR',
      rates: {
        MXN: 17.25,
        CAD: 1.64,
        EUR: 1.00,
        USD: 1.10
      }
    }, {
      name: 'CAD',
      rates: {
        MXN: 10.55,
        CAD: 1.00,
        EUR: 0.61,
        USD: 0.67
      }

    }
  ]

  tip: number = 0
  tipPercentage: number = 0
  tipCurrency: currency = 'MXN'

  total: string = ''
  totalCurrency: currency = 'MXN'

  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static Styles = /** Css */`
        :host {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align;items: center;
          height: 100%;
        }
        main {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        input[type=number]::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
    `

  connectedCallback (): void {
    this.render()
  }

  handleEvents (): void {
    const selects = $$('select', this.shadowRoot)
    const form = $('form', this.shadowRoot)
    const input = $('input[name="total-pay"]', this.shadowRoot) as HTMLInputElement

    if (!selects || !form || !input) throw new Error('Element not found')

    form.onsubmit = (e) => { e.preventDefault() }
    selects.forEach(select => {
      select.addEventListener('change', (e: Event) => {
        const { name, value } = e.target as HTMLSelectElement
        if (!name || !value) return

        if (name === 'total-currency') this.totalCurrency = value as currency
        if (name === 'tip-percentage') this.tipPercentage = parseInt(value)
        if (name === 'tip-currency') this.tipCurrency = value as currency

        this.render()
      })
    })

    input.addEventListener('input', (e: Event) => {
      const { inputType, data } = e as InputEvent
      if (inputType === 'insertText') this.total += data
      if (inputType === 'deleteContentBackward') this.total = this.total.slice(0, -1)

      this.render()
    })
    input.focus()
    input.setSelectionRange(this.total.length + 1, this.total.length + 1)
  }

  getTip (): number {
    const tipValueInTipCurrency = (this.tipPercentage * (this.parseTotal() / 100))
    const rateFromTipCurrencyToTotalCurrency = this.currenciesOptions
      .find(currency => currency.name === this.tipCurrency)
      ?.rates[this.totalCurrency]
    return tipValueInTipCurrency / rateFromTipCurrencyToTotalCurrency
  }

  parseTotal (): number {
    return isNaN(parseInt(this.total)) ? 0 : parseInt(this.total) * this.currenciesOptions.find(currency => currency.name === this.totalCurrency)?.rates[this.totalCurrency]
  }

  render (): void {
    if (!this.shadowRoot) throw new ShadowError()

    this.shadowRoot.innerHTML = /** Html */`
        <style>${MonkiTips.Styles}</style>
        <app-header data-title="🍌 Monki Tips 💱"></app-header>
        <main>
          <form method="post">
              <div id="total">
                <label for="total-pay">Total to pay:</label>
                <input name="total-pay" type="text" value="$${this.parseTotal()} ${this.totalCurrency}" placeholder="1300 ${this.totalCurrency}"/>
                <label for="total-currency">Total currency</label>
                <select name="total-currency">
                  <option>Select the total to pay currency</option>
                  ${this.currenciesOptions.map(currency => `<option value="${currency.name}" ${this.totalCurrency === currency.name ? 'selected' : ''}>${currency.name}</option>`).join('')}
                 
                </select>
              </div>
              <div id="tip">
                <label for="tip-percentage">% Tip</label>
                <select name="tip-percentage">
                  <option>Select the percentage to pay</option>
                  ${this.tipsOptions.map(tip => `<option value="${tip.value}" ${this.tipPercentage === tip.value ? 'selected' : ''}>${tip.text}</option>`).join('')}
                 
                </select>
                <label for="tip-currency">Tip currency</label>
                <select name="tip-currency">
                  <option>Select the tip currency</option>
                  ${this.currenciesOptions.map(currency => `<option value="${currency.name}" ${this.tipCurrency === currency.name ? 'selected' : ''}>${currency.name}</option>`).join('')}
                </select>
              </div>
              <div>
                Tip to give: <span>$${this.getTip()} ${this.tipCurrency}</span>
              </div>
          </form>
        </main>
        <app-footer></app-footer>
    `
    this.handleEvents()
  }
}

customElements.define('app-monki-tips', MonkiTips)
