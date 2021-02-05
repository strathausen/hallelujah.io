import Koa from 'koa'
import Router from 'koa-router'
import logger from 'koa-logger'
import searchRouter from './routes/search'
import contentRouter from './routes/content'

const app = new Koa()
const router = new Router()

router.use('/api/search', searchRouter.routes())

router.use(contentRouter.routes())

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.use(logger())
app.use(router.routes())

app.listen(port)//, host
console.log(`Server listening on ${host}:${port} in ${app.env || 'development'}`)
