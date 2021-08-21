import _ from 'lodash'
import db from '../db'
import Router from 'koa-router'

type Edition = {
  name: string
  abbrev: string
}

const router = new Router()

const loadEditions = (() => {
  let editions: _.Dictionary<any[]> = undefined
  return async  () => {
    if (editions) {
      return editions
    }
    return editions = _.groupBy(await db('editions').select('*'), 'abbrev')
  }
})()

router.get('/editions', async (ctx) => {
  const editions = await loadEditions()
  ctx.body = _.map(editions, (e: any[]) => e[0]).forEach((e: Edition) =>
    e.name = (e.abbrev.split('_')[1])
  )
})

router.get('/query', async (ctx) => {
  const { q, limit, edition } = ctx.query
  if (!q) {
    ctx.body = { duration: 0, verses: [] }
    return
  }

  const editions = await loadEditions()
  const { pg_language } = _.first(editions[edition]) || { pg_language: 'simple' }
  const start = Date.now()
  const queryPart = 'to_tsquery(:pg_language, unaccent(:q))'
  const params = { q, pg_language }
  params.q = params.q.split(/ /).filter((x) => !!x).join('|') + ':*'
  const verseQuery = db('search_index')
    .select(
      'id', 'text', 'verse', 'book', 'chapter',
      db.raw(`ts_rank(document, ${queryPart}) AS relevancy`, params)
    )
    .where('document', '@@', db.raw(queryPart, params))
    .orderBy('relevancy', 'DESC')
    .limit(limit || 10)
  if (edition) {
    verseQuery.where('edition', '=', edition)
  }

  // console.log(verseQuery.toString())
  const verses = await verseQuery
  const end = Date.now()
  const duration = `${end - start}ms`
  ctx.body = { duration, verses }
})

// Entire chapter of the verse
router.get('/chapter/:verseId', async (ctx) => {
  const {verseId} = ctx.params
  const chapterId = db('verses').select('chapter_id').where('id', verseId)
  const verses = await db('verses').select('content', 'index').where('chapter_id', chapterId).orderBy('index')
  ctx.body = {verses}
})

export default router
