const LordSchema = require("../../models/Lord");
const errMassage = require("../../errors/errorMassage.js");
const baseLord = require("./baseLord");

const createLord = async (req, res) => {
    try {
        const { nikName, rassa } = req.body;
        const duplicateNikName = await LordSchema.findOne({ nikName });
        if (duplicateNikName) {
            return errMassage(res, 400);
        }
        const lord = new Lord({ ...baseLord, nikName: nikName, rassa: rassa, user: req.id });
        await lord.save();
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

module.exports = createLord;
