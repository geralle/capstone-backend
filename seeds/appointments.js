
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('appointments').del()
    .then(function () {
      // Inserts seed entries
      return knex('appointments').insert([
        {
          month: '1',
          day: '25',
          year: '2018',
          time: '3:00',
          ampm: 'pm',
          description: 'I want something that looks cool',
          approved: false,
          title: 'geralle_125201815:00'
        }
      ]);
    });
};
