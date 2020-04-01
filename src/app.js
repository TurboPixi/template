import routes from './routes'
import {hot} from 'react-hot-loader/root'
import {BrowserRouter, Switch, Route, useRouteMatch} from 'react-router-dom'
import {Sidebar, Header, Breadcrumb} from './modules/ui'
import style from '@/src/style.less'
import cache, {createReducer} from './modules/state'
import Login from './routes/Login'

const Router = PROD ? BrowserRouter : hot(BrowserRouter)
const {useCallback} = React

ReactDOM.render(
  <Router><Switch>
    <Route path="/login" exact={true} component={Login}></Route>
    <Route path="*">
      <Main></Main>
    </Route>
  </Switch></Router>,
  document.querySelector('.layout')
)

function Main(props) {
  const [state, dispatch] = createReducer({
    value: {
      folded: false,
      user: {name: 'unknown'},

      toggle(folded) {
        dispatch({folded})
      },

      setUser: data => {
        dispatch({user: data})
      }
    }
  })

  return <section className="main">
    <cache.Provider value={state}>
      <Sidebar routes={routes} folded={state.folded}></Sidebar>
      <section className="right">
        <Header></Header>
        <Breadcrumb routes={routes}></Breadcrumb>
        <section className="view">
          <Switch>{loop(routes)}</Switch>
        </section>
      </section></cache.Provider>
  </section>
}

function loop(routes) {
  return routes.map((item, i) => {
    if (item.routes) {
      if (item.implicit) return loop(item.routes.concat(item.implicit))
      return loop(item.routes)
    } else {
      return <Route key={i} {...item} />
    }
  })
}
