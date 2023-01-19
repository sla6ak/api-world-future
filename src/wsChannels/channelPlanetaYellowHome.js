const channelPlanetaYellowHome = (req, nikName) => {
    let players = global.stateGame.YellowHome.players;
    const isPlayer = players.find((el) => {
        return el.nikName === nikName;
    });
    if (!isPlayer) {
        players.push({ nikName, position: req.position });
        global.stateGame.YellowHome.players = players;
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

module.exports = { channelPlanetaYellowHome };
