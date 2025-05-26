const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const generateToken = (userId, secret, expiresIn) => {
    return jwt.sign({ userId }, secret, { expiresIn });
};

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password) VALUES (\$1, \$2)', [username, hashedPassword]);
    
    const accessToken = generateToken(username, process.env.JWT_ACCESS_SECRET, '24h');
    const refreshToken = generateToken(username, process.env.JWT_REFRESH_SECRET, '6d');

    await pool.query('DELETE FROM refresh_tokens WHERE user_id = (SELECT id FROM users WHERE username = \$1)', [username]);

    await pool.query('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ((SELECT id FROM users WHERE username=\$1), \$2, NOW() + INTERVAL \'6 days\')', [username, refreshToken]);
    res.status(201).json({ accessToken, refreshToken, message: 'Пользователь зарегистрирован успешно' });
};


exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE username = \$1', [username]);
    
    if (user.rows.length > 0) {
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (isMatch) {
            const accessToken = generateToken(user.rows[0].id, process.env.JWT_ACCESS_SECRET, '24h');
            const refreshToken = generateToken(user.rows[0].id, process.env.JWT_REFRESH_SECRET, '6d');

            await pool.query('DELETE FROM refresh_tokens WHERE user_id = \$1', [user.rows[0].id]);

            await pool.query('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (\$1, \$2, NOW() + INTERVAL \'6 days\')', [user.rows[0].id, refreshToken]);
            res.json({ accessToken, refreshToken });
        } else {
            res.status(400).json({ message: 'Неверный пароль' });
        }
    } else {
        res.status(404).json({ message: 'Пользователь не найден' });
    }
};

exports.refreshTokens = async (req, res) => {
    const { refreshToken } = req.body; // Получаем refresh токен из запроса
    if (!refreshToken) {
        return res.sendStatus(401); // Если токен не передан
    }
    try {
        const result = await pool.query('SELECT * FROM refresh_tokens WHERE token = \$1', [refreshToken]);
        
        if (result.rows.length === 0) {
            return res.sendStatus(403); // токен не найден
        }
        const userId = result.rows[0].user_id;
        // Проверка на срок действия
        if (Date.now() >= new Date(result.rows[0].expires_at).getTime()) {
            return res.sendStatus(403); // Токен истек
        }
        // Генерация новых токенов
        const newAccessToken = generateToken(userId, process.env.JWT_ACCESS_SECRET, '24h');
        const newRefreshToken = generateToken(userId, process.env.JWT_REFRESH_SECRET, '6d');
        // Обновление/добавление нового refresh токена в БД
        await pool.query('UPDATE refresh_tokens SET token = \$1, expires_at = NOW() + INTERVAL \'6 days\' WHERE user_id = \$2', [newRefreshToken, userId]);
        res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};