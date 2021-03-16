const express = require('express');
const router = express.Router();

const Person = require('../db/models/person');  // pull in model

//route is /api/all    to get all entries in db and display 
router.get('/all', (req, res) => {

})

//route is /api/post   to send data to db
router.post('/post', (req, res) => {
  
  const newPerson = new Person({    //create new person from model
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })

  newPerson.save().then(person => res.send(person))
  
})

module.exports = router;