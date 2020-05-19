const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const multer = require('multer');
const upload = multer({
  dest: 'public/uploads/'
})


router.get("/show", (req, res, next) => {
  if (req.isAuthenticated()) {
      return res.status(200).json(req.user);      
  } else {
    return res.status(401).json({message: "Please log in"});  
  }
})

router.post("/edit", (req, res, next) => {
  if (req.isAuthenticated()) {
    const { username, course, campus} = req.body
    User.updateOne(
      {_id: req.user.id},
      {course, 
       username,
       campus
       })
    .then(n => res.status(200).json({message: "User updated"}))
    .catch(e => res.status(500).json({message: "something went wrong"}))
  } else {
    res.status(401).json({message: "Please log in"})
  }
})

router.post('/upload', upload.single('profileimage'), (req, res, next) => {
  if(!req.user) {
    res.status(400).json({message: 'authentication required'})
  }

  User.updateOne({_id: req.user.id}, {profileimage: req.file.filename})
    .then(operation => {
      res.status(200).json(operation)
    })
    .catch(e => {
      res.status(500).json({error: e})
    })
})


module.exports = router;