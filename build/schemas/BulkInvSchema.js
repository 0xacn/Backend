"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
exports.default = joi_1.object({
    executerId: joi_1.string()
        .required(),
    count: joi_1.number()
        .required()
}).options({ abortEarly: false });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnVsa0ludlNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWFzL0J1bGtJbnZTY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNEM7QUFFNUMsa0JBQWUsWUFBTSxDQUFDO0lBQ2xCLFVBQVUsRUFBRSxZQUFNLEVBQUU7U0FDbkIsUUFBUSxFQUFFO0lBQ2IsS0FBSyxFQUFFLFlBQU0sRUFBRTtTQUNaLFFBQVEsRUFBRTtDQUNkLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG9iamVjdCwgc3RyaW5nLCBudW1iZXJ9IGZyb20gJ2pvaSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmplY3Qoe1xyXG4gICAgZXhlY3V0ZXJJZDogc3RyaW5nKClcclxuICAgIC5yZXF1aXJlZCgpLFxyXG4gIGNvdW50OiBudW1iZXIoKVxyXG4gICAgLnJlcXVpcmVkKClcclxufSkub3B0aW9ucyh7IGFib3J0RWFybHk6IGZhbHNlIH0pO1xyXG4iXX0=