"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const FormatUtil_1 = require("./FormatUtil");
const GenerateUtil_1 = require("./GenerateUtil");
const S3Util_1 = require("./S3Util");
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const DomainModel_1 = __importDefault(require("../models/DomainModel"));
/**
 * The Multer configuration.
 */
const upload = multer_1.default({
    storage: multer_s3_1.default({
        s3: S3Util_1.s3,
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        bucket: process.env.S3_BUCKET,
        key: async (req, file, cb) => {
            if (!req.user)
                return;
            let key = req.user._id;
            const { longUrl, domain } = req.user.settings;
            const document = await DomainModel_1.default.findOne({ name: domain.name });
            const filename = (longUrl ? GenerateUtil_1.generateString(17) : GenerateUtil_1.generateString(7)) + FormatUtil_1.formatExtension(file);
            if (document.userOnly) {
                file.userOnlyDomain = true;
            }
            file.filename = filename;
            file.key = `${key}/${filename}`;
            cb(null, `${key}/${filename}`);
        },
    }),
    limits: {
        fileSize: 104857600,
    },
});
exports.upload = upload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXVsdGVyVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9NdWx0ZXJVdGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLDZDQUErQztBQUMvQyxpREFBZ0Q7QUFDaEQscUNBQThCO0FBQzlCLG9EQUF3QztBQUN4QywwREFBaUM7QUFDakMsd0VBQWdEO0FBRWhEOztHQUVHO0FBQ0gsTUFBTSxNQUFNLEdBQVcsZ0JBQU0sQ0FBQztJQUMxQixPQUFPLEVBQUUsbUJBQVEsQ0FBQztRQUNkLEVBQUUsRUFBRixXQUFFO1FBQ0YsV0FBVyxFQUFFLG1CQUFRLENBQUMsaUJBQWlCO1FBQ3ZDLEdBQUcsRUFBRSxhQUFhO1FBQ2xCLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVM7UUFDN0IsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFZLEVBQUUsSUFBeUIsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUN2RCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUk7Z0JBQUUsT0FBTztZQUV0QixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUN2QixNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzlDLE1BQU0sUUFBUSxHQUFHLE1BQU0scUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDbEUsTUFBTSxRQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDZCQUFjLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDLDZCQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyw0QkFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNGLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7YUFDOUI7WUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBRWhDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNuQyxDQUFDO0tBQ0osQ0FBQztJQUNGLE1BQU0sRUFBRTtRQUNKLFFBQVEsRUFBRSxTQUFTO0tBQ3RCO0NBQ0osQ0FBQyxDQUFDO0FBR0Msd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0IH0gZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7IGZvcm1hdEV4dGVuc2lvbiB9IGZyb20gJy4vRm9ybWF0VXRpbCc7XHJcbmltcG9ydCB7IGdlbmVyYXRlU3RyaW5nIH0gZnJvbSAnLi9HZW5lcmF0ZVV0aWwnO1xyXG5pbXBvcnQgeyBzMyB9IGZyb20gJy4vUzNVdGlsJztcclxuaW1wb3J0IG11bHRlciwgeyBNdWx0ZXIgfSBmcm9tICdtdWx0ZXInO1xyXG5pbXBvcnQgTXVsdGVyUzMgZnJvbSAnbXVsdGVyLXMzJztcclxuaW1wb3J0IERvbWFpbk1vZGVsIGZyb20gJy4uL21vZGVscy9Eb21haW5Nb2RlbCc7XHJcblxyXG4vKipcclxuICogVGhlIE11bHRlciBjb25maWd1cmF0aW9uLlxyXG4gKi9cclxuY29uc3QgdXBsb2FkOiBNdWx0ZXIgPSBtdWx0ZXIoe1xyXG4gICAgc3RvcmFnZTogTXVsdGVyUzMoe1xyXG4gICAgICAgIHMzLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiBNdWx0ZXJTMy5BVVRPX0NPTlRFTlRfVFlQRSxcclxuICAgICAgICBhY2w6ICdwdWJsaWMtcmVhZCcsXHJcbiAgICAgICAgYnVja2V0OiBwcm9jZXNzLmVudi5TM19CVUNLRVQsXHJcbiAgICAgICAga2V5OiBhc3luYyAocmVxOiBSZXF1ZXN0LCBmaWxlOiBFeHByZXNzLk11bHRlci5GaWxlLCBjYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXJlcS51c2VyKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQga2V5ID0gcmVxLnVzZXIuX2lkO1xyXG4gICAgICAgICAgICBjb25zdCB7IGxvbmdVcmwsIGRvbWFpbiB9ID0gcmVxLnVzZXIuc2V0dGluZ3M7XHJcbiAgICAgICAgICAgIGNvbnN0IGRvY3VtZW50ID0gYXdhaXQgRG9tYWluTW9kZWwuZmluZE9uZSh7IG5hbWU6IGRvbWFpbi5uYW1lIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlbmFtZSA9IChsb25nVXJsID8gZ2VuZXJhdGVTdHJpbmcoMTcpOiBnZW5lcmF0ZVN0cmluZyg3KSkgKyBmb3JtYXRFeHRlbnNpb24oZmlsZSk7XHJcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC51c2VyT25seSkge1xyXG4gICAgICAgICAgICAgICAgZmlsZS51c2VyT25seURvbWFpbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZpbGUuZmlsZW5hbWUgPSBmaWxlbmFtZTtcclxuICAgICAgICAgICAgZmlsZS5rZXkgPSBgJHtrZXl9LyR7ZmlsZW5hbWV9YDtcclxuXHJcbiAgICAgICAgICAgIGNiKG51bGwsIGAke2tleX0vJHtmaWxlbmFtZX1gKTtcclxuICAgICAgICB9LFxyXG4gICAgfSksXHJcbiAgICBsaW1pdHM6IHtcclxuICAgICAgICBmaWxlU2l6ZTogMTA0ODU3NjAwLFxyXG4gICAgfSxcclxufSk7XHJcblxyXG5leHBvcnQge1xyXG4gICAgdXBsb2FkXHJcbn07XHJcbiJdfQ==