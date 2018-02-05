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

router.get('/api/users/appts/all', function(req,res){
  db.joinApptsUsers()
  .then(function(data){
    res.json(data)
  })
})

// GENERATES A TOKEN FOR CLIENT AND BACKEND
router.get('/api/generatetoken', function(req, res){
  var token = db.generateToken()
  var tokenObj = {'token':token}
  res.json(tokenObj)
})

// APPROVE APPT BY ID
router.put('/api/approveappt/:id/edit', function(req,res){
  db.approveAppointmentById(req.params)
  .then(function(data){
    res.json(data)
  })
})

// CREATE APPOINTMENTS
router.post('/api/appointment/create', function(req,res){
  var appointmentIds = []
  var apptObj = {}
  var month = req.body.month,
      day = req.body.day,
      year = req.body.year,
      hour = req.body.hour,
      minute = req.body.minute,
      ampm = req.body.ampm,
      description =  req.body.description
      title = req.body.title

  db.createAppointment(month,day,year,hour,minute,ampm,description,title).then(function(apptId){
    db.createUserAppts(apptId[0],req.body.user_id).then(function(data){

    })
  })
  res.redirect('https://geralle-capstone.firebaseapp.com')
})

// EDIT USER BY ID
router.put('/api/user/edit', function(req,res){
  db.editUserById(req.body)
  .then(function(data){
    res.redirect('https://geralle-capstone.firebaseapp.com')
  })
})

// CREATE A NEW USER
router.post('/api/user/create', function(req,res){
  db.checkUserEmail(req.body)
  .then(function(data){
    if(data[0]){
      res.redirect('https://geralle-capstone.firebaseapp.com/register?=error')
    }else{
      db.createANewUser(req.body)
      .then(function(data){
        if(data.length > 0){
          var token = req.body.token
          db.updateToken(req.body.email,token)
          .then(function(data){
            res.clearCookie('token')
            res.cookie('token', token)
            res.redirect('https://geralle-capstone.firebaseapp.com')
          })
        }else{
          res.redirect('https://geralle-capstone.firebaseapp.com/register?=error')
        }
      })
    }
  })
})

// CREATE ADMIN ACCT
router.post('/api/admin/create', function(req,res){
  db.createAnAdminAcct(req.body)
  .then(function(data){
    res.json(data)
  })
})

// EDIT ADMIN ACCT
router.put('/api/admin/edit', function(req,res){
  db.editAdminInfo(req.body)
  .then(function(data){
    res.json(data)
  })
})

// DELETE USER BY ID
router.delete('/api/user/:id/delete', function(req,res){
  db.deleteUserById(req.params)
  .then((data)=>{
    res.json(data)
  })
})

router.delete('/api/appts/:id/delete', function(req,res){
  db.deleteApptById(req.body)
  .then(()=>{})
  res.redirect('https://geralle-capstone.firebaseapp.com/admin')
})

// USER LOGIN
router.post('/api/user/login', function(req,res){
  db.loginUser(req.body)
  .then(function(data){
    if(data.length > 0){
      var token = req.body.token
      db.updateToken(req.body.email,token)
      .then(function(data){
        res.redirect('https://geralle-capstone.firebaseapp.com')
      })
    }else{
      res.redirect('https://geralle-capstone.firebaseapp.com/login?=error')
    }
  })
})

// USER LOGOUT
router.post('/api/user/logout/:token', function(req, res){
  var token = req.params.token
  db.releaseToken(token)
  .then(()=>{})
  res.redirect('https://geralle-capstone.firebaseapp.com')
})


// GET ALL APPOINTMENT BY USER
router.get('/api/user/appts/:user_id', function(req,res){
  db.getAllApptsByUser(req.params)
  .then(function(data){
    var apptsObj = {appointments:data}
    res.json(apptsObj)
  })
})

// GET ALL APPOINTMENTS
router.get('/api/appts/all', function(req,res){
  db.getAllAppts()
  .then(function(data){
    res.json(data)
  })
})

// GET ALL USERS
router.get('/api/user/all', function(req, res){
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

router.get('/api/usertoken/:token', function(req,res){
  db.getUserByUserToken(req.params.token)
  .then(function(data){
    res.json(data)
  })
})

module.exports = router;
