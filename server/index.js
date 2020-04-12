const fs = require('fs')
const Koa = require('koa')
const React = require('react')
const serve = require('koa-static')
const Router = require('koa-router')
const {default: render} = require('../dist/server.js')

const app = new Koa()
const router = new Router()
const template = fs.readFileSync('dist/index.html', 'utf-8')

router.get('*', async ctx => {
  return render({location: ctx.req.url, context: {}}).then(html => {
    ctx.body = template.replace('<!--root-->', html)
  })
})

app
  .use(serve('.'))
  .use(serve('dist', {index: ''}))
  .use(serve('static'))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8888)
