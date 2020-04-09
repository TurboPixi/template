const fs = require('fs')
const Koa = require('koa')
const React = require('react')
const serve = require('koa-static')
const Router = require('koa-router')
const {default: App} = require('../dist/server.js')
const {renderToString} = require('react-dom/server')

const app = new Koa()
const router = new Router()
const template = fs.readFileSync('dist/index.html', 'utf-8')

router.get('*', async ctx => {
  ctx.body = template.replace('<!--root-->', App({location: ctx.req.url, context: {}}))
})

app
  .use(serve('.'))
  .use(serve('dist', {index: ''}))
  .use(serve('static'))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8888)
