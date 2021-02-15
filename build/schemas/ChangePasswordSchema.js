"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
exports.default = joi_1.object({
    newPassword: joi_1.string()
        .min(5)
        .max(60)
        .required(),
    password: joi_1.string()
        .required(),
}).options({ abortEarly: false });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbmdlUGFzc3dvcmRTY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NoZW1hcy9DaGFuZ2VQYXNzd29yZFNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUFxQztBQUVyQyxrQkFBZSxZQUFNLENBQUM7SUFDbEIsV0FBVyxFQUFFLFlBQU0sRUFBRTtTQUNoQixHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ04sR0FBRyxDQUFDLEVBQUUsQ0FBQztTQUNQLFFBQVEsRUFBRTtJQUVmLFFBQVEsRUFBRSxZQUFNLEVBQUU7U0FDYixRQUFRLEVBQUU7Q0FDbEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb2JqZWN0LCBzdHJpbmcgfSBmcm9tICdqb2knO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0KHtcclxuICAgIG5ld1Bhc3N3b3JkOiBzdHJpbmcoKVxyXG4gICAgICAgIC5taW4oNSlcclxuICAgICAgICAubWF4KDYwKVxyXG4gICAgICAgIC5yZXF1aXJlZCgpLFxyXG5cclxuICAgIHBhc3N3b3JkOiBzdHJpbmcoKVxyXG4gICAgICAgIC5yZXF1aXJlZCgpLFxyXG59KS5vcHRpb25zKHsgYWJvcnRFYXJseTogZmFsc2UgfSk7XHJcbiJdfQ==