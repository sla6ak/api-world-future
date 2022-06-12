const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const errMassage = require("../../errors/errorMassage.js");

const dotenv = require("dotenv");
dotenv.config();
const { PASSWORD_KEY } = process.env;

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const duplicateEmail = await User.findOne({ email });
        const duplicateName = await User.findOne({ name });
        if (duplicateEmail || duplicateName) {
            return errMassage(res, 400);
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User({ name: name, email: email, password: hashPassword });
        await user.save();
        const token = jwt.sign({ id: user.id }, PASSWORD_KEY, { expiresIn: "9h" });
        res.status(200).json({
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                massage: `User creted! My congraduletions! Welcome ${user.name}!`,
            },
        });
    } catch (error) {
        errMassage(res, 504, error);
        return;
    }
};

module.exports = createUser;
