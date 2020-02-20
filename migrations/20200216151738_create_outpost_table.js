
exports.up = function (knex) {
    return knex.schema.createTable('outposts', function (t) {
        t.increments('id').primary()
        t.float('x').notNullable()
        t.float('y').notNullable()
        t.string('owner').defaultTo('none')
        t.integer('troops').defaultTo(0)
        t.string('name').notNullable();
        t.timestamps(false, true)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('outposts');
};
