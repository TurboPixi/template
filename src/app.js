import routes from './route'
import style from '~/style.less'
import {hot} from 'react-hot-loader/root'
import cache, {createReducer} from '~/module/state'
import {client} from '~/util'
// import {BrowserRouter, Switch, StaticRouter} from 'react-router-dom'
// import ReactDOM from 'react-dom'
import {Switch, Route, StaticRouter, BrowserRouter} from 'react-router-dom'

// const Router = PROD ? (client ? BrowserRouter : StaticRouter) : hot(client ? BrowserRouter : StaticRouter)
// const {useCallback} = React

// if (client) {
//   ReactDOM.hydrate(
//     <Router><Switch>
//       <Route path="*">
//         <Main></Main>
//       </Route>
//     </Switch></Router>,
//     document.querySelector('.layout')
//   )
// } else {
//   // module.exports = <Switch>
//   //   <Route path="*">
//   //     <Main></Main>
//   //   </Route>
//   // </Switch>
// }

if (client) {
  ReactDOM.hydrate(
    <BrowserRouter><Switch>
     <Route path="*">
       <Main></Main>
     </Route>
   </Switch></BrowserRouter>,
   document.querySelector('.main')
  )
}

export default function(props) {
  return <StaticRouter {...props}><Switch>
    <Route path="*">
      <Main/>
    </Route>
  </Switch></StaticRouter>
}

function Main(props) {
  let state, dispatch

  if (client) {
    ([state, dispatch] = createReducer())
  } else {
    state = {}
  }

  return <section className="main">
    <cache.Provider value={state}>
      <Switch>{loop(routes)}</Switch>
    </cache.Provider>}
  </section>
}

function loop(routes) {
  return routes.map((item, i) => {
    if (item.routes) return loop(item.routes)
    else return <Route key={i} {...item} />
  })
}
