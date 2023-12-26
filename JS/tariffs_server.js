const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors'); // Добавьте импорт cors

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors()); // Используйте cors

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'billing_system',
    password: 'postgres',
    port: 5432,
});

app.get('/tariffs', async (req, res) => {
    try {
        const result = await pool.query('SELECT name, price, description FROM tariff');
        res.json(result.rows);
    } catch (error) {
        console.error('Ошибка при получении тарифов:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
