var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
exports.up = (knex, Promise) => __awaiter(this, void 0, void 0, function* () {
    yield knex.schema.createTable('editions', (table) => {
        table.increments('id').primary();
        table.string('locale');
        table.string('pg_language').comment('Postgres language query to use');
        table.string('name').unique();
        table.string('abbrev').unique();
    });
    yield knex.schema.createTable('books', (table) => {
        table.increments('id').primary();
        table.string('name').index();
        table.string('abbrev').index();
        table.integer('edition_id').references('editions.id').onDelete('cascade').notNull().index();
    });
    yield knex.schema.createTable('chapters', (table) => {
        table.increments('id').primary();
        table.integer('index').index();
        table.integer('book_id').references('books.id').onDelete('cascade').notNull().index();
    });
    yield knex.schema.createTable('verses', (table) => {
        table.increments('id').primary();
        table.integer('index');
        table.text('content');
        table.integer('chapter_id').references('chapters.id').onDelete('cascade').notNull().index();
    });
    yield knex.raw('CREATE EXTENSION IF NOT EXISTS unaccent');
    yield knex.raw(`
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
  `);
    yield knex.raw('CREATE INDEX ON search_index (edition)');
    yield knex.raw('CREATE INDEX ON search_index (id)');
    yield knex.raw('CREATE INDEX ON search_index (verse)');
    yield knex.raw('CREATE INDEX ON search_index (partition)');
    yield knex.raw('CREATE INDEX idx_fts_search ON search_index USING gin(document)');
});
exports.down = (knex, Promise) => __awaiter(this, void 0, void 0, function* () {
    yield knex.raw('DROP MATERIALIZED VIEW IF EXISTS search_index');
    yield knex.schema.dropTable('verses');
    yield knex.schema.dropTable('chapters');
    yield knex.schema.dropTable('books');
    yield knex.schema.dropTable('editions');
});
//# sourceMappingURL=20180126111046_initial.js.map