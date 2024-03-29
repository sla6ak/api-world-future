//  Контроллеры
const user = require('../controllers/lord/MyLordWs')

const channelConnect = async ({ clientID }) => {
  // нам нужно найти в базе данных игрока по ид вытянуть его текщую планету и соответственно передать ему все данные по этой планете.
  const lordInfo = await user.getLordWs({ clientID })
  if (!lordInfo) return
  const stateGame = global.stateGame
  const allState = { lordInfo, planetaInfo: stateGame[lordInfo.planet] }
  return { allState }
}

module.exports = { channelConnect }
