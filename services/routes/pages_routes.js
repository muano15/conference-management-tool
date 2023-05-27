const express = require('express')
const path = require("path");
const {response} = require("express");

const router = express.Router()

router.get('/pages/signup/signup.ejs', (req, res) => {
    res.render(path.join(path.dirname(__dirname), "../pages/signup/signup.ejs"))
})

router.get('/pages/signup/signup.js', (req, res) => {
    res.sendFile(path.join(path.dirname(__dirname), "../pages/signup/signup.js"))
})

router.get('/pages/home/home.ejs', (req, res) => {
    fetch("http://localhost:4040/features/common/get_all_conferences", { method: "GET" })
        .then((response) => {
            return response.json()
        })
        .then((jsonResponse) => {
            res.render(path.join(path.dirname(__dirname), "../pages/home/home.ejs"), {
                all_conferences: jsonResponse,
                email: req.body.email
            })
        })
})

router.get('/pages/home/home.js', (req, res) => {
    res.sendFile(path.join(path.dirname(__dirname), "../pages/home/home.js"))
})

router.get('/pages/login/login.ejs', (req, res) => {
    res.render(path.join(path.dirname(__dirname), "../pages/login/login.ejs"))
})

router.get('/pages/login/login.js', (req, res) => {
    res.sendFile(path.join(path.dirname(__dirname), "../pages/login/login.js"))
})

module.exports = router