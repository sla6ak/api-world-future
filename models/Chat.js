const { Schema, model, Types } = require("mongoose"); //типы это часть библиотеки мангуста для описания колекции

const ChatSchema = new Schema({
    autor: { type: Types.ObjectId, ref: "Lord", required: true },
    rassa: { type: String }, // расса будет подсвечивать автора цветом рассы
    status: { type: String }, //  статус определяет кому адресованно сообщение всем или личное
    massage: [{ body: String, date: Date }],
    clan: { type: String },
    date: { type: Date, default: Date.now },
});

module.exports = model("Chat", ChatSchema);

// чат должен будет следить за датами сообщений и выводить на экран пользователя последние 20 сообщений
// внутреняя дата для отображения в чате а внешняя для поиска последних сообщений возможно віглядит иначе
