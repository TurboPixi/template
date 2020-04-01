import {Breadcrumb} from 'antd'
import {Link, withRouter, matchPath} from 'react-router-dom'
import style from '@/src/style.less'

export default withRouter(Component)

function Component(props) {
  const {match: {url, path}, routes} = props

  let i = 0
  let paths

  loop: for (const item of routes) {
    paths = [{name: item.name, path: item.path}]
    if (item.routes) {
      for (const child of item.routes) {
        if (matchPath(url, {path: child.path, exact: true})) {
          paths.push({name: child.name, path: child.path})
          break loop
        }
      }
    }

    if (item.implicit) {
      for (const child of item.implicit) {
        if (matchPath(url, {path: child.path, exact: true})) {
          child.pKey && paths.push({...child.pKey})
          paths.push({name: child.name})
          break loop
        }
      }
    }

    if (matchPath(url, {path: item.path, exact: true})) {
      break loop
    }

    i++
  }

  return <Breadcrumb className={style['breadcrumb']}>
    {
      paths.map((item, i) => {
        return <Breadcrumb.Item key={i}>
          {item.path ? <Link to={item.path}>{item.name}</Link> : item.name}
        </Breadcrumb.Item>
      })
    }
  </Breadcrumb>
}
