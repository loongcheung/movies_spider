/**
 * Created by zhanglongyu on 2018/1/23.
 */
const db = require('../db');

module.exports = db.defineModel('pets', {
    id: {
        type: db.STRING(50),
        unique: true
    },
    name: db.STRING(100),
    gender: db.BOOLEAN,
    birth: db.STRING(10),
    createdAt: db.BIGINT,
    updatedAt: db.BIGINT,
    version: db.BIGINT
});