/**
 * Created by zhanglongyu on 2018/1/24.
 */
const request = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
const HOST = 'https://www.80s.tt';
const model = require('../../database/model');

let Movie = model.movie;

//爬取电影列表
function getMovieList(page) {
    request.get(HOST + '/movie/1-0-0-0-0-0').query({
        page
    }).end((err, res) => {
        const $ = cheerio.load(res.text)
        $('.list_mov').each(async (i, elem) => {
            let href = $(elem).find('.list_mov_poster a').attr('href');
            //拿到链接，进入详情页面
            await getMovieDetails(href).then(res => {
                Movie.create({
                    name: res[0],
                    type: res[1],
                    region:res[2],
                    language: res[3],
                    time: res[4],
                    release_data: res[5],
                    update_data: res[6],
                    actor: res[7],
                    director: res[8],
                    description: res[9],
                    thunder: res[10]
                }).then(function (p) {
                    console.log('created.' + JSON.stringify(p));
                }).catch(function (err) {
                    console.log('failed: ' + err);
                });
            }).catch(err => {
                console.log(err)
            });
        });
        getMoviePost($);
        if (err) {
            console.log(err)
        }
        if ($('.list_mov').length === 24) {
            getMovieList(++page)
        }else {
            return false;
        }
    });
}

async function getMovieDetails(href) {
    let info = [];
    return new Promise((resolve, reject) => {
        request.get(HOST + href).end((err, res) => {
            const $$ = cheerio.load(res.text);
            //获取影片详情
            $$('.movie-info').each((i, elem) => {
                if (i === 2) {
                    return false
                } else {
                    $$(elem).html().split(/<br>/).forEach((item, index) => {
                        if (index === $$(elem).html().split(/<br>/).length - 1) {
                            return false;
                        }
                        let infoArray = $$(item).text().replace(/\s/g, '').split(/\n/);
                        infoArray.forEach(function (iitem, iindex) {
                            info.push(iitem.split('：')[1])
                        });
                    })
                }
            });
            let thunderSrc = '';
            $$('.td-dl-buttons a').each((i,ele)=>{
                thunderSrc += $$(ele).attr('href') + '&&'
            });
            info.unshift($$('#movie_name').text().split(/\s/)[5]);
            info.push($$('#movie_description').text());
            info.push(thunderSrc);
            getMovieScreen($$);
            resolve(info);
            reject(err);
        })
    })
}

function getMoviePost($) {
    $(".list_mov").each(function (i, elem) {
        let imgSrc = $(this).find('.list_mov_poster img').attr("data-original");
        request.get(imgSrc).end((err, res) => {
            let imgPath = "/" + $(this).find('.list_mov_title a').text().replace('/movie/', '') + "." + imgSrc.split(".").pop();
            if (res) {
                fs.writeFile(__dirname + "/static/posts" + imgPath, res.body, "binary",function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        })
    });
}

function getMovieScreen($) {
    $(".img-thumbnail").each(function (i, elem) {
        let imgSrc = $(this).attr("src");
        request.get(imgSrc).end((err, res) => {
            let imgPath = "/" + $('#movie_name').text().split(/\s/)[5] + "." + imgSrc.split(".").pop();
            if (res) {
                fs.writeFile(__dirname + "/static/screen" + imgPath, res.body, "binary",function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        })
    });
}

module.exports = getMovieList;