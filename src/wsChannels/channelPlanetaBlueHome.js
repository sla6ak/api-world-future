// players: [{ nikName: '', position: { x: 0, y: -1.0000112952390678, z: 1.4214541468827565e-15 }]

const channelBlueHome = (req, nikName) => {
  const players = [...global.stateGame.BlueHome.players]
  const isPlayer = players.find((el) => {
    return el.nikName === nikName
  })
  if (!isPlayer) {
    players.push({ nikName, position: req.position, rotation: req.rotation })
    global.stateGame.BlueHome.players = players
    return { players, cristals: {} }
  }

  if (isPlayer) {
    players.map(
      (el, ind) =>
        el.nikName === nikName &&
        players.splice(ind, 1, {
          nikName,
          position: req.position,
          rotation: req.rotation
        })
    )
    global.stateGame.BlueHome.players = players
    return { players, cristals: {} }
  }
}

module.exports = { channelBlueHome }
