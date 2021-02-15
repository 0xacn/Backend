"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
exports.default = joi_1.object({
    id: joi_1.string()
        .required(),
    reason: joi_1.string()
        .required(),
    executerId: joi_1.string()
        .required(),
}).options({ abortEarly: false });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxhY2tsaXN0U2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjaGVtYXMvQmxhY2tsaXN0U2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQXFDO0FBRXJDLGtCQUFlLFlBQU0sQ0FBQztJQUNsQixFQUFFLEVBQUUsWUFBTSxFQUFFO1NBQ1AsUUFBUSxFQUFFO0lBRWYsTUFBTSxFQUFFLFlBQU0sRUFBRTtTQUNYLFFBQVEsRUFBRTtJQUVmLFVBQVUsRUFBRSxZQUFNLEVBQUU7U0FDZixRQUFRLEVBQUU7Q0FDbEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb2JqZWN0LCBzdHJpbmcgfSBmcm9tICdqb2knO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0KHtcclxuICAgIGlkOiBzdHJpbmcoKVxyXG4gICAgICAgIC5yZXF1aXJlZCgpLFxyXG5cclxuICAgIHJlYXNvbjogc3RyaW5nKClcclxuICAgICAgICAucmVxdWlyZWQoKSxcclxuXHJcbiAgICBleGVjdXRlcklkOiBzdHJpbmcoKVxyXG4gICAgICAgIC5yZXF1aXJlZCgpLFxyXG59KS5vcHRpb25zKHsgYWJvcnRFYXJseTogZmFsc2UgfSk7XHJcbiJdfQ==