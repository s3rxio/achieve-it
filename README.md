# AchieveIt

AchieveIt - курсовая работа :)

## Цель

Разработать приложение для учета целей.

## Быстрое начало

Требуется зайти в директорию `apps/web` и прописать env переменные. Для примера используйте `.env.example`
Тоже самое и для `apps/api`

## Быстрое начало без Docker

```bash
# Установка Nx и pnpm
npm install -g nx pnpm

# Установка зависимостей
pnpm install

# Запуск приложения с landing
pnpm nx run-many -t=serve -p=web,api
```

## Быстрое начало с Docker (обязательно с Docker Compose)

Требуется env переменны описать в файле `.env` в корневой директории проекта

```bash
docker compose up
```
