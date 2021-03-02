"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GenerateUtil_1 = require("../utils/GenerateUtil");
const AdminMiddleware_1 = __importDefault(require("../middlewares/AdminMiddleware"));
const InviteModel_1 = __importDefault(require("../models/InviteModel"));
const ValidationMiddleware_1 = __importDefault(require("../middlewares/ValidationMiddleware"));
const BlacklistSchema_1 = __importDefault(require("../schemas/BlacklistSchema"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const InviteAddSchema_1 = __importDefault(require("../schemas/InviteAddSchema"));
const InviteWaveSchema_1 = __importDefault(require("../schemas/InviteWaveSchema"));
const FileModel_1 = __importDefault(require("../models/FileModel"));
const S3Util_1 = require("../utils/S3Util");
const GenInvSchema_1 = __importDefault(require("../schemas/GenInvSchema"));
const InvisibleUrlModel_1 = __importDefault(require("../models/InvisibleUrlModel"));
const RefreshTokenModel_1 = __importDefault(require("../models/RefreshTokenModel"));
const PremiumSchema_1 = __importDefault(require("../schemas/PremiumSchema"));
const SetUIDSchema_1 = __importDefault(require("../schemas/SetUIDSchema"));
const BulkInvSchema_1 = __importDefault(require("../schemas/BulkInvSchema"));
const router = express_1.Router();
router.use(AdminMiddleware_1.default);
router.post('/invites', ValidationMiddleware_1.default(GenInvSchema_1.default), async (req, res) => {
    const { executerId } = req.body;
    const invite = GenerateUtil_1.generateInvite();
    const dateCreated = new Date();
    const executer = await UserModel_1.default.findOne({
        $or: [
            { _id: executerId },
            { username: executerId },
            { email: executerId },
            { invite: executerId },
            { key: executerId },
            { 'discord.id': executerId.replace('<@!', '').replace('>', '') }
        ]
    });
    if (!executer)
        return res.status(404).json({
            success: false,
            error: 'invalid user',
        });
    try {
        await InviteModel_1.default.create({
            _id: invite,
            createdBy: {
                username: executer ? executer.username : 'Admin',
                uuid: executer ? executer._id : 'N/A',
            },
            dateCreated,
            dateRedeemed: null,
            usedBy: null,
            redeemed: false,
            useable: true,
        });
        res.status(200).json({
            success: true,
            link: `https://clippy.gift/${invite}`,
            code: invite,
            dateCreated,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
router.post('/bulkinvites', ValidationMiddleware_1.default(BulkInvSchema_1.default), async (req, res) => {
    const { executerId, count } = req.body;
    const dateCreated = new Date();
    var invites = [];
    let i = 0;
    const executer = await UserModel_1.default.findOne({
        $or: [
            { _id: executerId },
            { username: executerId },
            { email: executerId },
            { invite: executerId },
            { key: executerId },
            { 'discord.id': executerId.replace('<@!', '').replace('>', '') }
        ]
    });
    if (!executer)
        return res.status(404).json({
            success: false,
            error: 'invalid user',
        });
    try {
        for (i = 0; i < count.length; i++) {
            const invite = GenerateUtil_1.generateInvite();
            await InviteModel_1.default.create({
                _id: invite,
                createdBy: {
                    username: executer ? executer.username : 'Admin',
                    uuid: executer ? executer._id : 'N/A',
                },
                dateCreated,
                dateRedeemed: null,
                usedBy: null,
                redeemed: false,
                useable: true,
            });
            if (!invites[0]) {
                invites.push('https://clippy.gift/' + invite);
            }
            else {
                invites.push(invite);
            }
        }
        console.log(invites, invites.join('\nhttps://clippy.gift/'));
        var resultJSON = {
            success: true,
            codes: invites,
            links: invites.join('\nhttps://clippy.gift/'),
            dateCreated,
        };
        console.log(resultJSON);
        res.status(200).json(resultJSON);
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
router.post('/blacklist', ValidationMiddleware_1.default(BlacklistSchema_1.default), async (req, res) => {
    const { id, reason, executerId } = req.body;
    try {
        // this next line is lol, just lol.
        const user = await UserModel_1.default.findOne({
            $or: [
                { _id: id },
                { username: { $regex: new RegExp(id, 'i') } },
                { email: { $regex: new RegExp(id, 'i') } },
                { invite: { $regex: new RegExp(id, 'i') } },
                { key: { $regex: new RegExp(id, 'i') } },
                { 'discord.id': id.replace('<@!', '').replace('>', '') }
            ]
        });
        if (!user)
            return res.status(404).json({
                success: false,
                error: 'invalid user',
            });
        if (user.blacklisted.status)
            return res.status(400).json({
                success: false,
                error: 'this user is already blacklisted',
            });
        const executer = await UserModel_1.default.findOne({
            $or: [
                { _id: executerId },
                { username: executerId },
                { email: executerId },
                { invite: executerId },
                { key: executerId },
                { 'discord.id': executerId.replace('<@!', '').replace('>', '') }
            ]
        });
        if (!executer)
            return res.status(404).json({
                success: false,
                error: 'invalid user',
            });
        await UserModel_1.default.findByIdAndUpdate(user._id, {
            blacklisted: {
                status: true,
                reason: `Blacklisted by ${executer.username} for: ${reason ? reason : 'No reason provided'}`,
            },
        });
        res.status(200).json({
            success: true,
            message: 'blacklisted user successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
router.post('/unblacklist', ValidationMiddleware_1.default(BlacklistSchema_1.default), async (req, res) => {
    const { id, reason, executerId } = req.body;
    try {
        // this next line is lol, just lol.
        const user = await UserModel_1.default.findOne({
            $or: [
                { _id: id },
                { username: { $regex: new RegExp(id, 'i') } },
                { email: { $regex: new RegExp(id, 'i') } },
                { invite: { $regex: new RegExp(id, 'i') } },
                { key: { $regex: new RegExp(id, 'i') } },
                { 'discord.id': id.replace('<@!', '').replace('>', '') }
            ]
        });
        if (!user)
            return res.status(404).json({
                success: false,
                error: 'invalid user',
            });
        const executer = await UserModel_1.default.findOne({
            $or: [
                { _id: executerId },
                { username: executerId },
                { email: executerId },
                { invite: executerId },
                { key: executerId },
                { 'discord.id': executerId.replace('<@!', '').replace('>', '') }
            ]
        });
        if (!executer)
            return res.status(404).json({
                success: false,
                error: 'invalid user',
            });
        if (!user.blacklisted.status)
            return res.status(400).json({
                success: false,
                error: 'this user is not  blacklisted',
            });
        await UserModel_1.default.findByIdAndUpdate(user._id, {
            blacklisted: {
                status: false,
                reason: `Unblacklisted by ${executer.username} for: ${reason ? reason : 'No reason provided'}`,
            },
        });
        res.status(200).json({
            success: true,
            message: 'unblacklisted user successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
router.delete('/files/:id', async (req, res) => {
    const { id } = req.params;
    const file = await FileModel_1.default.findOne({ filename: id });
    if (!file)
        return res.status(404).json({
            success: false,
            error: 'invalid file',
        });
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: file.key,
    };
    const user = await UserModel_1.default.findOne({ _id: file.uploader.uuid });
    try {
        await S3Util_1.s3.deleteObject(params).promise();
        if (user.uploads > 0)
            await UserModel_1.default.findByIdAndUpdate(user._id, {
                $inc: {
                    uploads: -1,
                },
            });
        await file.remove();
        res.status(200).json({
            success: true,
            message: 'deleted file successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
router.post('/inviteadd', ValidationMiddleware_1.default(InviteAddSchema_1.default), async (req, res) => {
    const { id, amount } = req.body;
    try {
        // this next line is lol, just lol.
        const user = await UserModel_1.default.findOne({
            $or: [
                { _id: id },
                { username: { $regex: new RegExp(id, 'i') } },
                { email: { $regex: new RegExp(id, 'i') } },
                { invite: { $regex: new RegExp(id, 'i') } },
                { key: { $regex: new RegExp(id, 'i') } },
                { 'discord.id': id.replace('<@!', '').replace('>', '') }
            ]
        });
        if (!user)
            return res.status(404).json({
                success: false,
                error: 'invalid user',
            });
        await UserModel_1.default.findByIdAndUpdate(user._id, {
            invites: user.invites + amount
        });
        res.status(200).json({
            success: true,
            message: 'added invite successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
router.post('/premium', ValidationMiddleware_1.default(PremiumSchema_1.default), async (req, res) => {
    const { id } = req.body;
    try {
        // this next line is lol, just lol.
        const user = await UserModel_1.default.findOne({
            $or: [
                { _id: id },
                { username: { $regex: new RegExp(id, 'i') } },
                { email: { $regex: new RegExp(id, 'i') } },
                { invite: { $regex: new RegExp(id, 'i') } },
                { key: { $regex: new RegExp(id, 'i') } },
                { 'discord.id': id.replace('<@!', '').replace('>', '') }
            ]
        });
        if (!user)
            return res.status(404).json({
                success: false,
                error: 'invalid user',
            });
        await UserModel_1.default.findByIdAndUpdate(user._id, {
            premium: true
        });
        await S3Util_1.addPremium(user).catch((e) => console.log(e));
        res.status(200).json({
            success: true,
            message: 'set user as premium correctly',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
router.post('/verifyemail', ValidationMiddleware_1.default(PremiumSchema_1.default), async (req, res) => {
    const { id } = req.body;
    try {
        // this next line is lol, just lol.
        const user = await UserModel_1.default.findOne({
            $or: [
                { _id: id },
                { username: { $regex: new RegExp(id, 'i') } },
                { email: { $regex: new RegExp(id, 'i') } },
                { invite: { $regex: new RegExp(id, 'i') } },
                { key: { $regex: new RegExp(id, 'i') } },
                { 'discord.id': id.replace('<@!', '').replace('>', '') }
            ]
        });
        if (!user)
            return res.status(404).json({
                success: false,
                error: 'invalid user',
            });
        await UserModel_1.default.findByIdAndUpdate(user._id, {
            emailVerified: true
        });
        res.status(200).json({
            success: true,
            message: 'verified users mail',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
router.post('/setuid', ValidationMiddleware_1.default(SetUIDSchema_1.default), async (req, res) => {
    const { id, newuid } = req.body;
    try {
        // this next line is lol, just lol.
        const user = await UserModel_1.default.findOne({
            $or: [
                { _id: id },
                { username: { $regex: new RegExp(id, 'i') } },
                { email: { $regex: new RegExp(id, 'i') } },
                { invite: { $regex: new RegExp(id, 'i') } },
                { key: { $regex: new RegExp(id, 'i') } },
                { 'discord.id': id.replace('<@!', '').replace('>', '') }
            ]
        });
        if (!user)
            return res.status(404).json({
                success: false,
                error: 'invalid user',
            });
        const uuid = await UserModel_1.default.findOne({
            uid: newuid
        });
        if (uuid)
            return res.status(404).json({
                success: false,
                error: 'uid already in use',
            });
        await UserModel_1.default.findByIdAndUpdate(user._id, {
            uid: newuid
        });
        res.status(200).json({
            success: true,
            message: 'set users id',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
router.post('/invitewave', ValidationMiddleware_1.default(InviteWaveSchema_1.default), async (req, res) => {
    const { amount } = req.body;
    try {
        await UserModel_1.default.updateMany({ 'username': { $ne: null } }, { $inc: { 'invites': +amount } });
        return res.status(200).json({
            success: true,
            message: "Invite wave sent out successfully.",
        });
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            error: e.message,
        });
    }
});
router.post('/wipe', AdminMiddleware_1.default, async (req, res) => {
    const { id } = req.body;
    try {
        const user = await UserModel_1.default.findOne({
            $or: [
                { _id: id },
                { username: { $regex: new RegExp(id, 'i') } },
                { email: { $regex: new RegExp(id, 'i') } },
                { invite: { $regex: new RegExp(id, 'i') } },
                { key: { $regex: new RegExp(id, 'i') } },
                { 'discord.id': id.replace('<@!', '').replace('>', '') }
            ]
        });
        const count = await S3Util_1.wipeFiles(user);
        await FileModel_1.default.deleteMany({
            'uploader.uuid': user._id,
        });
        await InvisibleUrlModel_1.default.deleteMany({
            uploader: user._id,
        });
        await UserModel_1.default.findByIdAndUpdate(user._id, {
            uploads: 0,
        });
        await RefreshTokenModel_1.default.deleteMany({ user: user._id });
        await UserModel_1.default.deleteOne({ _id: user._id });
        res.status(200).json({
            success: true,
            message: `wiped ${id} successfully`,
            count,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel_1.default.findById(id) || await UserModel_1.default.findOne({ username: id }) || await UserModel_1.default.findOne({ 'discord.id': id.replace('<@!', '').replace('>', '') }) || await UserModel_1.default.findOne({ uid: parseInt(id) || null });
        if (!user)
            return res.status(404).json({
                success: false,
                error: 'invalid user',
            });
        res.status(200).json({
            success: true,
            user: {
                username: user.username,
                uuid: user._id,
                lastLogin: user.lastLogin,
                uid: user.uid,
                uploads: user.uploads,
                registrationDate: user.registrationDate,
                invitedBy: user.invitedBy,
                discordId: user.discord.id,
                avatar: user.discord.avatar,
                invitedUsers: user.invitedUsers,
                role: user.blacklisted.status ? "Blacklisted" : (user.admin ? 'Admin' : (user.premium ? 'Premium' : 'Whitelisted')),
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRtaW5Sb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL0FkbWluUm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUNBQW9EO0FBQ3BELHdEQUF1RDtBQUN2RCxxRkFBNkQ7QUFDN0Qsd0VBQWdEO0FBQ2hELCtGQUF1RTtBQUN2RSxpRkFBeUQ7QUFDekQsb0VBQTRDO0FBQzVDLGlGQUF5RDtBQUN6RCxtRkFBMkQ7QUFFM0Qsb0VBQTRDO0FBQzVDLDRDQUEwRDtBQUMxRCwyRUFBbUQ7QUFDbkQsb0ZBQTREO0FBQzVELG9GQUE0RDtBQUc1RCw2RUFBcUQ7QUFDckQsMkVBQW1EO0FBQ25ELDZFQUFxRDtBQUNyRCxNQUFNLE1BQU0sR0FBRyxnQkFBTSxFQUFFLENBQUM7QUFFeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyx5QkFBZSxDQUFDLENBQUM7QUFFNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsOEJBQW9CLENBQUMsc0JBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDOUYsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDaEMsTUFBTSxNQUFNLEdBQUcsNkJBQWMsRUFBRSxDQUFDO0lBQ2hDLE1BQU0sV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDL0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxtQkFBUyxDQUFDLE9BQU8sQ0FBQztRQUNyQyxHQUFHLEVBQUU7WUFDRCxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUU7WUFDbkIsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFO1lBQ3hCLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRTtZQUNyQixFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUU7WUFDdEIsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFO1lBQ25CLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FB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QyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBRXRIO1NBQ0osQ0FBQyxDQUFDO0tBQ047SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2pCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsS0FBSyxFQUFFLEdBQUcsQ0FBQyxPQUFPO1NBQ3JCLENBQUMsQ0FBQztLQUNOO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxrQkFBZSxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7IGdlbmVyYXRlSW52aXRlIH0gZnJvbSAnLi4vdXRpbHMvR2VuZXJhdGVVdGlsJztcclxuaW1wb3J0IEFkbWluTWlkZGxld2FyZSBmcm9tICcuLi9taWRkbGV3YXJlcy9BZG1pbk1pZGRsZXdhcmUnO1xyXG5pbXBvcnQgSW52aXRlTW9kZWwgZnJvbSAnLi4vbW9kZWxzL0ludml0ZU1vZGVsJztcclxuaW1wb3J0IFZhbGlkYXRpb25NaWRkbGV3YXJlIGZyb20gJy4uL21pZGRsZXdhcmVzL1ZhbGlkYXRpb25NaWRkbGV3YXJlJztcclxuaW1wb3J0IEJsYWNrbGlzdFNjaGVtYSBmcm9tICcuLi9zY2hlbWFzL0JsYWNrbGlzdFNjaGVtYSc7XHJcbmltcG9ydCBVc2VyTW9kZWwgZnJvbSAnLi4vbW9kZWxzL1VzZXJNb2RlbCc7XHJcbmltcG9ydCBJbnZpdGVBZGRTY2hlbWEgZnJvbSBcIi4uL3NjaGVtYXMvSW52aXRlQWRkU2NoZW1hXCI7XHJcbmltcG9ydCBJbnZpdGVXYXZlU2NoZW1hIGZyb20gXCIuLi9zY2hlbWFzL0ludml0ZVdhdmVTY2hlbWFcIjtcclxuaW1wb3J0IEF1dGhNaWRkbGV3YXJlIGZyb20gXCIuLi9taWRkbGV3YXJlcy9BdXRoTWlkZGxld2FyZVwiO1xyXG5pbXBvcnQgRmlsZU1vZGVsIGZyb20gXCIuLi9tb2RlbHMvRmlsZU1vZGVsXCI7XHJcbmltcG9ydCB7YWRkUHJlbWl1bSwgczMsIHdpcGVGaWxlc30gZnJvbSBcIi4uL3V0aWxzL1MzVXRpbFwiO1xyXG5pbXBvcnQgR2VuSW52U2NoZW1hIGZyb20gXCIuLi9zY2hlbWFzL0dlbkludlNjaGVtYVwiO1xyXG5pbXBvcnQgSW52aXNpYmxlVXJsTW9kZWwgZnJvbSBcIi4uL21vZGVscy9JbnZpc2libGVVcmxNb2RlbFwiO1xyXG5pbXBvcnQgUmVmcmVzaFRva2VuTW9kZWwgZnJvbSBcIi4uL21vZGVscy9SZWZyZXNoVG9rZW5Nb2RlbFwiO1xyXG5pbXBvcnQge2V4dG5hbWV9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7Zm9ybWF0RmlsZXNpemV9IGZyb20gXCIuLi91dGlscy9Gb3JtYXRVdGlsXCI7XHJcbmltcG9ydCBQcmVtaXVtU2NoZW1hIGZyb20gXCIuLi9zY2hlbWFzL1ByZW1pdW1TY2hlbWFcIjtcclxuaW1wb3J0IFNldFVJRFNjaGVtYSBmcm9tIFwiLi4vc2NoZW1hcy9TZXRVSURTY2hlbWFcIjtcclxuaW1wb3J0IEJ1bGtJbnZTY2hlbWEgZnJvbSBcIi4uL3NjaGVtYXMvQnVsa0ludlNjaGVtYVwiO1xyXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcclxuXHJcbnJvdXRlci51c2UoQWRtaW5NaWRkbGV3YXJlKTtcclxuXHJcbnJvdXRlci5wb3N0KCcvaW52aXRlcycsIFZhbGlkYXRpb25NaWRkbGV3YXJlKEdlbkludlNjaGVtYSkgLGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIGNvbnN0IHsgZXhlY3V0ZXJJZCB9ID0gcmVxLmJvZHk7XHJcbiAgICBjb25zdCBpbnZpdGUgPSBnZW5lcmF0ZUludml0ZSgpO1xyXG4gICAgY29uc3QgZGF0ZUNyZWF0ZWQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgY29uc3QgZXhlY3V0ZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7XHJcbiAgICAgICAgJG9yOiBbXHJcbiAgICAgICAgICAgIHsgX2lkOiBleGVjdXRlcklkIH0sXHJcbiAgICAgICAgICAgIHsgdXNlcm5hbWU6IGV4ZWN1dGVySWQgfSxcclxuICAgICAgICAgICAgeyBlbWFpbDogZXhlY3V0ZXJJZCB9LFxyXG4gICAgICAgICAgICB7IGludml0ZTogZXhlY3V0ZXJJZCB9LFxyXG4gICAgICAgICAgICB7IGtleTogZXhlY3V0ZXJJZCB9LFxyXG4gICAgICAgICAgICB7ICdkaXNjb3JkLmlkJzogZXhlY3V0ZXJJZC5yZXBsYWNlKCc8QCEnLCAnJykucmVwbGFjZSgnPicsICcnKSB9XHJcbiAgICAgICAgXVxyXG4gICAgfSk7ICAgIGlmICghZXhlY3V0ZXIpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgZXJyb3I6ICdpbnZhbGlkIHVzZXInLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBJbnZpdGVNb2RlbC5jcmVhdGUoe1xyXG4gICAgICAgICAgICBfaWQ6IGludml0ZSxcclxuICAgICAgICAgICAgY3JlYXRlZEJ5OiB7XHJcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogZXhlY3V0ZXIgPyBleGVjdXRlci51c2VybmFtZSA6ICdBZG1pbicsXHJcbiAgICAgICAgICAgICAgICB1dWlkOiBleGVjdXRlciA/IGV4ZWN1dGVyLl9pZCA6ICdOL0EnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRlQ3JlYXRlZCxcclxuICAgICAgICAgICAgZGF0ZVJlZGVlbWVkOiBudWxsLFxyXG4gICAgICAgICAgICB1c2VkQnk6IG51bGwsXHJcbiAgICAgICAgICAgIHJlZGVlbWVkOiBmYWxzZSxcclxuICAgICAgICAgICAgdXNlYWJsZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICBsaW5rOiBgaHR0cHM6Ly9kbnkuZ2lmdHMvJHtpbnZpdGV9YCxcclxuICAgICAgICAgICAgY29kZTogaW52aXRlLFxyXG4gICAgICAgICAgICBkYXRlQ3JlYXRlZCxcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5yb3V0ZXIucG9zdCgnL2J1bGtpbnZpdGVzJywgVmFsaWRhdGlvbk1pZGRsZXdhcmUoQnVsa0ludlNjaGVtYSksIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIGNvbnN0IHsgZXhlY3V0ZXJJZCwgY291bnQgfSA9IHJlcS5ib2R5O1xyXG4gICAgY29uc3QgZGF0ZUNyZWF0ZWQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdmFyIGludml0ZXMgPSBbXVxyXG4gICAgbGV0IGkgPSAwXHJcbiAgICBjb25zdCBleGVjdXRlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHtcclxuICAgICAgICAkb3I6IFtcclxuICAgICAgICAgICAgeyBfaWQ6IGV4ZWN1dGVySWQgfSxcclxuICAgICAgICAgICAgeyB1c2VybmFtZTogZXhlY3V0ZXJJZCB9LFxyXG4gICAgICAgICAgICB7IGVtYWlsOiBleGVjdXRlcklkIH0sXHJcbiAgICAgICAgICAgIHsgaW52aXRlOiBleGVjdXRlcklkIH0sXHJcbiAgICAgICAgICAgIHsga2V5OiBleGVjdXRlcklkIH0sXHJcbiAgICAgICAgICAgIHsgJ2Rpc2NvcmQuaWQnOiBleGVjdXRlcklkLnJlcGxhY2UoJzxAIScsICcnKS5yZXBsYWNlKCc+JywgJycpIH1cclxuICAgICAgICBdXHJcbiAgICB9KTtcclxuICAgIGlmICghZXhlY3V0ZXIpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgZXJyb3I6ICdpbnZhbGlkIHVzZXInLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY291bnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgaW52aXRlID0gZ2VuZXJhdGVJbnZpdGUoKTtcclxuICAgICAgICAgICAgYXdhaXQgSW52aXRlTW9kZWwuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgIF9pZDogaW52aXRlLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlZEJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IGV4ZWN1dGVyID8gZXhlY3V0ZXIudXNlcm5hbWUgOiAnQWRtaW4nLFxyXG4gICAgICAgICAgICAgICAgICAgIHV1aWQ6IGV4ZWN1dGVyID8gZXhlY3V0ZXIuX2lkIDogJ04vQScsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0ZUNyZWF0ZWQsXHJcbiAgICAgICAgICAgICAgICBkYXRlUmVkZWVtZWQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICB1c2VkQnk6IG51bGwsXHJcbiAgICAgICAgICAgICAgICByZWRlZW1lZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB1c2VhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKCFpbnZpdGVzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBpbnZpdGVzLnB1c2goJ2h0dHBzOi8vZG55LmdpZnRzLycgKyBpbnZpdGUpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbnZpdGVzLnB1c2goaW52aXRlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cdCAgICBcclxuXHRjb25zb2xlLmxvZyhpbnZpdGVzLCBpbnZpdGVzLmpvaW4oJ1xcbmh0dHBzOi8vZG55LmdpZnRzLycpKVxyXG5cclxuXHQgICAgdmFyIHJlc3VsdEpTT04gPSB7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgICAgIGNvZGVzOiBpbnZpdGVzLFxyXG4gICAgICAgICAgICBsaW5rczogaW52aXRlcy5qb2luKCdcXG5odHRwczovL2RueS5naWZ0cy8nKSxcclxuICAgICAgICAgICAgZGF0ZUNyZWF0ZWQsXHJcbiAgICAgICAgfVxyXG5cdCAgICBcclxuXHQgICAgY29uc29sZS5sb2cocmVzdWx0SlNPTilcclxuXHQgICAgXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzdWx0SlNPTik7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxucm91dGVyLnBvc3QoJy9ibGFja2xpc3QnLCBWYWxpZGF0aW9uTWlkZGxld2FyZShCbGFja2xpc3RTY2hlbWEpLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICBjb25zdCB7IGlkLCByZWFzb24sIGV4ZWN1dGVySWQgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgLy8gdGhpcyBuZXh0IGxpbmUgaXMgbG9sLCBqdXN0IGxvbC5cclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoe1xyXG4gICAgICAgICAgICAkb3I6IFtcclxuICAgICAgICAgICAgICAgIHsgX2lkOiBpZCB9LFxyXG4gICAgICAgICAgICAgICAgeyB1c2VybmFtZTogeyAkcmVnZXg6IG5ldyBSZWdFeHAoaWQsICdpJykgfSAgfSxcclxuICAgICAgICAgICAgICAgIHsgZW1haWw6IHsgJHJlZ2V4OiBuZXcgUmVnRXhwKGlkLCAnaScpIH0gIH0sXHJcbiAgICAgICAgICAgICAgICB7IGludml0ZTogeyAkcmVnZXg6IG5ldyBSZWdFeHAoaWQsICdpJykgfSAgfSxcclxuICAgICAgICAgICAgICAgIHsga2V5OiB7ICRyZWdleDogbmV3IFJlZ0V4cChpZCwgJ2knKSB9ICB9LFxyXG4gICAgICAgICAgICAgICAgeyAnZGlzY29yZC5pZCc6IGlkLnJlcGxhY2UoJzxAIScsICcnKS5yZXBsYWNlKCc+JywgJycpIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXVzZXIpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcjogJ2ludmFsaWQgdXNlcicsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh1c2VyLmJsYWNrbGlzdGVkLnN0YXR1cykgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yOiAndGhpcyB1c2VyIGlzIGFscmVhZHkgYmxhY2tsaXN0ZWQnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGV4ZWN1dGVyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoe1xyXG4gICAgICAgICAgICAkb3I6IFtcclxuICAgICAgICAgICAgICAgIHsgX2lkOiBleGVjdXRlcklkIH0sXHJcbiAgICAgICAgICAgICAgICB7IHVzZXJuYW1lOiBleGVjdXRlcklkIH0sXHJcbiAgICAgICAgICAgICAgICB7IGVtYWlsOiBleGVjdXRlcklkIH0sXHJcbiAgICAgICAgICAgICAgICB7IGludml0ZTogZXhlY3V0ZXJJZCB9LFxyXG4gICAgICAgICAgICAgICAgeyBrZXk6IGV4ZWN1dGVySWQgfSxcclxuICAgICAgICAgICAgICAgIHsgJ2Rpc2NvcmQuaWQnOiBleGVjdXRlcklkLnJlcGxhY2UoJzxAIScsICcnKS5yZXBsYWNlKCc+JywgJycpIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghZXhlY3V0ZXIpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcjogJ2ludmFsaWQgdXNlcicsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGF3YWl0IFVzZXJNb2RlbC5maW5kQnlJZEFuZFVwZGF0ZSh1c2VyLl9pZCwge1xyXG4gICAgICAgICAgICBibGFja2xpc3RlZDoge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmVhc29uOiBgQmxhY2tsaXN0ZWQgYnkgJHtleGVjdXRlci51c2VybmFtZX0gZm9yOiAke3JlYXNvbiA/IHJlYXNvbiA6ICdObyByZWFzb24gcHJvdmlkZWQnfWAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgICAgbWVzc2FnZTogJ2JsYWNrbGlzdGVkIHVzZXIgc3VjY2Vzc2Z1bGx5JyxcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5yb3V0ZXIucG9zdCgnL3VuYmxhY2tsaXN0JywgVmFsaWRhdGlvbk1pZGRsZXdhcmUoQmxhY2tsaXN0U2NoZW1hKSwgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgY29uc3QgeyBpZCwgcmVhc29uLCBleGVjdXRlcklkIH0gPSByZXEuYm9keTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIHRoaXMgbmV4dCBsaW5lIGlzIGxvbCwganVzdCBsb2wuXHJcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHtcclxuICAgICAgICAgICAgJG9yOiBbXHJcbiAgICAgICAgICAgICAgICB7IF9pZDogaWQgfSxcclxuICAgICAgICAgICAgICAgIHsgdXNlcm5hbWU6IHsgJHJlZ2V4OiBuZXcgUmVnRXhwKGlkLCAnaScpIH0gIH0sXHJcbiAgICAgICAgICAgICAgICB7IGVtYWlsOiB7ICRyZWdleDogbmV3IFJlZ0V4cChpZCwgJ2knKSB9ICB9LFxyXG4gICAgICAgICAgICAgICAgeyBpbnZpdGU6IHsgJHJlZ2V4OiBuZXcgUmVnRXhwKGlkLCAnaScpIH0gIH0sXHJcbiAgICAgICAgICAgICAgICB7IGtleTogeyAkcmVnZXg6IG5ldyBSZWdFeHAoaWQsICdpJykgfSAgfSxcclxuICAgICAgICAgICAgICAgIHsgJ2Rpc2NvcmQuaWQnOiBpZC5yZXBsYWNlKCc8QCEnLCAnJykucmVwbGFjZSgnPicsICcnKSB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXVzZXIpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcjogJ2ludmFsaWQgdXNlcicsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGV4ZWN1dGVyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoe1xyXG4gICAgICAgICAgICAkb3I6IFtcclxuICAgICAgICAgICAgICAgIHsgX2lkOiBleGVjdXRlcklkIH0sXHJcbiAgICAgICAgICAgICAgICB7IHVzZXJuYW1lOiBleGVjdXRlcklkIH0sXHJcbiAgICAgICAgICAgICAgICB7IGVtYWlsOiBleGVjdXRlcklkIH0sXHJcbiAgICAgICAgICAgICAgICB7IGludml0ZTogZXhlY3V0ZXJJZCB9LFxyXG4gICAgICAgICAgICAgICAgeyBrZXk6IGV4ZWN1dGVySWQgfSxcclxuICAgICAgICAgICAgICAgIHsgJ2Rpc2NvcmQuaWQnOiBleGVjdXRlcklkLnJlcGxhY2UoJzxAIScsICcnKS5yZXBsYWNlKCc+JywgJycpIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pOyAgICAgICAgaWYgKCFleGVjdXRlcikgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yOiAnaW52YWxpZCB1c2VyJyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCF1c2VyLmJsYWNrbGlzdGVkLnN0YXR1cykgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yOiAndGhpcyB1c2VyIGlzIG5vdCAgYmxhY2tsaXN0ZWQnLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhd2FpdCBVc2VyTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodXNlci5faWQsIHtcclxuICAgICAgICAgICAgYmxhY2tsaXN0ZWQ6IHtcclxuICAgICAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICByZWFzb246ICBgVW5ibGFja2xpc3RlZCBieSAke2V4ZWN1dGVyLnVzZXJuYW1lfSBmb3I6ICR7cmVhc29uID8gcmVhc29uIDogJ05vIHJlYXNvbiBwcm92aWRlZCd9YCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiAndW5ibGFja2xpc3RlZCB1c2VyIHN1Y2Nlc3NmdWxseScsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5yb3V0ZXIuZGVsZXRlKCcvZmlsZXMvOmlkJywgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcclxuICAgIGNvbnN0IGZpbGUgPSBhd2FpdCBGaWxlTW9kZWwuZmluZE9uZSh7IGZpbGVuYW1lOiBpZCB9KTtcclxuICAgIGlmICghZmlsZSkgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtcclxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICBlcnJvcjogJ2ludmFsaWQgZmlsZScsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAgICAgICBCdWNrZXQ6IHByb2Nlc3MuZW52LlMzX0JVQ0tFVCxcclxuICAgICAgICBLZXk6IGZpbGUua2V5LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7X2lkOiBmaWxlLnVwbG9hZGVyLnV1aWR9KVxyXG4gICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBzMy5kZWxldGVPYmplY3QocGFyYW1zKS5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgIGlmICh1c2VyLnVwbG9hZHMgPiAwKSBhd2FpdCBVc2VyTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodXNlci5faWQsIHtcclxuICAgICAgICAgICAgJGluYzoge1xyXG4gICAgICAgICAgICAgICAgdXBsb2FkczogLTEsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGF3YWl0IGZpbGUucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgICAgbWVzc2FnZTogJ2RlbGV0ZWQgZmlsZSBzdWNjZXNzZnVsbHknLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxucm91dGVyLnBvc3QoJy9pbnZpdGVhZGQnLCBWYWxpZGF0aW9uTWlkZGxld2FyZShJbnZpdGVBZGRTY2hlbWEpLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICBjb25zdCB7IGlkLCBhbW91bnQgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgLy8gdGhpcyBuZXh0IGxpbmUgaXMgbG9sLCBqdXN0IGxvbC5cclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoe1xyXG4gICAgICAgICAgICAkb3I6IFtcclxuICAgICAgICAgICAgICAgIHsgX2lkOiBpZCB9LFxyXG4gICAgICAgICAgICAgICAgeyB1c2VybmFtZTogeyAkcmVnZXg6IG5ldyBSZWdFeHAoaWQsICdpJykgfSAgfSxcclxuICAgICAgICAgICAgICAgIHsgZW1haWw6IHsgJHJlZ2V4OiBuZXcgUmVnRXhwKGlkLCAnaScpIH0gIH0sXHJcbiAgICAgICAgICAgICAgICB7IGludml0ZTogeyAkcmVnZXg6IG5ldyBSZWdFeHAoaWQsICdpJykgfSAgfSxcclxuICAgICAgICAgICAgICAgIHsga2V5OiB7ICRyZWdleDogbmV3IFJlZ0V4cChpZCwgJ2knKSB9ICB9LFxyXG4gICAgICAgICAgICAgICAgeyAnZGlzY29yZC5pZCc6IGlkLnJlcGxhY2UoJzxAIScsICcnKS5yZXBsYWNlKCc+JywgJycpIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghdXNlcikgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yOiAnaW52YWxpZCB1c2VyJyxcclxuICAgICAgICB9KTtcclxuXHRcdGF3YWl0IFVzZXJNb2RlbC5maW5kQnlJZEFuZFVwZGF0ZSh1c2VyLl9pZCwge1xyXG4gICAgICAgICAgICBpbnZpdGVzOiB1c2VyLmludml0ZXMgKyBhbW91bnRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiAnYWRkZWQgaW52aXRlIHN1Y2Nlc3NmdWxseScsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pXHJcbnJvdXRlci5wb3N0KCcvcHJlbWl1bScsIFZhbGlkYXRpb25NaWRkbGV3YXJlKFByZW1pdW1TY2hlbWEpLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICBjb25zdCB7IGlkIH0gPSByZXEuYm9keTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIHRoaXMgbmV4dCBsaW5lIGlzIGxvbCwganVzdCBsb2wuXHJcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHtcclxuICAgICAgICAgICAgJG9yOiBbXHJcbiAgICAgICAgICAgICAgICB7IF9pZDogaWQgfSxcclxuICAgICAgICAgICAgICAgIHsgdXNlcm5hbWU6IHsgJHJlZ2V4OiBuZXcgUmVnRXhwKGlkLCAnaScpIH0gIH0sXHJcbiAgICAgICAgICAgICAgICB7IGVtYWlsOiB7ICRyZWdleDogbmV3IFJlZ0V4cChpZCwgJ2knKSB9ICB9LFxyXG4gICAgICAgICAgICAgICAgeyBpbnZpdGU6IHsgJHJlZ2V4OiBuZXcgUmVnRXhwKGlkLCAnaScpIH0gIH0sXHJcbiAgICAgICAgICAgICAgICB7IGtleTogeyAkcmVnZXg6IG5ldyBSZWdFeHAoaWQsICdpJykgfSAgfSxcclxuICAgICAgICAgICAgICAgIHsgJ2Rpc2NvcmQuaWQnOiBpZC5yZXBsYWNlKCc8QCEnLCAnJykucmVwbGFjZSgnPicsICcnKSB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXVzZXIpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcjogJ2ludmFsaWQgdXNlcicsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHVzZXIuX2lkLCB7XHJcbiAgICAgICAgICAgIHByZW1pdW06IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBhd2FpdCBhZGRQcmVtaXVtKHVzZXIpLmNhdGNoKChlKSA9PiBjb25zb2xlLmxvZyhlKSk7XHJcblxyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgICAgbWVzc2FnZTogJ3NldCB1c2VyIGFzIHByZW1pdW0gY29ycmVjdGx5JyxcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSlcclxucm91dGVyLnBvc3QoJy92ZXJpZnllbWFpbCcsIFZhbGlkYXRpb25NaWRkbGV3YXJlKFByZW1pdW1TY2hlbWEpLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICBjb25zdCB7IGlkIH0gPSByZXEuYm9keTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIHRoaXMgbmV4dCBsaW5lIGlzIGxvbCwganVzdCBsb2wuXHJcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHtcclxuICAgICAgICAgICAgJG9yOiBbXHJcbiAgICAgICAgICAgICAgICB7IF9pZDogaWQgfSxcclxuICAgICAgICAgICAgICAgIHsgdXNlcm5hbWU6IHsgJHJlZ2V4OiBuZXcgUmVnRXhwKGlkLCAnaScpIH0gIH0sXHJcbiAgICAgICAgICAgICAgICB7IGVtYWlsOiB7ICRyZWdleDogbmV3IFJlZ0V4cChpZCwgJ2knKSB9ICB9LFxyXG4gICAgICAgICAgICAgICAgeyBpbnZpdGU6IHsgJHJlZ2V4OiBuZXcgUmVnRXhwKGlkLCAnaScpIH0gIH0sXHJcbiAgICAgICAgICAgICAgICB7IGtleTogeyAkcmVnZXg6IG5ldyBSZWdFeHAoaWQsICdpJykgfSAgfSxcclxuICAgICAgICAgICAgICAgIHsgJ2Rpc2NvcmQuaWQnOiBpZC5yZXBsYWNlKCc8QCEnLCAnJykucmVwbGFjZSgnPicsICcnKSB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXVzZXIpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcjogJ2ludmFsaWQgdXNlcicsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHVzZXIuX2lkLCB7XHJcbiAgICAgICAgICAgIGVtYWlsVmVyaWZpZWQ6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICd2ZXJpZmllZCB1c2VycyBtYWlsJyxcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSlcclxucm91dGVyLnBvc3QoJy9zZXR1aWQnLCBWYWxpZGF0aW9uTWlkZGxld2FyZShTZXRVSURTY2hlbWEpLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICBjb25zdCB7IGlkLCBuZXd1aWQgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgLy8gdGhpcyBuZXh0IGxpbmUgaXMgbG9sLCBqdXN0IGxvbC5cclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoe1xyXG4gICAgICAgICAgICAkb3I6IFtcclxuICAgICAgICAgICAgICAgIHsgX2lkOiBpZCB9LFxyXG4gICAgICAgICAgICAgICAgeyB1c2VybmFtZTogeyAkcmVnZXg6IG5ldyBSZWdFeHAoaWQsICdpJykgfSAgfSxcclxuICAgICAgICAgICAgICAgIHsgZW1haWw6IHsgJHJlZ2V4OiBuZXcgUmVnRXhwKGlkLCAnaScpIH0gIH0sXHJcbiAgICAgICAgICAgICAgICB7IGludml0ZTogeyAkcmVnZXg6IG5ldyBSZWdFeHAoaWQsICdpJykgfSAgfSxcclxuICAgICAgICAgICAgICAgIHsga2V5OiB7ICRyZWdleDogbmV3IFJlZ0V4cChpZCwgJ2knKSB9ICB9LFxyXG4gICAgICAgICAgICAgICAgeyAnZGlzY29yZC5pZCc6IGlkLnJlcGxhY2UoJzxAIScsICcnKS5yZXBsYWNlKCc+JywgJycpIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghdXNlcikgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yOiAnaW52YWxpZCB1c2VyJyxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCB1dWlkID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoe1xyXG4gICAgICAgICAgICB1aWQ6IG5ld3VpZFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh1dWlkKSByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICAgICAgZXJyb3I6ICd1aWQgYWxyZWFkeSBpbiB1c2UnLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhd2FpdCBVc2VyTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodXNlci5faWQsIHtcclxuICAgICAgICAgICAgdWlkOiBuZXd1aWRcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdzZXQgdXNlcnMgaWQnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KVxyXG5yb3V0ZXIucG9zdCgnL2ludml0ZXdhdmUnLCBWYWxpZGF0aW9uTWlkZGxld2FyZShJbnZpdGVXYXZlU2NoZW1hKSwgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgY29uc3QgeyBhbW91bnQgfSA9IHJlcS5ib2R5O1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBVc2VyTW9kZWwudXBkYXRlTWFueSh7ICd1c2VybmFtZSc6IHsgJG5lOiBudWxsIH0gfSwgeyAkaW5jOiB7ICdpbnZpdGVzJzogK2Ftb3VudCB9IH0pO1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiSW52aXRlIHdhdmUgc2VudCBvdXQgc3VjY2Vzc2Z1bGx5LlwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcjogZS5tZXNzYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KVxyXG5yb3V0ZXIucG9zdCgnL3dpcGUnLCBBZG1pbk1pZGRsZXdhcmUsIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHtcclxuICAgICAgICAgICAgJG9yOiBbXHJcbiAgICAgICAgICAgICAgICB7IF9pZDogaWQgfSxcclxuICAgICAgICAgICAgICAgIHsgdXNlcm5hbWU6IHsgJHJlZ2V4OiBuZXcgUmVnRXhwKGlkLCAnaScpIH0gIH0sXHJcbiAgICAgICAgICAgICAgICB7IGVtYWlsOiB7ICRyZWdleDogbmV3IFJlZ0V4cChpZCwgJ2knKSB9ICB9LFxyXG4gICAgICAgICAgICAgICAgeyBpbnZpdGU6IHsgJHJlZ2V4OiBuZXcgUmVnRXhwKGlkLCAnaScpIH0gIH0sXHJcbiAgICAgICAgICAgICAgICB7IGtleTogeyAkcmVnZXg6IG5ldyBSZWdFeHAoaWQsICdpJykgfSAgfSxcclxuICAgICAgICAgICAgICAgIHsgJ2Rpc2NvcmQuaWQnOiBpZC5yZXBsYWNlKCc8QCEnLCAnJykucmVwbGFjZSgnPicsICcnKSB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBjb3VudCA9IGF3YWl0IHdpcGVGaWxlcyh1c2VyKTtcclxuXHJcbiAgICAgICAgYXdhaXQgRmlsZU1vZGVsLmRlbGV0ZU1hbnkoe1xyXG4gICAgICAgICAgICAndXBsb2FkZXIudXVpZCc6IHVzZXIuX2lkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGF3YWl0IEludmlzaWJsZVVybE1vZGVsLmRlbGV0ZU1hbnkoe1xyXG4gICAgICAgICAgICB1cGxvYWRlcjogdXNlci5faWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHVzZXIuX2lkLCB7XHJcbiAgICAgICAgICAgIHVwbG9hZHM6IDAsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXdhaXQgUmVmcmVzaFRva2VuTW9kZWwuZGVsZXRlTWFueSh7IHVzZXI6IHVzZXIuX2lkIH0pO1xyXG4gICAgICAgIGF3YWl0IFVzZXJNb2RlbC5kZWxldGVPbmUoe19pZDogdXNlci5faWR9KVxyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgICAgbWVzc2FnZTogYHdpcGVkICR7aWR9IHN1Y2Nlc3NmdWxseWAsXHJcbiAgICAgICAgICAgIGNvdW50LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxucm91dGVyLmdldCgnL3VzZXJzLzppZCcsIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkKGlkKSB8fCBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7IHVzZXJuYW1lOiBpZCB9KSB8fCBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7ICdkaXNjb3JkLmlkJzogaWQucmVwbGFjZSgnPEAhJywgJycpLnJlcGxhY2UoJz4nLCAnJykgfSkgfHwgYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoeyB1aWQ6IHBhcnNlSW50KGlkKSB8fCBudWxsIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXVzZXIpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcjogJ2ludmFsaWQgdXNlcicsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICB1c2VyOiB7XHJcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcclxuICAgICAgICAgICAgICAgIHV1aWQ6IHVzZXIuX2lkLFxyXG4gICAgICAgICAgICAgICAgbGFzdExvZ2luOiB1c2VyLmxhc3RMb2dpbixcclxuICAgICAgICAgICAgICAgIHVpZDogdXNlci51aWQsXHJcbiAgICAgICAgICAgICAgICB1cGxvYWRzOiB1c2VyLnVwbG9hZHMsXHJcbiAgICAgICAgICAgICAgICByZWdpc3RyYXRpb25EYXRlOiB1c2VyLnJlZ2lzdHJhdGlvbkRhdGUsXHJcbiAgICAgICAgICAgICAgICBpbnZpdGVkQnk6IHVzZXIuaW52aXRlZEJ5LFxyXG4gICAgICAgICAgICAgICAgZGlzY29yZElkOiB1c2VyLmRpc2NvcmQuaWQsXHJcbiAgICAgICAgICAgICAgICBhdmF0YXI6IHVzZXIuZGlzY29yZC5hdmF0YXIsXHJcbiAgICAgICAgICAgICAgICBpbnZpdGVkVXNlcnM6IHVzZXIuaW52aXRlZFVzZXJzLFxyXG4gICAgICAgICAgICAgICAgcm9sZTogdXNlci5ibGFja2xpc3RlZC5zdGF0dXMgPyBcIkJsYWNrbGlzdGVkXCIgOiAodXNlci5hZG1pbiA/ICdBZG1pbicgOiAodXNlci5wcmVtaXVtID8gJ1ByZW1pdW0nIDogJ1doaXRlbGlzdGVkJykpLFxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiJdfQ==