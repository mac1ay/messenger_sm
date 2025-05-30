import { generateToken } from './authController.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../entity/user.js';
import RefreshToken from '../entity/RefreshToken.js';
import { getRepository } from 'typeorm';

export const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userRepository = getRepository(User);
        const existingUser = await userRepository.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким именем уже существует.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = userRepository.create({
            username,
            password: hashedPassword,
        });
        await userRepository.save(newUser); 
        const accessToken = generateToken(newUser.id, process.env.JWT_ACCESS_SECRET, '24h');
        const refreshToken = generateToken(newUser.id, process.env.JWT_REFRESH_SECRET, '6d');
        const refreshTokenRepository = getRepository(RefreshToken);
        await refreshTokenRepository.delete({ userId: newUser.id }); 

        await refreshTokenRepository.save({
            userId: newUser.id,
            token: refreshToken,
            expires_at: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        });
        res.status(201).json({ accessToken, refreshToken, message: 'Пользователь зарегистрирован успешно.' });
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        res.status(500).json({ message: 'Ошибка при регистрации.' });
    }
};