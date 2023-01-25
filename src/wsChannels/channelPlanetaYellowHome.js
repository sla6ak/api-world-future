const channelYellowHome = (req, nikName) => {
  const players = [...global.stateGame.BlueHome.players]
  const isPlayer = players.find((el) => {
    return el.nikName === nikName
  })
  if (!isPlayer) {
    players.push({ nikName, position: req.position, rotation: req.rotation })
    global.stateGame.YellowHome.players = players
    return { players }
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
    return { players }
  }
}

module.exports = { channelYellowHome }
