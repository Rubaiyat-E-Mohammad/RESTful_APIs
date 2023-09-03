const axios = require('axios')
const config = require('../config')

const getGITHubAccessToken = (code, done)=>{
    const body = {
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
    }
    const opts = { headers: { accept: 'application/json'}}

    axios.post('https://github.com/login/oauth/access_token',body,opts)
    .then((response)=>response.data.access_token)
    .then((token)=>{
        return done(null,token)
    })
    .catch((err)=>{
        return done('Failure')
    })
}

module.exports = getGITHubAccessToken