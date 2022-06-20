const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = require("../../models/User");
const errMassage = require("../../errors/errorMassage.js");

const dotenv = require("dotenv");
dotenv.config();
const { PASSWORD_KEY } = process.env;

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserSchema.findOne({ email });
        if (!user) {
            return errMassage(res, 401);
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            errMassage(res, 400);
            return;
        }
        const token = jwt.sign({ id: user.id }, PASSWORD_KEY, { expiresIn: "9h" });
        res.status(200).json({
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                massage: `Welcome ${user.name}!`,
            },
        });
    } catch (error) {
        errMassage(res, 504, error);
        return;
    }
};

module.exports = loginUser;
