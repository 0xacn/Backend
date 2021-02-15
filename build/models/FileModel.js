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
exports.File = void 0;
const typegoose_1 = require("@typegoose/typegoose");
let File = class File {
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], File.prototype, "filename", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], File.prototype, "key", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], File.prototype, "timestamp", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], File.prototype, "mimetype", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], File.prototype, "size", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], File.prototype, "domain", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], File.prototype, "userOnlyDomain", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], File.prototype, "deletionKey", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Object)
], File.prototype, "embed", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], File.prototype, "showLink", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Object)
], File.prototype, "uploader", void 0);
File = __decorate([
    typegoose_1.modelOptions({ options: { allowMixed: 0 } })
], File);
exports.File = File;
exports.default = typegoose_1.getModelForClass(File);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZU1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9GaWxlTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQTRFO0FBRzVFLElBQWEsSUFBSSxHQUFqQixNQUFhLElBQUk7Q0E0RWhCLENBQUE7QUF2RUc7SUFEQyxnQkFBSSxFQUFFOztzQ0FDVTtBQU1qQjtJQURDLGdCQUFJLEVBQUU7O2lDQUNLO0FBTVo7SUFEQyxnQkFBSSxFQUFFOzhCQUNJLElBQUk7dUNBQUM7QUFNaEI7SUFEQyxnQkFBSSxFQUFFOztzQ0FDVTtBQU1qQjtJQURDLGdCQUFJLEVBQUU7O2tDQUNNO0FBTWI7SUFEQyxnQkFBSSxFQUFFOztvQ0FDUTtBQU1mO0lBREMsZ0JBQUksRUFBRTs7NENBQ2lCO0FBTXhCO0lBREMsZ0JBQUksRUFBRTs7eUNBQ2E7QUFNcEI7SUFEQyxnQkFBSSxFQUFFOzttQ0FRTjtBQU1EO0lBREMsZ0JBQUksRUFBRTs7c0NBQ1c7QUFNbEI7SUFEQyxnQkFBSSxFQUFFOztzQ0FJTjtBQTNFUSxJQUFJO0lBRGhCLHdCQUFZLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztHQUNoQyxJQUFJLENBNEVoQjtBQTVFWSxvQkFBSTtBQThFakIsa0JBQWUsNEJBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9wLCBnZXRNb2RlbEZvckNsYXNzLCBtb2RlbE9wdGlvbnMgfSBmcm9tICdAdHlwZWdvb3NlL3R5cGVnb29zZSc7XHJcblxyXG5AbW9kZWxPcHRpb25zKHsgb3B0aW9uczogeyBhbGxvd01peGVkOiAwIH0gfSlcclxuZXhwb3J0IGNsYXNzIEZpbGUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZmlsZW5hbWUuXHJcbiAgICAgKi9cclxuICAgIEBwcm9wKClcclxuICAgIGZpbGVuYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgczMga2V5LlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBrZXk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB0aW1lc3RhbXAgdGhlIGZpbGUgd2FzIHVwbG9hZGVkIGF0LlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICB0aW1lc3RhbXA6IERhdGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZmlsZSdzIG1pbWV0eXBlLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBtaW1ldHlwZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGZpbGUgc2l6ZS5cclxuICAgICAqL1xyXG4gICAgQHByb3AoKVxyXG4gICAgc2l6ZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRvbWFpbiB0aGUgdXNlciB1c2VkLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBkb21haW46IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgb3Igbm90IHRoZSBkb21haW4gaXMgdXNlci1vbmx5LlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICB1c2VyT25seURvbWFpbjogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBmaWxlJ3MgZGVsZXRpb24ga2V5LlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICBkZWxldGlvbktleTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGZpbGUncyBlbWJlZCBzZXR0aW5ncy5cclxuICAgICAqL1xyXG4gICAgQHByb3AoKVxyXG4gICAgZW1iZWQ6IHtcclxuICAgICAgICBlbmFibGVkOiBib29sZWFuO1xyXG4gICAgICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICAgICAgdGl0bGU6IHN0cmluZztcclxuICAgICAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgICAgIGF1dGhvcjogc3RyaW5nO1xyXG4gICAgICAgIHJhbmRvbUNvbG9yOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciBvciBub3QgdGhlIGZpbGUncyBsaW5rIHNob3VsZCBzaG93IGluIGRpc2NvcmQuXHJcbiAgICAgKi9cclxuICAgIEBwcm9wKClcclxuICAgIHNob3dMaW5rOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHVzZXIgd2hvIHVwbG9hZGVkIHRoZSBmaWxlLlxyXG4gICAgICovXHJcbiAgICBAcHJvcCgpXHJcbiAgICB1cGxvYWRlcjoge1xyXG4gICAgICAgIHV1aWQ6IHN0cmluZztcclxuICAgICAgICB1c2VybmFtZTogc3RyaW5nO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZXRNb2RlbEZvckNsYXNzKEZpbGUpO1xyXG4iXX0=