Koa = require 'koa'
Router = require 'koa-router'
logger = require 'koa-logger'
cors = require '@koa/cors'
koaConnect = require 'koa-connect'
{ Nuxt, Builder } = require 'nuxt'
# Import and Set Nuxt.js options
config = require '../nuxt.config.js'
searchRouter = require './routes/search.coffee'
contentRouter = require './routes/content.coffee'

app = new Koa()
# Instantiate nuxt.js
config.dev = app.env != 'production'
nuxt = new Nuxt config

# server side routes
router = new Router()

# search the bible
router.use '/api/search', searchRouter.routes()

# read content written in markdown
router.use '/api/content', contentRouter.routes()

# bootstrapping the server
app.use logger()
app.use cors()
host = process.env.HOST || '127.0.0.1'
port = process.env.PORT || 3000

app.use router.routes()

# Build in development
# do () ->
if config.dev
  builder = new Builder nuxt
  builder.build()

app.use (ctx, next) ->
  await next()
  # koa defaults to 404 when it sees that status is unset
  ctx.status = 200
  await koaConnect(nuxt.render)(ctx, next)

app.listen port#, host
console.log "Server listening on #{host}:#{port} in #{app.env || 'development'}"
console.log process.env.DATABASE_URL
