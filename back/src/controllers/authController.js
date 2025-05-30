import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../entity/user.js';
import RefreshToken from '../entity/RefreshToken.js';

export const generateToken = (userId, secret, expiresIn) => {
    return jwt.sign({ userId }, secret, { expiresIn });
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль' });
        }
        const accessToken = generateToken(user.id, process.env.JWT_ACCESS_SECRET, '24h');
        const refreshToken = generateToken(user.id, process.env.JWT_REFRESH_SECRET, '6d');
        const refreshTokenRepository = getRepository(RefreshToken);
        await refreshTokenRepository.delete({ userId: user.id });
        await refreshTokenRepository.save({
            userId: user.id,
            token: refreshToken,
            expires_at: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
            created_at: new Date(),
        });
        return res.json({ accessToken, refreshToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Ошибка сервера' });
    }
};

export const refreshTokens = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.sendStatus(401);
    }
    try {
        const refreshTokenRepository = getRepository(RefreshToken);
        const tokenEntry = await refreshTokenRepository.findOne({ where: { token: refreshToken } });
        if (!tokenEntry) {
            return res.sendStatus(403);
        }
        if (Date.now() >= tokenEntry.expiresAt.getTime()) {
            return res.sendStatus(403);
        }
        const newAccessToken = generateToken(tokenEntry.userId, process.env.JWT_ACCESS_SECRET, '24h');
        const newRefreshToken = generateToken(tokenEntry.userId, process.env.JWT_REFRESH_SECRET, '6d');
    
        tokenEntry.token = newRefreshToken;
        tokenEntry.expiresAt = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000); 
        await refreshTokenRepository.save(tokenEntry);
        return res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Ошибка сервера' });
    }
};