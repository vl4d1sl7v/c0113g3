const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const cors = require('cors');

const app = express();

// Разрешить запросы от вашего домена
app.use(cors());

// Подключение к базе данных
const db = pgp({
  host: '127.0.0.1',
  port: 5432,
  database: 'billing_system',
  user: 'postgres',
  password: 'postgres'
});

// Создание таблицы заявок (пример)
db.none(`
  CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    creator VARCHAR(20) NOT NULL,
    inet VARCHAR(10) NOT NULL,
    browsers VARCHAR(50) NOT NULL,
    opinion TEXT
  )
`).catch(error => {
  console.error('Error creating applications table:', error);
});

app.use(bodyParser.json());

// Маршрут для обработки заявок
app.post('/application', async (req, res) => {
  try {
    const { name, surname, email, creator, inet, browsers, opinion } = req.body;

    // Добавление заявки в базу данных
    await db.none('INSERT INTO applications(name, surname, email, creator, inet, browsers, opinion) VALUES($1, $2, $3, $4, $5, $6, $7)',
      [name, surname, email, creator, inet, browsers, opinion]);

    res.status(201).json({ message: 'Заявка принята. С вами свяжется наш менеджер.' });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
