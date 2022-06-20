const { Schema, model, Types } = require("mongoose"); //типы это часть библиотеки мангуста для описания колекции

const BattleSchema = new Schema({
    attacking: { type: Types.ObjectId, ref: "Lord", required: true },
    // defining: { type: String, required: true },
    defining: { type: Types.ObjectId, ref: "Lord", required: true },
    attackSuperPower: { type: String },
    defenSuperPower: { type: String },
    stepBattle: [
        {
            stepAttacking: [{ atack: { type: String }, defend: { type: String }, superPower: { type: String } }],
            stepDefining: [{ atack: { type: String }, defend: { type: String }, superPower: { type: String } }],
        },
    ],
    steps: { type: Number },
    result: { type: String },
    date: { type: Date, default: Date.now },
});

module.exports = model("Battle", BattleSchema);

//  stepBattle: это массив объектов куда мы пушим каждый следующий ход.
// при этом объект хода содержит инфу кто как походил и это массив из 1 или 2х событий из => до(имена войск)
// бекенд будет віполнять функцию расчета состояния жизни получая юнитов игрока и строки ходов
