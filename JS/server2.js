const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const pgp = require('pg-promise')();
const cors = require('cors');

const app = express();

// Разрешить запросы от вашего домена
app.use(cors());;

// Подключение к базе данных
const db = pgp({
  host: '127.0.0.1',
  port: 5432,
  database: 'billing_system',
  user: 'postgres',
  password: 'postgres'
});

// Создание таблицы пользователей (пример)
db.none(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    tariffs_id INT REFERENCES tariffs(id)
  )
`).catch(error => {
  console.error('Error creating users table:', error);
});

// Создание таблицы тарифов (пример)
db.none(`
  CREATE TABLE IF NOT EXISTS tariffs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255)
  )
`).catch(error => {
  console.error('Error creating tariffs table:', error);
});

app.use(bodyParser.json());

// Регистрация нового пользователя
app.post('/register', async (req, res) => {
    try {
      const { username, password, tariffs_id } = req.body;
  
      // Хеширование пароля перед сохранением в базу данных
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Добавление пользователя в базу данных
      await db.none('INSERT INTO users(username, password, tariffs_id) VALUES($1, $2, $3)', [username, hashedPassword, tariffs_id]);
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
