/**
 * Created by zhanglongyu on 2018/1/24.
 */
const db = require('../db');

module.exports = db.defineModel('movie', {
    id: {
        type: db.STRING(50),
        unique: true
    },
    name: db.STRING(100),
    type: db.STRING(100),
    region: db.STRING(50),
    language: db.STRING(50),
    time: db.STRING(20),
    release_data: db.STRING(50),
    update_data: db.STRING(50),
    actor: db.STRING(500),
    director: db.STRING(500),
    description: db.STRING(500),
    thunder: db.STRING(500),
    createAt: db.BIGINT,
    updateAt: db.BIGINT,
    version: db.BIGINT
});