import style from '~/style.less'

export default function() {
  return <section className={style.login}>
    <section className={style.form}>
      <div className={style.account}>
        <input required></input>
        <label>账号</label>
      </div>
      <div className={style.password}>
        <input required type="password"></input>
        <label>密码</label>
      </div>
    </section>
  </section>
}
