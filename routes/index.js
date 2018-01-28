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
  res.redirect('http://localhost:4000/admin')
})

// CREATE APPOINTMENTS
router.post('/api/appointment/create', function(req,res){
  var appointmentIds = []
  var apptObj = {}
  for(var i=0;i<3;i++){
    var month = req.body.month[i],
        day = req.body.day[i],
        year = req.body.year[i],
        hour = req.body.hour[i],
        minute = req.body.minute[i],
        ampm = req.body.ampm[i],
        description =  req.body.description,
        title = req.body.f_name+'_'+req.body.month[i]+req.body.day[i]+req.body.year[i]+req.body.hour[i]+req.body.minute[i]
    apptObj[i] = {
      month: month,
      day: day,
      year: year,
      hour: hour,
      minute: minute,
      ampm: ampm,
      description: description,
      title: title
    }
    db.createAppointment(month,day,year,hour,minute,ampm,description,title).then(function(apptId){
      db.createUserAppts(apptId[0],req.body.user_id).then(function(data){
        console.log(data)
      })
    })
  }
  res.redirect('http://localhost:4000/myaccount')
})

// EDIT USER BY ID
router.put('/api/user/edit', function(req,res){
  db.editUserById(req.body)
  .then(function(data){
    res.redirect('http://localhost:4000/myaccount')
  })
})

// CREATE A NEW USER
router.post('/api/user/create', function(req,res){
  db.checkUserEmail(req.body)
  .then(function(data){
    if(data[0]){
      res.redirect('http://localhost:4000/register?=error')
    }else{
      db.createANewUser(req.body)
      .then(function(data){
        if(data.length > 0){
          var token = req.body.token
          db.updateToken(req.body.email,token)
          .then(function(data){
            res.clearCookie('token')
            res.cookie('token', token)
            res.redirect('http://localhost:4000/')
          })
        }else{
          res.redirect('http://localhost:4000/register?=error')
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
  res.redirect('http://localhost:4000/admin')
})

// USER LOGIN
router.post('/api/user/login', function(req,res){
  db.loginUser(req.body)
  .then(function(data){
    if(data.length > 0){
      var token = req.body.token
      db.updateToken(req.body.email,token)
      .then(function(data){
        // res.cookie('token', '')
        // res.cookie('token', token)
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
  .then(()=>{})
  res.redirect('http://localhost:4000')
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
