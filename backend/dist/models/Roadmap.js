"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoadmapModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const RoadmapResourceSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, default: 'Article / Docs' },
    provider: { type: String, default: 'Official Docs' },
    isVerified: { type: Boolean, default: true },
});
const RoadmapNodeSchema = new mongoose_1.Schema({
    nodeId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    type: {
        type: String,
        enum: ['career_goal', 'phase', 'skill_group', 'task', 'project', 'assessment', 'milestone'],
        required: true
    },
    parentId: { type: String, default: null },
    prerequisiteNodeIds: [{ type: String }],
    relatedSkillIds: [{ type: String }],
    status: {
        type: String,
        enum: ['locked', 'available', 'in_progress', 'completed', 'needs_review', 'blocked'],
        default: 'available'
    },
    completedAt: { type: Date, default: null },
    resources: [RoadmapResourceSchema],
    completionCriteria: { type: String, default: 'Complete practical tasks and verify criteria.' },
    estimatedHours: { type: Number, default: 2 },
    provenance: {
        type: String,
        enum: ['verified', 'user_provided', 'ai_suggested', 'provisional'],
        default: 'verified'
    },
});
const RoadmapSchema = new mongoose_1.Schema({
    roadmapId: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    targetRole: { type: String, required: true },
    domain: { type: String, required: true },
    overallProgress: { type: Number, default: 0 },
    version: { type: Number, default: 1 },
    nodes: [RoadmapNodeSchema],
}, { timestamps: true });
exports.RoadmapModel = mongoose_1.default.model('Roadmap', RoadmapSchema);
