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
exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
class Notification {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Notification.prototype, "id", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
let User = class User {
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], User.prototype, "uid", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "invite", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "key", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], User.prototype, "premium", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], User.prototype, "lastDomainAddition", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], User.prototype, "lastKeyRegen", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], User.prototype, "lastUsernameChange", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], User.prototype, "lastFileArchive", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], User.prototype, "emailVerified", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "emailVerificationKey", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Object)
], User.prototype, "discord", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], User.prototype, "strikes", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Object)
], User.prototype, "blacklisted", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], User.prototype, "uploads", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], User.prototype, "invites", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "invitedBy", void 0);
__decorate([
    typegoose_1.prop({ type: () => [String] }),
    __metadata("design:type", Array)
], User.prototype, "invitedUsers", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], User.prototype, "registrationDate", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], User.prototype, "lastLogin", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "testimonial", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], User.prototype, "admin", void 0);
__decorate([
    typegoose_1.prop({ type: () => [Notification] }),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Object)
], User.prototype, "settings", void 0);
User = __decorate([
    typegoose_1.modelOptions({ options: { allowMixed: 0 } })
], User);
exports.User = User;
exports.default = typegoose_1.getModelForClass(User);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlck1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9Vc2VyTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQTRFO0FBRTVFLE1BQU0sWUFBWTtDQVlqQjtBQVBHO0lBREMsZ0JBQUksRUFBRTs7d0NBQ0k7QUFNWDtJQURDLGdCQUFJLEVBQUU7OzZDQUNTO0FBSXBCLElBQWEsSUFBSSxHQUFqQixNQUFhLElBQUk7Q0E2TGhCLENBQUE7QUF4TEc7SUFEQyxnQkFBSSxFQUFFOztpQ0FDSztBQU1aO0lBREMsZ0JBQUksRUFBRTs7aUNBQ0s7QUFNWjtJQURDLGdCQUFJLEVBQUU7O3NDQUNVO0FBTWpCO0lBREMsZ0JBQUksRUFBRTs7c0NBQ1U7QUFNakI7SUFEQyxnQkFBSSxFQUFFOztvQ0FDUTtBQU1mO0lBREMsZ0JBQUksRUFBRTs7aUNBQ0s7QUFNWjtJQURDLGdCQUFJLEVBQUU7O3FDQUNVO0FBTWpCO0lBREMsZ0JBQUksRUFBRTs4QkFDYSxJQUFJO2dEQUFDO0FBTXpCO0lBREMsZ0JBQUksRUFBRTs4QkFDTyxJQUFJOzBDQUFDO0FBTW5CO0lBREMsZ0JBQUksRUFBRTs4QkFDYSxJQUFJO2dEQUFDO0FBTXpCO0lBREMsZ0JBQUksRUFBRTs4QkFDVSxJQUFJOzZDQUFDO0FBTXRCO0lBREMsZ0JBQUksRUFBRTs7bUNBQ087QUFNZDtJQURDLGdCQUFJLEVBQUU7OzJDQUNnQjtBQU12QjtJQURDLGdCQUFJLEVBQUU7O2tEQUNzQjtBQU03QjtJQURDLGdCQUFJLEVBQUU7O3FDQUlMO0FBTUY7SUFEQyxnQkFBSSxFQUFFOztxQ0FDUztBQU1oQjtJQURDLGdCQUFJLEVBQUU7O3lDQUlMO0FBTUY7SUFEQyxnQkFBSSxFQUFFOztxQ0FDUztBQU1oQjtJQURDLGdCQUFJLEVBQUU7O3FDQUNTO0FBTWhCO0lBREMsZ0JBQUksRUFBRTs7dUNBQ1c7QUFNbEI7SUFEQyxnQkFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQzs7MENBQ1I7QUFNdkI7SUFEQyxnQkFBSSxFQUFFOzhCQUNXLElBQUk7OENBQUM7QUFNdkI7SUFEQyxnQkFBSSxFQUFFOzhCQUNJLElBQUk7dUNBQUM7QUFNaEI7SUFEQyxnQkFBSSxFQUFFOzt5Q0FDYTtBQU1wQjtJQURDLGdCQUFJLEVBQUU7O21DQUNRO0FBR2Y7SUFEQyxnQkFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQzs4QkFDdEIsS0FBSzsyQ0FBZTtBQU1uQztJQURDLGdCQUFJLEVBQUU7O3NDQXlCTDtBQTVMTyxJQUFJO0lBRGhCLHdCQUFZLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztHQUNoQyxJQUFJLENBNkxoQjtBQTdMWSxvQkFBSTtBQStMakIsa0JBQWUsNEJBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9wLCBnZXRNb2RlbEZvckNsYXNzLCBtb2RlbE9wdGlvbnMgfSBmcm9tICdAdHlwZWdvb3NlL3R5cGVnb29zZSc7XHJcblxyXG5jbGFzcyBOb3RpZmljYXRpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbm90aWZpY2F0aW9uIGlkLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBpZDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG5vdGlmaWNhdGlvbiBtZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbn1cclxuXHJcbkBtb2RlbE9wdGlvbnMoeyBvcHRpb25zOiB7IGFsbG93TWl4ZWQ6IDAgfSB9KVxyXG5leHBvcnQgY2xhc3MgVXNlciB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSB1c2VyJ3MgdXVpZC5cclxuICAgICAqL1xyXG4gICAgQHByb3AoKVxyXG4gICAgX2lkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdXNlcidzIHVpZC5cclxuICAgICAqL1xyXG4gICAgQHByb3AoKVxyXG4gICAgdWlkOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdXNlcidzIHVzZXJuYW1lLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICB1c2VybmFtZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHVzZXIncyBwYXNzd29yZC5cclxuICAgICAqL1xyXG4gICAgQHByb3AoKVxyXG4gICAgcGFzc3dvcmQ6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB1c2VyJ3MgaW52aXRlIGNvZGUuXHJcbiAgICAgKi9cclxuICAgIEBwcm9wKClcclxuICAgIGludml0ZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHVzZXIncyB1cGxvYWQga2V5LlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBrZXk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgb3Igbm90IHRoZSB1c2VyIGlzIHByZW1pdW0uXHJcbiAgICAgKi9cclxuICAgIEBwcm9wKClcclxuICAgIHByZW1pdW06IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbGFzdCB0aW1lIHRoZSB1c2VyIHJlcXVlc3RlZCB0byBhZGQgYSBjdXN0b20gZG9tYWluLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBsYXN0RG9tYWluQWRkaXRpb246IERhdGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbGFzdCB0aW1lIHRoZSBrZXkgd2FzIHJlZ2VuZWQuXHJcbiAgICAgKi9cclxuICAgIEBwcm9wKClcclxuICAgIGxhc3RLZXlSZWdlbjogRGF0ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsYXN0IHRpbWUgdGhlIHVzZXIncyB1c2VybmFtZSB3YXMgY2hhbmdlZC5cclxuICAgICAqL1xyXG4gICAgQHByb3AoKVxyXG4gICAgbGFzdFVzZXJuYW1lQ2hhbmdlOiBEYXRlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxhc3QgdGltZSB0aGUgdXNlciByZXF1ZXN0ZWQgYSBmaWxlIGFyY2hpdmUuXHJcbiAgICAgKi9cclxuICAgIEBwcm9wKClcclxuICAgIGxhc3RGaWxlQXJjaGl2ZTogRGF0ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB1c2VyJ3MgZW1haWwuXHJcbiAgICAgKi9cclxuICAgIEBwcm9wKClcclxuICAgIGVtYWlsOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgdXNlcidzIGVtYWlsIGlzIHZlcmlmaWVkLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBlbWFpbFZlcmlmaWVkOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHVzZXIncyBlbWFpbCB2ZXJpZmljYXRpb24ga2V5LlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBlbWFpbFZlcmlmaWNhdGlvbktleTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHVzZXIncyBkaXNjb3JkIGlkIGFuZCBhdmF0YXIuXHJcbiAgICAgKi9cclxuICAgIEBwcm9wKClcclxuICAgIGRpc2NvcmQ6IHtcclxuICAgICAgICBpZDogc3RyaW5nO1xyXG4gICAgICAgIGF2YXRhcjogc3RyaW5nO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBudW1iZXIgb2Ygc3RyaWtlcyB0aGUgdXNlciBoYXMuXHJcbiAgICAgKi9cclxuICAgIEBwcm9wKClcclxuICAgIHN0cmlrZXM6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB1c2VyJ3MgYmxhY2tsaXN0IHN0YXR1cyBhbmQgcmVhc29uLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBibGFja2xpc3RlZDoge1xyXG4gICAgICAgIHN0YXR1czogYm9vbGVhbjtcclxuICAgICAgICByZWFzb246IHN0cmluZztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgYW1vdW50IG9mIGZpbGVzIHRoZSB1c2VyIGhhcyB1cGxvYWRlZC5cclxuICAgICAqL1xyXG4gICAgQHByb3AoKVxyXG4gICAgdXBsb2FkczogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGFtb3VudCBvZiBpbnZpdGVzIHRoZSB1c2VyIGhhcy5cclxuICAgICAqL1xyXG4gICAgQHByb3AoKVxyXG4gICAgaW52aXRlczogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHVzZXIgdGhhdCB0aGUgdXNlciB3YXMgaW52aXRlZCBieS5cclxuICAgICAqL1xyXG4gICAgQHByb3AoKVxyXG4gICAgaW52aXRlZEJ5OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdXNlcnMgdGhhdCB0aGUgdXNlciBpbnZpdGVkLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCh7IHR5cGU6ICgpID0+IFtTdHJpbmddIH0pXHJcbiAgICBpbnZpdGVkVXNlcnM6IHN0cmluZ1tdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRhdGUgdGhhdCB0aGUgdXNlciByZWdpc3RlcmVkLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICByZWdpc3RyYXRpb25EYXRlOiBEYXRlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxhc3QgdGltZSB0aGUgdXNlciBsb2dnZWQgaW4uXHJcbiAgICAgKi9cclxuICAgIEBwcm9wKClcclxuICAgIGxhc3RMb2dpbjogRGF0ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB1c2VyJ3MgdGVzdGltb25pYWwuXHJcbiAgICAgKi9cclxuICAgIEBwcm9wKClcclxuICAgIHRlc3RpbW9uaWFsOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgdXNlciBpcyBhIGFkbWluLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBhZG1pbjogYm9vbGVhbjtcclxuXHJcbiAgICBAcHJvcCh7IHR5cGU6ICgpID0+IFtOb3RpZmljYXRpb25dIH0pXHJcbiAgICBub3RpZmljYXRpb25zOiBBcnJheTxOb3RpZmljYXRpb24+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHVzZXIncyBzZXR0aW5ncywgdGhlaXIgcHJlZmVyZW5jZXMsIHRoZWlyIGRvbWFpbiwgZXRjLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBzZXR0aW5nczoge1xyXG4gICAgICAgIGRvbWFpbjoge1xyXG4gICAgICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIHN1YmRvbWFpbjogc3RyaW5nO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmFuZG9tRG9tYWluOiB7XHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgICAgIGRvbWFpbnM6IHN0cmluZ1tdO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW1iZWQ6IHtcclxuICAgICAgICAgICAgZW5hYmxlZDogYm9vbGVhbjtcclxuICAgICAgICAgICAgY29sb3I6IHN0cmluZztcclxuICAgICAgICAgICAgdGl0bGU6IHN0cmluZztcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgICAgICAgICAgYXV0aG9yOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIHJhbmRvbUNvbG9yOiBib29sZWFuO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgYXV0b1dpcGU6IHtcclxuICAgICAgICAgICAgZW5hYmxlZDogYm9vbGVhbjtcclxuICAgICAgICAgICAgaW50ZXJ2YWw6IG51bWJlcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNob3dMaW5rOiBib29sZWFuO1xyXG4gICAgICAgIGludmlzaWJsZVVybDogYm9vbGVhbjtcclxuICAgICAgICBsb25nVXJsOiBib29sZWFuO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2V0TW9kZWxGb3JDbGFzcyhVc2VyKTtcclxuIl19