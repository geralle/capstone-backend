let express = require('express')
let router = express.Router()
const db = require('../db/query')

router.get('/', function(req, res){
  userId = req.session.user
  res.render('index',
  {
    title: 'Calendar API'
  })
})

// editAdminInfo
// editUserById
// editAppointmentsById
// createANewUser
// createAnAdminAcct
// createAppointment - hidden names in input

router.put('/api/editappointment/:id', function(req,res){
  db.editAppointmentsById(req.body)
  .then(function(data){
    res.json(data)
  })
})

router.delete('/api/deleteuser', function(req,res){
  db.deleteUserById(req.body)
  .then(function(data){
    res.json(data)
  })
})

router.post('/api/user/login', function(req,res){
  db.createANewUser(req.body)
  .then(function(data){
    if(data.length > 0){
      req.session.user = data[0].id
      res.redirect('/profile')
    }else{
      res.redirect('/')
    }
  })
})

router.post('/api/user/create', function(req,res){
  db.createUser(req.body)
  .then(function(data){
    req.session.user = data
    res.redirect('/profile')
  })
})

router.get('/api/alluserappts', function(req,res){
  db.getAllApptsByUser()
  .then(function(data){
    res.json(data)
  })
})

router.get('/api/allappts', function(req,res){
  db.getAllAppts()
  .then(function(data){
    res.json(data)
  })
})

router.get('/api/allusers', function(req, res){
  db.getAllUsers()
  .then(function(data){
    res.json(data)
  })
})

router.get('/api/user/:id', function(req, res){
  db.getUserById(req.params)
  .then(function(data){
    res.json(data)
  })
})

router.post('/api/user/logout', function(req, res){
  req.session.userId = null
  res.redirect('/')
})

module.exports = router;
