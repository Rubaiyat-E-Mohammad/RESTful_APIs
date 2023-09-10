const oauthService = require('./auth_service')

function oauthProcessor(code, done) {
  oauthService.getGithubAccessToken(code, (err, token) => {
    if (err) {
      return done(err, null);
    }
    oauthService.getAccessTokenOfUser(token, (err, userAccessToken) => {
      if (err) {
        return done(err, null);
      }

      done(null, userAccessToken);
    });
  });
}

module.exports = { oauthProcessor }