
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users',function(table){
      table.increments()
      table.string('f_name')
      table.string('l_name')
      table.string('email')
      table.string('password')
      table.string('phone_number')
      table.string('token')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
};
