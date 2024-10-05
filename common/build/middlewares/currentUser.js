"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const currentUser = (req, res, next) => {
    if (!req.session || !req.session.jwt) {
        return next();
    }
    try {
        const payLoad = jsonwebtoken_1.default.verify(req.session.jwt, process.env.JWT_KEY);
        req.currentUser = payLoad;
    }
    catch (err) {
    }
    next();
};
exports.currentUser = currentUser;
