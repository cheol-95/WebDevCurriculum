"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = exports.User = void 0;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const file_1 = __importDefault(require("./file"));
exports.File = file_1.default;
const auth_1 = require("../lib/auth");
const sequelize_1 = __importDefault(require("./sequelize"));
user_1.default.hasMany(file_1.default, {
    sourceKey: 'id',
    foreignKey: 'owner_id',
});
file_1.default.belongsTo(user_1.default, {
    targetKey: 'id',
    foreignKey: 'owner_id',
});
(async () => {
    await sequelize_1.default.sync({});
    const isData = await user_1.default.findOne({ where: { email: 'test1' } });
    if (!isData) {
        try {
            ['test1', 'test2', 'test3'].forEach(async (email) => {
                const { salt, digest: password } = await auth_1.getDigest(email, null);
                await user_1.default.create({
                    email,
                    password,
                    salt,
                });
            });
        }
        catch (err) {
            console.log('err: ', err);
        }
    }
})();
