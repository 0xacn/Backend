"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
exports.default = joi_1.object({
    key: joi_1.string()
        .required(),
    password: joi_1.string()
        .min(5)
        .max(60)
        .required(),
    confirmPassword: joi_1.string()
        .min(5)
        .max(60)
        .required(),
}).options({ abortEarly: false });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFzc3dvcmRSZXNldFNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWFzL1Bhc3N3b3JkUmVzZXRTY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBcUM7QUFFckMsa0JBQWUsWUFBTSxDQUFDO0lBQ2xCLEdBQUcsRUFBRSxZQUFNLEVBQUU7U0FDUixRQUFRLEVBQUU7SUFFZixRQUFRLEVBQUUsWUFBTSxFQUFFO1NBQ2IsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNOLEdBQUcsQ0FBQyxFQUFFLENBQUM7U0FDUCxRQUFRLEVBQUU7SUFFZixlQUFlLEVBQUUsWUFBTSxFQUFFO1NBQ3BCLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDTixHQUFHLENBQUMsRUFBRSxDQUFDO1NBQ1AsUUFBUSxFQUFFO0NBQ2xCLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG9iamVjdCwgc3RyaW5nIH0gZnJvbSAnam9pJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9iamVjdCh7XHJcbiAgICBrZXk6IHN0cmluZygpXHJcbiAgICAgICAgLnJlcXVpcmVkKCksXHJcblxyXG4gICAgcGFzc3dvcmQ6IHN0cmluZygpXHJcbiAgICAgICAgLm1pbig1KVxyXG4gICAgICAgIC5tYXgoNjApXHJcbiAgICAgICAgLnJlcXVpcmVkKCksXHJcblxyXG4gICAgY29uZmlybVBhc3N3b3JkOiBzdHJpbmcoKVxyXG4gICAgICAgIC5taW4oNSlcclxuICAgICAgICAubWF4KDYwKVxyXG4gICAgICAgIC5yZXF1aXJlZCgpLFxyXG59KS5vcHRpb25zKHsgYWJvcnRFYXJseTogZmFsc2UgfSk7XHJcbiJdfQ==