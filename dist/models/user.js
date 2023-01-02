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
exports.MyUserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRound = process.env.SALT_ROUND;
class MyUserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT id, first_name, last_name, login_name FROM users';
                const result = yield database_1.default.query(sql);
                conn.release();
                console.log(result.rows);
                return result.rows;
            }
            catch (err) {
                throw new Error('Can not get Users ${err}');
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT id, first_name, last_name, login_name FROM users WHERE id=$1';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find user ${id}. Error: ${err}`);
            }
        });
    }
    create(b, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO users (first_name, last_name, login_name, password) VALUES($1, $2, $3, $4) RETURNING id, first_name, last_name, login_name';
                const hash = bcrypt_1.default.hashSync(password + pepper, parseInt(saltRound));
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [
                    b.first_name,
                    b.last_name,
                    b.login_name,
                    hash,
                ]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Could not add new user . Error: ${err}`);
            }
        });
    }
    authenticate(loginName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT password FROM users WHERE login_name=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [loginName]);
                conn.release();
                if (result.rows.length) {
                    const user = result.rows[0];
                    if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                        return user;
                    }
                }
                return null;
            }
            catch (err) {
                throw new Error(`Can not authenticate user ${loginName}. Error: ${err}`);
            }
        });
    }
}
exports.MyUserStore = MyUserStore;
