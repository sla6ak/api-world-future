const { Router } = require("express");
const router = Router();
const errMassage = require("../configs/errors/errorMassage");

router.get("/", (req, res) => {
    try {
        res.status(200).json({ licensia: "Tekst licensia" });
    } catch (error) {
        errMassage(res, 504, error);
        return;
    }
});

module.exports = router;
