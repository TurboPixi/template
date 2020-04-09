import routes from './route'
import style from '~/style.less'
import {hot} from 'react-hot-loader/root'
import {cache} from '~/module'
import {client} from '~/util'
import {BrowserRouter, StaticRouter, Switch, Route} from 'react-router-dom'

const Router = PROD ? BrowserRouter : hot(BrowserRouter)

if (client) {
  ReactDOM.render(
    <Router><Switch>
      <Route path="*">
        <Main></Main>
      </Route>
    </Switch></Router>,
    document.querySelector('.layout')
  )
}

export default function(props) {
  return <StaticRouter {...props}>
    <Switch>
      <Route path="*">
        <Main></Main>
      </Route>
    </Switch>
  </StaticRouter>
}


function Main(props) {
  // const [state, dispatch] = createReducer()

  return <section className="main">
    <cache.Provider>
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
