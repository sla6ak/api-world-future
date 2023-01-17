const LordSchema = require("../../models/Lord");

class MyLordWs {
    async getLord({ clientID }) {
        try {
            const lord = await LordSchema.findOne({ user: clientID }); // в миделвеере мы добавили в реквест поле ид при проверке токена
            if (!lord) {
                return { massage: "Info about this Lord lost" };
            }
            return { lordInfo: lord };
        } catch (error) {
            return { massage: "Server error", error };
        }
    }

    async choosePlanet({ clientID, newPlanet }) {
        try {
            // тут нужно переписать newPlanet перед использованием
            const newLord = await LordSchema.findOneAndUpdate(
                { user: clientID },
                { ...newPlanet, dateOnline: Date.now }
            );
            return { newLord };
        } catch (error) {
            return { massage: "Server error", error };
        }
    }
    async choosePosition({ clientID, newPosition }) {
        try {
            // тут нужно переписать newPlanet перед использованием
            const newLord = await LordSchema.findOneAndUpdate(
                { user: clientID },
                { ...newPosition, dateOnline: Date.now }
            );
            return { newLord };
        } catch (error) {
            return { massage: "Server error", error };
        }
    }
}

module.exports = new MyLordWs();
