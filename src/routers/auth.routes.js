const { Router } = require('express')
const router = Router()
//  Контроллеры
const user = require('../controllers/auth/User')
//  Миделвееры;
const {
  validationSignup,
  validationLogin
} = require('../middleware/auth/validations.middleware')
const authCurent = require('../middleware/auth/auth.middleware')

// Базовый путь перед роутом '/auth' далее перенаправляем '/api-contacts/users/login'
router.post('/signup', validationSignup, user.createUser)

// Базовый путь перед роутом '/auth' далее перенаправляем '/users/login'
router.post('/login', validationLogin, user.loginUser)

// базовый путь перед роутом '/auth' далее перенаправляем '/users/current'
router.get('/current', authCurent, user.curentUser)

module.exports = router
