## Widget Project

#### 📜 Описание

Проект отображает 10 000 виджетов с обновлением данных в реальном времени через WebSocket.
Каждый виджет — прямоугольник размером 44×24 пикселя, с цветовой индикацией и обновляющимся значением.
Интерфейс адаптивный и подстраивается под размер окна с возможностью прокрутки, если виджеты не помещаются.

##### 🚀 Как запустить проект

```bash
# Клонирование репозитория
git clone https://github.com/NatalyMaxi/widget-project
cd widget-project

# Соберите и запустите контейнеры:

docker compose up --build

# Откройте в браузере:

http://localhost:3000

```

| Команда           | Описание                                       |
| ----------------- | ---------------------------------------------- |
| В папке frontend: |                                                |
| `yarn dev`        | Запуск фронтенда в режиме разработки           |
| `yarn build`      | Сборка production-версии фронтенда             |
| `yarn lint`       | Проверка кода фронтенда (ESLint)               |
| `yarn lint-fix`   | Автоисправление ошибок ESLint во фронтенде     |
| `yarn format`     | Форматирование файлов фронтенда через Prettier |
| В папке backend:  |                                                |
| `yarn dev`        | Запуск бэкенда в режиме разработки             |
| `yarn build`      | Компиляция TypeScript бэкенда                  |
| `yarn start`      | Запуск скомпилированного бэкенда (production)  |

##### 📁 Технологии

- Next.js 15
- React 19
- TypeScript 5
- Express 4
- ws (WebSocket)
- Docker
- Husky
- ESLint
- Prettier
- Yarn

[Ссылка на репозиторий](https://github.com/NatalyMaxi/widget-project)
