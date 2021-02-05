"use strict";
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
const koa_router_1 = __importDefault(require("koa-router"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const front_matter_1 = __importDefault(require("front-matter"));
const markdown_it_1 = __importDefault(require("markdown-it"));
const router = new koa_router_1.default();
const md = markdown_it_1.default();
router.get('/:name', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(ctx);
    const { name } = ctx.params;
    const rawArticle = yield fs_extra_1.default.readFile(`${__dirname}/../content/${name}.md`, 'utf8');
    const { attributes, body } = front_matter_1.default(rawArticle);
    attributes.body = md.render(body);
    ctx.body = attributes;
}));
exports.default = router;
//# sourceMappingURL=content.js.map