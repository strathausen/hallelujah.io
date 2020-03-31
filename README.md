# hallelujah.io

> seek, and ye shall find

a simple online holy scripture search tool

supports the texts from bible.json https://github.com/thiagobodruk/bible

however the database schema is religion agnostic

## TODO

- fuzzy text search, see http://rachbelaid.com/postgres-full-text-search-is-good-enough/
- get more bible versions:
  - https://github.com/honza/bibles
  - http://www.hackathon.bible/data.html
  - https://github.com/wasdin/SWORD-to-JSON
  - get a hebrew version
- better old english stemming support in postgres (e.g. `worship` vs `worshippeth`, `thou` as a stopword)
- maybe look into other full text search solutions (elastic search, lucene)
- also index for context, synonyms, thesaurus, commentary, bible synonym lists
- support for ü->ue
- import dictionaries (e.g. ispell, https://www.cs.hmc.edu/~geoff/ispell-dictionaries.html )
- synonym support
- Vietnamese, and other languages? -> maybe don't unaccent for search?
- use context (e.g. previous and next verse) and ranking for queries

## Build Setup

``` bash
# install dependencies
$ npm install

# install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```
