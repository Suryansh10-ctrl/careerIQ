"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.isMongoConnected = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../config/env");
const logger_1 = require("../utils/logger");
exports.isMongoConnected = false;
const connectDatabase = async () => {
    try {
        mongoose_1.default.set('strictQuery', true);
        await mongoose_1.default.connect(env_1.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 3000,
        });
        exports.isMongoConnected = true;
        logger_1.logger.info(`MongoDB connected successfully to ${env_1.env.MONGODB_URI}`);
        return true;
    }
    catch (error) {
        logger_1.logger.warn(`MongoDB connection unavailable at ${env_1.env.MONGODB_URI}. Operating in-memory / fallback persistence mode.`);
        exports.isMongoConnected = false;
        return false;
    }
};
exports.connectDatabase = connectDatabase;
