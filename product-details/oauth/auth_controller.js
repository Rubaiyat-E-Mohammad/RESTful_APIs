const oauthService = require('./auth_service')

function oauthProcessor(code, done) {
    oauthService.getGithubAccessToken(code, (err, token) => {
      if (err) {
        // Handle the error
        return done(err, null);
      }
      // Call the service function to get the user's access token
      oauthService.getAccessTokenOfUser(token, (err, userAccessToken) => {
        if (err) {
          // Handle the error
          return done(err, null);
        }
  
        // Return the user's access token
        done(null, userAccessToken);
      });
    });
  }

module.exports = {oauthProcessor}