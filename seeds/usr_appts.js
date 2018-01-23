
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('usr_appts').del()
    .then(function () {
      // Inserts seed entries
      return knex('usr_appts').insert([
        {
          username: 'geralle',
          password: 'password123'
        }
      ]);
    });
};
