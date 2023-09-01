const jwt = require('jsonwebtoken')
const config = require('../config.js')

const verifyUser = ({email,password}, userData)=>{
    if(email === userData.email && password === userData.password) return true
    else return false
}

const createJWT = (userData)=>{
    const payload = {
        role: "USER",
        email: userData.email,
        name: userData.name
    }
    const token = jwt.sign(payload, config.AUTH_SECRET, {expiresIn: 36000})
    return token
}

module.exports = {verifyUser,createJWT}