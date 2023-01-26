const { server, mongoose } = require('./src/webSocketApp')
// Вытягиваем переменные окружения в которой прячем путь к базе данных
// eslint-disable-next-line no-empty-pattern
const {} = process.env
const { PORT = 5050, BASE_URL } = process.env // http://localhost:5000/docs

async function start() {
  try {
    server.listen(PORT, () => {
      console.log(`listening ${PORT}`)
      mongConnect()
    })
  } catch (error) {
    process.exit(0)
  }
}
function mongConnect() {
  const idTim = setTimeout(() => {
    mongoose
      .connect(BASE_URL)
      .then(() => {
        clearTimeout(idTim)
        return console.log('MongoDB start')
      })
      .catch((err) => {
        console.log(err)
        mongConnect()
      })
  }, 1000)
}

start()
