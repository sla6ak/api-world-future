const { Router } = require("express");
const router = Router();
const errMassage = require("../configs/errors/errorMassage");

router.get("/en", (req, res) => {
    try {
        res.status(200).json({
            listLanguage: [
                { shortName: "en", text: "ENGLISH" },
                { shortName: "ua", text: "UKRAINIAN" },
                { shortName: "ru", text: "RUSSIAN" },
            ],
            startPage: {
                h1: "Welcome to the world 3D of the future!",
                buttons: { language: "LANGUAGES", start: "START GAME" },
                aboutGame:
                    "If you see this page, the connection to the server may have been lost for some time. Perhaps this is your first time here? In any case, the menu is intuitive and the game process is exciting. This is an RPG where you will surely meet new comrades!",
            },
            loginPage: {
                h1: "Login Please",
                ask: "You don't have a login?",
                buttons: { registration: "Registration", submit: "SUBMIT" },
            },
            registerPage: {
                h1: "Welcome to the world 3D of the future!",
                h2: "This is licensia for players",
                textLicensia:
                    "Developers can full controls this game and apgreding anything. You should not expect that the game will always meet your desires. By signing this agreement, you have the right to immerse yourself in the game world within the framework of the developer's intention and without infringing on the same rights of other users of the game. For violation of the rules of the game established by the developer, any player may be held liable both in-game and legally. The player can be either temporarily blocked or removed from the server without the possibility of recovery. All in-game purchases are considered as payment for your leisure time and cannot be refunded. Have a nice game!",

                ask: "Already have an account?",
                agree: "I have read and agree",
                buttons: {
                    registration: "Login",
                    submit: "SEND",
                },
            },
            setLordPage: {
                h1: "Setting your personage",
                ask: "Come up with a name for your character",
                buttons: {
                    desert: "DESERT",
                    winter: "WINTER",
                },
                history:
                    "By the year 4800, humanity learned to use wormholes to move around the galaxy, but no matter how far the progress went, internal strife and the struggle for power and resources only intensified, which eventually led to a complete split of the government into two largest factions, which took critical resource sources are important for technologies. Whatever race you choose, you protect civilians from special military operations to deplete your land! Do not allow imbalance in the universe!",
            },
        });
    } catch (error) {
        errMassage(res, 504, error);
        return;
    }
});

router.get("/ua", (req, res) => {
    try {
        res.status(200).json({
            listLanguage: [
                { shortName: "en", text: "АНГЛИЙСЬКА" },
                { shortName: "ua", text: "УКРАИНСКА" },
                { shortName: "ru", text: "РОСИЙСКА" },
            ],
            startPage: {
                h1: "Ласкаво просимо у 3D світ майбутнього!",
                buttons: { language: "МОВИ", start: "РОЗПОЧАТИ ГРУ" },
                aboutGame:
                    "Якщо ви бачите цю сторінку, можливо, зв’язок із сервером було втрачено на деякий час. Можливо, ви тут вперше? У будь-якому випадку меню інтуїтивно зрозуміле, а процес гри захоплюючий. Це RPG, де ви обов'язково зустрінете нових товаришів!",
            },
            loginPage: {
                h1: "Увійдіть, будь ласка",
                ask: "У вас немає логіна?",
                buttons: { registration: "Зареєструватися", submit: "ВІДПРАВИТИ" },
            },
            registerPage: {
                h1: "Зареєструйтесь, будь ласка",
                h2: "Ліцензія для гравців",
                textLicensia:
                    "Розробники можуть повністю контролювати цю гру та вдосконалювати будь-що. Не варто сподіватися, що гра завжди буде відповідати вашим бажанням. Підписуючи цю угоду, ви маєте право занурюватися в ігровий світ в рамках задуму розробника і не порушуючи таких же прав інших користувачів гри. За порушення правил гри, встановлених розробником, будь-який гравець може бути притягнутий до відповідальності як внутрішньоігрової, так і юридичної. Гравця можна як тимчасово заблокувати, так і видалити з сервера без можливості відновлення. Усі покупки в грі вважаються оплатою вашого дозвілля і не підлягають відшкодуванню. Гарної гри!",

                ask: "Вже є обліковий запис?",
                agree: "Я прочитав і погоджуюся",
                buttons: {
                    registration: "Увийти",
                    submit: "ВІДПРАВИТИ",
                },
            },
            setLordPage: {
                h1: "Налаштування вашого персонажа",
                ask: "Придумайте ім'я свого персонажа",
                buttons: {
                    desert: "ПУСТЕЛЯ",
                    winter: "ЗИМА",
                },
                history:
                    "До 4800-му році человечество навчилося використовувати кротові нори для переміщення по галактиці, але як далеко не йшов прогрес внутрішньої межусобиці і боротьба за владу і ресурси тільки посилювалися, що в кінці кінців привело до повного розколу правління на дві найбільші фракції, які критично заняли. важные для технологий джерела ресурсів. Яку б розсу ти не вибрав, ти захищаєш мирних громадян від спеціальних військових операцій по істощенню вашої землі! Не допусти дисбаланс во вселенной!",
            },
        });
    } catch (error) {
        errMassage(res, 504, error);
        return;
    }
});

