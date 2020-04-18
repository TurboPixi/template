import './style.less'
import routes from './route'
import {hot} from 'react-hot-loader/root'
import {cache} from '~/module'
import {client} from '~/util'
import {BrowserRouter, StaticRouter, Switch, Route} from 'react-router-dom'
import {renderToString} from 'react-dom/server'
import {Icon} from '~/module/ui'

const {useState} = React
const Router = PROD ? BrowserRouter : hot(BrowserRouter)

if (client) {
  // ssr use hydrate
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
  return renderToString(<StaticRouter {...props}>
    <Switch>
      <Route path="*">
        <Main></Main>
      </Route>
    </Switch>
  </StaticRouter>)
}

function Main(props) {
  const [state] = useState({})

  return <section className="main">
    <Icon/>
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


// for service work

if (client && navigator.serviceWorker) {
  navigator.serviceWorker.register('sw.js', {
    scope: '/'
  }).then(registraction => {
    console.log(registraction)
  })
}
