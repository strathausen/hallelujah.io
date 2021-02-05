exports.up = async (knex, Promise) => {
  await knex.schema.createTable('editions', (table) => {
    table.increments('id').primary()
    table.string('locale')
    table.string('pg_language').comment('Postgres language query to use')
    table.string('name').unique()
    table.string('abbrev').unique()
  })
  await knex.schema.createTable('books', (table) => {
    table.increments('id').primary()
    table.string('name').index()
    table.string('abbrev').index()
    table.integer('edition_id').references('editions.id').onDelete('cascade').notNull().index()
  })
  await knex.schema.createTable('chapters', (table) => {
    table.increments('id').primary()
    table.integer('index').index()
    table.integer('book_id').references('books.id').onDelete('cascade').notNull().index()
  })
  await knex.schema.createTable('verses', (table) => {
    table.increments('id').primary()
    table.integer('index')
    table.text('content')
    table.integer('chapter_id').references('chapters.id').onDelete('cascade').notNull().index()
  })
  await knex.raw('CREATE EXTENSION IF NOT EXISTS unaccent')
  await knex.raw(`
CREATE MATERIALIZED VIEW search_index AS
SELECT verses.id,
       verses.content AS text,
       verses.index AS verse,
       floor(random() * 10 + 1)::int AS partition,
       books.name AS book,
       editions.abbrev AS edition,
       chapters.index AS chapter,
       chapters.id AS chapter_id,
       editions.pg_language AS language,
       to_tsvector(editions.pg_language::regconfig, unaccent(verses.content)) AS document
FROM verses
LEFT JOIN chapters ON chapter_id = chapters.id
LEFT JOIN books ON book_id = books.id
LEFT JOIN editions ON edition_id = editions.id
  `)
  await knex.raw('CREATE INDEX ON search_index (edition)')
  await knex.raw('CREATE INDEX ON search_index (id)')
  await knex.raw('CREATE INDEX ON search_index (verse)')
  await knex.raw('CREATE INDEX ON search_index (partition)')
  await knex.raw('CREATE INDEX idx_fts_search ON search_index USING gin(document)')
}

exports.down = async (knex, Promise) => {
  await knex.raw('DROP MATERIALIZED VIEW IF EXISTS search_index')
  await knex.schema.dropTable('verses')
  await knex.schema.dropTable('chapters')
  await knex.schema.dropTable('books')
  await knex.schema.dropTable('editions')
}
