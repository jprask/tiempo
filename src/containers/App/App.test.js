import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

describe('<App />', () => {
  it('renders without crashing', () => {
    const props = {
      lapse: 0,
      running: false,
      setTimer: () => {},
      startTimer: () => {},
      pauseTimer: () => {},
      stopTimer: () => {},
    }

    const div = document.createElement('div')
    ReactDOM.render(<App {...props} />, div)
  })
})