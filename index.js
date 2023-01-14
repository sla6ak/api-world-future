const { server, mongoose } = require("./src/webSocketApp");
// Вытягиваем переменные окружения в которой прячем путь к базе данных
const {} = process.env;
const { PORT = 5000, BASE_URL } = process.env; // http://localhost:5000/docs

async function start() {
    try {
        server.listen(PORT, () => {
            console.log(`listening ${PORT}`);
            mongConnect();
        });
    } catch (error) {
        process.exit(0);
    }
}
function mongConnect() {
    const idTim = setTimeout(() => {
        mongoose
            .connect(BASE_URL)
            .then(() => {
                clearTimeout(idTim);
                return console.log(`MongoDB start`);
            })
            .catch((err) => {
                console.log(err);
                mongConnect();
            });
    }, 3000);
}

start();
