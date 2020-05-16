const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

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

// router.post("/edit", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) { return next(err); }
//     if (!user) { return res.status(401).json({error: 'user not authenticatd'}); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.status(200).json(user);
//     });
//   })(req, res, next)
// })

module.exports = router;