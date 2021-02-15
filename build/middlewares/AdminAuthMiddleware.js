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
    if (!key && !user || key !== process.env.API_KEY && !user)
        return res.status(401).json({
            success: false,
            error: 'unauthorized',
        });
    next();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRtaW5BdXRoTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlcy9BZG1pbkF1dGhNaWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esb0VBQTRDO0FBRTVDLGtCQUFlLEtBQUssRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUNyRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBQ25CLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBdUIsQ0FBQztJQUVoRCxJQUFJLElBQUk7UUFBRSxJQUFJLEdBQUcsTUFBTSxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFcEQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLEtBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJO1FBQ3JELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDeEIsT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUUsY0FBYztTQUN4QixDQUFDLENBQUM7SUFFUCxJQUFJLEVBQUUsQ0FBQztBQUNYLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRGdW5jdGlvbiwgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IFVzZXJNb2RlbCBmcm9tICcuLi9tb2RlbHMvVXNlck1vZGVsJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xyXG4gICAgbGV0IHsgdXNlciB9ID0gcmVxO1xyXG4gICAgY29uc3Qga2V5ID0gcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbiBhcyBzdHJpbmc7XHJcblxyXG4gICAgaWYgKHVzZXIpIHVzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZEJ5SWQodXNlci5faWQpO1xyXG5cclxuICAgIGlmICgha2V5ICYmICF1c2VyIHx8IGtleSAhPT0gcHJvY2Vzcy5lbnYuQVBJX0tFWSAmJiAhdXNlcilcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICAgICAgZXJyb3I6ICd1bmF1dGhvcml6ZWQnLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIG5leHQoKTtcclxufTtcclxuIl19