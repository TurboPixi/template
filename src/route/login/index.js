import style from './style.less'
import {nil, delay, client} from '~/util'

const {useCallback, useState} = React

export default function() {
  const [state, dispatch] = useState({
    account: 'jetlu',
    password: 'ok'
  })

  const onChange = useCallback(({target}) => {
    if (!target?.id) return
    const {id} = target
    id === style.account ?
      state.account = target.value :
      state.password = target.value
    dispatch({
      ...state,
    })
  }, nil)

  return <section className={style.login}>
    <section className={style.form}>
      <div className={style.account}>
        <input required id={style.account} value={state.account} onChange={onChange}></input>
        <label htmlFor={style.account}>账号</label>
      </div>
      <div className={style.password}>
        <input required type="password" id={style.password} value={state.password} onChange={onChange}></input>
        <label htmlFor={style.password}>密码</label>
      </div>
    </section>
  </section>
}
