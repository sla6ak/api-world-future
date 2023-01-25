const { server, mongoose, webSocketServer } = require('./httpApp')
const { authWS } = require('./middleware/authWS/authWS.middleware')
const { channelConnect } = require('./wsChannels/channelConnect')
const { channelChat } = require('./wsChannels/channelChat')
const { channelMissions } = require('./wsChannels/channelMissions')
const { channelBlueHome } = require('./wsChannels/channelPlanetaBlueHome')
const { channelYellowHome } = require('./wsChannels/channelPlanetaYellowHome')
const { channelLostWorld } = require('./wsChannels/channelPlanetaLostWorld')
const { channelMyLord } = require('./wsChannels/channelMyLord')
const { globalState } = require('./globalState/globalState')
const {
  deletedPositionOldPlanet
} = require('./globalState/deletedPositionOldPlanet')
globalState()

// нужно проверять авторизацию при подключении connection и только
const clients = {}
// const clients = {"id":{clientWS: "server",id:"",ip:"", browser:""},"id":{},"id":{}.....};

webSocketServer.on('connection', async (ws, req) => {
  let nikName = ''
  let myPlanet = ''
  let client
  let listClients = Object.keys(clients)

  ws.on('message', async (message) => {
    const reqClient = JSON.parse(message)
    if (reqClient.channel === 'connect') {
      // фронт прислал нам token игрока найдем его в базе.
      try {
        client = await authWS({ req: reqClient.data, heder: req })
      } catch (error) {
        ws.send(
          JSON.stringify({
            channel: 'errorServer',
            data: { isErrorUser: true }
          })
        )
        return
      }
      // если токен несуществует попросим юзера обновить страницу на клиенте
      if (!client.id) {
        return ws.send(
          JSON.stringify({
            channel: 'errorServer',
            data: { isErrorUser: true }
          })
        )
      }
      listClients = Object.keys(clients)

      if (listClients.includes(client.id)) {
        // нашли id подключенного проверим не висит ли он в списке подключений и удалим возможно он переподключился с нового браузера
        delete clients[client.id]
      }
      // проверим не мульт ли он по ip/
      // const multClient = listClients.find((el) => {
      //     el.ip === client.ip;
      // });
      // if (!!multClient) {
      //     return ws.send(JSON.stringify({ channel: "connect", data: { isErrorUser: true } }));
      // }
      // найдем и отправим ему нужную инфу
      const { allState } = await channelConnect({ clientID: client.id })
      nikName = allState.lordInfo.nikName
      myPlanet = allState.lordInfo.planet

      // теперь перезапишем нового клиента в список
      client.clientWS = ws
      clients[client.id] = client
      return ws.send(
        JSON.stringify({ channel: 'connect', data: { ...allState } })
      )
    }

    if (reqClient.channel === 'chat') {
      // тут будет функция из роутеров для ws
      const { chatState } = channelChat(reqClient.data)
      listClients = Object.keys(clients)
      listClients.map((elementID) =>
        clients[elementID].clientWS.ws.send(
          JSON.stringify({ channel: 'chat', data: chatState })
        )
      )
      return
    }

    if (reqClient.channel === 'myLord') {
      const lordInfo = await channelMyLord({
        req: reqClient.data,
        clientID: client.id
      })
      if (lordInfo) {
        ws.send(JSON.stringify({ channel: 'myLord', data: lordInfo }))
        myPlanet = lordInfo.planet
      }
      return
    }
    if (reqClient.channel === 'BlueHome') {
      const BlueHomeInfo = channelBlueHome(reqClient.data, nikName)
      listClients = Object.keys(clients)
      listClients.map((elementID) =>
        clients[elementID].clientWS.send(
          JSON.stringify({
            channel: 'BlueHome',
            data: BlueHomeInfo
          })
        )
      )
      return
    }
    if (reqClient.channel === 'YellowHome') {
      const { YellowHomeInfo } = channelYellowHome(reqClient.data, nikName)
      listClients = Object.keys(clients)
      listClients.map((elementID) =>
        clients[elementID].clientWS.send(
          JSON.stringify({
            channel: 'YellowHome',
            data: YellowHomeInfo
          })
        )
      )

      return
    }
    if (reqClient.channel === 'LostWorld') {
      const { LostWorldInfo } = channelLostWorld(reqClient.data, nikName)
      listClients = Object.keys(clients)
      listClients.map((elementID) =>
        clients[elementID].clientWS.ws.send(
          JSON.stringify({
            channel: 'LostWorld',
            data: LostWorldInfo
          })
        )
      )

      return
    }
    if (reqClient.channel === 'missions') {
      // тут будет функция из роутеров для ws
      const { MissionsState } = channelMissions(reqClient.data, nikName)
      return ws.send(
        JSON.stringify({ channel: 'missions', data: MissionsState })
      )
      // console.log(reqClient);
    }
  })

  // ws.on("error", (e) => ws.send(e));
  ws.on('close', () => {
    if (myPlanet) {
      deletedPositionOldPlanet(myPlanet, nikName)
    }
    delete clients[client.id]
  })
})

// необязательная функция на сервере так как работает нон стоп
webSocketServer.on('close', function close() {
  console.log('error')
})

module.exports = { server, mongoose }
