const { Schema, model, Types } = require("mongoose");

export const ChatSchema = new Schema({
    authorID: { type: Types.ObjectId, ref: "Lord", required: true },
    author: { type: String, required: true },
    race: { type: String, required: true }, // расса будет подсвечивать автора цветом рассы
    status: { type: String, default: null }, //  статус определяет кому адресованно сообщение всем или личное
    message: { type: String, required: true },
    clan: { type: String, default: "" },
    date: { type: Date, default: Date.now },
});

module.exports = model("Chat", ChatSchema);
