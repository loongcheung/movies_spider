/**
 * Created by zhanglongyu on 2018/1/23.
 */
const model = require('./model');

let Pet = model.Pets;

Pet.findAll({
    where: {
        name: 'Gaffey'
    }
}).then(res => {
    for (let p of res) {
        console.log(JSON.stringify(p));
    }
}).catch(err => {
    console.log(err)
})