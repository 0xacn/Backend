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
exports.Shortener = void 0;
const typegoose_1 = require("@typegoose/typegoose");
let Shortener = class Shortener {
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Shortener.prototype, "shortId", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Shortener.prototype, "destination", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Shortener.prototype, "deletionKey", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], Shortener.prototype, "timestamp", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Shortener.prototype, "user", void 0);
Shortener = __decorate([
    typegoose_1.modelOptions({ options: { allowMixed: 0 } })
], Shortener);
exports.Shortener = Shortener;
exports.default = typegoose_1.getModelForClass(Shortener);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hvcnRlbmVyTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL1Nob3J0ZW5lck1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0RTtBQUc1RSxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFTO0NBOEJyQixDQUFBO0FBekJHO0lBREMsZ0JBQUksRUFBRTs7MENBQ1M7QUFNaEI7SUFEQyxnQkFBSSxFQUFFOzs4Q0FDYTtBQU1wQjtJQURDLGdCQUFJLEVBQUU7OzhDQUNhO0FBTXBCO0lBREMsZ0JBQUksRUFBRTs4QkFDSSxJQUFJOzRDQUFDO0FBTWhCO0lBREMsZ0JBQUksRUFBRTs7dUNBQ007QUE3QkosU0FBUztJQURyQix3QkFBWSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7R0FDaEMsU0FBUyxDQThCckI7QUE5QlksOEJBQVM7QUFnQ3RCLGtCQUFlLDRCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvcCwgZ2V0TW9kZWxGb3JDbGFzcywgbW9kZWxPcHRpb25zIH0gZnJvbSAnQHR5cGVnb29zZS90eXBlZ29vc2UnO1xyXG5cclxuQG1vZGVsT3B0aW9ucyh7IG9wdGlvbnM6IHsgYWxsb3dNaXhlZDogMCB9IH0pXHJcbmV4cG9ydCBjbGFzcyBTaG9ydGVuZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc2hvcnRlbmVkIGlkLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBzaG9ydElkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGVzdGluYXRpb24gdXJsLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBkZXN0aW5hdGlvbjogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGtleSB1c2VkIHRvIGRlbGV0ZSB0aGUgbGluay5cclxuICAgICAqL1xyXG4gICAgQHByb3AoKVxyXG4gICAgZGVsZXRpb25LZXk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkYXRlIHRoZSB1cmwgd2FzIHNob3J0ZW5lZC5cclxuICAgICAqL1xyXG4gICAgQHByb3AoKVxyXG4gICAgdGltZXN0YW1wOiBEYXRlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHV1aWQgb2YgdGhlIHVzZXIgd2hvIHNob3J0ZW5lZCB0aGUgdXJsLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICB1c2VyOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdldE1vZGVsRm9yQ2xhc3MoU2hvcnRlbmVyKTtcclxuIl19