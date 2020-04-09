const {createContext, useReducer} = React
const {prototype: {toString}, keys} = Object

export default createContext({})

export function createReducer({reducer = _reducer, value = {}} = {}) {
  return useReducer(reducer, value)
}

function _reducer(state, action) {
  let same = true

  for (const k in action) {
    if (!equal(state[k], action[k])) {
      same = false
      break
    }
  }

  return same ? state : {
    ...state,
    ...action
  }
}

function isObject(v) {
  return toString.call(v).includes('Object')
}

function isArray(v) {
  return toString.call(v).includes('Array')
}

function sameType(a, b) {
  return toString.call(a) === toString.call(b)
}

function equal(a, b) {
  const queue = [[a, b]]
  while(queue.length) {
    const [m, n] = queue.pop()
    if (!sameType(m, n)) return
    if (isObject(m) && (keys(m).length === keys(n).length)) {
      for (const k in m) {
        if (!sameType(m[k], n[k])) return
        if (isObject(m[k])) queue.push([m[k], n[k]])
        else if (isArray(m[k])) queue.push([m[k], n[k]])
        else if (m[k] !== n[k]) return
      }
    } else if (isArray(m) && (m.length === n.length)) {
      for (let k = 0; k < m.length; k++) {
        if (!sameType(m[k], n[k])) return
        if (isObject(m[k])) queue.push([m[k], n[k]])
        else if (isArray(m[k])) queue.push([m[k], n[k]])
        else if (m[k] !== n[k]) return
      }
    } else if (m !== n) return
  }

  return true
}
