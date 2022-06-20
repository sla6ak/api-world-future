const LordSchema = require("../../models/Lord");
const errMassage = require("../../errors/errorMassage.js");

const getLord = async (req, res) => {
    try {
        const lord = await LordSchema.findOne({ user: req.id }); // в миделвеере мы добавили в реквест поле ид при проверке токена
        if (!lord) {
            errMassage(res, 401);
            return;
        }
        res.status(200).json({ data: lord });
    } catch (error) {
        errMassage(res, 504, error);
        return;
    }
};

module.exports = getLord;
