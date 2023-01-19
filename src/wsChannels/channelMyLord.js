const user = require("../controllers/lord/MyLordWs");

const channelMyLord = async ({ req, clientID, nikName }) => {
    if (req.event === "choosePlanet") {
        const { lordInfo, oldPlanet } = await user.choosePlanet({ planet: req.planet, clientID });
        console.log("channelMyLord", lordInfo, oldPlanet);
        deletedPositionOldPlanet({ oldPlanet, nikName });
        return lordInfo;
    }
};

module.exports = { channelMyLord };

function deletedPositionOldPlanet({ oldPlanet, nikName }) {
    let stateGame = global.stateGame;
    const isPlayer = stateGame[oldPlanet].players.find((el) => {
        return el.nikName === nikName;
    });
    if (!isPlayer) {
        return;
    }
    if (isPlayer) {
        stateGame[oldPlanet].players.map((el, ind) => {
            if (el.nikName === nikName) {
                stateGame[oldPlanet].players.splice(ind, 1);
            }
        });
    }
    return;
}
