"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
exports.default = joi_1.object({
    username: joi_1.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: joi_1.string()
        .required(),
}).options({ abortEarly: false });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbmdlVXNlcm5hbWVTY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NoZW1hcy9DaGFuZ2VVc2VybmFtZVNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUFxQztBQUVyQyxrQkFBZSxZQUFNLENBQUM7SUFDbEIsUUFBUSxFQUFFLFlBQU0sRUFBRTtTQUNiLFFBQVEsRUFBRTtTQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDTixHQUFHLENBQUMsRUFBRSxDQUFDO1NBQ1AsUUFBUSxFQUFFO0lBRWYsUUFBUSxFQUFFLFlBQU0sRUFBRTtTQUNiLFFBQVEsRUFBRTtDQUNsQixDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBvYmplY3QsIHN0cmluZyB9IGZyb20gJ2pvaSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmplY3Qoe1xyXG4gICAgdXNlcm5hbWU6IHN0cmluZygpXHJcbiAgICAgICAgLmFscGhhbnVtKClcclxuICAgICAgICAubWluKDMpXHJcbiAgICAgICAgLm1heCgzMClcclxuICAgICAgICAucmVxdWlyZWQoKSxcclxuXHJcbiAgICBwYXNzd29yZDogc3RyaW5nKClcclxuICAgICAgICAucmVxdWlyZWQoKSxcclxufSkub3B0aW9ucyh7IGFib3J0RWFybHk6IGZhbHNlIH0pO1xyXG4iXX0=