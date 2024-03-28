export type currency = 'MXN' | 'USD' | 'CAD' | 'EUR'
export type tipText = `${number}%`
export type tipPlaceholder = 'Meh' | 'Good' | 'Really good' | 'Excellent' | 'none'

export interface Tip {
  value: number
  placeholder: tipPlaceholder
  text: tipText
}

export interface Currency {
  name: currency
  date?: string
  rates: Record<currency, any>
}
