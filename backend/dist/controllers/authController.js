"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const env_1 = require("../config/env");
const User_1 = require("../models/User");
const RefreshToken_1 = require("../models/RefreshToken");
const UserProfile_1 = require("../models/UserProfile");
const connect_1 = require("../database/connect");
// In-memory fallback stores for dev when MongoDB is offline
const inMemoryUsers = new Map();
const inMemoryRefreshTokens = new Set();
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    name: zod_1.z.string().optional(),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
const generateTokens = (userId, email, role) => {
    const accessToken = jsonwebtoken_1.default.sign({ userId, email, role }, env_1.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jsonwebtoken_1.default.sign({ userId, email, role }, env_1.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};
const register = async (req, res) => {
    try {
        const parseResult = registerSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ success: false, errors: parseResult.error.errors });
        }
        const { email, password, name } = parseResult.data;
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const userId = `usr_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        if (connect_1.isMongoConnected) {
            const existing = await User_1.UserModel.findOne({ email: email.toLowerCase() });
            if (existing) {
                return res.status(409).json({ success: false, message: 'User with this email already exists.' });
            }
            const newUser = await User_1.UserModel.create({
                email: email.toLowerCase(),
                passwordHash,
                role: 'user',
            });
            await UserProfile_1.UserProfileModel.create({
                userId: newUser._id.toString(),
                name: name || 'Explorer',
                targetRole: 'Full Stack Engineer',
                domain: 'Full-Stack Software Engineering',
                skills: [
                    { name: 'JavaScript', level: 'intermediate', verified: true },
                    { name: 'HTML5', level: 'intermediate', verified: true },
                    { name: 'CSS3', level: 'intermediate', verified: true },
                ],
            });
            const tokens = generateTokens(newUser._id.toString(), newUser.email, newUser.role);
            await RefreshToken_1.RefreshTokenModel.create({
                token: tokens.refreshToken,
                userId: newUser._id.toString(),
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            });
            return res.status(201).json({
                success: true,
                message: 'Account registered successfully.',
                user: { id: newUser._id, email: newUser.email, role: newUser.role, name: name || 'Explorer' },
                ...tokens,
            });
        }
        else {
            // In-memory mode
            const normalizedEmail = email.toLowerCase();
            if (inMemoryUsers.has(normalizedEmail)) {
                return res.status(409).json({ success: false, message: 'User with this email already exists.' });
            }
            const mockUser = {
                _id: userId,
                email: normalizedEmail,
                passwordHash,
                role: 'user',
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            inMemoryUsers.set(normalizedEmail, mockUser);
            const tokens = generateTokens(userId, normalizedEmail, 'user');
            inMemoryRefreshTokens.add(tokens.refreshToken);
            return res.status(201).json({
                success: true,
                message: 'Account registered successfully (dev session).',
                user: { id: userId, email: normalizedEmail, role: 'user', name: name || 'Explorer' },
                ...tokens,
            });
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message || 'Server error during registration' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const parseResult = loginSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ success: false, errors: parseResult.error.errors });
        }
        const { email, password } = parseResult.data;
        const normalizedEmail = email.toLowerCase();
        if (connect_1.isMongoConnected) {
            const user = await User_1.UserModel.findOne({ email: normalizedEmail });
            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid email or password.' });
            }
            const isMatch = await bcryptjs_1.default.compare(password, user.passwordHash);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid email or password.' });
            }
            const tokens = generateTokens(user._id.toString(), user.email, user.role);
            await RefreshToken_1.RefreshTokenModel.create({
                token: tokens.refreshToken,
                userId: user._id.toString(),
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            });
            return res.json({
                success: true,
                message: 'Login successful.',
                user: { id: user._id, email: user.email, role: user.role },
                ...tokens,
            });
        }
        else {
            // In-memory check or demo account fallback
            let user = inMemoryUsers.get(normalizedEmail);
            // Allow demo login if email is captain@careeriq.io
            if (!user && (normalizedEmail === 'captain@careeriq.io' || normalizedEmail === 'demo@careeriq.com')) {
                const passwordHash = await bcryptjs_1.default.hash('password123', 10);
                user = {
                    _id: 'demo_user_1',
                    email: normalizedEmail,
                    passwordHash,
                    role: 'user',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                inMemoryUsers.set(normalizedEmail, user);
            }
            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid email or password.' });
            }
            const isMatch = await bcryptjs_1.default.compare(password, user.passwordHash);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid email or password.' });
            }
            const tokens = generateTokens(user._id.toString(), user.email, user.role);
            inMemoryRefreshTokens.add(tokens.refreshToken);
            return res.json({
                success: true,
                message: 'Login successful.',
                user: { id: user._id, email: user.email, role: user.role },
                ...tokens,
            });
        }
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message || 'Server error during login' });
    }
};
exports.login = login;
const getCurrentUser = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    return res.json({
        success: true,
        user: req.user,
    });
};
exports.getCurrentUser = getCurrentUser;
