
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
        },
        {
          month: '1',
          day: '26',
          year: '2018',
          time: '6:30',
          ampm: 'pm',
          description: 'I want something that looks cool',
          approved: false,
          title: 'geralle_126201818:30'
        },
        {
          month: '1',
          day: '27',
          year: '2018',
          time: '11:00',
          ampm: 'am',
          description: 'I want something that looks cool',
          approved: false,
          title: 'geralle_127201811:00'
        }
      ]);
    });
};
