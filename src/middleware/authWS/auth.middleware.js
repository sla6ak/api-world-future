const errorMassage = require("../../configs/errors/errorMassage");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();
const { PASSWORD_KEY } = process.env;

const authWS = async (data, req) => {
    try {
        const ipClient = req.socket.remoteAddress;
        const userBrawser = req.headers["user-agent"];
        if (!data.token) {
            return;
        }
        const token = data.token;
        const tokenDecoder = jwt.verify(token, PASSWORD_KEY); // что шифровали то и вытянем ({ id: user.id })
        const id = tokenDecoder.id;
        return { clientWS: null, id: tokenDecoder.id, ip: ipClient, browser: userBrawser };
    } catch (error) {
        return;
    }
};
module.exports = { authWS };
