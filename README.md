# hallelujah.io

> seek, and ye shall find

a simple online bible search tool

uses the texts from bible.json https://github.com/thiagobodruk/bible please support that project

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
- i18n
- consider if Elastic Search would be an option
- support for ü->ue
- import dictionaries (e.g. ispell, https://www.cs.hmc.edu/~geoff/ispell-dictionaries.html )
- synonym support
- Vietnamese: maybe don't unaccent for search?

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install*[see note below]

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

*Note: Due to a bug in yarn's engine version detection code if you are
using a prerelease version of Node (i.e. v7.6.0-rc.1) you will need to either:
  1. Use `npm install`
  2. Run `yarn` with a standard release of Node and then switch back

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
