const { Router } = require('express')
const router = Router()
//  Контроллеры
const myLord = require('../controllers/lord/MyLord')
//  Миделвееры;
const authCurent = require('../middleware/auth/auth.middleware')

// получает полную инфу о персонаже по токену
router.get('/', authCurent, myLord.getLord)

// создает персонажа если еще нету в будущем планируется возможность создавать несколько персонажей одному человеку но добавить проверку на мультов не более допустимых
router.post('/', authCurent, myLord.createLord)

// сменить текущую планету
router.patch('/', authCurent, myLord.choosePlanet)

module.exports = router
