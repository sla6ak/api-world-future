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
const { deletedPositionOldPlanet } = require("./globalState/deletedPositionOldPlanet");

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
    let nikName = "";
    let myPlanet = "";
    let client;
    let listClients = Object.keys(clients);

    ws.on("message", async (message) => {
        const reqClient = JSON.parse(message);
        if (reqClient.channel === "connect") {
            // фронт прислал нам token игрока найдем его в базе.
            try {
                console.log("token", reqClient.data);
                client = await authWS({ req: reqClient.data, heder: req });
            } catch (error) {
                ws.send(JSON.stringify({ channel: "errorServer", data: { isErrorUser: true } }));
                return;
            }
            // если токен несуществует попросим юзера обновить страницу на клиенте
            if (!client.id) {
                return ws.send(JSON.stringify({ channel: "errorServer", data: { isErrorUser: true } }));
            }
            listClients = Object.keys(clients);

            if (listClients.includes(client.id)) {
                // нашли id подключенного проверим не висит ли он в списке подключений и удалим возможно он переподключился с нового браузера
                delete clients[client.id];
            }
            // проверим не мульт ли он по ip/
            // const multClient = listClients.find((el) => {
            //     el.ip === client.ip;
            // });
            // if (!!multClient) {
            //     return ws.send(JSON.stringify({ channel: "connect", data: { isErrorUser: true } }));
            // }
            // найдем и отправим ему нужную инфу
            const { allState } = await channelConnect({ clientID: client.id });
            nikName = allState.lordInfo.nikName;
            myPlanet = allState.lordInfo.planet;

            // теперь перезапишем нового клиента в список
            client.clientWS = ws;
            clients[client.id] = client;
            return ws.send(JSON.stringify({ channel: "connect", data: { ...allState } }));
        }

        if (reqClient.channel === "chat") {
            // тут будет функция из роутеров для ws
            const { chatState } = channelChat(reqClient.data);
            ws.send(JSON.stringify({ channel: "chat", data: chatState }));
            return;
        }

        if (reqClient.channel === "myLord") {
            const lordInfo = await channelMyLord({ req: reqClient.data, clientID: client.id });
            if (lordInfo) ws.send(JSON.stringify({ channel: "myLord", data: lordInfo }));
            myPlanet = lordInfo.planet;
            return;
        }
        if (reqClient.channel === "planetaBlueHome") {
            // console.log("nikName", nikName);
            const planetaBlueHomeInfo = channelPlanetaBlueHome(reqClient.data, nikName);
            listClients = Object.keys(clients);
            // console.log("BlueHomeInfo", planetaBlueHomeInfo);
            listClients.map((elementID) => {
                clients[elementID].clientWS.send(
                    JSON.stringify({ channel: "planetaBlueHome", data: planetaBlueHomeInfo })
                );
            });
            return;
        }
        if (reqClient.channel === "planetaYellowHome") {
            const { PlanetaYellowHomeState } = channelPlanetaYellowHome(reqClient.data, nikName);
            ws.send(JSON.stringify({ channel: "planetaYellowHome", data: PlanetaYellowHomeState }));
            return;
        }
        if (reqClient.channel === "planetaLostWorld") {
            const { PlanetaLostWorldState } = channelPlanetaLostWorld(reqClient.data, nikName);
            ws.send(JSON.stringify({ channel: "planetaLostWorld", data: PlanetaLostWorldState }));
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
        deletedPositionOldPlanet(myPlanet, nikName);
        delete clients[client.id];
        clearInterval(intervalPingPong);
    });
});

// необязательная функция на сервере так как работает нон стоп
webSocketServer.on("close", function close() {
    clearInterval(intervalPingPong);
});

module.exports = { server, mongoose };
