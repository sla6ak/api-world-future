const { Router } = require("express");
const router = Router();
const errMassage = require("../errors/errorMassage");
//  Миделвееры;
const authCurent = require("./middleware/auth/auth.middleware");
const gamersRender = require("../controllers/play/gamersRender");

router.get("/", authCurent, gamersRender);

module.exports = router;
