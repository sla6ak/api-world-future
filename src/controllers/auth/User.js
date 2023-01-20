const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = require("../../models/User");
const Error = require("../../configs/errors/errorMassage");

const dotenv = require("dotenv");
dotenv.config();
const { PASSWORD_KEY } = process.env;

class User {
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const duplicateEmail = await UserSchema.findOne({ email });
            const duplicateName = await UserSchema.findOne({ name });
            if (duplicateEmail || duplicateName) {
                return res.status(400).json({ massage: `Duplicate user is error`, error: null });
            }
            const hashPassword = await bcrypt.hash(password, 12);
            const user = new UserSchema({ name: name, email: email, password: hashPassword });
            await user.save();
            const token = jwt.sign({ id: user.id }, PASSWORD_KEY, { expiresIn: "9h" });
            res.status(200).json({
                token: token,
                user: {
                    name: user.name,
                    email: user.email,
                    massage: `User creted! My congraduletions! Welcome ${user.name}!`,
                },
            });
        } catch (error) {
            return Error(res, 500, error);
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserSchema.findOne({ email });
            if (!user) {
                return Error(res, 404);
            }
            const isPassword = await bcrypt.compare(password, user.password);
            if (!isPassword) {
                return Error(res, 404);
            }
            const token = jwt.sign({ id: user.id }, PASSWORD_KEY, { expiresIn: "9h" });
            res.status(200).json({
                token: token,
                user: {
                    name: user.name,
                    email: user.email,
                    massage: `Welcome ${user.name}!`,
                },
            });
        } catch (error) {
            return Error(res, 500, error);
        }
    }
    async curentUser(req, res) {
        try {
            const user = await UserSchema.findOne({ id: req.id }); // в миделвеере мы добавили в реквест поле ид при проверке токена
            if (!user) {
                return Error(res, 404);
            }
            res.status(200).json({
                name: user.name,
                email: user.email,
                massage: `Welcome ${user.name}!`,
            });
        } catch (error) {
            return Error(res, 500, error);
        }
    }
}

module.exports = new User();
