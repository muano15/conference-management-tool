const express = require('express')
const path = require("path");
const conference = require(path.join(path.dirname(__dirname), "../../features/admin/create_conference.js"))

const router = express.Router()

router.post("/features/admin/create_conference", conference.create_conference)

module.exports = router