var db = require('./knex')

function editAppointmentsById(data){
  return db.select('appointments')
  .where('id', data.id)
  .update({

  })
}

function createAppointment(data){
  return db('appointments').insert({
    month: data.month,
    day: data.day,
    year: data.year,
    time: data.time,
    ampm: data.ampm,
    description: data.description,
    approved: data.approved,
    title: data.name
  })
}

function createAnAdminAcct(data){
  return db('users').insert({
    email: data.email,
    name: data.name,
    phone_number: data.phone_number,
    calendar_id: data.calendar_id,
    about: data.about,
    address: data.address,
    city: data.city,
    state: data.state,
    zipcode: data.zipcode
  }).returning('id')
}

function getAllApptsByUser(){
  return db.select('*').from('users_appts')
  .innerJoin('users','users_appts.user_id', 'users.id')
  .innerJoin('appointments', 'users_appts.appt_id', 'appointments.id')
}

// login
function loginUser(data) {
  return db.select('*').from('users')
  .where({
    'username': data.username,
    'password': data.password,
  })
}

function getAllUsers(){
  return db.select('*').from('users')
}

function getAllAppts(){
  return db.select('*').from('appointments')
}

function getUserById(data){
  return db.select('*').from('users').where('id', data.id)
}

function createANewUser(data){
  return db('users').insert({
    'name': data.name,
    'email': data.email,
    'password': data.password,
    'phone_number': data.phone_number
  }).returning('id')
}

function deleteUserById(data){
  return db('users').where('id', data.id).del()
}

function editUserById(data){
  return db('users').where('id', data.id).update({
    name: data.name,
    usrname: data.usrname,
    password: data.password,
    phone_number: data.phone_number
  })
}

function editAdminInfo(data){
  return db('users').where('id', data.id).update({
    email: data.email,
    name: data.name,
    phone_number: data.phone_number,
    calendar_id: data.calendar_id,
    about: data.about,
    address: data.address,
    city: data.city,
    state: data.state,
    zipcode: data.zipcode
  })
}

function getAllUsers(data){
  return db('users')
}

module.exports = {
  getAllUsers,
  getAllAppts,
  getAllApptsByUser,
  getUserById,
  editAdminInfo,
  editUserById,
  createANewUser,
  editAppointmentsById,
  createAnAdminAcct,
  deleteUserById,
  createAppointment,
  createAppointment
}
