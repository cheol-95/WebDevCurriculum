"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = exports.User = void 0;
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const file_1 = require("./file");
Object.defineProperty(exports, "File", { enumerable: true, get: function () { return file_1.File; } });
const auth_1 = require("../lib/auth");
const sequelize_1 = require("./sequelize");
user_1.User.hasMany(file_1.File, {
    sourceKey: 'id',
    foreignKey: 'owner_id',
});
file_1.File.belongsTo(user_1.User, {
    targetKey: 'id',
    foreignKey: 'owner_id',
});
(async () => {
    await sequelize_1.sequelize.sync({});
    const isData = await user_1.User.findOne({ where: { email: 'test1' } });
    if (!isData) {
        try {
            const res = ['test1', 'test2', 'test3'].forEach(async (email) => {
                const { salt, digest: password } = await auth_1.getDigest(email, null);
                await user_1.User.create({
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
