const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')
dotenv.config()
const { PASSWORD_KEY } = process.env

const authWS = async ({ req, heder }) => {
  try {
    const ipClient = heder.socket.remoteAddress
    const userBrawser = heder.headers['user-agent']

    if (!req.token) {
      return
    }
    const token = req.token
    const tokenDecoder = jwt.verify(token, PASSWORD_KEY) // что шифровали то и вытянем ({ id: user.id })
    return {
      clientWS: null,
      id: tokenDecoder.id,
      ip: ipClient,
      browser: userBrawser
    }
  } catch (error) {
    return console.log(error)
  }
}
module.exports = { authWS }
