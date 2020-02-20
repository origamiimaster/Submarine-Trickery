exports.up = function (knex) {
    return knex.schema.createTable('sub', function (t) {
        //t.increments('id').primary()
        t.float('x').notNullable()
        t.float('y').notNullable()
        t.integer('troops').defaultTo(0)
        t.timestamps(false, true)
    })
}
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('sub')
}