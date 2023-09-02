const { Router } = require('express')
const express = require('express')
const config = require('../config')
const router = Router()
const oauthctrl = require('./auth_controller')

router.get('/login', (request,response)=>{
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${config.CLIENT_ID}`)
})

router.get('/callback',(req,res)=>{
    try{
        oauthctrl.oauthProcessor(req.query.code,(err,data)=>{
            if(err){
                return res.status(401).send({err:"Bad Request"})
            }else{
                return res.redirect(`/welcome.html?token=${data}`)
            }
        })
    }catch(err){
        return res.status(400).send(err)
    }
})

module.exports = router

