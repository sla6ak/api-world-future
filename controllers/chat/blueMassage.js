const ChatSchema = require("../../models/Chat");
const errMassage = require("../../errors/errorMassage.js");

const blueMassage = async (req, res) => {
    try {
        res.status(200).json({});
    } catch (error) {
        errMassage(res, 504, error);
        return;
    }
};

module.exports = blueMassage;
