// Импорты базовых пакетов
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

// Ниже импорты разных рероутов
const routerAuth = require("./routers/auth.routes");
const routerDocs = require("./routers/docs.routes");
const routerLord = require("./routers/lord.routes");
const routerChat = require("./routers/chat.routes");
const routerPlay = require("./routers/game.routes");
const routerMission = require("./routers/mission.routes");

// Вытягиваем переменные окружения в которой прячем путь к базе данных
dotenv.config();
const { BASE_URL } = process.env;
const PORT = process.env.PORT || 5000; // http://localhost:5000/docs

// Список настроек для сервера
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/auth", routerAuth);
app.use("/docs", routerDocs); // в идеале создать форум на основе чата где игроки сами напишут гайды и доки по игре.
app.use("/lord", routerLord); // хранит и обрабатывает информацию конкретного лорда
app.use("/chat", routerChat);
app.use("/mission", routerMission);
app.use("/play", routerPlay); // роутер должен обрабатывать состояние карты рендерить всех онлаин игроков соответствующего лорду уровня на карте и запускатся как можно чаще

async function start() {
    try {
        app.listen(PORT, () => {
            console.log(`listening ${PORT}`);
            mongoose.connect(BASE_URL).then(() => {
                console.log(`MongoDB start`);
            });
        });
    } catch (error) {
        process.exit(0);
    }
}

start();
