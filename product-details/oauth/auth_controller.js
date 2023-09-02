const oauthService = require('./auth_service')

const oauthProcessor = (code,done)=>{
    oauthService.getGITHubAccessToken(code,(err,token)=>{
        if(err){
            return done(err)
        }else{
            return done(null,token)
        }
    })
}

module.exports = {oauthProcessor}