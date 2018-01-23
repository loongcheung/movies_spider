/**
 * Created by zhanglongyu on 2018/1/23.
 */
const request = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
const HOST = 'https://www.80s.tt';
//爬取电影列表
getMovieList();
function getMovieList() {
    request.get(HOST + '/movie/1-0-0-0-0-0').query({
        page: 2
    }).end((err, res) => {
        const $ = cheerio.load(res.text)
        $('.list_mov').each(async (i, elem) => {
            let href = $(elem).find('.list_mov_poster a').attr('href');
            //拿到链接，进入详情页面
            if (i > 0) {
                return false
            }
            await getMovieDetails(href).then(res => {

            }).catch(err => {

            });
        });

        /*$(".list_mov_poster img").each(function (i, elem) {
         let imgSrc = $(this).attr("data-original");
         request.get(imgSrc).end((err, res) => {
         let imgPath = "/" + $(this).parent('a').attr('href').replace('/movie/','') + "." + imgSrc.split(".").pop();
         fs.writeFile(__dirname + "/static/posts" + imgPath, res.body, "binary", function (errFs) {
         if (errFs) {
         console.log(errFs);
         }
         })
         })
         });*/
        if (err) {
            console.log(err)
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
            console.log($$('movie_description').text())
            info.push($$('movie_description').text());
            console.log('影片信息：'+info)
            resolve(info);
            reject(err);
        })
    })
}

