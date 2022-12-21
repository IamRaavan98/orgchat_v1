const express = require("express")
const router = express.Router();
const {login} = require("../controllers/login")
const {signup} = require("../controllers/signup")
const {getallusers} = require("../controllers/getallusers")

router.post("/login",login)
router.post("/signup",signup)
router.get("/getallusers",getallusers)
module.exports = router;