router.get("/ru", (req, res) => {
    try {
        res.status(200).json({
            listLanguage: [
                { shortName: "en", text: "АНГЛИЙСКИЙ" },
                { shortName: "ua", text: "УКРАИНСКИЙ" },
                { shortName: "ru", text: "РУССКИЙ" },
            ],
            startPage: {
                h1: "Добро пожаловать в 3D мир будущего!",
                buttons: { language: "ЯЗЫКИ", start: "НАЧАТЬ ИГРАТЬ" },
                aboutGame:
                    "Если вы видите эту страницу, возможно, соединение с сервером было потеряно в течение некоторого времени. Возможно, вы здесь впервые? В любом случае меню интуитивно понятное, а игровой процесс увлекательный. Это RPG, где вы обязательно встретите новых товарищей!",
            },
            loginPage: {
                h1: "Пожалуйста сначало войдите",
                ask: "У вас нет логина?",
                buttons: { registration: "Зарегистрироваться", submit: "ОТПРАВИТЬ" },
            },
            registerPage: {
                h1: "Зарегистрируйтесь, пожалуйста",
                h2: "Лицензия для игроков",
                textLicensia:
                    "Разработчики могут полностью контролировать эту игру и апгредить что угодно. Не стоит рассчитывать, что игра всегда будет соответствовать вашим желаниям. Подписав настоящее соглашение, вы имеете право погрузиться в игровой мир в рамках замысла разработчика и не ущемляя при этом тех же прав других пользователей игры. За нарушение правил игры, установленных разработчиком, любой игрок может быть привлечен к ответственности как внутриигровой, так и по закону. Игрок может быть как временно заблокирован, так и удален с сервера без возможности восстановления. Все внутриигровые покупки считаются оплатой вашего досуга и возврату не подлежат. Приятной игры!",
                ask: "Уже есть аккаунт?",
                agree: "Я прочитал и согласен",
                buttons: {
                    registration: "Войти",
                    submit: "ОТПРАВИТЬ",
                },
            },
            setLordPage: {
                h1: "Настройте вашего персонажа",
                ask: "Придумайте имя своему персонажу",
                buttons: {
                    desert: "ПУСТЫНЯ",
                    winter: "ЗИМА",
                },
                history:
                    "К 4800-му году человечество научилось использовать кротовые норы для перемещений по галактике, но как далеко бы не шел прогресс внутриние межусобицы и борьба за власть и ресурсы только усиливались, что в конце концов привело к полному расколу правления на две крупнейшие фракции, которые заняли критически важные для технологий источники ресурсов. Какую бы рассу ты не выбрал ты защищаешь мирных граждан от специальных военных операций по истощению вашей земли! Не допусти дисбаланс во вселенной!",
            },
        });
    } catch (error) {
        errMassage(res, 504, error);
        return;
    }
});

module.exports = router;
