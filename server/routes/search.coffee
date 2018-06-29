_ = require 'lodash'
Router = require 'koa-router'
db = require '../db.coffee'

router = new Router()

loadEditions = do () ->
  editions = no
  () =>
    editions or= _.groupBy(await db('editions').select('*'), 'abbrev')
    editions

router.get '/editions', (ctx) ->
  editions = await loadEditions()
  ctx.body = _(editions).map((e) -> e[0]).each((e) ->
    e.name = (e.abbrev.split('_')[1])
  )

router.get '/query', (ctx) ->
  { q, limit, edition } = ctx.query
  if !q
    ctx.body = { duration: 0, verses: [] }
    return

  editions = await loadEditions()
  { pg_language } = _.first(editions[edition]) || { pg_language: 'simple' }
  start = Date.now()
  queryPart = 'to_tsquery(:pg_language, unaccent(:q))'
  params = { q, pg_language }
  params.q = params.q.split(/ /).filter((x) => !!x).join('|') + ':*'
  verseQuery = db('search_index')
    .select(
      'id', 'text', 'verse', 'book', 'chapter',
      db.raw("ts_rank(document, #{queryPart}) AS relevancy", params)
    )
    .where('document', '@@', db.raw(queryPart, params))
    .orderBy('relevancy', 'DESC')
    .limit(limit || 10)
  if edition
    verseQuery.where('edition', '=', edition)

  # console.log(verseQuery.toString())
  verses = await verseQuery
  end = Date.now()
  duration = "#{end - start}ms"
  ctx.body = { duration, verses }

module.exports = router
