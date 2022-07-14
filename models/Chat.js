const { Schema, model, Types } = require("mongoose");

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
