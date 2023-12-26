try {
    const express = require('express');
    const bodyParser = require('body-parser');
    const { Pool } = require('pg');
    const jwt = require('jsonwebtoken');
    const crypto = require('crypto');
    const cors = require('cors');  // Добавлен импорт cors

    const app = express();
    const port = 8000

    app.use(cors());  // Использование cors

    app.use(bodyParser.json());

    const pool = new Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'billing_system',
        password: 'postgres',
        port: 5432,
    });

    // Генерация секретного ключа для JWT
    const secretKey = crypto.randomBytes(32).toString('hex');
    console.log('Ваш секретный ключ для JWT:', secretKey);

    // Генерация JWT для пользователя
    function generateToken(user) {
        return jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
    }

    // Авторизация пользователя
    app.post('/login', async (req, res) => {
        const { username, password } = req.body;

        try {
            const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
            if (result.rows.length === 1) {
                const user = result.rows[0];
                const token = generateToken(user);
                res.json({ success: true, user, token });
            } else {
                res.json({ success: false, message: 'Неверные учетные данные' });
            }
        } catch (error) {
            console.error('Ошибка при авторизации:', error);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    });

    app.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
    });
} catch (error) {  // Добавлен параметр error
    console.error('Произошла ошибка:', error);
}
