// это временное глобальное хранение онлаин позиций игроков это выглядит быстрее чем миллион запросов к монго.
// мы хотим сохранять позицию игрока в монго при каждом соединении и отключении игрока но не ежесекундно. и при смене планет

const globalState = () => {
    global.stateGame = { planetaBlueHomeInfo: { players: [] }, planetaYellowHomeInfo: { players: [] } };
};

module.exports = { globalState };