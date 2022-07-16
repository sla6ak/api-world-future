const LordSchema = require("../../models/Lord");
const baseLord = require("./baseLord");

class MyLord {
    async createLord(req, res) {
        try {
            const { nikName, rassa } = req.body;
            const duplicateNikName = await LordSchema.findOne({ nikName: nikName });
            if (duplicateNikName) {
                return res.status(404).json({ massage: "Choose another nik. This nikName is busy" });
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
            return res.status(404).json({ massage: "Can not created new Lord, try latter", error: error });
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
            const lord = await LordSchema.findOneAndUpdate({ user: req.id }, { ...req.body, dateOnline: Date.now });
            res.status(201).json({ newLord });
        } catch (error) {
            return res.status(404).json({ massage: "Server error", error: error });
        }
    }
}

module.exports = new MyLord();
