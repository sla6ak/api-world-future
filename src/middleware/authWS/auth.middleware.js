const errorMassage = require("../../configs/errors/errorMassage");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();
const { PASSWORD_KEY } = process.env;

const authWS = async (data, req) => {
    try {
        const ipClient = req.socket.remoteAddress;
        const userBrowser = req.headers["user-agent"];
        const { token } = data;
        if (!token) return;
        // if (!data.token) {
        //     return;
        // }
        // const token = data.token;
        // const tokenDecoder = jwt.verify(token, PASSWORD_KEY); // что шифровали то и вытянем ({ id: user.id })
        // const id = tokenDecoder.id;
        // return { clientWS: null, id: tokenDecoder.id, ip: ipClient, browser: userBrowser };
        const { id } = jwt.verify( token, PASSWORD_KEY );
        return { clientWS: null, id, ip: ipClient, browser: userBrowser };
    } catch (error) {
        return;
    }
};
module.exports = { authWS };
