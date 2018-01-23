
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_appts').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_appts').insert([
        {
          user_id: '1',
          appt_id: '1'
        },
        {
          user_id: '1',
          appt_id: '2'
        },
        {
          user_id: '1',
          appt_id: '3'
        }
      ]);
    });
};
