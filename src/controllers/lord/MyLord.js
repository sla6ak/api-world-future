const LordSchema = require("../../models/Lord");
const baseLord = require("./baseLord");

class MyLord {
    async createLord(req, res) {
        try {
            const { nikName, race } = req.body;
            const duplicateNikName = await LordSchema.findOne({ nikName });
            if (duplicateNikName) {
                return res.status(409).json({ massage: "Choose another nick. This nickName is busy" });
            }
            let planet = "Blue";

            if (race === "Blue") {
                planet = "BlueHome";
            } else if (race === "Yellow") {
                planet = "YellowHome";
            }
            const newLord = { ...baseLord, nikName, rassa: race, user: req.id, planet };
            const lord = new LordSchema(newLord);
            await lord.save();
            res.status(201).json({ newLord });
        } catch (error) {
            return res.status(404).json({ massage: "Can not create new Lord, try latter", error });
        }
    }

    async getLord(req, res) {
        try {
            const lord = await LordSchema.findOne({ user: req.id }); // в миделвеере мы добавили в реквест поле ид при проверке токена
            if (!lord) {
                return res.status(401).json({ massage: "Info about this Lord lost" });
            }
            res.status(200).json({ data: lord });
        } catch (error) {
            return res.code(404).json({ massage: "Server error", error: error });
        }
    }

    async choosePlanet(req, res) {
        try {
            const newLord = await LordSchema.findOneAndUpdate({ user: req.id }, { ...req.body, dateOnline: Date.now });
            res.status(201).json({ newLord });
        } catch (error) {
            return res.status(404).json({ massage: "Server error", error: error });
        }
    }
}

module.exports = new MyLord();
