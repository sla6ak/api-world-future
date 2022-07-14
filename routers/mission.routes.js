const { Router } = require("express");
const router = Router();
//  Миделвееры;
const authCurent = require("./middleware/auth/auth.middleware");
const missions = require("../controllers/missions/Missions");

router.get("/", authCurent, missions.pandingMissions);
router.post("/", authCurent, missions.addNewMissions);
router.patch("/", authCurent, missions.closseMission);

router.get("/", authCurent, missions.filedMissions);
router.get("/", authCurent, missions.exelentMissions);
router.get("/", authCurent, missions.allMissions);

module.exports = router;
