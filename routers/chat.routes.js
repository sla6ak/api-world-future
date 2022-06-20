const { Router } = require("express");
const router = Router();
//  Контроллеры
const allMassage = require("../controllers/chat/allMassage");
const blueMassage = require("../controllers/chat/blueMassage");
const yellowMassage = require("../controllers/chat/yellowMassage");
const clanMassage = require("../controllers/chat/clanMassage");
const sendMassage = require("../controllers/chat/sendMassage");
//  Миделвееры;
const authCurent = require("./middleware/auth/auth.middleware");

// получить все сообщения
router.get("/", authCurent, allMassage);

// фильтровать только чат синих
router.get("/blue", authCurent, blueMassage);

// фильтровать только чат желтых
router.get("/yellow", authCurent, yellowMassage);

// фильтровать только clan
router.get("/clan/:id", authCurent, clanMassage);

// написать сообщение в чат
router.post("/:chatName", authCurent, sendMassage);

module.exports = router;

// В чате есть поле статуса по нему будем фильтровать все сообщения на разніе чаті общие личніе либо клана
