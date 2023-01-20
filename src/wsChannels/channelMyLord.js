const user = require("../controllers/lord/MyLordWs");
const { deletedPositionOldPlanet } = require("../globalState/deletedPositionOldPlanet");

const channelMyLord = async ({ req, clientID }) => {
    if (req.event === "choosePlanet") {
        const { lordInfo, oldPlanet } = await user.choosePlanet({ planet: req.planet, clientID });
        // console.log("channelMyLord", lordInfo, oldPlanet);
        deletedPositionOldPlanet({ oldPlanet, nikName: lordInfo.nikName });
        return lordInfo;
    }
};

module.exports = { channelMyLord };
