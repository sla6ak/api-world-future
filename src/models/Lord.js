const { Schema, model, Types } = require("mongoose"); //типы это часть библиотеки мангуста для описания колекции

const LordSchema = new Schema({
    nikName: { type: String, unique: true }, //
    race: { type: String }, //
    positionX: { type: Number },
    positionY: { type: Number },
    positionZ: { type: Number },
    planet: { type: String },
    missions: [],
    curentMissions: [{ type: String }],
    clan: { type: String },
    battle: { type: Boolean }, // показывает в бою ли игрок и если тру то рендерит флажек вместо модельки
    numbersBattle: { type: Number }, // всего проведенных боев
    numbersWinBattle: { type: Number }, // число выиграных боев
    numbersLooseBattle: { type: Number }, // проигранных боев
    kristalsBlue: { type: Number },
    kristalsYellow: { type: Number },
    darkMatter: { type: Number },
    lvl: { type: Number },
    ratingPoints: { type: Number },
    guild: { type: String }, //  разные гильдие будут выдавать разные задания игрокам с наградами. типа шахтерам удержать шахту 1 час и т д.
    squad: {
        robot: {
            name: { type: String },
            power: {
                attack: {
                    base: { type: Number },
                    shell: { base: { type: Number }, bonuse: { type: Number }, percent: { type: Number } },
                    bonuse: { type: Number },
                },
                defend: {
                    base: { type: Number },
                    shell: { base: { type: Number }, bonuse: { type: Number }, percent: { type: Number } },
                    bonuse: { type: Number },
                },
                life: {
                    base: { type: Number },
                    shell: { base: { type: Number }, bonuse: { type: Number }, percent: { type: Number } },
                    bonuse: { type: Number },
                },
            },
        },
        sniper: {
            name: { type: String },
            power: {
                attack: {
                    base: { type: Number },
                    shell: { base: { type: Number }, bonuse: { type: Number }, percent: { type: Number } },
                    bonuse: { type: Number },
                },
                defend: {
                    base: { type: Number },
                    shell: { base: { type: Number }, bonuse: { type: Number }, percent: { type: Number } },
                    bonuse: { type: Number },
                },
                life: {
                    base: { type: Number },
                    shell: { base: { type: Number }, bonuse: { type: Number }, percent: { type: Number } },
                    bonuse: { type: Number },
                },
            },
        },
        shturm: {
            name: { type: String },
            power: {
                attack: {
                    base: { type: Number },
                    shell: { base: { type: Number }, bonuse: { type: Number }, percent: { type: Number } },
                    bonuse: { type: Number },
                },
                defend: {
                    base: { type: Number },
                    shell: { base: { type: Number }, bonuse: { type: Number }, percent: { type: Number } },
                    bonuse: { type: Number },
                },
                life: {
                    base: { type: Number },
                    shell: { base: { type: Number }, bonuse: { type: Number }, percent: { type: Number } },
                    bonuse: { type: Number },
                },
            },
        },
    },
    superPowers: {
        superAttacking: { type: Number }, //покупается в магазине предметов рядом с базовыми усилителями но дает одноразовый эффект
        superDefending: { type: Number }, //добовляет к урону или защите доп очки сверху базовых в бою можно использовать только один из видов
        superHealling: { type: Number }, //добавляет к здоровью один раз за бой +очки в конце боя макс очки вернутся к базовым
    },
    user: { type: Types.ObjectId, ref: "User" },
    dateOnline: { type: Date, default: Date.now },
    CreatedDate: { type: Date, default: Date.now },
});

module.exports = model("Lord", LordSchema);

// базовая схема лорда требует пересмотра
