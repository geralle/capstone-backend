
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users',function(table){
      table.increments()
      table.string('name')
      table.string('email')
      table.string('password')
      table.string('phone_number')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
};
