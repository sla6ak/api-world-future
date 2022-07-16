const { Router } = require("express");
const router = Router();
//  Миделвееры;
const authCurent = require("./middleware/auth/auth.middleware");
const gameStart = require("../controllers/gamestart/GameStart");

router.get("/", authCurent, gameStart.gamersRender);

module.exports = router;
