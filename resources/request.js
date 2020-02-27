
const knex = require('knex')(require('./knexfile'))
module.exports = {
    askOutposts(){
        return knex('outposts').select("x","y","owner")
            .then((a) => {
                console.log(a)
                return a
            })
    },
    askOutposts2(owner){
        return knex('outposts').where('owner',owner).select("*")
            .then((data)=> {
                console.log("in authenticate method");
                console.log(data);
                return data;
            })
    },
    askOutposts3(owner){
        return knex('outposts').whereNot('owner',owner).select("x","y","owner","name")
            .then((data1)=>{
                return knex('outposts').where('owner',owner).select("x","y","owner","troops","name")
                    .then((data2)=>{
                        for(var i = 0; i < data2.length;i++){
                            data1.push(data2[i])
                        }
                        return data1;
                    })
            })
    }
}