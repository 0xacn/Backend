"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
exports.default = joi_1.object({
    longUrl: joi_1.boolean()
        .optional(),
    showLink: joi_1.boolean()
        .optional(),
    invisibleUrl: joi_1.boolean()
        .optional(),
    randomDomain: joi_1.boolean()
        .optional(),
    embeds: joi_1.boolean()
        .optional(),
    autoWipe: joi_1.boolean()
        .optional(),
}).options({ abortEarly: false });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJlZmVyZW5jZXNTY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NoZW1hcy9QcmVmZXJlbmNlc1NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUFzQztBQUV0QyxrQkFBZSxZQUFNLENBQUM7SUFDbEIsT0FBTyxFQUFFLGFBQU8sRUFBRTtTQUNiLFFBQVEsRUFBRTtJQUVmLFFBQVEsRUFBRSxhQUFPLEVBQUU7U0FDZCxRQUFRLEVBQUU7SUFFZixZQUFZLEVBQUUsYUFBTyxFQUFFO1NBQ2xCLFFBQVEsRUFBRTtJQUVmLFlBQVksRUFBRSxhQUFPLEVBQUU7U0FDbEIsUUFBUSxFQUFFO0lBRWYsTUFBTSxFQUFFLGFBQU8sRUFBRTtTQUNaLFFBQVEsRUFBRTtJQUVmLFFBQVEsRUFBRSxhQUFPLEVBQUU7U0FDZCxRQUFRLEVBQUU7Q0FDbEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYm9vbGVhbiwgb2JqZWN0IH0gZnJvbSAnam9pJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9iamVjdCh7XHJcbiAgICBsb25nVXJsOiBib29sZWFuKClcclxuICAgICAgICAub3B0aW9uYWwoKSxcclxuXHJcbiAgICBzaG93TGluazogYm9vbGVhbigpXHJcbiAgICAgICAgLm9wdGlvbmFsKCksXHJcblxyXG4gICAgaW52aXNpYmxlVXJsOiBib29sZWFuKClcclxuICAgICAgICAub3B0aW9uYWwoKSxcclxuXHJcbiAgICByYW5kb21Eb21haW46IGJvb2xlYW4oKVxyXG4gICAgICAgIC5vcHRpb25hbCgpLFxyXG5cclxuICAgIGVtYmVkczogYm9vbGVhbigpXHJcbiAgICAgICAgLm9wdGlvbmFsKCksXHJcblxyXG4gICAgYXV0b1dpcGU6IGJvb2xlYW4oKVxyXG4gICAgICAgIC5vcHRpb25hbCgpLFxyXG59KS5vcHRpb25zKHsgYWJvcnRFYXJseTogZmFsc2UgfSk7XHJcbiJdfQ==