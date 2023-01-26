// players: [{ nikName: '', position: { x: 0, y: -1.0000112952390678, z: 1.4214541468827565e-15 }]

const channelBlueHome = (req, nikName) => {
  global.stateGame.BlueHome.players[nikName] = {
    position: req.position,
    rotation: req.rotation
  }
  const players = global.stateGame.BlueHome.players
  return { players, cristals: {} }
}

module.exports = { channelBlueHome }
