const { server, mongoose, webSocketServer } = require("./httpApp");
const { canalConnect } = require("./wsCanals/connect");
const chanals = ["chat", "connect", "planetaBlueHome", "planetaYellowHome", "planetaLostWorld", "missions", "myLord"];
// нужно проверять авторизацию при подключении он опен и только

webSocketServer.on("connection", async (ws, req, client) => {
    const ipClient = req.socket.remoteAddress;
    const userBrawser = req.headers["user-agent"];
    // console.log("newUser connected", ipClient, userBrawser);
    ws.send(JSON.stringify({ chanal: "connect", message: "ws connect" }));
    ws.on("open", function open() {
        console.log("newUser open");
    });

    ws.on("message", async (message) => {
        const req = JSON.parse(message);
        if (req.chanal === "chat") {
            // тут будет функция из роутеров для ws
            ws.send(JSON.stringify({ chanal: "chat", message: "ws message" }));
            return;
        }
        if (req.chanal === "connect") {
            // фронт прислал нам ид игрока найдем его в базе и вышлем ему инфу про его текущую планету только необходимое.
            const { allState } = canalConnect(req.data);
            return;
        }
        if (req.chanal === "myLord") {
            // тут будет функция из роутеров для ws
            return;
        }
        if (req.chanal === "planetaBlueHome") {
            // тут будет функция из роутеров для ws
            return;
        }
        if (req.chanal === "planetaYellowHome") {
            // тут будет функция из роутеров для ws
            return;
        }
        if (req.chanal === "planetaLostWorld") {
            // тут будет функция из роутеров для ws
            return;
        }
        if (req.chanal === "missions") {
            // тут будет функция из роутеров для ws
            return;
        }
    });

    // ws.on("error", (e) => ws.send(e));
    ws.on("close", () => {
        console.log("client exit");
    });
});

module.exports = { server, mongoose };
