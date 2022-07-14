const MissionSchema = require("../../models/Mission");

class Missions {
    // Запрос по умолчанию
    async pandingMissions(req, res) {
        try {
            const pandingMissions = await MissionSchema.find({ user: req.id, status: "pending" });
            res.status(200).json({ massage: "find pandingMissions", missions: pandingMissions });
        } catch (error) {
            return res.status(504).json({ massage: "serverMissions is error", error: error });
        }
    }

    // Кнопка получить новую миссию будет доступно по выполнению/провалу предыдущей или не более 3х
    async addNewMissions(req, res) {
        try {
            const { autor } = req.body;
            const newMassage = new ChatSchema({ autorID: req.id });
            await newMassage.save();
            res.status(200).json({ massage: "find lastLetters" });
        } catch (error) {
            return res.status(404).json({ massage: "Missions not created!", error: error });
        }
    }

    // Автозапрос сообщающий о выполнении одной из миссий должен изменить статус мисии и выдать награду
    async closseMission(req, res) {
        try {
            const { autor } = req.body;
            res.status(200).json({ massage: "find lastLetters" });
        } catch (error) {
            return res.status(404).json({ massage: "Missions not clossed!", error: error });
        }
    }

    // на будущее
    async filedMissions(req, res) {
        try {
            const filedMissions = await MissionSchema.find({});
            res.status(200).json({ massage: "find filedMissions", missions: filedMissions });
        } catch (error) {
            return res.status(504).json({ massage: "serverMissions is error", error: error });
        }
    }

    // на будуще
    async exelentMissions(req, res) {
        try {
            const exelentMissions = await MissionSchema.find({});
            res.status(200).json({ massage: "find exelentMissions", missions: exelentMissions });
        } catch (error) {
            return res.status(504).json({ massage: "serverMissions is error", error: error });
        }
    }

    // на будуще
    async allMissions(req, res) {
        try {
            const allMissions = await MissionSchema.find({});
            res.status(200).json({ massage: "find allMissions", missions: allMissions });
        } catch (error) {
            return res.status(504).json({ massage: "serverMissions is error", error: error });
        }
    }
}

module.exports = new Missions();
