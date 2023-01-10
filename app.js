// Импорты базовых пакетов
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const logger = require("morgan");

const optionCors = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  allowedHeaders: "*",
};
// app.options("*", cors({ origin: "*", methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }));
app.use(cors(optionCors));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(
  logger(formatsLogger, {
    skip: function (req, res) {
      return res.statusCode === 404;
    },
  })
);

// Ниже импорты разных рероутов
const routerAuth = require("./routers/auth.routes");
const routerDocs = require("./routers/docs.routes");
const routerLord = require("./routers/lord.routes");
const routerChat = require("./routers/chat.routes");
const routerPlay = require("./routers/game.routes");
const routerLanguage = require("./routers/language.routers");
const routerMission = require("./routers/mission.routes");

// Список настроек для сервера
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json());
app.use("/auth", cors(optionCors), routerAuth);
app.use("/docs", routerDocs); // в идеале создать форум на основе чата где игроки сами напишут гайды и доки по игре.
app.use("/lord", routerLord); // хранит и обрабатывает информацию конкретного лорда
app.use("/chat", routerChat);
app.use("/mission", routerMission);
app.use("/language", routerLanguage);
app.use("/play", routerPlay); // роутер должен обрабатывать состояние карты рендерить всех онлаин игроков соответствующего лорду уровня на карте и запускатся как можно чаще
app.use("*", (res, req) => {
  req.json({ pages: "not page" });
});

// Вытягиваем переменные окружения в которой прячем путь к базе данных
dotenv.config();
const { BASE_URL } = process.env;
const PORT = process.env.PORT || 5000; // http://localhost:5000/docs

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
