"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
exports.default = joi_1.object({
    id: joi_1.string()
        .required(),
    amount: joi_1.number()
        .required(),
}).options({ abortEarly: false });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52aXRlQWRkU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjaGVtYXMvSW52aXRlQWRkU2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZDO0FBRTdDLGtCQUFlLFlBQU0sQ0FBQztJQUNsQixFQUFFLEVBQUUsWUFBTSxFQUFFO1NBQ1AsUUFBUSxFQUFFO0lBRWYsTUFBTSxFQUFFLFlBQU0sRUFBRTtTQUNYLFFBQVEsRUFBRTtDQUNsQixDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBvYmplY3QsIHN0cmluZywgbnVtYmVyIH0gZnJvbSAnam9pJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9iamVjdCh7XHJcbiAgICBpZDogc3RyaW5nKClcclxuICAgICAgICAucmVxdWlyZWQoKSxcclxuXHJcbiAgICBhbW91bnQ6IG51bWJlcigpXHJcbiAgICAgICAgLnJlcXVpcmVkKCksXHJcbn0pLm9wdGlvbnMoeyBhYm9ydEVhcmx5OiBmYWxzZSB9KTtcclxuIl19