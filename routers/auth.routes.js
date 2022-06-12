const { Router } = require("express");
const router = Router();
//  Контроллеры
const createUser = require("../controllers/auth/createUser");
const loginUser = require("../controllers/auth/loginUser");
const curentUser = require("../controllers/auth/curentUser");
//  Миделвееры;
const { validationSignup, validationLogin } = require("./middleware/auth/validations.middleware");
const authCurent = require("./middleware/auth/auth.middleware");

// Базовый путь перед роутом '/auth' далее перенаправляем '/api-contacts/users/login'
router.post("/signup", validationSignup, createUser);

// Базовый путь перед роутом '/auth' далее перенаправляем '/users/login'
router.post("/login", validationLogin, loginUser);

// базовый путь перед роутом '/auth' далее перенаправляем '/users/current'
router.get("/current", authCurent, curentUser);

module.exports = router;
