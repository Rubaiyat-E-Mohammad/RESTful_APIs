const { Router } = require('express')
const express = require('express')
const config = require('../config')
const router = Router()
const oauthCtrl = require('./auth_controller')

router.get('/login', (req, res) => {
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.CLIENT_ID}`);
});

router.get('/callback', (req, res) => {
        oauthCtrl.oauthProcessor(req.query.code, (err, token) => {
                if (err) {
                        console.error(err);
                        res.status(500).send("Internal Server Error");
                } else {
                        res.redirect(`/welcome.html?token=${token}`);
                }
        })
})

module.exports = router

