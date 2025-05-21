const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');
// Генерация токенов
const generateToken = (userId, secret, expiresIn) => {
    return jwt.sign({ userId }, secret, { expiresIn });
};

// Регистрация пользователя
exports.register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password) VALUES (\$1, \$2)', [username, hashedPassword]);
    res.status(201).json({ message: 'Пользователь зарегистрирован успешно' });
};

// Логин пользователя
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE username = \$1', [username]);
    if (user.rows.length > 0) {
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (isMatch) {
            const accessToken = generateToken(user.rows[0].id, process.env.JWT_ACCESS_SECRET, '15m'); // 15 минут
            const refreshToken = generateToken(user.rows[0].id, process.env.JWT_REFRESH_SECRET, '7d'); // 7 дней
            
            // Здесь рекомендуется сохранить refreshToken в базе данных для управления сессией
            res.json({ accessToken, refreshToken });
        } else {
            res.status(400).json({ message: 'Неверный пароль' });
        }
    } else {
        res.status(404).json({ message: 'Пользователь не найден' });
    }
};

// Можно добавить функцию для обновления access токена с использованием refresh токена
exports.refreshToken = async (req, res) => {
    const { token } = req.body;
    // Верификация refresh токена
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        
        const newAccessToken = generateToken(user.userId, process.env.JWT_ACCESS_SECRET, '15m');
        res.json({ accessToken: newAccessToken });
    });
};