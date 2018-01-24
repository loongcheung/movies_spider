/**
 * Created by zhanglongyu on 2018/1/24.
 */
const model = require('../database/model');

let Movie = model.movie;

async function getMovieList(curr, limit) {
    return new Promise((resolve, reject) => {
        Movie.findAll({}).then((res) => {
            let total = res.length - 1;
            let start = (curr - 1) * limit;
            if (curr > Math.ceil(total / limit)) {
                resolve({
                    alert: '超出总页数'
                });
            } else {
                Movie.findAll({
                    limit,
                    offset: start
                }).then((res) => {
                    let list = [];
                    for (let l of res) {
                        list.push(l)
                    }
                    resolve({
                        total,
                        currentPage: curr,
                        totalPage: Math.ceil(total / limit),
                        list
                    })
                }).catch((err) => {
                    console.log(err)
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    })
}

async function getMovieDetail(id) {
    return new Promise((resolve, reject) => {
        Movie.findAll({
            where: {
                id
            }
        }).then((res) => {
            resolve(res)
        }).catch((err) => {
            console.log(err)
        })
    })
}
/*var options = {
    where :{
        $or: [
            sequelize.where(sequelize.col('office.name'), {$like: 'foo'}),
            sequelize.where(sequelize.col('department.name'), {$like: 'foo'})
        ]
    }
}*/
async function search(query, curr, limit) {
    return new Promise((resolve, reject) => {
        Movie.findAll({}).then((res) => {
            let total = res.length - 1;
            let start = (curr - 1) * limit;
            if (curr > Math.ceil(total / limit)) {
                resolve({
                    alert: '超出总页数'
                });
            } else {
                Movie.findAll({
                    limit,
                    offset: start,
                    where: {
                        $or: {
                            name: query,
                            actor: query,
                            director: query
                        }
                    }
                }).then((res) => {
                    let list = [];
                    for (let l of res) {
                        list.push(l)
                    }
                    resolve({
                        total,
                        currentPage: curr,
                        totalPage: Math.ceil(total / limit),
                        list
                    })
                }).catch((err) => {
                    console.log(err)
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    })
}

module.exports = {
    getMovieList,
    getMovieDetail,
    search
}

