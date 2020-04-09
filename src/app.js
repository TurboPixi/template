import routes from './route'
import style from '~/style.less'
import {hot} from 'react-hot-loader/root'
import cache, {createReducer} from '~/module/state'
import {BrowserRouter, Switch, Route, useRouteMatch} from 'react-router-dom'

const Router = PROD ? BrowserRouter : hot(BrowserRouter)
const {useCallback} = React

ReactDOM.render(
  <Router><Switch>
    <Route path="*">
      <Main></Main>
    </Route>
  </Switch></Router>,
  document.querySelector('.layout')
)

function Main(props) {
  const [state, dispatch] = createReducer()

  return <section className="main">
    <cache.Provider value={state}>
      <Switch>{loop(routes)}</Switch>
    </cache.Provider>
  </section>
}

function loop(routes) {
  return routes.map((item, i) => {
    if (item.routes) return loop(item.routes)
    else return <Route key={i} {...item} />
  })
}
