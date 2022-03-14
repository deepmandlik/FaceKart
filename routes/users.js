var express = require('express');
const { userLogin, userRegister, userAuth } = require('../controllers/user');
var router = express.Router();

// /* GET users listing. */

router.post("/register",async (req, res) => {
  await userRegister(req.body, res);
});
router.post("/login", async (req, res) => {
  await userLogin(req.body, res);
});



module.exports = router;
