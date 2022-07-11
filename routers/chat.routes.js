const { Router } = require("express");
const router = Router();
//  Контроллеры
const chat = require("../controllers/chat/Chat");
//  Миделвееры;
const authCurent = require("./middleware/auth/auth.middleware");

// получить все сообщения
router.get("/", authCurent, chat.allMassage);

// фильтровать только чат синих
router.get("/blue", authCurent, chat.blueMassage);

// фильтровать только чат желтых
router.get("/yellow", authCurent, chat.yellowMassage);

// фильтровать только clan
router.get("/clan/:id", authCurent, chat.clanMassage);

// написать сообщение в чат
router.post("/", authCurent, chat.sendMassage);

module.exports = router;

// В чате есть поле статуса по нему будем фильтровать все сообщения на разніе чаті общие личніе либо клана
