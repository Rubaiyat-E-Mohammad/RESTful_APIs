const axios = require('axios');
const config = require("../config");

function getGithubAccessToken(code, done) {
    const data = {
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
        code
    };
    const opts = {
        headers: {
            Accept: 'application/json'
        }
    }
    axios
        .post('https://github.com/login/oauth/access_token', data, opts)
        .then(response => {
            console.log(response.data)
            done(null, response.data.access_token)
        })
        .catch(err => {
            done(err, null);
        });
}

function getAccessTokenOfUser(token, done) {

    const headers = {
        Authorization: `token ${token}`
    };
    done(null, token)
}

module.exports = {
    getGithubAccessToken,
    getAccessTokenOfUser
}
