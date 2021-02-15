"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
exports.default = joi_1.object({
    name: joi_1.string()
        .required(),
    wildcard: joi_1.boolean()
        .required(),
    userOnly: joi_1.boolean()
        .required(),
}).options({ abortEarly: false });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VzdG9tRG9tYWluU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjaGVtYXMvQ3VzdG9tRG9tYWluU2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQThDO0FBRTlDLGtCQUFlLFlBQU0sQ0FBQztJQUNsQixJQUFJLEVBQUUsWUFBTSxFQUFFO1NBQ1QsUUFBUSxFQUFFO0lBRWYsUUFBUSxFQUFFLGFBQU8sRUFBRTtTQUNkLFFBQVEsRUFBRTtJQUVmLFFBQVEsRUFBRSxhQUFPLEVBQUU7U0FDZCxRQUFRLEVBQUU7Q0FDbEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYm9vbGVhbiwgb2JqZWN0LCBzdHJpbmcgfSBmcm9tICdqb2knO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0KHtcclxuICAgIG5hbWU6IHN0cmluZygpXHJcbiAgICAgICAgLnJlcXVpcmVkKCksXHJcblxyXG4gICAgd2lsZGNhcmQ6IGJvb2xlYW4oKVxyXG4gICAgICAgIC5yZXF1aXJlZCgpLFxyXG5cclxuICAgIHVzZXJPbmx5OiBib29sZWFuKClcclxuICAgICAgICAucmVxdWlyZWQoKSxcclxufSkub3B0aW9ucyh7IGFib3J0RWFybHk6IGZhbHNlIH0pO1xyXG4iXX0=