const { Router } = require("express");
const router = Router();
//  Миделвееры;
const authCurent = require("./middleware/auth/auth.middleware");
const positions = require("../controllers/positions/Positions");

router.get("/", authCurent, positions.gamersRender);

module.exports = router;
