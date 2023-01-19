//  Контроллеры
const user = require("../controllers/lord/MyLordWs");

const channelConnect = async ({ clientID }) => {
    // нам нужно найти в базе данных игрока по ид вытянуть его текщую планету и соответственно передать ему все данные по этой планете.
    const { lordInfo } = await user.getLord({ clientID });
    let planetInfo = global.stateGame[lordInfo.planet];

    const allState = { lordInfo, [lordInfo.planet]: planetInfo };
    return { allState };
};

module.exports = { channelConnect };
