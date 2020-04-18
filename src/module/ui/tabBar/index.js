import style from './style.less'
import {nil} from '~/util'

const {useState, useRef, useEffect} = React

export default function (props) {
  const [state, setState] = useState({
    index: props.defaultIndex,
    ref: useRef(),
    cursor: {width: 0, offset: 0}
  })

  useEffect(() => {
    const child = state.ref.current.querySelector(`.${style.active}`)
    state.cursor.width = child.offsetWidth
    state.cursor.offset = child.offsetLeft
    setState({...state})
  }, nil)

  return <ul className={[props.className, style.tab].join(' ')} ref={state.ref}>
    {
      props.items.map((item, i) => {
        return <li
          key={i}
          onClick={(ev) => {
            const el = ev.target
            state.index = i
            state.cursor.width = el.offsetWidth
            state.cursor.offset = el.offsetLeft
            setState({...state})
            props.onChange(i)
          }}
          className={[i === state.index ? style.active : ''].join(' ')}
        >{item}</li>
      })
    }
    <div className={style.cursor}
      style={{
        width: `${state.cursor.width}px`,
        left: `${state.cursor.offset}px`
      }}
    ></div>
  </ul>
}
