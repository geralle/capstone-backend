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

// editAdminInfo,
// editAppointmentsById,
// createAnAdminAcct,
// createAppointment, - hidden names in input

router.put('/api/editappointment/:id', function(req,res){
  db.editAppointmentsById(req.body)
  .then(function(data){
    res.json(data)
  })
})

// EDIT USER BY ID
router.put('/api/user/:id/edit', function(req,res){
  db.editUserById(req.body, req.params)
  .then(function(data){
    res.json(data)
  })
})

// CREATE A NEW USER
router.post('/api/user/createUser', function(req,res){
  db.checkUserEmail(req.body)
  .then(function(data){
    if(data[0]){
      console.log('User already exists')
    }else{
      db.createANewUser(req.body)
      .then(function(data){
        if(data.length > 0){
          req.session.user = data[0].id
          res.redirect('/')
        }else{
          res.redirect('/')
        }
      })
    }
  })
})

// DELETE USER BY ID
router.delete('/api/deleteuser/:id', function(req,res){
  db.deleteUserById(req.params)
  .then(function(data){
    res.json(data)
  })
})

// USER LOGIN
router.post('/api/user/login', function(req,res){
  db.loginUser(req.body)
  .then(function(data){
    if(data.length > 0){
      req.session.user = data[0].id
      console.log('Your Signed In')
      res.redirect('/')
    }else{
      res.redirect('/')
    }
  })
})

// USER LOGOUT
router.post('/api/user/logout', function(req, res){
  req.session.userId = null
  res.redirect('/')
})

// GET ALL APPOINTMENT BY USER
router.get('/api/alluserappts/:user_id', function(req,res){
  db.getAllApptsByUser(req.params)
  .then(function(data){
    res.json(data)
  })
})

// GET ALL APPOINTMENTS
router.get('/api/allappts', function(req,res){
  db.getAllAppts()
  .then(function(data){
    res.json(data)
  })
})

// GET ALL USERS
router.get('/api/allusers', function(req, res){
  db.getAllUsers()
  .then(function(data){
    res.json(data)
  })
})

// GET USER BY ID
router.get('/api/user/:id', function(req, res){
  db.getUserById(req.params)
  .then(function(data){
    res.json(data)
  })
})

module.exports = router;
