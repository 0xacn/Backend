"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
exports.default = joi_1.object({
    email: joi_1.string()
        .email()
        .required(),
    username: joi_1.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: joi_1.string()
        .min(5)
        .max(60)
        .required(),
    invite: joi_1.string()
        .required(),
}).options({ abortEarly: false });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVnaXN0ZXJTY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NoZW1hcy9SZWdpc3RlclNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUFxQztBQUVyQyxrQkFBZSxZQUFNLENBQUM7SUFDbEIsS0FBSyxFQUFFLFlBQU0sRUFBRTtTQUNWLEtBQUssRUFBRTtTQUNQLFFBQVEsRUFBRTtJQUVmLFFBQVEsRUFBRSxZQUFNLEVBQUU7U0FDYixRQUFRLEVBQUU7U0FDVixHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ04sR0FBRyxDQUFDLEVBQUUsQ0FBQztTQUNQLFFBQVEsRUFBRTtJQUVmLFFBQVEsRUFBRSxZQUFNLEVBQUU7U0FDYixHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ04sR0FBRyxDQUFDLEVBQUUsQ0FBQztTQUNQLFFBQVEsRUFBRTtJQUVmLE1BQU0sRUFBRSxZQUFNLEVBQUU7U0FDWCxRQUFRLEVBQUU7Q0FDbEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb2JqZWN0LCBzdHJpbmcgfSBmcm9tICdqb2knO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0KHtcclxuICAgIGVtYWlsOiBzdHJpbmcoKVxyXG4gICAgICAgIC5lbWFpbCgpXHJcbiAgICAgICAgLnJlcXVpcmVkKCksXHJcblxyXG4gICAgdXNlcm5hbWU6IHN0cmluZygpXHJcbiAgICAgICAgLmFscGhhbnVtKClcclxuICAgICAgICAubWluKDMpXHJcbiAgICAgICAgLm1heCgzMClcclxuICAgICAgICAucmVxdWlyZWQoKSxcclxuXHJcbiAgICBwYXNzd29yZDogc3RyaW5nKClcclxuICAgICAgICAubWluKDUpXHJcbiAgICAgICAgLm1heCg2MClcclxuICAgICAgICAucmVxdWlyZWQoKSxcclxuXHJcbiAgICBpbnZpdGU6IHN0cmluZygpXHJcbiAgICAgICAgLnJlcXVpcmVkKCksXHJcbn0pLm9wdGlvbnMoeyBhYm9ydEVhcmx5OiBmYWxzZSB9KTtcclxuIl19