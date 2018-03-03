Koa = require 'koa'
Router = require 'koa-router'
{ Nuxt, Builder } = require 'nuxt'

searchRouter = require './routes/search.coffee'
contentRouter = require './routes/content.coffee'

router = new Router()
router.use '/api/search', searchRouter.routes()
router.use '/api/content', contentRouter.routes()

do () ->
  app = new Koa()
  host = process.env.HOST || '127.0.0.1'
  port = process.env.PORT || 3000

  # Import and Set Nuxt.js options
  config = require '../nuxt.config.js'
  config.dev = app.env != 'production'

  # Instantiate nuxt.js
  nuxt = new Nuxt config

  # Build in development
  if config.dev
    builder = new Builder nuxt
    await builder.build()

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

  app.listen port, host
  console.log "Server listening on #{host}:#{port} node version #{process.version}"
