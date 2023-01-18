const ChatSchema = require("../../routers/models/Chat");

class Chat {
    async allMessage(req, res) {
        try {
            let start = new Date(new Date().getTime() - 0.5 * 60 * 60 * 1000);
            const letters = await ChatSchema.find({ clan: "", date: { $gte: start } });
            res.status(200).json({ message: "find lastLetters", letters: letters });
        } catch (error) {
            return res.status(504).json({ message: "serverChat all message is error", error });
        }
    }
    async blueMessage(req, res) {
        try {
            res.status(200).json({});
        } catch (error) {
            return res.status(504).json({ message: "serverChat blue is error", error });
        }
    }
    async clanMessage(req, res) {
        try {
            res.status(200).json({});
        } catch (error) {
            return res.status(504).json({ message: "serverChat clan is error", error });
        }
    }
    async yellowMessage(req, res) {
        try {
            res.status(200).json({});
        } catch (error) {
            return res.status(504).json({ message: "serverChat yellow is error", error });
        }
    }
    async sendMessage(req, res) {
        try {
            const { race, message, author } = req.body;
            const newMessage = new ChatSchema({ race, message, author, authorID: req.id });
            await newMessage.save();
            res.status(200).json({ message: "find lastLetters" });
        } catch (error) {
            return res.status(404).json({ message: "message not created!", error });
        }
    }
}

module.exports = new Chat();
