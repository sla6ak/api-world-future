# api-world-future

## найденные баги

токен выдаем на небольшой срок. когда токен устарел фронт непонимает этого и
висит

## важно

все вебсокет сообщения должны иметь вид { channel: "", data: { } }

объект вебсокетов игры это базовая строка которая является json и содержит два
свойства это {chanel:'', data: {}} по условию какой канал присылает нам
уведомление мы используем разные функции обработчики для даты.

первоначально при подключении нового юзера мы хотим проверить его авторизацию и
хотим получить от фронтенда объект с (токеном в идеале) id юзера. мы хотим
хранить всех подключенных юзеров под их id с фронта так у нас всегда будут
одинаковые юзеры. {"id":{clientWS: "server",id:"",ip:"", browser:""},....}
