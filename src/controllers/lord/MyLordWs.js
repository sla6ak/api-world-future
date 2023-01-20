const LordSchema = require("../../models/Lord");

class MyLordWs {
    async getLordWs({ clientID }) {
        try {
            const lordInfo = await LordSchema.findOne({ user: clientID }); // в миделвеере мы добавили в реквест поле ид при проверке токена
            if (!lordInfo) {
                return { massage: "Info about this Lord lost" };
            }
            return lordInfo;
        } catch (error) {
            return { massage: "Server error", error };
        }
    }

    async choosePlanet({ clientID, planet }) {
        try {
            let lordInfo = await LordSchema.findOne({ user: clientID });
            const oldPlanet = lordInfo.planet;
            function rand() {
                return Math.floor(Math.random() * 10);
            }
            const x = rand();
            const y = rand();

            await LordSchema.updateOne({ user: clientID });
            lordInfo.planet = planet;
            lordInfo.positionX = x;
            lordInfo.positionZ = y;
            // lordInfo.dateOnline = Date.now;
            await lordInfo.save();
            lordInfo = await LordSchema.findOne({ user: clientID });

            return { oldPlanet, lordInfo };
        } catch (error) {
            return { massage: "Server error", error };
        }
    }
    async choosePosition({ clientID, newPosition }) {
        try {
            // тут нужно переписать newPlanet перед использованием
            const newLord = await LordSchema.findOneAndUpdate(
                { user: clientID },
                { newPosition, dateOnline: Date.now },
                { returnOriginal: false }
            );
            return { newLord };
        } catch (error) {
            return { massage: "Server error", error };
        }
    }
}

module.exports = new MyLordWs();
