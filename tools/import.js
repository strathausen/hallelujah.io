const knex = require('knex')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const Promise = require('bluebird')
const dbConfig = require('../knexfile')
const pg_languages = require('./pg_text_search_languages')

const db = knex(dbConfig.development)

const sourcePath = path.resolve(__dirname, '..', '..', 'bible-json', 'json')

const replacements = [[/&#x27;/g, "'"]]

const editions = fs.readdirSync(sourcePath) // .slice(3, 4)

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
    const bookRow = { abbrev: book.abbrev, name: book.name, edition_id }

    const [book_id] = await db('books').insert(bookRow).returning('id')
    await Promise.map(book.chapters, async (verses, chapterIndex) => {
      const chapterRow = { book_id, index: chapterIndex }
      const [chapter_id] = await db('chapters').insert(chapterRow).returning('id')
      const verseRows = verses.map((content, index) => {
        replacements.forEach(([search, replace]) => {
          content = content.replace(search, replace)
        })
        return { index, content, chapter_id }
      })
      await db.batchInsert('verses', verseRows)
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
