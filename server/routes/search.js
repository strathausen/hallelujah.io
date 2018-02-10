const _ = require('lodash')
const Router = require('koa-router')
const db = require('../db')

const router = new Router()

const loadEditions = (() => {
  let editions
  return async () => {
    if (!editions) {
      editions = _.groupBy(await db('editions').select('*'), 'abbrev')
    }
    return editions
  }
})()

router.get('/', async (ctx) => {
  const { q, limit, edition } = ctx.query
  const editions = await loadEditions()
  const { pg_language } = _.first(editions[edition]) || { pg_language: 'simple' }
  const start = Date.now()
  const queryPart = 'to_tsquery(:pg_language, unaccent(:q))'
  const params = { q, pg_language }
  params.q = params.q.replace(/ /g, '|')
  const verseQuery = db('search_index')
    .select(
      'id', 'text', 'verse', 'book', 'chapter',
      db.raw(`ts_rank(document, ${queryPart}) AS relevancy`, params),
    )
    .where('document', '@@', db.raw(queryPart, params))
    .orderBy('relevancy', 'DESC')
    .limit(limit || 10)
  if (edition) {
    verseQuery.where('edition', '=', edition)
  }
  const verses = await verseQuery
  const end = Date.now()
  const duration = `${end - start}ms`
  ctx.body = { duration, verses }
})

module.exports = router
