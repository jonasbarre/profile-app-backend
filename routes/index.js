const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.status(200).json({message: "Welcome to the Profile API"});;
});

module.exports = router;
