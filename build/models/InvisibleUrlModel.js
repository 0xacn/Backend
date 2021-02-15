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
exports.InvisibleUrl = void 0;
const typegoose_1 = require("@typegoose/typegoose");
let InvisibleUrl = class InvisibleUrl {
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], InvisibleUrl.prototype, "_id", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], InvisibleUrl.prototype, "filename", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], InvisibleUrl.prototype, "uploader", void 0);
InvisibleUrl = __decorate([
    typegoose_1.modelOptions({ options: { allowMixed: 0 } })
], InvisibleUrl);
exports.InvisibleUrl = InvisibleUrl;
exports.default = typegoose_1.getModelForClass(InvisibleUrl);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52aXNpYmxlVXJsTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL0ludmlzaWJsZVVybE1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0RTtBQUc1RSxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0NBa0J4QixDQUFBO0FBYkc7SUFEQyxnQkFBSSxFQUFFOzt5Q0FDSztBQU1aO0lBREMsZ0JBQUksRUFBRTs7OENBQ1U7QUFNakI7SUFEQyxnQkFBSSxFQUFFOzs4Q0FDVTtBQWpCUixZQUFZO0lBRHhCLHdCQUFZLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztHQUNoQyxZQUFZLENBa0J4QjtBQWxCWSxvQ0FBWTtBQW9CekIsa0JBQWUsNEJBQWdCLENBQUMsWUFBWSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9wLCBnZXRNb2RlbEZvckNsYXNzLCBtb2RlbE9wdGlvbnMgfSBmcm9tICdAdHlwZWdvb3NlL3R5cGVnb29zZSc7XHJcblxyXG5AbW9kZWxPcHRpb25zKHsgb3B0aW9uczogeyBhbGxvd01peGVkOiAwIH0gfSlcclxuZXhwb3J0IGNsYXNzIEludmlzaWJsZVVybCB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBpbnZpc2libGUgdXJsIGlkLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBfaWQ6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBvcmlnaW5hbCBmaWxlIG5hbWUuXHJcbiAgICAgKi9cclxuICAgIEBwcm9wKClcclxuICAgIGZpbGVuYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdXVpZCBvZiB0aGUgdXNlciB3aG8gdXBsb2FkZWQgdGhlIGZpbGUuXHJcbiAgICAgKi9cclxuICAgIEBwcm9wKClcclxuICAgIHVwbG9hZGVyOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdldE1vZGVsRm9yQ2xhc3MoSW52aXNpYmxlVXJsKTtcclxuIl19