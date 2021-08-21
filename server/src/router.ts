import api from './api'
import Router from 'koa-router'

export const router = new Router()

for (const method in api) {
  router.get(method, (ctx) => {
    ctx.body = api[method](ctx.params)
  })
}

