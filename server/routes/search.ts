import * as _ from 'lodash'

const loadEditions = (() => {
  let editions = undefined
  return async  () => {
    if (editions) {
      return editions
    }
    return editions = _.groupBy(await db('editions').select('*'), 'abbrev')
  }
})()

export const editions = async (req) => {
  const editions = await loadEditions()
  return _(editions).map((e) => e[0]).each((e) =>
    e.name = (e.abbrev.split('_')[1])
  )
}

export const search = async (req) => {
  const { q, limit, edition } = req.query
  if (!q) {
    return { duration: 0, verses: [] }
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
      db.raw("ts_rank(document, #{queryPart}) AS relevancy", params)
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
  return { duration, verses }
}
