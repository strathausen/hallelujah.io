"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./knexfile"));
exports.default = knex_1.default(process.env.NODE_ENV === 'production' ? knexfile_1.default.production : knexfile_1.default.development);
//# sourceMappingURL=db.js.map