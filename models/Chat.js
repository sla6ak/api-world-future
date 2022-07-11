const { Schema, model, Types } = require("mongoose"); //типы это часть библиотеки мангуста для описания колекции

const ChatSchema = new Schema({
    autorID: { type: Types.ObjectId, ref: "Lord", required: true },
    autor: { type: String, required: true },
    rassa: { type: String, required: true }, // расса будет подсвечивать автора цветом рассы
    status: { type: String, default: null }, //  статус определяет кому адресованно сообщение всем или личное
    massage: { type: String, required: true },
    clan: { type: String, default: "" },
    date: { type: Date, default: Date.now },
});

module.exports = model("Chat", ChatSchema);

// чат должен будет следить за датами сообщений и выводить на экран пользователя последние 20 сообщений
// внутреняя дата для отображения в чате а внешняя для поиска последних сообщений возможно віглядит иначе
