_ = require 'lodash'
Router = require 'koa-router'
fs = require 'fs-extra'
fm = require 'front-matter'
md = do require 'markdown-it'

router = new Router()

router.get '/:name', (ctx) ->
  {name} = ctx.params
  rawArticle = await fs.readFile "#{__dirname}/../content/#{name}.md", 'utf8'
  {attributes, body} = fm rawArticle
  attributes.body = md.render body
  ctx.body = attributes

module.exports = router
