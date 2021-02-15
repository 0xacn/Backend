"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../models/UserModel"));
exports.default = async (req, res, next) => {
    let { user } = req;
    const key = req.headers.authorization;
    if (user)
        user = await UserModel_1.default.findById(user._id);
    if (!key && !user || key !== process.env.API_KEY)
        return res.status(401).json({
            success: false,
            error: 'unauthorized',
        });
    next();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRtaW5NaWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmVzL0FkbWluTWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLG9FQUE0QztBQUU1QyxrQkFBZSxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDckUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUNuQixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQXVCLENBQUM7SUFFaEQsSUFBSSxJQUFJO1FBQUUsSUFBSSxHQUFHLE1BQU0sbUJBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXBELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksR0FBRyxLQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTztRQUM1QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3hCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsS0FBSyxFQUFFLGNBQWM7U0FDeEIsQ0FBQyxDQUFDO0lBRVAsSUFBSSxFQUFFLENBQUM7QUFDWCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0RnVuY3Rpb24sIFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCBVc2VyTW9kZWwgZnJvbSAnLi4vbW9kZWxzL1VzZXJNb2RlbCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcclxuICAgIGxldCB7IHVzZXIgfSA9IHJlcTtcclxuICAgIGNvbnN0IGtleSA9IHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24gYXMgc3RyaW5nO1xyXG5cclxuICAgIGlmICh1c2VyKSB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkKHVzZXIuX2lkKTtcclxuXHJcbiAgICBpZiAoIWtleSAmJiAhdXNlciB8fCBrZXkgIT09IHByb2Nlc3MuZW52LkFQSV9LRVkpXHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yOiAndW5hdXRob3JpemVkJyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBuZXh0KCk7XHJcbn07XHJcbiJdfQ==