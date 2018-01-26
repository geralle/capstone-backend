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

// APPROVE APPT BY ID
router.put('/api/approveappt/:id/edit', function(req,res){
  db.approveAppointmentById(req.params).then(function(data){
    res.json(data)
  })
})

// CREATE APPOINTMENTS
router.post('/api/appointment/create', function(req,res){
  var appointmentIds = []
  for(var i=0;i<3;i++){
    var month = req.body.month[i],
        day = req.body.day[i],
        year = req.body.year[i],
        hour = req.body.hour[i],
        minute = req.body.minute[i],
        ampm = req.body.ampm[i],
        description =  req.body.description,
        title = req.body.f_name+'_'+req.body.month[i]+req.body.day[i]+req.body.year[i]+req.body.hour[i]+req.body.minute[i]
    db.createAppointment(month,day,year,hour,minute,ampm,description,title).then(function(apptId){
      db.createUserAppts(apptId[0],req.body.user_id).then(function(data){
        console.log(data)
        res.redirect('/')
      })
    })
  }
})

// EDIT USER BY ID
router.put('/api/user/edit', function(req,res){
  db.editUserById(req.body)
  .then(function(data){
    res.json(data)
  })
})

// CREATE A NEW USER
router.post('/api/user/create', function(req,res){
  db.checkUserEmail(req.body)
  .then(function(data){
    if(data[0]){
      console.log('User already exists')
    }else{
      db.createANewUser(req.body)
      .then(function(data){
        if(data.length > 0){
          req.session.user = data[0].id
          res.redirect('http://localhost:4000/')
        }else{
          res.redirect('/')
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
  .then(function(data){
    res.json(data)
  })
})

// USER LOGIN
router.post('/api/user/login', function(req,res){
  db.loginUser(req.body)
  .then(function(data){
    if(data.length > 0){
      var token = db.generateToken()
      db.updateToken(req.body.email,token)
      .then(function(data){
        res.clearCookie('token')
        res.cookie('token', token)
        res.redirect('http://localhost:4000/')
      })
    }else{
      res.redirect('http://localhost:4000/login?=error')
    }
  })
})

// USER LOGOUT
router.post('/api/user/logout/:token', function(req, res){
  var token = req.params.token
  db.releaseToken(token)
  .then(function(data){
    console.log(data)
  })
})

// GET ALL APPOINTMENT BY USER
router.get('/api/user/appts/:user_id', function(req,res){
  db.getAllApptsByUser(req.params)
  .then(function(data){
    res.json(data)
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

// http://localhost:8000/api/usertoken/ZmKfjl3kbc1GIpb8lDsQLzTqWYkuyP
router.get('/api/usertoken/:token', function(req,res){
  db.getUserByUserToken(req.params.token)
  .then(function(data){
    res.json(data)
  })
})

module.exports = router;
