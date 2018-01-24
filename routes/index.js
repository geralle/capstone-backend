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

router.get('/api/allusers', function(req, res){
  db.getAllUsers()
  .then(function(data){
    res.json(data)
  })
})

router.get('/api/user/:id', function(req, res){
  db.getUser()
  .then(function(data){
    res.json(data)
  })
})

router.post('/api/user/login', function(req,res){
  console.log(req.body)
  // db.getUsers(req.body)
  // .then(function(data){
  //   if(data.length > 0){
  //     req.session.user = data[0].id
  //     res.redirect('/profile')
  //   }else{
  //     res.redirect('/')
  //   }
  // })
})

router.post('/api/user/create', function(req,res){
  db.createUser(req.body)
  .then(function(data){
    req.session.user = data
    res.redirect('/profile')
  })
})

router.post('/api/user/logout', function(req, res){
  req.session.userId = null
  res.redirect('/')
})

module.exports = router;
