const channelPlanetaLostWorld = (req, nikName) => {
    let players = global.stateGame.LostWorld.players;
    const isPlayer = players.find((el) => {
        return el.nikName === nikName;
    });
    if (!isPlayer) {
        players.push({ nikName, position: req.position });
        global.stateGame.LostWorld.players = players;
        return { players };
    }
    if (isPlayer) {
        players.map((el, ind) => {
            if (el.nikName === nikName) {
                players.splice(ind, 1, { nikName, position: req.position });
            }
        });

        return { players };
    }
};

module.exports = { channelPlanetaLostWorld };
