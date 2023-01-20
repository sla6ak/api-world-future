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
module.exports = { deletedPositionOldPlanet };
