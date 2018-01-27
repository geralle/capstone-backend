var db = require('./knex')

function approveAppointmentById(data){
  return db('appointments')
  .where('id', data.id)
  .update({
    approved: true
  })
}

function createAppointment(month,day,year,hour,minute,ampm,description,title){
  return db('appointments').insert({
    month: month,
    day: day,
    year: year,
    hour: hour,
    minute: minute,
    ampm: ampm,
    description: description,
    approved: false,
    title: title
  }).returning('id')
}

function createAnAdminAcct(data){
  return db('admin_acct').insert({
    email: data.email,
    name: data.name,
    phone_number: data.phone_number,
    calendar_id: data.calendar_id,
    about: data.about,
    address: data.address,
    city: data.city,
    state: data.state,
    zipcode: Number(data.zipcode)
  }).returning('id')
}

function generateToken(){
  var code = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 30; i++){
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return code;
}

function updateToken(email, token){
  return db('users')
  .where('email', email)
  .update({
    token: token
  })
}

function releaseToken(token){
  return db('users')
  .where('token',token)
  .update('token','')
}

function getUserByUserToken(token){
  return db('users')
  .where('token', token)
  .first()
}

function createUserAppts(apptId, userId){
  return db('users_appts').insert({
    user_id: userId,
    appt_id: apptId
  })
}

function createANewUser(data){
  return db('users').insert({
    'f_name': data.f_name,
    'l_name': data.l_name,
    'email': data.email,
    'password': data.password,
    'phone_number': data.phone_number
  }).returning('id')
}

function getAllApptsByUser(data){
  return db.select('*').from('users_appts')
  .innerJoin('users','users_appts.user_id', 'users.id')
  .innerJoin('appointments', 'users_appts.appt_id', 'appointments.id')
  .where('user_id',data.user_id)
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

function checkUserEmail(data){
  return db.select('*').from('users').where('email',data.email)
}

function loginUser(data) {
  return db.select('*').from('users')
  .where({
    'email': data.email,
    'password': data.password,
  })
}

function deleteUserById(data){
  return db('users').where('id', data.id).del()
}

function editUserById(data){
  return db('users')
  .where('id', data.id)
  .update({
    f_name: data.f_name,
    l_name: data.l_name,
    email: data.email,
    password: data.password,
    phone_number: data.phone_number
  })
}

function editAdminInfo(data){
  return db('admin_acct')
  .where('id', data.id)
  .update({
    email: data.email,
    name: data.name,
    phone_number: data.phone_number,
    calendar_id: data.calendar_id,
    about: data.about,
    address: data.address,
    city: data.city,
    state: data.state,
    zipcode: Number(data.zipcode)
  })
}

module.exports = {
  getAllUsers,
  getAllAppts,
  getAllApptsByUser,
  getUserById,
  editAdminInfo,
  editUserById,
  createANewUser,
  approveAppointmentById,
  createAnAdminAcct,
  deleteUserById,
  createAppointment,
  createAppointment,
  checkUserEmail,
  loginUser,
  createUserAppts,
  updateToken,
  releaseToken,
  getUserByUserToken,
  generateToken
}
