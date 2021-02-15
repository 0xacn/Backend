"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
exports.default = joi_1.object({
    color: joi_1.string()
        .optional(),
    title: joi_1.string()
        .optional()
        .allow('')
        .max(200),
    description: joi_1.string()
        .optional()
        .allow('')
        .max(2000),
    author: joi_1.string()
        .optional()
        .allow('')
        .max(200),
    randomColor: joi_1.boolean()
        .optional(),
}).options({ abortEarly: false });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1iZWRTY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NoZW1hcy9FbWJlZFNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE4QztBQUU5QyxrQkFBZSxZQUFNLENBQUM7SUFDbEIsS0FBSyxFQUFFLFlBQU0sRUFBRTtTQUNWLFFBQVEsRUFBRTtJQUVmLEtBQUssRUFBRSxZQUFNLEVBQUU7U0FDVixRQUFRLEVBQUU7U0FDVixLQUFLLENBQUMsRUFBRSxDQUFDO1NBQ1QsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUViLFdBQVcsRUFBRSxZQUFNLEVBQUU7U0FDaEIsUUFBUSxFQUFFO1NBQ1YsS0FBSyxDQUFDLEVBQUUsQ0FBQztTQUNULEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFFZCxNQUFNLEVBQUUsWUFBTSxFQUFFO1NBQ1gsUUFBUSxFQUFFO1NBQ1YsS0FBSyxDQUFDLEVBQUUsQ0FBQztTQUNULEdBQUcsQ0FBQyxHQUFHLENBQUM7SUFFYixXQUFXLEVBQUUsYUFBTyxFQUFFO1NBQ2pCLFFBQVEsRUFBRTtDQUNsQixDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBib29sZWFuLCBvYmplY3QsIHN0cmluZyB9IGZyb20gJ2pvaSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmplY3Qoe1xyXG4gICAgY29sb3I6IHN0cmluZygpXHJcbiAgICAgICAgLm9wdGlvbmFsKCksXHJcblxyXG4gICAgdGl0bGU6IHN0cmluZygpXHJcbiAgICAgICAgLm9wdGlvbmFsKClcclxuICAgICAgICAuYWxsb3coJycpXHJcbiAgICAgICAgLm1heCgyMDApLFxyXG5cclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcoKVxyXG4gICAgICAgIC5vcHRpb25hbCgpXHJcbiAgICAgICAgLmFsbG93KCcnKVxyXG4gICAgICAgIC5tYXgoMjAwMCksXHJcblxyXG4gICAgYXV0aG9yOiBzdHJpbmcoKVxyXG4gICAgICAgIC5vcHRpb25hbCgpXHJcbiAgICAgICAgLmFsbG93KCcnKVxyXG4gICAgICAgIC5tYXgoMjAwKSxcclxuXHJcbiAgICByYW5kb21Db2xvcjogYm9vbGVhbigpXHJcbiAgICAgICAgLm9wdGlvbmFsKCksXHJcbn0pLm9wdGlvbnMoeyBhYm9ydEVhcmx5OiBmYWxzZSB9KTtcclxuIl19