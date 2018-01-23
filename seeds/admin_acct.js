
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('admin_acct').del()
    .then(function () {
      // Inserts seed entries
      return knex('admin_acct').insert([
        {
          email: 'gerallestes@gmail.com',
          name: 'geralle',
          phone_number: '1234567890',
          calendar_id: 'okvdh4dhbf3vfpt6ivljrrplo0@group.calendar.google.com',
          about: 'Phone calls and drop in appointment scheduling is a pain for the client and the one providing the service. This app will alleviate scheduling conflicts, waste of time in the waiting room, and instances where both parties are not quite the right fit for each other.',
          address: '123 fake st',
          city: 'Denver',
          state: 'CO',
          zipcode: 80202
        }
      ]);
    });
};
