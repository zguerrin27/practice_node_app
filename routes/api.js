const express = require('express');
const router = express.Router();

const Person = require('../db/models/person');  // pull in model

//route is / to get all entries in db and display 
router.get('/', (req, res) => {
  Person.find({}, (err, result) => {
    if(result){
      res.render('pages/index', {'people': result})
    } else {
      res.status(404)
    }
  })
})

//route is /post to send data to db
router.post('/post', (req, res) => {
  
  const newPerson = new Person({    //create new person from model
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })

  newPerson.save().then(res.redirect('/'))
  
})

module.exports = router;