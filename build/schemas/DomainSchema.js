"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
exports.default = joi_1.array().items(joi_1.object({
    name: joi_1.string()
        .required(),
    wildcard: joi_1.boolean()
        .required(),
    donated: joi_1.boolean(),
    donatedBy: joi_1.string(),
    userOnly: joi_1.boolean(),
}).options({ abortEarly: false }));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tYWluU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjaGVtYXMvRG9tYWluU2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQXFEO0FBRXJELGtCQUFlLFdBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFNLENBQUM7SUFDaEMsSUFBSSxFQUFFLFlBQU0sRUFBRTtTQUNULFFBQVEsRUFBRTtJQUVmLFFBQVEsRUFBRSxhQUFPLEVBQUU7U0FDZCxRQUFRLEVBQUU7SUFFZixPQUFPLEVBQUUsYUFBTyxFQUFFO0lBRWxCLFNBQVMsRUFBRSxZQUFNLEVBQUU7SUFFbkIsUUFBUSxFQUFFLGFBQU8sRUFBRTtDQUN0QixDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFycmF5LCBib29sZWFuLCBvYmplY3QsIHN0cmluZyB9IGZyb20gJ2pvaSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhcnJheSgpLml0ZW1zKG9iamVjdCh7XHJcbiAgICBuYW1lOiBzdHJpbmcoKVxyXG4gICAgICAgIC5yZXF1aXJlZCgpLFxyXG5cclxuICAgIHdpbGRjYXJkOiBib29sZWFuKClcclxuICAgICAgICAucmVxdWlyZWQoKSxcclxuXHJcbiAgICBkb25hdGVkOiBib29sZWFuKCksXHJcblxyXG4gICAgZG9uYXRlZEJ5OiBzdHJpbmcoKSxcclxuXHJcbiAgICB1c2VyT25seTogYm9vbGVhbigpLFxyXG59KS5vcHRpb25zKHsgYWJvcnRFYXJseTogZmFsc2UgfSkpOyJdfQ==