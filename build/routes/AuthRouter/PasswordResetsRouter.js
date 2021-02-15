"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PasswordResetModel_1 = __importDefault(require("../../models/PasswordResetModel"));
const ValidationMiddleware_1 = __importDefault(require("../../middlewares/ValidationMiddleware"));
const PasswordResetConfirmationSchema_1 = __importDefault(require("../../schemas/PasswordResetConfirmationSchema"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const GenerateUtil_1 = require("../../utils/GenerateUtil");
const PasswordResetSchema_1 = __importDefault(require("../../schemas/PasswordResetSchema"));
const argon2_1 = require("argon2");
const RefreshTokenModel_1 = __importDefault(require("../../models/RefreshTokenModel"));
const MailUtil_1 = require("../../utils/MailUtil");
const router = express_1.Router();
router.post('/send', ValidationMiddleware_1.default(PasswordResetConfirmationSchema_1.default), async (req, res) => {
    if (req.user)
        return res.status(400).json({
            success: false,
            error: 'you are already logged in',
        });
    const { email } = req.body;
    let user = await PasswordResetModel_1.default.findOne({ email });
    if (user)
        return res.status(400).json({
            success: false,
            error: 'you already have a ongoing password reset',
        });
    user = await UserModel_1.default.findOne({ email });
    const resetKey = GenerateUtil_1.generateString(40);
    try {
        if (user) {
            await MailUtil_1.sendPasswordReset(user, resetKey);
            const doc = await PasswordResetModel_1.default.create({
                _id: resetKey,
                user: user._id,
                email,
            });
            setTimeout(async () => {
                await doc.remove();
            }, 600000);
        }
        res.status(200).json({
            success: true,
            message: 'if a user exist with that email we\'ll send over the password reset instructions',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
router.post('/reset', ValidationMiddleware_1.default(PasswordResetSchema_1.default), async (req, res) => {
    let { user } = req;
    if (user)
        return res.status(400).json({
            success: false,
            error: 'you are already logged in',
        });
    const { key, password, confirmPassword } = req.body;
    const reset = await PasswordResetModel_1.default.findById(key);
    if (!reset)
        return res.status(404).json({
            success: false,
            error: 'invalid key',
        });
    user = await UserModel_1.default.findById(reset.user);
    if (!user) {
        res.status(400).json({
            success: false,
            error: 'the user attached to this reset does not exist',
        });
        await reset.remove();
        return;
    }
    if (password.trim() !== confirmPassword.trim())
        return res.status(400).json({
            success: false,
            error: 'confirmation must match password',
        });
    if (await argon2_1.verify(user.password, password))
        return res.status(400).json({
            success: false,
            error: 'you must choose a different password',
        });
    try {
        await RefreshTokenModel_1.default.deleteMany({ user: user._id });
        await UserModel_1.default.findByIdAndUpdate(user._id, {
            password: await argon2_1.hash(password),
        });
        await reset.remove();
        res.status(200).json({
            success: true,
            message: 'reset password successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
router.get('/:key', async (req, res) => {
    const { key } = req.params;
    const doc = await PasswordResetModel_1.default.findById(key);
    if (!doc)
        return res.status(404).json({
            success: false,
            error: 'invalid key',
        });
    res.status(200).json({
        success: true,
        message: 'valid key',
    });
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFzc3dvcmRSZXNldHNSb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL0F1dGhSb3V0ZXIvUGFzc3dvcmRSZXNldHNSb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBb0Q7QUFDcEQseUZBQW9GO0FBQ3BGLGtHQUEwRTtBQUMxRSxvSEFBNEY7QUFDNUYsdUVBQXlEO0FBQ3pELDJEQUEwRDtBQUMxRCw0RkFBb0U7QUFDcEUsbUNBQXNDO0FBQ3RDLHVGQUErRDtBQUMvRCxtREFBdUQ7QUFDdkQsTUFBTSxNQUFNLEdBQUcsZ0JBQU0sRUFBRSxDQUFDO0FBRXhCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLDhCQUFvQixDQUFDLHlDQUErQixDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUM5RyxJQUFJLEdBQUcsQ0FBQyxJQUFJO1FBQUUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN0QyxPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSwyQkFBMkI7U0FDckMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDM0IsSUFBSSxJQUFJLEdBQXlCLE1BQU0sNEJBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUU3RSxJQUFJLElBQUk7UUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2xDLE9BQU8sRUFBRSxLQUFLO1lBQ2QsS0FBSyxFQUFFLDJDQUEyQztTQUNyRCxDQUFDLENBQUM7SUFFSCxJQUFJLEdBQUcsTUFBTSxtQkFBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFFMUMsTUFBTSxRQUFR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LGtCQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlLCBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IFBhc3N3b3JkUmVzZXRNb2RlbCwgeyBQYXNzd29yZFJlc2V0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL1Bhc3N3b3JkUmVzZXRNb2RlbCc7XHJcbmltcG9ydCBWYWxpZGF0aW9uTWlkZGxld2FyZSBmcm9tICcuLi8uLi9taWRkbGV3YXJlcy9WYWxpZGF0aW9uTWlkZGxld2FyZSc7XHJcbmltcG9ydCBQYXNzd29yZFJlc2V0Q29uZmlybWF0aW9uU2NoZW1hIGZyb20gJy4uLy4uL3NjaGVtYXMvUGFzc3dvcmRSZXNldENvbmZpcm1hdGlvblNjaGVtYSc7XHJcbmltcG9ydCBVc2VyTW9kZWwsIHsgVXNlciB9IGZyb20gJy4uLy4uL21vZGVscy9Vc2VyTW9kZWwnO1xyXG5pbXBvcnQgeyBnZW5lcmF0ZVN0cmluZyB9IGZyb20gJy4uLy4uL3V0aWxzL0dlbmVyYXRlVXRpbCc7XHJcbmltcG9ydCBQYXNzd29yZFJlc2V0U2NoZW1hIGZyb20gJy4uLy4uL3NjaGVtYXMvUGFzc3dvcmRSZXNldFNjaGVtYSc7XHJcbmltcG9ydCB7IGhhc2gsIHZlcmlmeSB9IGZyb20gJ2FyZ29uMic7XHJcbmltcG9ydCBSZWZyZXNoVG9rZW5Nb2RlbCBmcm9tICcuLi8uLi9tb2RlbHMvUmVmcmVzaFRva2VuTW9kZWwnO1xyXG5pbXBvcnQge3NlbmRQYXNzd29yZFJlc2V0fSBmcm9tIFwiLi4vLi4vdXRpbHMvTWFpbFV0aWxcIjtcclxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XHJcblxyXG5yb3V0ZXIucG9zdCgnL3NlbmQnLCBWYWxpZGF0aW9uTWlkZGxld2FyZShQYXNzd29yZFJlc2V0Q29uZmlybWF0aW9uU2NoZW1hKSwgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgaWYgKHJlcS51c2VyKSByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgIGVycm9yOiAneW91IGFyZSBhbHJlYWR5IGxvZ2dlZCBpbicsXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB7IGVtYWlsIH0gPSByZXEuYm9keTtcclxuICAgIGxldCB1c2VyOiBQYXNzd29yZFJlc2V0IHwgVXNlciA9IGF3YWl0IFBhc3N3b3JkUmVzZXRNb2RlbC5maW5kT25lKHsgZW1haWwgfSk7XHJcblxyXG4gICAgaWYgKHVzZXIpIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgZXJyb3I6ICd5b3UgYWxyZWFkeSBoYXZlIGEgb25nb2luZyBwYXNzd29yZCByZXNldCcsXHJcbiAgICB9KTtcclxuXHJcbiAgICB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoeyBlbWFpbCB9KTtcclxuXHJcbiAgICBjb25zdCByZXNldEtleSA9IGdlbmVyYXRlU3RyaW5nKDQwKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHNlbmRQYXNzd29yZFJlc2V0KHVzZXIsIHJlc2V0S2V5KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRvYyA9IGF3YWl0IFBhc3N3b3JkUmVzZXRNb2RlbC5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgX2lkOiByZXNldEtleSxcclxuICAgICAgICAgICAgICAgIHVzZXI6IHVzZXIuX2lkLFxyXG4gICAgICAgICAgICAgICAgZW1haWwsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBkb2MucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0sIDYwMDAwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdpZiBhIHVzZXIgZXhpc3Qgd2l0aCB0aGF0IGVtYWlsIHdlXFwnbGwgc2VuZCBvdmVyIHRoZSBwYXNzd29yZCByZXNldCBpbnN0cnVjdGlvbnMnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbnJvdXRlci5wb3N0KCcvcmVzZXQnLCBWYWxpZGF0aW9uTWlkZGxld2FyZShQYXNzd29yZFJlc2V0U2NoZW1hKSwgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgbGV0IHsgdXNlciB9ID0gcmVxO1xyXG5cclxuICAgIGlmICh1c2VyKSByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgIGVycm9yOiAneW91IGFyZSBhbHJlYWR5IGxvZ2dlZCBpbicsXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB7IGtleSwgcGFzc3dvcmQsIGNvbmZpcm1QYXNzd29yZCB9ID0gcmVxLmJvZHk7XHJcbiAgICBjb25zdCByZXNldCA9IGF3YWl0IFBhc3N3b3JkUmVzZXRNb2RlbC5maW5kQnlJZChrZXkpO1xyXG5cclxuICAgIGlmICghcmVzZXQpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgZXJyb3I6ICdpbnZhbGlkIGtleScsXHJcbiAgICB9KTtcclxuXHJcbiAgICB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkKHJlc2V0LnVzZXIpO1xyXG5cclxuICAgIGlmICghdXNlcikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yOiAndGhlIHVzZXIgYXR0YWNoZWQgdG8gdGhpcyByZXNldCBkb2VzIG5vdCBleGlzdCcsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGF3YWl0IHJlc2V0LnJlbW92ZSgpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBhc3N3b3JkLnRyaW0oKSAhPT0gY29uZmlybVBhc3N3b3JkLnRyaW0oKSkgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcclxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICBlcnJvcjogJ2NvbmZpcm1hdGlvbiBtdXN0IG1hdGNoIHBhc3N3b3JkJyxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChhd2FpdCB2ZXJpZnkodXNlci5wYXNzd29yZCwgcGFzc3dvcmQpKSByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgIGVycm9yOiAneW91IG11c3QgY2hvb3NlIGEgZGlmZmVyZW50IHBhc3N3b3JkJyxcclxuICAgIH0pO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgUmVmcmVzaFRva2VuTW9kZWwuZGVsZXRlTWFueSh7IHVzZXI6IHVzZXIuX2lkIH0pO1xyXG5cclxuICAgICAgICBhd2FpdCBVc2VyTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodXNlci5faWQsIHtcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IGF3YWl0IGhhc2gocGFzc3dvcmQpLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhd2FpdCByZXNldC5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiAncmVzZXQgcGFzc3dvcmQgc3VjY2Vzc2Z1bGx5JyxcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5yb3V0ZXIuZ2V0KCcvOmtleScsIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIGNvbnN0IHsga2V5IH0gPSByZXEucGFyYW1zO1xyXG4gICAgY29uc3QgZG9jID0gYXdhaXQgUGFzc3dvcmRSZXNldE1vZGVsLmZpbmRCeUlkKGtleSk7XHJcblxyXG4gICAgaWYgKCFkb2MpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgZXJyb3I6ICdpbnZhbGlkIGtleScsXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICBtZXNzYWdlOiAndmFsaWQga2V5JyxcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIl19