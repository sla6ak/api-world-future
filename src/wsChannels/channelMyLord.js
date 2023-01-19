const user = require("../controllers/lord/MyLordWs");

const channelMyLord = async ({ req, clientID, nikName }) => {
    if (req.event === "choosePlanet") {
        const { lordInfo, oldPlanet } = await user.choosePlanet({ planet: req.planet, clientID });
        if (oldPlanet === "BlueHome") {
            deletedPositionOldPlanet({ oldPlanet: "planetaBlueHomeInfo", nikName });
        } else if (oldPlanet === "YellowHome") {
            deletedPositionOldPlanet({ oldPlanet: "planetaYellowHomeInfo", nikName });
        } else if (oldPlanet === "LostWorld") {
            deletedPositionOldPlanet({ oldPlanet: "planetaLostWorldInfo", nikName });
        }
        const allState = { lordInfo };
        return { allState };
    }
};

module.exports = { channelMyLord };

function deletedPositionOldPlanet({ oldPlanet, nikName }) {
    let players = global.stateGame[oldPlanet].players;
    const isPlayer = players.find((el) => {
        return el.nikName === nikName;
    });
    if (!isPlayer) {
        return;
    }
    if (isPlayer) {
        players.map((el, ind) => {
            if (el.nikName === nikName) {
                players.splice(ind, 1);
            }
        });
    }
    return;
}
