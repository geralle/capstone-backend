
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('admin_acct',function(table){
      table.increments()
      table.string('email')
      table.string('name')
      table.string('phone_number')
      table.text('calendar_id')
      table.text('about')
      table.string('address')
      table.string('city')
      table.string('state')
      table.integer('zipcode')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('admin_acct')
  ])
};
