"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.saveAsFile = exports.saveFile = exports.createFile = exports.getFile = void 0;
const joi_1 = __importDefault(require("joi"));
const validation_1 = __importDefault(require("../../error/error/validation"));
const getFile = async (fileName) => {
    try {
        const schema = joi_1.default.object({
            fileName: joi_1.default.string().required(),
        });
        await schema.validateAsync({ fileName });
    }
    catch (err) {
        throw validation_1.default(err);
    }
};
exports.getFile = getFile;
const createFile = async (newFileName) => {
    try {
        const schema = joi_1.default.object({
            newFileName: joi_1.default.string().required(),
        });
        await schema.validateAsync({ newFileName });
    }
    catch (err) {
        throw validation_1.default(err);
    }
};
exports.createFile = createFile;
const saveFile = async (fileName, text) => {
    try {
        const schema = joi_1.default.object({
            fileName: joi_1.default.string().required(),
            text: joi_1.default.string().allow('').required(),
        });
        await schema.validateAsync({ fileName, text });
    }
    catch (err) {
        throw validation_1.default(err);
    }
};
exports.saveFile = saveFile;
const saveAsFile = async (oldFileName, newFileName, text) => {
    try {
        const schema = joi_1.default.object({
            oldFileName: joi_1.default.string().required(),
            newFileName: joi_1.default.string().required(),
            text: joi_1.default.string().allow('').required(),
        });
        await schema.validateAsync({ oldFileName, newFileName, text });
    }
    catch (err) {
        throw validation_1.default(err);
    }
};
exports.saveAsFile = saveAsFile;
const deleteFile = async (fileName) => {
    try {
        const schema = joi_1.default.object({
            fileName: joi_1.default.string().required(),
        });
        await schema.validateAsync({ fileName });
    }
    catch (err) {
        throw validation_1.default(err);
    }
};
exports.deleteFile = deleteFile;
