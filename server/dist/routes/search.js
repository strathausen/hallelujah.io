"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const db_1 = __importDefault(require("../db"));
const koa_router_1 = __importDefault(require("koa-router"));
const router = new koa_router_1.default();
const loadEditions = (() => {
    let editions = undefined;
    return () => __awaiter(void 0, void 0, void 0, function* () {
        if (editions) {
            return editions;
        }
        return editions = _.groupBy(yield db_1.default('editions').select('*'), 'abbrev');
    });
})();
router.get('/editions', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const editions = yield loadEditions();
    ctx.body = _.map(editions, (e) => e[0]).forEach((e) => e.name = (e.abbrev.split('_')[1]));
}));
router.get('/query', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { q, limit, edition } = ctx.query;
    if (!q) {
        ctx.body = { duration: 0, verses: [] };
        return;
    }
    const editions = yield loadEditions();
    const { pg_language } = _.first(editions[edition]) || { pg_language: 'simple' };
    const start = Date.now();
    const queryPart = 'to_tsquery(:pg_language, unaccent(:q))';
    const params = { q, pg_language };
    params.q = params.q.split(/ /).filter((x) => !!x).join('|') + ':*';
    const verseQuery = db_1.default('search_index')
        .select('id', 'text', 'verse', 'book', 'chapter', db_1.default.raw(`ts_rank(document, ${queryPart}) AS relevancy`, params))
        .where('document', '@@', db_1.default.raw(queryPart, params))
        .orderBy('relevancy', 'DESC')
        .limit(limit || 10);
    if (edition) {
        verseQuery.where('edition', '=', edition);
    }
    // console.log(verseQuery.toString())
    const verses = yield verseQuery;
    const end = Date.now();
    const duration = `${end - start}ms`;
    ctx.body = { duration, verses };
}));
// Entire chapter of the verse
router.get('/chapter/:verseId', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { verseId } = ctx.params;
    const chapterId = db_1.default('verses').select('chapter_id').where('id', verseId);
    const verses = yield db_1.default('verses').select('content', 'index').where('chapter_id', chapterId).orderBy('index');
    ctx.body = { verses };
}));
exports.default = router;
//# sourceMappingURL=search.js.map