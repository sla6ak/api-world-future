const { Schema, model, Types } = require("mongoose"); //типы это часть библиотеки мангуста для описания колекции

const LordSchema = new Schema({
    nikName: { type: String, unique: true }, //
    rassa: { type: String }, //
    online: { type: Boolean }, //
    positionX: { type: Number },
    positionY: { type: Number },
    positionZ: { type: Number },
    planet: { type: String },
    curentMissions: [{ type: String }],
    clan: { type: String },
    battle: { type: Boolean }, // показывает в бою ли игрок и если тру то рендерит флажек вместо модельки
    numbersBattle: { type: Number }, // всего проведенных боев
    numbersWinBattle: { type: Number }, // число выиграных боев
    numbersLooseBattle: { type: Number }, // проигранных боев
    kristalsBlue: { type: Number },
    kristalsYellow: { type: Number },
    lvl: { type: Number },
    ratingPoints: { type: Number },
    guild: { type: String }, //  разные гильдие будут выдавать разные задания игрокам с наградами. типа шахтерам удержать шахту 1 час и т д.
    shell: {
        shellAttack: { attack: { type: Number }, percent: { type: Number } }, //состояние усилителей базовых навіков
        shellDefend: { defend: { type: Number }, percent: { type: Number } }, //хранит уровень усилителя который добавляет очки
        shellLife: { life: { type: Number }, percent: { type: Number } }, //процент усилителя падает в ноль если бой проигран и растет на базе в мастерской N минут
    },
    superPowers: {
        superAttacking: { type: Number }, //покупается в магазине предметов рядом с базовыми усилителями но дает одноразовый эффект
        superDefending: { type: Number }, //добовляет к урону или защите доп очки сверху базовых в бою можно использовать только один из видов
        superHealling: { type: Number }, //добавляет к здоровью один раз за бой +очки в конце боя макс очки вернутся к базовым
    },
    user: { type: Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now },
});

module.exports = model("Lord", LordSchema);

// базовая схема лорда требует пересмотра
