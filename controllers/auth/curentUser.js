const UserSchema = require("../../models/User");
const errMassage = require("../../errors/errorMassage.js");

const curentUser = async (req, res) => {
    try {
        const user = await UserSchema.findOne({ id: req.id }); // в миделвеере мы добавили в реквест поле ид при проверке токена
        if (!user) {
            errMassage(res, 401);
            return;
        }
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            massage: `Welcome ${user.name}!`,
        });
    } catch (error) {
        errMassage(res, 504, error);
        return;
    }
};

module.exports = curentUser;
