import {withRouter, Link, matchPath} from 'react-router-dom'
import {Menu, SubMenu, Button, Icon} from 'antd'
import style from '@/src/style.less'

export default withRouter(Sidebar)

function Sidebar(props) {
  const {folded, routes, match: {url, path}} = props
  const defaultSelectedKeys = []
  const defaultOpenKeys = []

  let i = 0
  loop: for (const item of routes) {
    if (item.routes) {
      for (const child of item.routes) {
        if (matchPath(url, {path: child.path, exact: true})) {
          defaultSelectedKeys.push(child.path)
          defaultOpenKeys.push(`${i}`)
          break loop
        }
      }
    }

    if (item.implicit) {
      for (const child of item.implicit) {
        if (matchPath(url, {path: child.path, exact: true})) {
          child.pKey && defaultSelectedKeys.push(child.pKey.path)
          defaultOpenKeys.push(`${i}`)
          break loop
        }
      }
    }

    if (matchPath(url, {path: item.path, exact: true})) {
      defaultSelectedKeys.push(item.path)
      break loop
    }

    i++
  }

  return <section className={[style['sidebar'], folded ? style['auto'] : ''].join(' ')}>
    <Menu mode="inline" theme="light" inlineCollapsed={folded}
      defaultSelectedKeys={defaultSelectedKeys}
      defaultOpenKeys={defaultOpenKeys}
    >
      {
        routes.map((item, i) => {
          if (item.routes) {
            return <Menu.SubMenu key={i} title={item.menu}>
              {
                item.routes.map((item, j) => {
                  return <Menu.Item key={item.path}><Link to={item.path}>{item.name}</Link></Menu.Item>
                })
              }
            </Menu.SubMenu>
          } else {
            return <Menu.Item key={item.path}><Link to={item.path}>{item.name}</Link></Menu.Item>
          }
        })
      }
    </Menu></section>
}
