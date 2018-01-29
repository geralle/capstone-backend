
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('appointments').del()
    .then(function () {
      // Inserts seed entries
      return knex('appointments').insert([
        {
          month: '1',
          day: 25,
          year: '2018',
          hour: '1',
          minute: '00',
          ampm: 'PM',
          description: 'I want something that looks cool',
          approved: true,
          title: 'geralle_125201815:00'
        },
        {
          month: '1',
          day: 26,
          year: '2018',
          hour: '10',
          minute: '30',
          ampm: 'AM',
          description: 'I want something that looks cool',
          approved: true,
          title: 'geralle_126201818:30'
        },
        {
          month: '1',
          day: 27,
          year: '2018',
          hour: '11',
          minute: '00',
          ampm: 'AM',
          description: 'I want something that looks cool',
          approved: true,
          title: 'geralle_127201811:00'
        }
      ]);
    });
};
