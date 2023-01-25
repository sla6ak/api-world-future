const distance = 'Расстояние по приборам:'
const en = {
  listLanguage: [
    { shortName: 'en', text: 'ENGLISH' },
    { shortName: 'ua', text: 'UKRAINIAN' },
    { shortName: 'ru', text: 'RUSSIAN' }
  ],
  startPage: {
    h1: 'Welcome to the world 3D of the future!',
    buttons: { language: 'LANGUAGES', start: 'START GAME' },
    aboutGame:
      'If you see this page, the connection to the server may have been lost for some time. Perhaps this is your first time here? In any case, the menu is intuitive and the game process is exciting. This is an RPG where you will surely meet new comrades!'
  },
  loginPage: {
    h1: 'Login Please',
    ask: "You don't have a login?",
    buttons: { registration: 'Registration', submit: 'SUBMIT' }
  },
  registerPage: {
    h1: 'Welcome to the world 3D of the future!',
    h2: 'This is licensia for players',
    textLicensia:
      "Developers can full controls this game and apgreding anything. You should not expect that the game will always meet your desires. By signing this agreement, you have the right to immerse yourself in the game world within the framework of the developer's intention and without infringing on the same rights of other users of the game. For violation of the rules of the game established by the developer, any player may be held liable both in-game and legally. The player can be either temporarily blocked or removed from the server without the possibility of recovery. All in-game purchases are considered as payment for your leisure time and cannot be refunded. Have a nice game!",

    ask: 'Already have an account?',
    agree: 'I have read and agree',
    buttons: {
      registration: 'Login',
      submit: 'SEND'
    }
  },
  setLordPage: {
    h1: 'Setting your personage',
    ask: 'Come up with a name for your character',
    buttons: {
      desert: 'DESERT',
      winter: 'WINTER'
    },
    history:
      'By the year 4800, humanity learned to use wormholes to move around the galaxy, but no matter how far the progress went, internal strife and the struggle for power and resources only intensified, which eventually led to a complete split of the government into two largest factions, which took critical resource sources are important for technologies. Whatever race you choose, you protect civilians from special military operations to deplete your land! Do not allow imbalance in the universe!'
  },
  objects: {
    cristals: { title: 'Коробка', shortInfo: '', moreInfo: '', distance },
    car: { title: 'Car', shortInfo: '', moreInfo: '', distance },
    box: { title: 'Box', shortInfo: '', moreInfo: '', distance },
    portal: { title: 'Portal', shortInfo: '', moreInfo: '', distance },
    star: { title: 'Star', shortInfo: '', moreInfo: '', distance },
    hero: { title: 'Hero', shortInfo: '', moreInfo: '', distance }
  }
}
module.exports = { en }
