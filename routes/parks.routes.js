const router = require("express").Router();
const Park = require("../models/Park.model")
const Coaster = require("../models/Coaster.model")


// Endpoints

  router.get('/new', (req, res, next) => {
    res.render('parks/new-park')
})
  
  router.post('/new', (req, res, next) => {

      const { name, description } = req.body
      console.log( "este es el que me interesa", name, description)
      const newPark = new Park ({ name, description  })
      newPark.save()
    .then((place) => {
      res.redirect('/');
    })
    .catch((error) => {
      console.log("----------------------->", error)
      res.render('parks/new-park');
    })
  });


module.exports = router;