const baseLord = {
    nikName: "", //
    rassa: "", //
    online: true, //
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    clan: "",
    battle: false,
    planet: "",
    numbersBattle: 0, // всего проведенных боев
    numbersWinBattle: 0, // число выиграных боев
    numbersLooseBattle: 0, // проигранных боев
    kristalsBlue: 5,
    kristalsYellow: 5,
    curentMissions: [],
    lvl: 1,
    ratingPoints: 0,
    guild: "",
    shell: {
        shellAttack: { attack: 0, percent: 100 }, //состояние усилителей базовых навіков
        shellDefend: { defend: 0, percent: 100 }, //хранит уровень усилителя который добавляет очки
        shellLife: { life: 0, percent: 100 }, //процент усилителя падает в ноль если бой проигран и растет на базе в мастерской N минут
    },
    superPowers: {
        superAttacking: 3, //покупается в магазине предметов рядом с базовыми усилителями но дает одноразовый эффект
        superDefending: 2, //добовляет к урону или защите доп очки сверху базовых в бою можно использовать только один из видов
        superHealling: 1, //добавляет к здоровью один раз за бой +очки в конце боя макс очки вернутся к базовым
    },
    user: "",
};

module.exports = baseLord;
