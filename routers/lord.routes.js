const { Router } = require("express");
const router = Router();
//  Контроллеры
const createLord = require("../controllers/lord/createLord");
const getLord = require("../controllers/lord/getLord");
//  Миделвееры;
const authCurent = require("./middleware/auth/auth.middleware");

// получает полную инфу о персонаже по токену
router.get("/", authCurent, getLord);

// создает персонажа если еще нету в будущем планируется возможность создавать несколько персонажей одному человеку но добавить проверку на мультов не более допустимых
router.post("/", authCurent, createLord);

module.exports = router;
