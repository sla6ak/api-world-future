const { app, webSocketServer, server, mongoose } = require("./configs/server/server");

// Ниже импорты разных рероутов
const routerAuth = require("./routers/auth.routes");
const routerDocs = require("./routers/docs.routes");
const routerLord = require("./routers/lord.routes");
const routerLanguage = require("./routers/language.routes");

app.use("/auth", routerAuth);
app.use("/docs", routerDocs); // в идеале создать форум на основе чата где игроки сами напишут гайды и доки по игре.
app.use("/lord", routerLord); // хранит и обрабатывает информацию конкретного лорда
app.use("/language", routerLanguage);
app.use("*", (res, req) => {
    req.json({ pages: "not page" });
});

module.exports = { server, mongoose, webSocketServer };
