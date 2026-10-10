"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const env_1 = require("./config/env");
const logger_1 = require("./utils/logger");
const connect_1 = require("./database/connect");
const authController_1 = require("./controllers/authController");
const profileController_1 = require("./controllers/profileController");
const auth_1 = require("./middleware/auth");
const Domain_1 = require("./models/Domain");
const app = (0, express_1.default)();
// Security and middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        return callback(null, true);
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health Check
app.get('/api/health', (req, res) => {
    return res.json({
        status: 'ok',
        service: 'CareerIQ Backend API',
        mongoConnected: connect_1.isMongoConnected,
        timestamp: new Date().toISOString(),
    });
});
app.get('/', (req, res) => {
    return res.json({
        message: 'Welcome to CareerIQ Backend API',
        healthCheck: '/api/health',
    });
});
// Auth Routes
app.post('/api/auth/register', authController_1.register);
app.post('/api/auth/login', authController_1.login);
app.get('/api/auth/me', auth_1.authenticateJwt, authController_1.getCurrentUser);
// Profile Routes
app.get('/api/profile', auth_1.optionalJwt, profileController_1.getProfile);
app.put('/api/profile', auth_1.optionalJwt, profileController_1.updateProfile);
// Career Domains & Roles API
app.get('/api/domains', (req, res) => {
    return res.json({
        success: true,
        domains: Domain_1.SUPPORTED_DOMAINS,
    });
});
// Start Server
const startServer = async () => {
    await (0, connect_1.connectDatabase)();
    const port = parseInt(env_1.env.PORT, 10) || 5000;
    app.listen(port, () => {
        logger_1.logger.info(`CareerIQ Backend server running on http://localhost:${port}`);
    });
};
startServer().catch((err) => {
    logger_1.logger.error('Failed to start server:', err);
    process.exit(1);
});
