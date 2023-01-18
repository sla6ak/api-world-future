const { server, mongoose, webSocketServer } = require("./httpApp");
const { authWS } = require("./middleware/authWS/authWS.middleware");
const { channelConnect } = require("./wsChannels/channelConnect");
const { channelChat } = require("./wsChannels/channelChat");
const { channelMissions } = require("./wsChannels/channelMissions");
const { channelPlanetaBlueHome } = require("./wsChannels/channelPlanetaBlueHome");
const { channelPlanetaYellowHome } = require("./wsChannels/channelPlanetaYellowHome");
const { channelPlanetaLostWorld } = require("./wsChannels/channelPlanetaLostWorld");
const { channelMyLord } = require("./wsChannels/channelMyLord");
const { globalState } = require("./globalState/globalState");

globalState();
const channels = [
    "chat",
    "connect",
    "planetaBlueHome",
    "planetaYellowHome",
    "planetaLostWorld",
    "missions",
    "myLord",
    "errorServer",
];
// нужно проверять авторизацию при подключении connection и только
const clients = {};
// const clients = {"id":{clientWS: "server",id:"",ip:"", browser:""},"id":{},"id":{}.....};

webSocketServer.on("connection", async (ws, req) => {
    let clientID = "";
    let nikName = "";
    let client;
    let listClients = Object.keys(clients);
    ws.on("pong", heartbeat);
    ws.send(JSON.stringify({ channel: "connect", data: { message: "ws connect" } }));
    // ws.on("open", function open() {
    //     console.log("newUser open");
    // });

    ws.on("message", async (message) => {
        const reqClient = JSON.parse(message);
        if (reqClient.channel === "connect") {
            // фронт прислал нам token игрока найдем его в базе.
            try {
                client = await authWS(reqClient.data, req);
            } catch (error) {
                ws.send(JSON.stringify({ channel: "errorServer", data: { isErrorUser: true } }));
                return;
            }
            clientID = client.id;
            // если токен несуществует попросим юзера обновить страницу на клиенте
            if (!clientID) {
                return ws.send(JSON.stringify({ channel: "errorServer", data: { isErrorUser: true } }));
            }
            listClients = Object.keys(clients);
            if (listClients.includes(clientID)) {
                // нашли id подключенного проверим не висит ли он в списке подключений и удалим возможно он переподключился с нового браузера
                delete clients[clientID];
            }
            // проверим не мульт ли он по ip/
            // const multClient = listClients.find((el) => {
            //     // el.ip === client.ip || el.browser === client.browser;
            //     el.ip === client.ip;
            // });
            // if (!!multClient) {
            //     return ws.send(JSON.stringify({ channel: "connect", data: { isErrorUser: true } }));
            // }
            // найдем и отправим ему нужную инфу
            const { allState } = await channelConnect({ clientID });
            nikName = allState.lordInfo.nikName;

            // теперь перезапишем нового клиента в список
            client.clientWS = ws;
            clients[client.id] = client;
            return ws.send(JSON.stringify({ channel: "connect", data: { allState, isErrorUser: false } }));
        }
        if (reqClient.channel === "chat") {
            // тут будет функция из роутеров для ws
            const { chatState } = channelChat(reqClient.data);
            ws.send(JSON.stringify({ channel: "chat", data: chatState }));
            return;
        }
        if (reqClient.channel === "myLord") {
            // тут будет функция из роутеров для ws
            const { myLordState } = channelMyLord(reqClient.data);
            ws.send(JSON.stringify({ channel: "myLord", data: myLordState }));
            // console.log(reqClient);
            return;
        }
        if (reqClient.channel === "planetaBlueHome") {
            // тут будет функция из роутеров для ws
            const planetaBlueHomeInfo = channelPlanetaBlueHome(reqClient.data, nikName);
            listClients = Object.keys(clients);
            console.log(planetaBlueHomeInfo);
            listClients.map((elementID) => {
                clients[elementID].clientWS.send(
                    JSON.stringify({ channel: "planetaBlueHome", data: planetaBlueHomeInfo })
                );
            });
            // console.log(reqClient);
            return;
        }
        if (reqClient.channel === "planetaYellowHome") {
            // тут будет функция из роутеров для ws
            const { PlanetaYellowHomeState } = channelPlanetaYellowHome(reqClient.data, nikName);
            ws.send(JSON.stringify({ channel: "planetaYellowHome", data: PlanetaYellowHomeState }));
            // console.log(reqClient);
            return;
        }
        if (reqClient.channel === "planetaLostWorld") {
            // тут будет функция из роутеров для ws
            const { PlanetaLostWorldState } = channelPlanetaLostWorld(reqClient.data, nikName);
            ws.send(JSON.stringify({ channel: "planetaLostWorld", data: PlanetaLostWorldState }));
            // console.log(reqClient);
            return;
        }
        if (reqClient.channel === "missions") {
            // тут будет функция из роутеров для ws
            const { MissionsState } = channelMissions(reqClient.data, nikName);
            ws.send(JSON.stringify({ channel: "missions", data: MissionsState }));
            // console.log(reqClient);
            return;
        }
    });

    // ws.on("error", (e) => ws.send(e));
    ws.on("close", () => {
        // при отключении удалим из массива клиента
        delete clients[clientID];
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
