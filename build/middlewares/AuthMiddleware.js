"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../models/UserModel"));
exports.default = async (req, res, next) => {
    let { user } = req;
    if (!user)
        return res.status(401).json({
            success: false,
            error: 'unauthorized',
        });
    user = await UserModel_1.default.findById(user._id)
        .select('-__v -password');
    if (!user.emailVerified)
        return res.status(401).json({
            success: false,
            error: 'please verify your email',
        });
    if (user.blacklisted.status)
        return res.status(401).json({
            success: false,
            error: `you are blacklisted for: ${user.blacklisted.reason}`,
        });
    req.user = user;
    next();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aE1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZXMvQXV0aE1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxvRUFBNEM7QUFFNUMsa0JBQWUsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3JFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFFbkIsSUFBSSxDQUFDLElBQUk7UUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25DLE9BQU8sRUFBRSxLQUFLO1lBQ2QsS0FBSyxFQUFFLGNBQWM7U0FDeEIsQ0FBQyxDQUFDO0lBRUgsSUFBSSxHQUFHLE1BQU0sbUJBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNwQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUU5QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWE7UUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2pELE9BQU8sRUFBRSxLQUFLO1lBQ2QsS0FBSyxFQUFFLDBCQUEwQjtTQUNwQyxDQUFDLENBQUM7SUFFSCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTTtRQUFFLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDckQsT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUUsNEJBQTRCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO1NBQy9ELENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2hCLElBQUksRUFBRSxDQUFDO0FBQ1gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEZ1bmN0aW9uLCBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgVXNlck1vZGVsIGZyb20gJy4uL21vZGVscy9Vc2VyTW9kZWwnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XHJcbiAgICBsZXQgeyB1c2VyIH0gPSByZXE7XHJcblxyXG4gICAgaWYgKCF1c2VyKSByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgIGVycm9yOiAndW5hdXRob3JpemVkJyxcclxuICAgIH0pO1xyXG5cclxuICAgIHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZEJ5SWQodXNlci5faWQpXHJcbiAgICAgICAgLnNlbGVjdCgnLV9fdiAtcGFzc3dvcmQnKTtcclxuXHJcbiAgICBpZiAoIXVzZXIuZW1haWxWZXJpZmllZCkgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHtcclxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICBlcnJvcjogJ3BsZWFzZSB2ZXJpZnkgeW91ciBlbWFpbCcsXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodXNlci5ibGFja2xpc3RlZC5zdGF0dXMpIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgZXJyb3I6IGB5b3UgYXJlIGJsYWNrbGlzdGVkIGZvcjogJHt1c2VyLmJsYWNrbGlzdGVkLnJlYXNvbn1gLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmVxLnVzZXIgPSB1c2VyO1xyXG4gICAgbmV4dCgpO1xyXG59O1xyXG4iXX0=