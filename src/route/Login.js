import style from '~/style.less'
import {nil, client} from '~/util'

const {useEffect, useCallback, useMemo} = React

export default function() {

  const onClick = useMemo(() => {
    console.log('ok')
  }, nil)

  return <section className={style.login}>
    <section className={style.form}>
      <div className={style.account}>
        <input required></input>
        <label>账号</label>
      </div>
      <div className={style.password}>
        <input required type="password"></input>
        <label onClick={onClick}>密码</label>
      </div>
    </section>
  </section>
}
