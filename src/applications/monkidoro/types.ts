export interface Timer {
  name: string
  time: number
}
export type timersTypes = 'pomodoro' | 'short' | 'long'
export type Timers = Record<timersTypes, Timer>
