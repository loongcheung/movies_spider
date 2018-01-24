/**
 * Created by zhanglongyu on 2018/1/24.
 */
const router = require('koa-router')();
const controllers = require('../controller/index');

/*
* @param curr 当前页数 limit 每页显示多少
* */
router.get('/movie',async (ctx,next) => {
    await controllers.getMovieList(parseInt(ctx.query.curr),parseInt(ctx.query.limit)).then((res)=>{
        ctx.body = res;
    });
    await next();
});

/*
 * @param id 影片id
 * */
router.get('/movieDetail', async (ctx, next) => {
    await controllers.getMovieDetail(ctx.query.id).then((res)=>{
        ctx.body = res;
    });
    await next();
});


router.get('search', async (ctx, next) => {

});


module.exports = router.routes();