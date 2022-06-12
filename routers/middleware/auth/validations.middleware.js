//validation request
const { check, validationResult } = require("express-validator");
const errorMassage = require("../../../errors/errorMassage");

const validationSignup = (req, res, next) => {
    [
        check("name", "Error name validation").isLength({ min: 3 }),
        check("email", "Error email validation").isEmail(),
        check("password", "Error password validation").isLength({ min: 7 }),
    ];
    const errOr = validationResult(req);
    if (!errOr.isEmpty) {
        return errorMassage(res, 400, errOr);
    }
    next();
};
const validationLogin = (req, res, next) => {
    [
        check("email", "Error name validation").isEmail(),
        check("password", "Error password validation").exists().isLength({ min: 7 }),
    ];
    const errOr = validationResult(req);
    if (!errOr.isEmpty) {
        return errorMassage(res, 400, errOr);
    }
    next();
};

module.exports = { validationSignup, validationLogin };
