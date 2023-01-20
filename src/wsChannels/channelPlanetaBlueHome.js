// players: [{ nikName: '', position: { x: 0, y: -1.0000112952390678, z: 1.4214541468827565e-15 }]

const channelPlanetaBlueHome = (req, nikName) => {
  const players = global.stateGame.BlueHome.players
  const isPlayer = players.find((el) => {
    return el.nikName === nikName
  })
  if (!isPlayer) {
    players.push({ nikName, position: req.position })
    global.stateGame.BlueHome.players = players
    return { players }
  }

  if (isPlayer) {
    players.map(
      (el, ind) =>
        el.nikName === nikName &&
        players.splice(ind, 1, { nikName, position: req.position })
    )

    return { players, сristals: {} }
  }
}

module.exports = { channelPlanetaBlueHome }
