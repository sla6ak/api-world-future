const LordSchema = require("../../models/Lord");
const errMassage = require("../../errors/errorMassage.js");
const baseLord = require("./baseLord");

const createLord = async (req, res) => {
    try {
        const { nikName, rassa } = req.body;
        const duplicateNikName = await LordSchema.findOne({ nikName: nikName });
        if (duplicateNikName) {
            return errMassage(res, 400);
        }
        let planet = "Blue";
        if (rassa === "Blue") {
            planet = "BlueHome";
        } else if (rassa === "Yellow") {
            planet = "YellowHome";
        }
        const newLord = { ...baseLord, nikName: nikName, rassa: rassa, user: req.id, planet: planet };
        const lord = new LordSchema(newLord);
        await lord.save();
        res.status(201).json({ newLord });
    } catch (error) {
        errMassage(res, 504, error);
        return;
    }
};

module.exports = createLord;
