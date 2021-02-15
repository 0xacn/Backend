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
        .min(5)
        .max(60)
        .required(),
}).options({ abortEarly: false });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9naW5TY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NoZW1hcy9Mb2dpblNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUFxQztBQUVyQyxrQkFBZSxZQUFNLENBQUM7SUFDbEIsUUFBUSxFQUFFLFlBQU0sRUFBRTtTQUNiLFFBQVEsRUFBRTtTQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDTixHQUFHLENBQUMsRUFBRSxDQUFDO1NBQ1AsUUFBUSxFQUFFO0lBRWYsUUFBUSxFQUFFLFlBQU0sRUFBRTtTQUNiLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDTixHQUFHLENBQUMsRUFBRSxDQUFDO1NBQ1AsUUFBUSxFQUFFO0NBQ2xCLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG9iamVjdCwgc3RyaW5nIH0gZnJvbSAnam9pJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9iamVjdCh7XHJcbiAgICB1c2VybmFtZTogc3RyaW5nKClcclxuICAgICAgICAuYWxwaGFudW0oKVxyXG4gICAgICAgIC5taW4oMylcclxuICAgICAgICAubWF4KDMwKVxyXG4gICAgICAgIC5yZXF1aXJlZCgpLFxyXG5cclxuICAgIHBhc3N3b3JkOiBzdHJpbmcoKVxyXG4gICAgICAgIC5taW4oNSlcclxuICAgICAgICAubWF4KDYwKVxyXG4gICAgICAgIC5yZXF1aXJlZCgpLFxyXG59KS5vcHRpb25zKHsgYWJvcnRFYXJseTogZmFsc2UgfSk7XHJcbiJdfQ==