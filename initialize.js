const knex = require('knex')(require('./knexfile'))
module.exports = {
    createOutpost({ x, y ,name,owner}) {
        console.log(`Add outpost ${name} at ${x}, ${y}, with owner ${owner}.`)
        return knex('outposts').insert({'x':x,'y':y,'name':name,'owner':owner})
    }
} 