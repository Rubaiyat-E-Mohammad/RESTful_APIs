const userService = require('../User/userService.js')
const authService = require('./authService')

const registerUser = (userData, done)=>{
    userService.findUser(userData.email, (err, userFound)=>{
        if(err){
            return done(err)
        }else{
            if(userFound){
                return done(userFound)
            }else{
                userService.registerUser(userData,done)
            }
        }
    })
}

const loginUser = ({email,password}, done)=>{
    userService.findUser(email, (err, userFound)=>{
        if(err){
            return done(err)
        }else{
            const userVerified = authService.verifyUser({email,password}, userFound)
            if(userVerified){
                const jwtToken = authService.createJWT(userFound)
                return done(undefined, jwtToken)
            }else{
                return done({error: "User not verified"})
            }
        }
    })
}

module.exports = {registerUser, loginUser}