import style from '~/style.less'
import {nil, delay, client} from '~/util'
import {createReducer} from '~/module'

const {useCallback, useEffect} = React

export default function() {
  const [state, dispatch] = createReducer({
    value: {
      account: '789'
    }
  })

  const onClick = useCallback(() => {
    console.log('ok')
  }, nil)

  return <section className={style.login}>
    <section className={style.form}>
      <div className={style.account}>
        <input required id={style.account} value={state.account} onChange={onClick}></input>
        <label htmlFor={style.account}>账号</label>
      </div>
      <div className={style.password}>
        <input required type="password" id={style.password}></input>
        <label onClick={onClick} htmlFor={style.password}>密码</label>
      </div>
    </section>
  </section>
}
