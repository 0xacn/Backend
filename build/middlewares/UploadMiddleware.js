"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DomainModel_1 = __importDefault(require("../models/DomainModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
exports.default = async (req, res, next) => {
    const key = req.headers.key;
    if (!key)
        return res.status(400).json({
            success: false,
            error: 'provide a key',
        });
    const user = await UserModel_1.default.findOne({ key });
    if (!user)
        return res.status(401).json({
            success: false,
            error: 'invalid key',
        });
    if (user.blacklisted.status)
        return res.status(401).json({
            success: false,
            error: `you are blacklisted for: ${user.blacklisted.reason}`,
        });
    if (!user.emailVerified)
        return res.status(401).json({
            success: false,
            error: 'please verify your email',
        });
    if (!user.discord.id || user.discord.id === '')
        return res.status(401).json({
            success: false,
            error: 'please link your discord',
        });
    const domain = await DomainModel_1.default.findOne({ name: user.settings.domain.name });
    if (!domain)
        return res.status(400).json({
            success: false,
            erorr: 'invalid domain, change it on the dashboard',
        });
    if (domain.userOnly && domain.donatedBy && domain.donatedBy !== user._id)
        return res.status(401).json({
            success: false,
            error: 'you are not allowed to upload to this domain',
        });
    req.user = user;
    next();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXBsb2FkTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlcy9VcGxvYWRNaWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esd0VBQWdEO0FBQ2hELG9FQUE0QztBQUU1QyxrQkFBZSxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDckUsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFhLENBQUM7SUFFdEMsSUFBSSxDQUFDLEdBQUc7UUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2xDLE9BQU8sRUFBRSxLQUFLO1lBQ2QsS0FBSyxFQUFFLGVBQWU7U0FDekIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxJQUFJLEdBQUcsTUFBTSxtQkFBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFFOUMsSUFBSSxDQUFDLElBQUk7UUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25DLE9BQU8sRUFBRSxLQUFLO1lBQ2QsS0FBSyxFQUFFLGFBQWE7U0FDdkIsQ0FBQyxDQUFDO0lBRUgsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07UUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3JELE9BQU8sRUFBRSxLQUFLO1lBQ2QsS0FBSyxFQUFFLDRCQUE0QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtTQUMvRCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWE7UUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2pELE9BQU8sRUFBRSxLQUFLO1lBQ2QsS0FBSyxFQUFFLDBCQUEwQjtTQUNwQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRTtRQUFFLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDeEUsT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUUsMEJBQTBCO1NBQ3BDLENBQUMsQ0FBQztJQUVILE1BQU0sTUFBTSxHQUFHLE1BQU0scUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUU5RSxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDckMsT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUUsNENBQTRDO1NBQ3RELENBQUMsQ0FBQztJQUVILElBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLEdBQUc7UUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2xHLE9BQU8sRUFBRSxLQUFLO1lBQ2QsS0FBSyxFQUFFLDhDQUE4QztTQUN4RCxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNoQixJQUFJLEVBQUUsQ0FBQztBQUNYLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRGdW5jdGlvbiwgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IERvbWFpbk1vZGVsIGZyb20gJy4uL21vZGVscy9Eb21haW5Nb2RlbCc7XHJcbmltcG9ydCBVc2VyTW9kZWwgZnJvbSAnLi4vbW9kZWxzL1VzZXJNb2RlbCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IGtleSA9IHJlcS5oZWFkZXJzLmtleSBhcyBzdHJpbmc7XHJcblxyXG4gICAgaWYgKCFrZXkpIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgZXJyb3I6ICdwcm92aWRlIGEga2V5JyxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7IGtleSB9KTtcclxuXHJcbiAgICBpZiAoIXVzZXIpIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgZXJyb3I6ICdpbnZhbGlkIGtleScsXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodXNlci5ibGFja2xpc3RlZC5zdGF0dXMpIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgZXJyb3I6IGB5b3UgYXJlIGJsYWNrbGlzdGVkIGZvcjogJHt1c2VyLmJsYWNrbGlzdGVkLnJlYXNvbn1gLFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCF1c2VyLmVtYWlsVmVyaWZpZWQpIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgZXJyb3I6ICdwbGVhc2UgdmVyaWZ5IHlvdXIgZW1haWwnLFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCF1c2VyLmRpc2NvcmQuaWQgfHwgdXNlci5kaXNjb3JkLmlkID09PSAnJykgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHtcclxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICBlcnJvcjogJ3BsZWFzZSBsaW5rIHlvdXIgZGlzY29yZCcsXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBkb21haW4gPSBhd2FpdCBEb21haW5Nb2RlbC5maW5kT25lKHsgbmFtZTogdXNlci5zZXR0aW5ncy5kb21haW4ubmFtZSB9KTtcclxuXHJcbiAgICBpZiAoIWRvbWFpbikgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcclxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICBlcm9ycjogJ2ludmFsaWQgZG9tYWluLCBjaGFuZ2UgaXQgb24gdGhlIGRhc2hib2FyZCcsXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZG9tYWluLnVzZXJPbmx5ICYmIGRvbWFpbi5kb25hdGVkQnkgJiYgZG9tYWluLmRvbmF0ZWRCeSAhPT0gdXNlci5faWQpIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgZXJyb3I6ICd5b3UgYXJlIG5vdCBhbGxvd2VkIHRvIHVwbG9hZCB0byB0aGlzIGRvbWFpbicsXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXEudXNlciA9IHVzZXI7XHJcbiAgICBuZXh0KCk7XHJcbn07XHJcbiJdfQ==