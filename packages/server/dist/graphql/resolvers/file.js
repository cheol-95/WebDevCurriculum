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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dao_1 = require("../../dao");
const dao_2 = __importDefault(require("../../error/error/dao"));
const validation = __importStar(require("../../lib/validation/file"));
exports.default = {
    Query: {
        files: async (parent, args, { user }) => {
            try {
                const rows = await dao_1.File.findAll({
                    attributes: ['name', 'text'],
                    where: {
                        owner_id: user.id,
                    },
                });
                return rows.map((row) => row.dataValues);
            }
            catch (err) {
                throw dao_2.default(err);
            }
        },
        file: async (parent, args, { user }) => {
            const { fileName } = args;
            await validation.getFile(fileName);
            try {
                const file = await dao_1.File.findOne({
                    attributes: ['name', 'text'],
                    where: {
                        owner_id: user.id,
                        name: fileName,
                    },
                });
                return file;
            }
            catch (err) {
                throw dao_2.default(err);
            }
        },
    },
    Mutation: {
        createFile: async (parent, args, { user }) => {
            const { fileName } = args;
            await validation.createFile(fileName);
            try {
                await dao_1.File.create({
                    owner_id: user.id,
                    name: fileName,
                    text: '',
                });
                return true;
            }
            catch (err) {
                throw dao_2.default(err);
            }
        },
        saveFile: async (parent, args, { user }) => {
            const { fileName, text } = args;
            await validation.saveFile(fileName, text);
            try {
                await dao_1.File.update({
                    text,
                }, {
                    where: {
                        owner_id: user.id,
                        name: fileName,
                    },
                });
                return true;
            }
            catch (err) {
                throw dao_2.default(err);
            }
        },
        saveAsFile: async (parent, args, { user }) => {
            const { oldFileName, newFileName, text } = args;
            await validation.saveAsFile(oldFileName, newFileName, text);
            try {
                await dao_1.File.update({
                    name: newFileName,
                    text,
                }, {
                    where: {
                        owner_id: user.id,
                        name: oldFileName,
                    },
                });
                return true;
            }
            catch (err) {
                throw dao_2.default(err);
            }
        },
        deleteFile: async (parent, args, { user }) => {
            const { fileName } = args;
            await validation.deleteFile(fileName);
            try {
                await dao_1.File.destroy({
                    where: {
                        owner_id: user.id,
                        name: fileName,
                    },
                });
                return true;
            }
            catch (err) {
                throw dao_2.default(err);
            }
        },
    },
};
