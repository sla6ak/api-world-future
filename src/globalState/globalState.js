const globalState = () => {
    global.stateGame = { channelPlanetaBlueHome: { players: [] }, channelPlanetaYellowHome: { players: [] } };
};

module.exports = { globalState };
