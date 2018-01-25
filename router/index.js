/**
 * Created by zhanglongyu on 2018/1/24.
 */
const router = require('koa-router')();
const controllers = require('../controller/index');

/*
 * @param curr 当前页数 limit 每页显示多少 type 影片类型 <json string>  order 排序参数 0更新时间 1评分
 * */
router.get('/movie', async (ctx, next) => {
    await controllers.getMovieList(parseInt(ctx.query.curr), parseInt(ctx.query.limit), ctx.query.query ? JSON.parse(ctx.query.query) : '', parseInt(ctx.query.order) ? parseInt(ctx.query.order) : 0).then((res) => {
        ctx.body = res;
    });
    await next();
});

/*
 * @param id 影片id
 * */
router.get('/movieDetail', async (ctx, next) => {
    await controllers.getMovieDetail(ctx.query.id).then((res) => {
        ctx.body = res;
    });
    await next();
});

/*
 * @param query 搜索关键词（包括影片名称、演员和导演） curr 当前页数 limit 每页显示多少
 * */
router.get('/search', async (ctx, next) => {
    let curr = parseInt(ctx.query.curr) ? parseInt(ctx.query.curr) : 1;
    let limit = parseInt(ctx.query.limit) ? parseInt(ctx.query.limit) : 24;
    await controllers.search(ctx.query.query, curr, limit).then((res) => {
        ctx.body = res;
    });
    await next();
});


module.exports = router.routes();