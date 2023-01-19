const baseLord = {
    nikName: "", //
    race: "", // Blue Yellow
    online: true, //
    positionX: Math.floor(Math.random() * 10),
    positionY: 0,
    positionZ: Math.floor(Math.random() * 10),
    clan: "",
    battle: false,
    planet: "YellowHome", // BlueHome YellowHome LostWorld
    numbersBattle: 0, // всего проведенных боев
    numbersWinBattle: 0, // число выиграных боев
    numbersLooseBattle: 0, // проигранных боев
    cristalsBlue: 5,
    cristalsYellow: 5,
    darkMatter: 10,
    curentMissions: [],
    lvl: 1,
    ratingPoints: 0,
    guild: "",
    squad: {
        robot: {
            name: "base robot",
            power: {
                attack: { base: 3, shell: { base: 0, bonuse: 0, percent: 100 }, bonuse: 0 }, //состояние усилителей базовых навіков
                defend: { base: 3, shell: { base: 0, bonuse: 0, percent: 100 }, bonuse: 0 }, //хранит уровень усилителя который добавляет очки
                life: { base: 5, shell: { base: 0, bonuse: 0, percent: 100 }, bonuse: 0 }, //процент усилителя падает в ноль если бой проигран и растет на базе в мастерской N минут
            },
        },
        sniper: {
            name: "base sniper",
            power: {
                attack: { base: 2, shell: { base: 0, bonuse: 0, percent: 100 }, bonuse: 0 }, //состояние усилителей базовых навіков
                defend: { base: 3, shell: { base: 0, bonuse: 0, percent: 100 }, bonuse: 0 }, //хранит уровень усилителя который добавляет очки
                life: { base: 4, shell: { base: 0, bonuse: 0, percent: 100 }, bonuse: 0 }, //процент усилителя падает в ноль если бой проигран и растет на базе в мастерской N минут
            },
        },
        shturm: {
            name: "base shturm",
            power: {
                attack: { base: 3, shell: { base: 0, bonuse: 0, percent: 100 }, bonuse: 0 }, //состояние усилителей базовых навіков
                defend: { base: 2, shell: { base: 0, bonuse: 0, percent: 100 }, bonuse: 0 }, //хранит уровень усилителя который добавляет очки
                life: { base: 4, shell: { base: 0, bonuse: 0, percent: 100 }, bonuse: 0 }, //процент усилителя падает в ноль если бой проигран и растет на базе в мастерской N минут
            },
        },
    },
    superPowers: {
        superAttacking: 3, //покупается в магазине предметов рядом с базовыми усилителями но дает одноразовый эффект
        superDefending: 2, //добовляет к урону или защите доп очки сверху базовых в бою можно использовать только один из видов
        superHealling: 1, //добавляет к здоровью один раз за бой +очки в конце боя макс очки вернутся к базовым
    },
    user: "",
};

module.exports = baseLord;

// planet : 'BlueHome', 'YellowHome', 'Mainer', 'Lost', 'Ray',
