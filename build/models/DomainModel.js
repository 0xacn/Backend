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
exports.Domain = void 0;
const typegoose_1 = require("@typegoose/typegoose");
let Domain = class Domain {
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Domain.prototype, "name", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], Domain.prototype, "wildcard", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], Domain.prototype, "donated", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Domain.prototype, "donatedBy", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], Domain.prototype, "userOnly", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], Domain.prototype, "dateAdded", void 0);
Domain = __decorate([
    typegoose_1.modelOptions({ options: { allowMixed: 0 } })
], Domain);
exports.Domain = Domain;
exports.default = typegoose_1.getModelForClass(Domain);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tYWluTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL0RvbWFpbk1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0RTtBQUc1RSxJQUFhLE1BQU0sR0FBbkIsTUFBYSxNQUFNO0NBb0NsQixDQUFBO0FBL0JHO0lBREMsZ0JBQUksRUFBRTs7b0NBQ007QUFNYjtJQURDLGdCQUFJLEVBQUU7O3dDQUNXO0FBTWxCO0lBREMsZ0JBQUksRUFBRTs7dUNBQ1U7QUFNakI7SUFEQyxnQkFBSSxFQUFFOzt5Q0FDVztBQU1sQjtJQURDLGdCQUFJLEVBQUU7O3dDQUNXO0FBTWxCO0lBREMsZ0JBQUksRUFBRTs4QkFDSSxJQUFJO3lDQUFDO0FBbkNQLE1BQU07SUFEbEIsd0JBQVksQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO0dBQ2hDLE1BQU0sQ0FvQ2xCO0FBcENZLHdCQUFNO0FBc0NuQixrQkFBZSw0QkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb3AsIGdldE1vZGVsRm9yQ2xhc3MsIG1vZGVsT3B0aW9ucyB9IGZyb20gJ0B0eXBlZ29vc2UvdHlwZWdvb3NlJztcclxuXHJcbkBtb2RlbE9wdGlvbnMoeyBvcHRpb25zOiB7IGFsbG93TWl4ZWQ6IDAgfSB9KVxyXG5leHBvcnQgY2xhc3MgRG9tYWluIHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRvbWFpbiBuYW1lLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiB0aGUgZG9tYWluIGlzIHdpbGRjYXJkZWQgb3Igbm90LlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICB3aWxkY2FyZDogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHRoZSBkb21haW4gd2FzIGRvbmF0ZWQgb3Igbm90LlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBkb25hdGVkOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHV1aWQgb2YgdGhlIHVzZXIgd2hvIGRvbmF0ZWQgdGhlIGRvbWFpbi5cclxuICAgICAqL1xyXG4gICAgQHByb3AoKVxyXG4gICAgZG9uYXRlZEJ5OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgZG9tYWluIGlzIG9ubHkgdXNhYmxlIGJ5IHRoZSBkb25hdG9yLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICB1c2VyT25seTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkYXRlIHRoZSBkb21haW4gd2FzIGFkZGVkLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBkYXRlQWRkZWQ6IERhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdldE1vZGVsRm9yQ2xhc3MoRG9tYWluKTtcclxuIl19