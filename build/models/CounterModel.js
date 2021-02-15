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
exports.Counter = void 0;
const typegoose_1 = require("@typegoose/typegoose");
let Counter = class Counter {
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Counter.prototype, "_id", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Counter.prototype, "count", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Counter.prototype, "storageUsed", void 0);
Counter = __decorate([
    typegoose_1.modelOptions({ options: { allowMixed: 0 } })
], Counter);
exports.Counter = Counter;
exports.default = typegoose_1.getModelForClass(Counter);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ291bnRlck1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9Db3VudGVyTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQTRFO0FBRzVFLElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQU87Q0FpQm5CLENBQUE7QUFaRztJQURDLGdCQUFJLEVBQUU7O29DQUNLO0FBTVo7SUFEQyxnQkFBSSxFQUFFOztzQ0FDTztBQUtkO0lBREMsZ0JBQUksRUFBRTs7NENBQ2E7QUFoQlgsT0FBTztJQURuQix3QkFBWSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7R0FDaEMsT0FBTyxDQWlCbkI7QUFqQlksMEJBQU87QUFtQnBCLGtCQUFlLDRCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvcCwgZ2V0TW9kZWxGb3JDbGFzcywgbW9kZWxPcHRpb25zIH0gZnJvbSAnQHR5cGVnb29zZS90eXBlZ29vc2UnO1xyXG5cclxuQG1vZGVsT3B0aW9ucyh7IG9wdGlvbnM6IHsgYWxsb3dNaXhlZDogMCB9IH0pXHJcbmV4cG9ydCBjbGFzcyBDb3VudGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvdW50ZXIgaWRlbnRpZmllci5cclxuICAgICAqL1xyXG4gICAgQHByb3AoKVxyXG4gICAgX2lkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY3VycmVudCBjb3VudC5cclxuICAgICAqL1xyXG4gICAgQHByb3AoKVxyXG4gICAgY291bnQ6IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGN1cnJlbnQgY291bnQuXHJcbiAgICAgKi9cclxuICAgIEBwcm9wKClcclxuICAgIHN0b3JhZ2VVc2VkOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdldE1vZGVsRm9yQ2xhc3MoQ291bnRlcik7XHJcbiJdfQ==