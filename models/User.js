const { Schema, model } = require("mongoose"); //типы это часть библиотеки мангуста для описания колекции

const AuthSchema = new Schema({
    name: { type: String, required: true, unique: true }, // тут же можно передавать функции валидации из доков
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = model("User", AuthSchema);
