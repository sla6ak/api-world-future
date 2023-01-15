const { server, mongoose, webSocketServer } = require("./httpApp");
const { authWS } = require("./middleware/authWS/auth.middleware");
const { channelConnect } = require("./wsChannels/channelConnect");
const channels = ["chat", "connect", "planetaBlueHome", "planetaYellowHome", "planetaLostWorld", "missions", "myLord"];
// нужно проверять авторизацию при подключении он опен и только

const clients = {};
// const clients = {"id":{clientWS: "server",id:"",ip:"", browser:""},"id":{},"id":{}.....};

webSocketServer.on("connection", async (ws, req) => {
    ws.on("pong", heartbeat);

    ws.send(JSON.stringify({ channel: "connect", data: { message: "ws connect" } }));
    ws.on("open", function open() {
        console.log("newUser open");
    });

    ws.on("message", async (message) => {
        const reqClient = JSON.parse(message);
        if (reqClient.channel === "connect") {
            // фронт прислал нам token игрока найдем его в базе.
            const client = authWS(reqClient.data, req);
            // нашли id подключенного проверим не висит ли он в списке подключений и удалим возможно он переподключился с нового браузера
            if (!!clients[client.id]) {
                delete clients[client.id];
            }
            // проверим не мульт ли он по ip/
            const listClients = Object.keys(clients);
            const multClient = listClients.find((el) => {
                el.ip === client.ip || el.browser === client.browser;
            });
            if (!!multClient) {
                return ws.send(JSON.stringify({ channel: "connect", data: { isMult: !!multClient } }));
            }
            // теперь перезапишем нового клиента в список
            client.clientWS = ws;
            clients[client.id] = client;
            // найдем и отправим ему нужную инфу
            const { allState } = channelConnect(reqClient.data);
            return ws.send(JSON.stringify({ channel: "connect", data: { allState, isMult: !!multClient } }));
        }
        if (reqClient.channel === "chat") {
            // тут будет функция из роутеров для ws
            ws.send(JSON.stringify({ channel: "chat", data: { message: "ws message" } }));
            return;
        }
        if (reqClient.channel === "myLord") {
            // тут будет функция из роутеров для ws
            return;
        }
        if (reqClient.channel === "planetaBlueHome") {
            // тут будет функция из роутеров для ws
            return;
        }
        if (reqClient.channel === "planetaYellowHome") {
            // тут будет функция из роутеров для ws
            return;
        }
        if (reqClient.channel === "planetaLostWorld") {
            // тут будет функция из роутеров для ws
            return;
        }
        if (reqClient.channel === "missions") {
            // тут будет функция из роутеров для ws
            return;
        }
    });

    // ws.on("error", (e) => ws.send(e));
    ws.on("close", () => {
        console.log("client exit");
        clearInterval(intervalPingPong);
    });
});

// необходимо разбиратся и доработать логику
function heartbeat() {}

const intervalPingPong = setInterval(function ping() {
    const listClients = Object.keys(clients);
    // listClients.map(function each(ws) {
    //     if (ws === false) return ws.terminate();
    //     ws = false;
    //     ws.ping();
    // });
}, 30000);

// необязательная функция на сервере так как работает нон стоп
webSocketServer.on("close", function close() {
    clearInterval(intervalPingPong);
});

module.exports = { server, mongoose };
