const channelLostWorld = (req, nikName) => {
  global.stateGame.LostWorld.players[nikName] = {
    position: req.position,
    rotation: req.rotation
  }
  const players = global.stateGame.LostWorld.players
  return { players, cristals: {} }
}

module.exports = { channelLostWorld }
