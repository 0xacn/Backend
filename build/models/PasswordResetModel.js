"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordReset = void 0;
const typegoose_1 = require("@typegoose/typegoose");
let PasswordReset = class PasswordReset {
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], PasswordReset.prototype, "_id", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], PasswordReset.prototype, "user", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], PasswordReset.prototype, "email", void 0);
PasswordReset = __decorate([
    typegoose_1.modelOptions({ options: { allowMixed: 0 } })
], PasswordReset);
exports.PasswordReset = PasswordReset;
exports.default = typegoose_1.getModelForClass(PasswordReset);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFzc3dvcmRSZXNldE1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9QYXNzd29yZFJlc2V0TW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQTRFO0FBRzVFLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7Q0FrQnpCLENBQUE7QUFiRztJQURDLGdCQUFJLEVBQUU7OzBDQUNLO0FBTVo7SUFEQyxnQkFBSSxFQUFFOzsyQ0FDTTtBQU1iO0lBREMsZ0JBQUksRUFBRTs7NENBQ087QUFqQkwsYUFBYTtJQUR6Qix3QkFBWSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7R0FDaEMsYUFBYSxDQWtCekI7QUFsQlksc0NBQWE7QUFvQjFCLGtCQUFlLDRCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvcCwgZ2V0TW9kZWxGb3JDbGFzcywgbW9kZWxPcHRpb25zIH0gZnJvbSAnQHR5cGVnb29zZS90eXBlZ29vc2UnO1xyXG5cclxuQG1vZGVsT3B0aW9ucyh7IG9wdGlvbnM6IHsgYWxsb3dNaXhlZDogMCB9IH0pXHJcbmV4cG9ydCBjbGFzcyBQYXNzd29yZFJlc2V0IHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIHJlc2V0IGNvZGUuXHJcbiAgICAgKi9cclxuICAgIEBwcm9wKClcclxuICAgIF9pZDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHVzZXIncyB1dWlkLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICB1c2VyOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdXNlcidzIGVtYWlsLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBlbWFpbDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZXRNb2RlbEZvckNsYXNzKFBhc3N3b3JkUmVzZXQpO1xyXG4iXX0=