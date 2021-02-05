import chalk from 'chalk'
import knex from 'knex'
import * as _ from 'lodash'
import {readdirSync} from 'fs'
import {resolve, join, basename, extname} from 'path'
import {mapSeries, map} from 'bluebird'
import {development} from '../knexfile'
import {pg_languages, unsupported} from './language_configurations'

const db = knex(development)

const sourcePath = resolve(__dirname, '..', '..', 'bibles', 'bible',  'json')

const replacements: [RegExp, string][] = [[/&#x27;/g, "'"]]

const editions = readdirSync(sourcePath).filter(d => d !== 'index.json') // .slice(3, 4)

type SourceBook = {
  abbrev: string
  name: string
  chapters: string[][]
}

console.log(chalk.keyword('orange')(`reading ${editions.length} editions...`)) // eslint-disable-line
mapSeries(editions, async (edition) => {
  try {
    const books: SourceBook[] = require(join(sourcePath, edition))
    const abbrev = basename(edition).replace(extname(edition), '')
    const [locale] = abbrev.split('_')
    if (unsupported.includes(locale)) {
      return
    }
    console.log(chalk.keyword('dodgerblue')(`starting work on edition ${edition}...`)) // eslint-disable-line
    const pg_language = pg_languages[locale] || pg_languages.default
    const editionRow = {abbrev, locale, pg_language}
    const [edition_id] = await db('editions').insert(editionRow).returning('id')
    await map(books, async (book) => {
      const bookRow = {abbrev: book.abbrev, name: book.name, edition_id}

      const [book_id] = await db('books').insert(bookRow).returning('id')
      await map(book.chapters, async (verses, chapterIndex) => {
        const chapterRow = {book_id, index: chapterIndex + 1}
        const [chapter_id] = await db('chapters').insert(chapterRow).returning('id')
        const verseRows = verses.map((content, verseIndex) => {
          replacements.forEach(([search, replace]) => {
            content = content.replace(search, replace)
          })
          return {index: verseIndex + 1, content, chapter_id}
        })
        await db.batchInsert('verses', verseRows)
      }, {concurrency: 10})
    })
    console.log(chalk.keyword('olivedrab')(`finished edition ${edition}.`)) // eslint-disable-line
  } catch (e) {
    console.log(chalk.keyword('firebrick')(`there was a problem with ${edition}`), e.stack);
  }
}).then(async () => {
  console.log('refreshing indexes...') // eslint-disable-line
  await db.raw('REFRESH MATERIALIZED VIEW search_index')
  console.log('finished refreshing indexes.') // eslint-disable-line
  console.log('done.') // eslint-disable-line
  process.exit()
})
