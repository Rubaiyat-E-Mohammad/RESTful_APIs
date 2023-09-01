const { Router } = require('express')
const router = Router()
const authController = require('./authController')

router.post('/register', (req, res)=>{
    try{
        const {name,email,password} = req.body
        if(!(name,email,password)){
            return res.status(400).send("Required inputs are missing")
        }
        const userData = {
            name,email,password
        }

        authController.registerUser(userData, (err, results)=>{
            if(err){
                return res.status(400).send({error: 'User Already Exists'})
            }else{
                return res.status(201).send(results)
            }
        })
    }catch(err){
        return res.status(400).send({error: 'Unexpected error while registering the user'})
    }
})

router.post('/login', (req,res)=>{
    try{
        const {email,password} = req.body
        if(!(email,password)){
            return res.status(400).send('Required inputs are missing')
        }
        authController.loginUser({email,password}, (err, result)=>{
            if(err){
                res.status(400).send({error:"Invalid credentials", err})
            }else{
                res.status(200).send(result)
            }
        })
    }catch(err){
        return res.status(500).send('Unexpected error while logging in', err)
    }
})

module.exports = router