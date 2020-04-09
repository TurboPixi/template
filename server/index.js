const fs = require('fs')
const Koa = require('koa')
const React = require('react')
const Router = require('koa-router')
const App = require('../dist/server.js').default
const ReactDOMServer = require('react-dom/server')

const app = new Koa()
const router = new Router()
const template = fs.readFileSync('dist/index.html', 'utf-8')

router.get('*', async ctx => {
  const router = React.createElement(App, {
    location: ctx.req.url,
    context: {}
  })

  ctx.body = template.replace('<section class="layout"></section>', ReactDOMServer.renderToString(router))
})

app
  .use(require('koa-static')('dist'))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8888)
