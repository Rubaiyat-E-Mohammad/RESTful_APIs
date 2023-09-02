// Get the config either from environment variables or pick the default
const config = {
  PORT: process.env.PORT || "3000",
  CLIENT_ID: process.env.CLIENT_ID || "2e9d88ecf57b65516849",
  CLIENT_SECRET: process.env.CLIENT_SECRET || "526542484a6bce33b83be470c98ea6380597e1ae"
}

module.exports = config;