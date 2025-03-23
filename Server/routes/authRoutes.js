const express = require("express");

const{login,signin,logout} = require("../controllers/authController");

const router = express.Router();

router.post("/login",login);
router.post("/signin",signin);
router.post("/logout",logout);

module.exports = router;