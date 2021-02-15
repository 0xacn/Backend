"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
exports.default = joi_1.object({
    domain: joi_1.any()
        .required(),
    subdomain: joi_1.string()
        .allow('')
        .optional(),
}).options({ abortEarly: false });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXBkYXRlRG9tYWluU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjaGVtYXMvVXBkYXRlRG9tYWluU2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTBDO0FBRTFDLGtCQUFlLFlBQU0sQ0FBQztJQUNsQixNQUFNLEVBQUUsU0FBRyxFQUFFO1NBQ1IsUUFBUSxFQUFFO0lBRWYsU0FBUyxFQUFFLFlBQU0sRUFBRTtTQUNkLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDVCxRQUFRLEVBQUU7Q0FDbEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW55LCBvYmplY3QsIHN0cmluZyB9IGZyb20gJ2pvaSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmplY3Qoe1xyXG4gICAgZG9tYWluOiBhbnkoKVxyXG4gICAgICAgIC5yZXF1aXJlZCgpLFxyXG5cclxuICAgIHN1YmRvbWFpbjogc3RyaW5nKClcclxuICAgICAgICAuYWxsb3coJycpXHJcbiAgICAgICAgLm9wdGlvbmFsKCksXHJcbn0pLm9wdGlvbnMoeyBhYm9ydEVhcmx5OiBmYWxzZSB9KTtcclxuIl19