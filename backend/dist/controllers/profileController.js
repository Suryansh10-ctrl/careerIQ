"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const UserProfile_1 = require("../models/UserProfile");
const connect_1 = require("../database/connect");
// In-memory fallback map for dev mode
const inMemoryProfiles = new Map();
const getProfile = async (req, res) => {
    const userId = req.user?.userId || 'anonymous_guest';
    if (connect_1.isMongoConnected) {
        let profile = await UserProfile_1.UserProfileModel.findOne({ userId });
        if (!profile) {
            profile = await UserProfile_1.UserProfileModel.create({
                userId,
                name: 'Captain Explorer',
                targetRole: 'Full Stack Engineer',
                domain: 'Full-Stack Software Engineering',
                skills: [
                    { name: 'JavaScript', level: 'intermediate', verified: true },
                    { name: 'TypeScript', level: 'beginner', verified: false },
                    { name: 'React', level: 'intermediate', verified: true },
                    { name: 'HTML5', level: 'advanced', verified: true },
                    { name: 'CSS3', level: 'intermediate', verified: true },
                ],
            });
        }
        return res.json({ success: true, profile });
    }
    else {
        if (!inMemoryProfiles.has(userId)) {
            inMemoryProfiles.set(userId, {
                userId,
                name: 'Captain Explorer',
                targetRole: 'Full Stack Engineer',
                domain: 'Full-Stack Software Engineering',
                skills: [
                    { name: 'JavaScript', level: 'intermediate', verified: true },
                    { name: 'TypeScript', level: 'beginner', verified: false },
                    { name: 'React', level: 'intermediate', verified: true },
                    { name: 'HTML5', level: 'advanced', verified: true },
                    { name: 'CSS3', level: 'intermediate', verified: true },
                    { name: 'Git', level: 'beginner', verified: true },
                ],
                experienceYears: 1,
                education: 'B.S. Computer Science / Self Taught',
                locationPreference: 'Remote / Hybrid',
            });
        }
        return res.json({ success: true, profile: inMemoryProfiles.get(userId) });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    const userId = req.user?.userId || 'anonymous_guest';
    const { name, targetRole, domain, skills, experienceYears, education, locationPreference } = req.body;
    if (connect_1.isMongoConnected) {
        const updated = await UserProfile_1.UserProfileModel.findOneAndUpdate({ userId }, { name, targetRole, domain, skills, experienceYears, education, locationPreference }, { new: true, upsert: true });
        return res.json({ success: true, message: 'Profile updated successfully.', profile: updated });
    }
    else {
        const existing = inMemoryProfiles.get(userId) || { userId };
        const newProfile = {
            ...existing,
            name: name ?? existing.name,
            targetRole: targetRole ?? existing.targetRole,
            domain: domain ?? existing.domain,
            skills: skills ?? existing.skills,
            experienceYears: experienceYears ?? existing.experienceYears,
            education: education ?? existing.education,
            locationPreference: locationPreference ?? existing.locationPreference,
            updatedAt: new Date(),
        };
        inMemoryProfiles.set(userId, newProfile);
        return res.json({ success: true, message: 'Profile updated successfully (dev session).', profile: newProfile });
    }
};
exports.updateProfile = updateProfile;
