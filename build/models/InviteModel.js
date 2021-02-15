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
exports.Invite = void 0;
const typegoose_1 = require("@typegoose/typegoose");
let Invite = class Invite {
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Invite.prototype, "_id", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Object)
], Invite.prototype, "createdBy", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], Invite.prototype, "dateCreated", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], Invite.prototype, "dateRedeemed", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Invite.prototype, "usedBy", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], Invite.prototype, "redeemed", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], Invite.prototype, "useable", void 0);
Invite = __decorate([
    typegoose_1.modelOptions({ options: { allowMixed: 0 } })
], Invite);
exports.Invite = Invite;
exports.default = typegoose_1.getModelForClass(Invite);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52aXRlTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL0ludml0ZU1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0RTtBQUc1RSxJQUFhLE1BQU0sR0FBbkIsTUFBYSxNQUFNO0NBNkNsQixDQUFBO0FBeENHO0lBREMsZ0JBQUksRUFBRTs7bUNBQ0s7QUFNWjtJQURDLGdCQUFJLEVBQUU7O3lDQUlMO0FBTUY7SUFEQyxnQkFBSSxFQUFFOzhCQUNNLElBQUk7MkNBQUM7QUFNbEI7SUFEQyxnQkFBSSxFQUFFOzhCQUNPLElBQUk7NENBQUM7QUFNbkI7SUFEQyxnQkFBSSxFQUFFOztzQ0FDUTtBQU1mO0lBREMsZ0JBQUksRUFBRTs7d0NBQ1c7QUFNbEI7SUFEQyxnQkFBSSxFQUFFOzt1Q0FDVTtBQTVDUixNQUFNO0lBRGxCLHdCQUFZLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztHQUNoQyxNQUFNLENBNkNsQjtBQTdDWSx3QkFBTTtBQStDbkIsa0JBQWUsNEJBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9wLCBnZXRNb2RlbEZvckNsYXNzLCBtb2RlbE9wdGlvbnMgfSBmcm9tICdAdHlwZWdvb3NlL3R5cGVnb29zZSc7XHJcblxyXG5AbW9kZWxPcHRpb25zKHsgb3B0aW9uczogeyBhbGxvd01peGVkOiAwIH0gfSlcclxuZXhwb3J0IGNsYXNzIEludml0ZSB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBpbnZpdGUgY29kZS5cclxuICAgICAqL1xyXG4gICAgQHByb3AoKVxyXG4gICAgX2lkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdXNlciB3aG8gY3JlYXRlZCB0aGUgaW52aXRlLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBjcmVhdGVkQnk6IHtcclxuICAgICAgICB1c2VybmFtZTogc3RyaW5nO1xyXG4gICAgICAgIHV1aWQ6IHN0cmluZztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGF0ZSB0aGUgaW52aXRlIHdhcyBjcmVhdGVkLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBkYXRlQ3JlYXRlZDogRGF0ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkYXRlIGl0IHdhcyByZWRlZW1lZCBvbi5cclxuICAgICAqL1xyXG4gICAgQHByb3AoKVxyXG4gICAgZGF0ZVJlZGVlbWVkOiBEYXRlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHVzZXIgd2hvIGNsYWltZWQgdGhlIGludml0ZS5cclxuICAgICAqL1xyXG4gICAgQHByb3AoKVxyXG4gICAgdXNlZEJ5OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgaW52aXRlIGhhcyBiZWVuIHJlZGVlbWVkLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICByZWRlZW1lZDogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgb3Igbm90IHRoZSBpbnZpdGUgaXMgdXNlYWJsZS5cclxuICAgICAqL1xyXG4gICAgQHByb3AoKVxyXG4gICAgdXNlYWJsZTogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2V0TW9kZWxGb3JDbGFzcyhJbnZpdGUpO1xyXG4iXX0=