import * as fromTimer from '../reducers/timerReducer'
import * as types from '../constants/actionTypes'

export const set = (type) => (dispatch, getState) => {
  const { duration } = type
  const lapse = duration

  dispatch({
    type: types.TIMER_SET,
    payload: {
      lapse,
      duration,
    },
  })
}

export const start = () => (dispatch, getState) => {
  const currentStart = fromTimer.getStart(getState())
  const lapse = fromTimer.getLapse(getState())
  const duration = fromTimer.getDuration(getState())

  const start = currentStart ? Date.now() - (duration - lapse) : Date.now()
  const interval = setInterval(() => dispatch(tick()), 200)

  dispatch({
    type: types.TIMER_START,
    payload: {
      start,
      interval,
    },
  })
}

export const tick = () => (dispatch, getState) => {
  const start = fromTimer.getStart(getState())
  const duration = fromTimer.getDuration(getState())

  const lapse = start + duration - Date.now()

  if (lapse <= 0) {
    return dispatch(stop())
  }

  dispatch({
    type: types.TIMER_TICK,
    payload: {
      lapse,
    },
  })
}

export const pause = () => (dispatch, getState) => {
  const interval = fromTimer.getInterval(getState())

  clearInterval(interval)

  dispatch({
    type: types.TIMER_PAUSE,
  })
}

export const stop = () => (dispatch, getState) => {
  const interval = fromTimer.getInterval(getState())

  clearInterval(interval)

  dispatch({
    type: types.TIMER_STOP,
  })
}

export default {
  set,
  start,
  tick,
  pause,
  stop,
}