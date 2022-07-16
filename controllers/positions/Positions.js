const LordSchema = require("../../models/Lord");

class Positions {
    async gamersRender(req, res) {
        try {
            let start = new Date(new Date().getTime() - 0.5 * 60 * 60 * 1000);
            // const lords = await LordSchema.find({ online: true }); // должен вернутся массив игроков онлаин
            const lords = await LordSchema.find(
                { dateOnline: { $gte: start } },
                { _id: 0, squad: 0, superPowers: 0, kristalsBlue: 0, kristalsYellow: 0 }
            );
            res.status(200).json({ massage: "Active lords of last 30min", lords: lords }); // это проблемка нельзя возвращать полную информацию про лордов ведь там мы храним идишки игроков. как выделить инфу удалив идишки? может запушить в объект ложные поля перебрав массив и перезаписав секретные данные? но это сомнительно если массивы длинные!
        } catch (error) {
            return res.code(504).json({ massage: "server players error", error: error });
        }
    }
}

module.exports = new Positions();
