const express = require('express')
const path = require("path");
const signup = require(path.join(path.dirname(__dirname), "../../features/common/signup.js"))
const login = require(path.join(path.dirname(__dirname), "../../features/common/login.js"))
const users = require(path.join(path.dirname(__dirname), "../../features/common/get_all_users.js"))
const conferences = require(path.join(path.dirname(__dirname), "../../features/common/get_all_conferences.js"))

const router = express.Router()

router.post("/features/common/signup", signup.create_user)

router.post("/features/common/login", login.login_user)

router.get("/features/common/get_all_users", users.get_all_users)

router.get("/features/common/get_all_conferences", conferences.get_all_conferences)

module.exports = router