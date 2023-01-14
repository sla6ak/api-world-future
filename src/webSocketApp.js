const { server, mongoose, webSocketServer } = require("./httpApp");
const chanals = ["chat", "planetaBlueHome", "planetaYellowHome", "planetaLostWorld", "missions", "myLord"];
// нужно проверять авторизацию при подключении он опен и только

webSocketServer.on("connection", async (ws, req, client) => {
    const serverClients = [];
    const ipClient = req.socket.remoteAddress;
    const userBrowser = req.headers["user-agent"];
    console.log("newUser connected", ipClient, userBrowser);

    ws.send(JSON.stringify({ channel: "connect", message: "ws connected" }));
    ws.on("open", function open() {
        console.log("newUser open");
    });

    ws.on("message", async (message) => {
        const req = JSON.parse(message);
        if (req.channel === "connect") {
            console.log("userId:", req.id);
            ws.userId = req.id;
            serverClients.push(ws);
            console.log("users connected:", serverClients.length)
        }
        if (req.channel === "chat") {
            // тут будет функция из роутеров для ws
            ws.send(JSON.stringify({ channel: "chat", message: "ws server message" }));
            return;
        }
        if (req.channel === "myLord") {
            // тут будет функция из роутеров для ws
            return;
        }
        if (req.channel === "planetaBlueHome") {
            // тут будет функция из роутеров для ws
            return;
        }
        if (req.channel === "planetaYellowHome") {
            // тут будет функция из роутеров для ws
            return;
        }
        if (req.channel === "planetaLostWorld") {
            // тут будет функция из роутеров для ws
            return;
        }
        if (req.channel === "missions") {
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
