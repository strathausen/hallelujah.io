Koa = require 'koa'
Router = require 'koa-router'
logger = require 'koa-logger'
cors = require '@koa/cors'
{ Nuxt, Builder } = require 'nuxt'
# Import and Set Nuxt.js options
config = require '../nuxt.config.js'

# Instantiate nuxt.js
nuxt = new Nuxt config

searchRouter = require './routes/search.coffee'
contentRouter = require './routes/content.coffee'

# server side routes
router = new Router()

# search the bible
router.use '/api/search', searchRouter.routes()

# read content written in markdown
router.use '/api/content', contentRouter.routes()

# bootstrapping the server
app = new Koa()
app.use logger()
app.use cors()
host = process.env.HOST || '127.0.0.1'
port = process.env.PORT || 3000

config.dev = app.env != 'production'

# Build in development
if config.dev
  builder = new Builder nuxt
  builder.build()

app.use router.routes()
app.use (ctx, next) ->
  await next()
  # koa defaults to 404 when it sees that status is unset
  ctx.status = 200
  new Promise (resolve, reject) ->
    ctx.res.on 'close', resolve
    ctx.res.on 'finish', resolve
    nuxt.render ctx.req, ctx.res, (promise) ->
      # nuxt.render passes a rejected promise into callback on error.
      promise.then(resolve).catch(reject)

app.listen port#, host
console.log "Server listening on #{host}:#{port} in #{app.env || 'development'}"
