const knex = require('knex')(require('./knexfile'))
module.exports = {
    createOutpost({ x, y ,name,owner,color}) {
        console.log(`Add outpost ${name} at ${x}, ${y}, with owner ${owner}.`)
        return knex('outposts').insert({'x':x,'y':y,'name':name,'owner':owner})
    }
} 

function addOutpost({x,y,name,owner}){
    return knex('outposts').insert({'x':x,'y':y,'name':name,'owner':owner})
}
function delOutpose({x,y,name,owner}){
    return knex('outposts').where('x',x).where('y',y).where('name',name).where('owner',owner).del()
    .then((data)=>{
        console.log("then response");
        console.log(data);
    })
}