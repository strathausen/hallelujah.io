const knex = require('knex')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const Promise = require('bluebird')
const dbConfig = require('../knexfile')
const pg_languages = require('./pg_text_search_languages')

const db = knex(dbConfig.development)

const sourcePath = path.resolve(__dirname, '..', '..', 'bible-json', 'json')

const editions = fs.readdirSync(sourcePath)
// editions = [editions[3]]

console.log(`reading ${editions.length} editions...`) // eslint-disable-line
Promise.mapSeries(editions, async (edition) => {
  console.log(`starting work on edition ${edition}...`) // eslint-disable-line
  const books = require(path.join(sourcePath, edition))
  const abbrev = path.basename(edition).replace(path.extname(edition), '')
  const [locale] = abbrev.split('_')
  const pg_language = pg_languages[locale] || pg_languages.default
  const editionRow = { abbrev, locale, pg_language }
  const [edition_id] = await db('editions').insert(editionRow).returning('id')
  await Promise.map(books, async (book) => {
    const bookRow = { abbrev: book.abbrev, name: book.book, edition_id }

    const [book_id] = await db('books').insert(bookRow).returning('id')
    // nesting
    const chapters = book.chapters.map(chapter => _
      .map(chapter, (verses, index) => ({ index, verses }))[0])
    await Promise.map(chapters, async (chapter) => {
      const chapterRow = { book_id, index: chapter.index }
      const [chapter_id] = await db('chapters').insert(chapterRow).returning('id')
      // nesting
      const verses = _.map(chapter.verses, (content, index) => ({
        index, content, chapter_id,
      }))
      await db.batchInsert('verses', verses)
    }, { concurrency: 10 })
  })
  console.log(`finished edition ${edition}.`) // eslint-disable-line
}).then(async () => {
  console.log('refreshing indexes...') // eslint-disable-line
  await db.raw('REFRESH MATERIALIZED VIEW search_index')
  console.log('finished refreshing indexes.') // eslint-disable-line
  console.log('done.') // eslint-disable-line
  process.exit()
})
