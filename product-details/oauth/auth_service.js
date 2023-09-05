const axios = require('axios');
const config = require("../config");

// function to get the access token
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
    // Make a POST request to exchange the code for an access token
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


// Function to get the user profile for the token provided
function getAccessTokenOfUser(token, done) {
    // Github APIs are authenticated and we have to share the token in headers
    // The token is same as what we recieved in the previous step
    const headers = {
        Authorization: `token ${token}`
    };
    done(null, token)
}

module.exports = {
    getGithubAccessToken,
    getAccessTokenOfUser
}
