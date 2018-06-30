require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("koa-router");

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = require("lodash");

/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'hallelujah.io',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'simple and fast bible search' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  modules: ['@nuxtjs/axios'],
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    extend: function extend(config, ctx) {
      config.module.rules.push({
        test: /\.md/,
        loader: 'markdownit-loader'
      });
    }
  },
  watchOptions: { aggregateTimeout: 300, poll: 1000 },
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var Router, _, fm, fs, md, router;

_ = __webpack_require__(1);

Router = __webpack_require__(0);

fs = __webpack_require__(13);

fm = __webpack_require__(12);

md = __webpack_require__(15)();

router = new Router();

router.get('/:name', async function(ctx) {
  var attributes, body, name, rawArticle;
  ({name} = ctx.params);
  rawArticle = (await fs.readFile(`${__dirname}/../content/${name}.md`, 'utf8'));
  ({attributes, body} = fm(rawArticle));
  attributes.body = md.render(body);
  return ctx.body = attributes;
});

module.exports = router;

/* WEBPACK VAR INJECTION */}.call(exports, "server/routes"))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

var Router, _, db, loadEditions, router;

_ = __webpack_require__(1);

Router = __webpack_require__(0);

db = __webpack_require__(11);

router = new Router();

loadEditions = (function() {
  var editions;
  editions = false;
  return async() => {
    editions || (editions = _.groupBy((await db('editions').select('*')), 'abbrev'));
    return editions;
  };
})();

router.get('/editions', async function(ctx) {
  var editions;
  editions = (await loadEditions());
  return ctx.body = _(editions).map(function(e) {
    return e[0];
  }).each(function(e) {
    return e.name = (e.abbrev.split('_')[1]);
  });
});

router.get('/query', async function(ctx) {
  var duration, edition, editions, end, limit, params, pg_language, q, queryPart, start, verseQuery, verses;
  ({q, limit, edition} = ctx.query);
  if (!q) {
    ctx.body = {
      duration: 0,
      verses: []
    };
    return;
  }
  editions = (await loadEditions());
  ({pg_language} = _.first(editions[edition]) || {
    pg_language: 'simple'
  });
  start = Date.now();
  queryPart = 'to_tsquery(:pg_language, unaccent(:q))';
  params = {q, pg_language};
  params.q = params.q.split(/ /).filter((x) => {
    return !!x;
  }).join('|') + ':*';
  verseQuery = db('search_index').select('id', 'text', 'verse', 'book', 'chapter', db.raw(`ts_rank(document, ${queryPart}) AS relevancy`, params)).where('document', '@@', db.raw(queryPart, params)).orderBy('relevancy', 'DESC').limit(limit || 10);
  if (edition) {
    verseQuery.where('edition', '=', edition);
  }
  // console.log(verseQuery.toString())
  verses = (await verseQuery);
  end = Date.now();
  duration = `${end - start}ms`;
  return ctx.body = {duration, verses};
});

module.exports = router;


/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("@koa/cors");

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("koa-connect");

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("koa-logger");

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

var db, dbConfig, knex;

knex = __webpack_require__(14);

dbConfig = __webpack_require__(10);

db = knex(dbConfig.development);

module.exports = db;


/***/ },
/* 12 */
/***/ function(module, exports) {

module.exports = require("front-matter");

/***/ },
/* 13 */
/***/ function(module, exports) {

module.exports = require("fs-extra");

/***/ },
/* 14 */
/***/ function(module, exports) {

module.exports = require("knex");

/***/ },
/* 15 */
/***/ function(module, exports) {

module.exports = require("markdown-it");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

var Builder, Koa, Nuxt, Router, app, builder, config, contentRouter, cors, host, koaConnect, logger, nuxt, port, router, searchRouter;

Koa = __webpack_require__(6);

Router = __webpack_require__(0);

logger = __webpack_require__(8);

cors = __webpack_require__(5);

koaConnect = __webpack_require__(7);

({Nuxt, Builder} = __webpack_require__(9));

// Import and Set Nuxt.js options
config = __webpack_require__(2);

searchRouter = __webpack_require__(4);

contentRouter = __webpack_require__(3);

app = new Koa();

// Instantiate nuxt.js
config.dev = app.env !== 'production';

nuxt = new Nuxt(config);

// server side routes
router = new Router();

// search the bible
router.use('/api/search', searchRouter.routes());

// read content written in markdown
router.use('/api/content', contentRouter.routes());

// bootstrapping the server
app.use(logger());

app.use(cors());

host = process.env.HOST || '127.0.0.1';

port = process.env.PORT || 3000;

app.use(router.routes());

// Build in development
// do () ->
if (config.dev) {
  builder = new Builder(nuxt);
  builder.build();
}

app.use(async function(ctx, next) {
  await next();
  // koa defaults to 404 when it sees that status is unset
  ctx.status = 200;
  return (await koaConnect(nuxt.render)(ctx, next));
});

app.listen(port); //, host

console.log(`Server listening on ${host}:${port} in ${app.env || 'development'}`);

console.log(process.env.DATABASE_URL);


/***/ }
/******/ ]);
//# sourceMappingURL=main.map