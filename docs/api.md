# API першої версії

Базовий URL (локально): `http://localhost:5000/api`

| Метод | Маршрут | Опис |
|---|---|---|
| GET | `/health` | Перевірка стану сервера |
| GET | `/courses` | Список курсів |
| GET | `/courses/:id` | Курс разом зі списком модулів |
| GET | `/modules` | Список модулів (можна фільтрувати `?courseId=`) |
| GET | `/modules/:id` | Модуль разом зі списком уроків |
| GET | `/modules/:moduleId/lessons` | Уроки конкретного модуля |
| GET | `/lessons/:id` | Урок разом з теорією, практикою та ознакою наявності тесту |
| GET | `/lessons/:lessonId/theory` | Теоретичні блоки уроку |
| GET | `/lessons/:lessonId/practice` | Практичні завдання уроку (окремий блок від теорії) |
| GET | `/lessons/:lessonId/tests` | Питання тесту (без правильних відповідей) |
| POST | `/lessons/:lessonId/tests/check` | Перевірка відповідей, тіло: `{ "answers": [0, 2, 1, ...] }` |

Відповідь `POST /lessons/:lessonId/tests/check`:

```json
{
  "total": 3,
  "correct": 2,
  "scorePercent": 67,
  "results": [
    {
      "question": "…",
      "yourAnswer": 1,
      "correctAnswer": 1,
      "isCorrect": true,
      "explanation": "…"
    }
  ]
}
```
