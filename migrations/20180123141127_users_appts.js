
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users_appts',function(table){
      table.increments()
      table.integer('user_id')
      table.integer('appt_id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users_appts')
  ])
};
