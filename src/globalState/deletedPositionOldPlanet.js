function deletedPositionOldPlanet({ oldPlanet, nikName }) {
  const stateGame = global.stateGame
  delete stateGame[oldPlanet].players[nikName]
}
module.exports = { deletedPositionOldPlanet }
