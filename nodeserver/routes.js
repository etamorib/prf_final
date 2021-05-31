const express = require('express');
const router = express.Router();

router.route('/products/:category').get((req, res, next) => {
  console.log(req.params.category);
  res.status(202).send('Oké minden!');
})
.post((req, res, next) => {
  console.log(req.body);
  res.status(200).send('Thanks for submiting this shit :) ! ');
})

module.exports = router;