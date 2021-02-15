"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
exports.default = joi_1.object({
    testimonial: joi_1.string()
        .min(3)
        .max(60)
        .required(),
}).options({ abortEarly: false });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdGltb25pYWxTY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NoZW1hcy9UZXN0aW1vbmlhbFNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUFxQztBQUVyQyxrQkFBZSxZQUFNLENBQUM7SUFDbEIsV0FBVyxFQUFFLFlBQU0sRUFBRTtTQUNoQixHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ04sR0FBRyxDQUFDLEVBQUUsQ0FBQztTQUNQLFFBQVEsRUFBRTtDQUNsQixDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBvYmplY3QsIHN0cmluZyB9IGZyb20gJ2pvaSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmplY3Qoe1xyXG4gICAgdGVzdGltb25pYWw6IHN0cmluZygpXHJcbiAgICAgICAgLm1pbigzKVxyXG4gICAgICAgIC5tYXgoNjApXHJcbiAgICAgICAgLnJlcXVpcmVkKCksXHJcbn0pLm9wdGlvbnMoeyBhYm9ydEVhcmx5OiBmYWxzZSB9KTtcclxuIl19