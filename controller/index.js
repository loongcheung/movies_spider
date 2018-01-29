/**
 * Created by zhanglongyu on 2018/1/24.
 */
const model = require('../database/model');

let Movie = model.movie;

async function getMovieList(curr, limit, query, order) {
    let start = (curr - 1) * limit;
    let sqlOrder = order === 0 ? [['update_data', 'DESC']] : [['score', 'DESC']];
    if (!query) {
        return new Promise((resolve, reject) => {
            Movie.findAll({}).then((res) => {
                let total = res.length - 1;
                if (curr > Math.ceil(total / limit)) {
                    resolve({
                        error_no: -1,
                        alert: '超出总页数'
                    });
                } else {
                    Movie.findAll({
                        limit,
                        offset: start,
                        order: sqlOrder,
                        attributes: ['id','name','createAt','updateAt','version']
                    }).then((res) => {
                        let list = [];
                        for (let l of res) {
                            list.push(l)
                        }
                        resolve({
                            error_no: 0,
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
    } else {
        return new Promise((resolve, reject) => {
            if (query.type && !query.region && !query.language) {
                Movie.findAll({
                    where: {
                        type: {
                            $like: `%${query.type}%`
                        }
                    }
                }).then((res) => {
                    let total = res.length - 1;
                    if (curr > Math.ceil(total / limit)) {
                        resolve({
                            error_no: -1,
                            alert: '超出总页数'
                        });
                    } else {
                        Movie.findAll({
                            limit,
                            order: sqlOrder,
                            offset: start,
                            where: {
                                type: {
                                    $like: `%${query.type}%`
                                }
                            },
                            attributes: ['id','name','createAt','updateAt','version']
                        }).then((res) => {
                            let list = [];
                            for (let l of res) {
                                list.push(l)
                            }
                            resolve({
                                error_no: 0,
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
            } else if (!query.type && query.region && !query.language) {
                Movie.findAll({
                    where: {
                        type: {
                            $like: `%${query.type}%`
                        }
                    }
                }).then((res) => {
                    let total = res.length - 1;
                    if (curr > Math.ceil(total / limit)) {
                        resolve({
                            error_no: -1,
                            alert: '超出总页数'
                        });
                    } else {
                        Movie.findAll({
                            limit,
                            order: sqlOrder,
                            offset: start,
                            where: {
                                region: {
                                    $like: `%${query.region}%`
                                }
                            },
                            attributes: ['id','name','createAt','updateAt','version']
                        }).then((res) => {
                            let list = [];
                            for (let l of res) {
                                list.push(l)
                            }
                            resolve({
                                error_no: 0,
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
            } else if (!query.type && !query.region && query.language) {
                Movie.findAll({
                    where: {
                        type: {
                            $like: `%${query.type}%`
                        }
                    }
                }).then((res) => {
                    let total = res.length - 1;
                    if (curr > Math.ceil(total / limit)) {
                        resolve({
                            error_no: -1,
                            alert: '超出总页数'
                        });
                    } else {
                        Movie.findAll({
                            limit,
                            order: sqlOrder,
                            offset: start,
                            where: {
                                language: {
                                    $like: `%${query.language}%`
                                }
                            },
                            attributes: ['id','name','createAt','updateAt','version']
                        }).then((res) => {
                            let list = [];
                            for (let l of res) {
                                list.push(l)
                            }
                            resolve({
                                error_no: 0,
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
            } else if (query.type && query.region && !query.language) {
                Movie.findAll({
                    where: {
                        $and: {
                            type: {
                                $like: `%${query.type}%`
                            },
                            region: {
                                $like: `%${query.region}%`
                            }
                        }
                    }
                }).then((res) => {
                    let total = res.length - 1;
                    if (curr > Math.ceil(total / limit)) {
                        resolve({
                            error_no: -1,
                            alert: '超出总页数'
                        });
                    } else {
                        Movie.findAll({
                            limit,
                            order: sqlOrder,
                            offset: start,
                            where: {
                                $and: {
                                    type: {
                                        $like: `%${query.type}%`
                                    },
                                    region: {
                                        $like: `%${query.region}%`
                                    }
                                }
                            },
                            attributes: ['id','name','createAt','updateAt','version']
                        }).then((res) => {
                            let list = [];
                            for (let l of res) {
                                list.push(l)
                            }
                            resolve({
                                error_no: 0,
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
            }else if (!query.type && query.region && query.language) {
                Movie.findAll({
                    where: {
                        $and: {
                            region: {
                                $like: `%${query.region}%`
                            },
                            language: {
                                $like: `%${query.language}%`
                            }
                        }
                    }
                }).then((res) => {
                    let total = res.length - 1;
                    if (curr > Math.ceil(total / limit)) {
                        resolve({
                            error_no: -1,
                            alert: '超出总页数'
                        });
                    } else {
                        Movie.findAll({
                            limit,
                            order: sqlOrder,
                            offset: start,
                            where: {
                                $and: {
                                    region: {
                                        $like: `%${query.region}%`
                                    },
                                    language: {
                                        $like: `%${query.language}%`
                                    }
                                }
                            },
                            attributes: ['id','name','createAt','updateAt','version']
                        }).then((res) => {
                            let list = [];
                            for (let l of res) {
                                list.push(l)
                            }
                            resolve({
                                error_no: 0,
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
            }else if (query.type && !query.region && query.language) {
                Movie.findAll({
                    where: {
                        $and: {
                            type: {
                                $like: `%${query.type}%`
                            },
                            language: {
                                $like: `%${query.language}%`
                            }
                        }
                    }
                }).then((res) => {
                    let total = res.length - 1;
                    if (curr > Math.ceil(total / limit)) {
                        resolve({
                            error_no: -1,
                            alert: '超出总页数'
                        });
                    } else {
                        Movie.findAll({
                            limit,
                            order: sqlOrder,
                            offset: start,
                            where: {
                                $and: {
                                    type: {
                                        $like: `%${query.type}%`
                                    },
                                    language: {
                                        $like: `%${query.language}%`
                                    }
                                }
                            },
                            attributes: ['id','name','createAt','updateAt','version']
                        }).then((res) => {
                            let list = [];
                            for (let l of res) {
                                list.push(l)
                            }
                            resolve({
                                error_no: 0,
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
            }else{
                Movie.findAll({
                    where: {
                        type: {
                            $like: `%${query.type}%`
                        }
                    }
                }).then((res) => {
                    let total = res.length - 1;
                    if (curr > Math.ceil(total / limit)) {
                        resolve({
                            error_no: -1,
                            alert: '超出总页数'
                        });
                    } else {
                        Movie.findAll({
                            limit,
                            order: sqlOrder,
                            offset: start,
                            where: {
                                $and: {
                                    type: {
                                        $like: `%${query.type}%`
                                    },
                                    region: {
                                        $like: `%${query.region}%`
                                    },
                                    language: {
                                        $like: `%${query.language}%`
                                    }
                                }
                            },
                            attributes: ['id','name','createAt','updateAt','version']
                        }).then((res) => {
                            let list = [];
                            for (let l of res) {
                                list.push(l)
                            }
                            resolve({
                                error_no: 0,
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
            }
        })
    }
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

async function search(query, curr, limit) {
    return new Promise((resolve, reject) => {
        let start = (curr - 1) * limit;
        Movie.findAll({
            limit,
            offset: start,
            where: {
                $or: {
                    name: {
                        $like: `%${query}%`
                    },
                    actor: {
                        $like: `%${query}%`
                    },
                    director: {
                        $like: `%${query}%`
                    }
                }
            },
            attributes: ['id','name','description','createAt','updateAt','version']
        }).then((res) => {
            let list = [];
            for (let l of res) {
                list.push(l)
            }
            resolve({
                total: list.length,
                list
            })
        }).catch((err) => {
            console.log(err)
        })

    }).catch((err) => {
        console.log(err)
    })
}

module.exports = {
    getMovieList,
    getMovieDetail,
    search
};

