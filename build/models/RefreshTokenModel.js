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
exports.RefreshToken = void 0;
const typegoose_1 = require("@typegoose/typegoose");
let RefreshToken = class RefreshToken {
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], RefreshToken.prototype, "token", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], RefreshToken.prototype, "user", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], RefreshToken.prototype, "expires", void 0);
RefreshToken = __decorate([
    typegoose_1.modelOptions({ options: { allowMixed: 0 } })
], RefreshToken);
exports.RefreshToken = RefreshToken;
exports.default = typegoose_1.getModelForClass(RefreshToken);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVmcmVzaFRva2VuTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL1JlZnJlc2hUb2tlbk1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0RTtBQUc1RSxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0NBa0J4QixDQUFBO0FBYkc7SUFEQyxnQkFBSSxFQUFFOzsyQ0FDTztBQU1kO0lBREMsZ0JBQUksRUFBRTs7MENBQ007QUFNYjtJQURDLGdCQUFJLEVBQUU7OEJBQ0UsSUFBSTs2Q0FBQztBQWpCTCxZQUFZO0lBRHhCLHdCQUFZLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztHQUNoQyxZQUFZLENBa0J4QjtBQWxCWSxvQ0FBWTtBQW9CekIsa0JBQWUsNEJBQWdCLENBQUMsWUFBWSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9wLCBnZXRNb2RlbEZvckNsYXNzLCBtb2RlbE9wdGlvbnMgfSBmcm9tICdAdHlwZWdvb3NlL3R5cGVnb29zZSc7XHJcblxyXG5AbW9kZWxPcHRpb25zKHsgb3B0aW9uczogeyBhbGxvd01peGVkOiAwIH0gfSlcclxuZXhwb3J0IGNsYXNzIFJlZnJlc2hUb2tlbiB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSByZWZyZXNoIHRva2VuLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICB0b2tlbjogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHV1aWQgb2YgdGhlIHVzZXIgd2hvIG1hZGUgdGhlIHRva2VuLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICB1c2VyOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGF0ZSB0aGUgdG9rZW4gaXMgZ29pbmcgdG8gZXhwaXJlLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBleHBpcmVzOiBEYXRlO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZXRNb2RlbEZvckNsYXNzKFJlZnJlc2hUb2tlbik7XHJcbiJdfQ==