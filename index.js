const { server, mongoose } = require("./src/app");
// Вытягиваем переменные окружения в которой прячем путь к базе данных
const {} = process.env;
const { PORT = 5000, BASE_URL } = process.env; // http://localhost:5000/docs

async function start() {
    try {
        server.listen(PORT, () => {
            console.log(`listening ${PORT}`);
        });
        mongoose.connect(BASE_URL).then(() => {
            console.log(`MongoDB start`);
        });
    } catch (error) {
        process.exit(0);
    }
}

start();
