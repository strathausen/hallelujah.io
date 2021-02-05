"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_static_1 = __importDefault(require("koa-static"));
const search_1 = __importDefault(require("./routes/search"));
const content_1 = __importDefault(require("./routes/content"));
const app = new koa_1.default();
const router = new koa_router_1.default();
const root = 'public';
router.use('/api/search', search_1.default.routes());
router.use(content_1.default.routes());
router.use(koa_static_1.default(root));
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;
app.use(koa_logger_1.default());
app.use(router.routes());
app.listen(port); //, host
console.log(`Server listening on ${host}:${port} in ${app.env || 'development'}`);
//# sourceMappingURL=server.js.map