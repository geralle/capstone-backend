
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('appointments',function(table){
      table.increments()
      table.string('month')
      table.string('day')
      table.string('year')
      table.string('time')
      table.string('ampm')
      table.text('description')
      table.boolean('approved')
      table.string('title')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('appointments')
  ])
};
