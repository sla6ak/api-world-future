const { app, webSocketServer, server, mongoose } = require("./configs/server/server");

// Ниже импорты разных рероутов
const routerAuth = require("./routers/auth.routes");
const routerDocs = require("./routers/docs.routes");
const routerLord = require("./routers/lord.routes");
const routerChat = require("./routers/chat.routes");
const routerPlay = require("./routers/game.routes");
const routerLanguage = require("./routers/language.routes");
const routerMission = require("./routers/mission.routes");

app.use("/auth", routerAuth);
app.use("/docs", routerDocs); // в идеале создать форум на основе чата где игроки сами напишут гайды и доки по игре.
app.use("/lord", routerLord); // хранит и обрабатывает информацию конкретного лорда
app.use("/chat", routerChat);
app.use("/mission", routerMission);
app.use("/language", routerLanguage);
app.use("/play", routerPlay); // роутер должен обрабатывать состояние карты рендерить всех онлаин игроков соответствующего лорду уровня на карте и запускатся как можно чаще
app.use("*", (res, req) => {
    req.json({ pages: "not page" });
});

webSocketServer.on("connection", async (ws, req, client) => {
    const ipClient = req.socket.remoteAddress;
    const userBrawser = req.headers["user-agent"];
    console.log("newUser connected", ipClient, userBrawser);
    ws.send(JSON.stringify({ chanal: "test", message: "ws connect" }));
    ws.on("open", function open() {
        console.log("newUser open");
    });
    ws.on("message", async (message) => {
        const req = JSON.parse(message);
        ws.send(JSON.stringify({ chanal: "test", message: "ws message" }));
        console.log(req);
    });

    // ws.on("error", (e) => ws.send(e));
    ws.on("close", () => {
        console.log("client exit");
    });
});

module.exports = { app, server, mongoose };
