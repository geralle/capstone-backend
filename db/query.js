var db = require('./knex')

function getUsers(data) {
  return db.select('*').from('users')
  .where({
    'username': data.username,
    'password': data.password
    })
}

function getUserById(data){
  return db.select('*').from('users').where('id', data.id).first()
}

function createUser(data){
  return db('users').insert({
    'username': data.username,
    'password': data.password
  }).returning('id')
  .then(function(arr){
    return arr[0]
  })
}

function deleteUser(data){
  return db('users').where('id', data.id).del()
}

function updateUser(data){
  return db('users').where('id', data.id).update({

  })
}

function getAllUsers(data){
  return db('users')
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  getAllUsers
}
