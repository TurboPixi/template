import style from '../style.less'
import {Link} from 'react-router-dom'
import {Button} from 'antd'
import cache from '../modules/state'

const {
  useState,
  useEffect,
  useReducer,
  useContext,
  useCallback,
} = React

export default function(props) {
  const ctx = useContext(cache)

  return <section className={style.entry}>
    {ctx.user.name}
    <Button type="primary" onClick={() => {
      ctx.setUser({name: 'JetLu'})
    }}>登录</Button>
    <Link to="/info">test</Link>
  </section>
}
