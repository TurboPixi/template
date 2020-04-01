import style from '@/src/style.less'
import {Avatar} from 'antd'
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons'
import cache from '../../modules/state'
const {useContext} = React

export default function(props) {
  const ctx = useContext(cache)
  const Icon = ctx.folded ? MenuUnfoldOutlined : MenuFoldOutlined
  return <section className={style['header']}>
    <Icon onClick={() => ctx.toggle(!ctx.folded)}></Icon>
    <Avatar size="large">{ctx.user.name}</Avatar>
  </section>
}
