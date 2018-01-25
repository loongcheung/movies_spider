/**
 * Created by zhanglongyu on 2018/1/23.
 */
const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const routes = require('./router/index.js');

app.use(async (ctx,next)=>{
    ctx.set('Access-Control-Allow-Origin','*');
    await next();
});

app.use(serve('static/posts'));

app.use(routes);

app.listen(8000);
console.log('app started at port 8000');