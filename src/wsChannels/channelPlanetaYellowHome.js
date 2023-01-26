const channelYellowHome = (req, nikName) => {
  global.stateGame.YellowHome.players[nikName] = {
    position: req.position,
    rotation: req.rotation
  }
  const players = global.stateGame.YellowHome.players
  return { players, cristals: {} }
}

module.exports = { channelYellowHome }
