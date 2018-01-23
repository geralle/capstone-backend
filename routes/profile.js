let express = require('express')
let router = express.Router()

router.get('/', function(req, res){
  userId = req.session.user
  console.log('profile', userId)
  res.render('profile',
  {
    greeting: 'Welcome',
    userId: userId
  })
})

router.post('/logout', function(req, res){
  req.session.userId = null
  res.redirect('/')
})

module.exports = router;
