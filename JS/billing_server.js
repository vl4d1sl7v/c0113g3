try {
    const express = require('express');
    const bodyParser = require('body-parser');
    const { Pool } = require('pg');
    const jwt = require('jsonwebtoken');
    const crypto = require('crypto');
    const cors = require('cors');  // Добавлен импорт cors

    const app = express();
    const port = 3306

    app.use(cors());  // Использование cors

    app.use(bodyParser.json());

    const pool = new Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'billing_system',
        password: 'postgres',
        port: 5432,
    });

    app.get('/balance', async (req, res) => {
        try {
            // Вместо этого можно использовать данные из сессии или токена авторизации
            const userId = 1; // Пример: получение идентификатора пользователя из сессии
    
            const result = await pool.query('SELECT balance FROM billing_account WHERE user_id = $1', [userId]);
            const userBalance = result.rows[0].balance;
    
            res.json({ balance: userBalance });
        } catch (error) {
            console.error('Ошибка при получении баланса:', error);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    });
    

    app.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
    });
} catch (error) {  // Добавлен параметр error
    console.error('Произошла ошибка:', error);
}
