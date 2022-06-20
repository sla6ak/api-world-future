const LordSchema = require("../../models/Lord");
const errMassage = require("../../errors/errorMassage.js");

const gamersRender = async (req, res) => {
    try {
        const lords = await LordSchema.find({ online: true }); // должен вернутся массив игроков онлаин
        res.status(200).json({ lords }); // это проблемка нельзя возвращать полную информацию про лордов ведь там мы храним идишки игроков. как выделить инфу удалив идишки? может запушить в объект ложные поля перебрав массив и перезаписав секретные данные? но это сомнительно если массивы длинные!
    } catch (error) {
        errMassage(res, 504, error);
        return;
    }
};

module.exports = gamersRender;
