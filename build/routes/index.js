"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = exports.ShortenerRouter = exports.BaseRouter = exports.UsersRouter = exports.AuthRouter = exports.DomainsRouter = exports.InvitesRouter = exports.FilesRouter = void 0;
const FilesRouter_1 = __importDefault(require("./FilesRouter"));
exports.FilesRouter = FilesRouter_1.default;
const InvitesRouter_1 = __importDefault(require("./InvitesRouter"));
exports.InvitesRouter = InvitesRouter_1.default;
const DomainsRouter_1 = __importDefault(require("./DomainsRouter"));
exports.DomainsRouter = DomainsRouter_1.default;
const AuthRouter_1 = __importDefault(require("./AuthRouter"));
exports.AuthRouter = AuthRouter_1.default;
const UsersRouter_1 = __importDefault(require("./UsersRouter"));
exports.UsersRouter = UsersRouter_1.default;
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
exports.BaseRouter = BaseRouter_1.default;
const ShortenerRouter_1 = __importDefault(require("./ShortenerRouter"));
exports.ShortenerRouter = ShortenerRouter_1.default;
const AdminRouter_1 = __importDefault(require("./AdminRouter"));
exports.AdminRouter = AdminRouter_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdFQUF3QztBQVVwQyxzQkFWRyxxQkFBVyxDQVVIO0FBVGYsb0VBQTRDO0FBVXhDLHdCQVZHLHVCQUFhLENBVUg7QUFUakIsb0VBQTRDO0FBVXhDLHdCQVZHLHVCQUFhLENBVUg7QUFUakIsOERBQXNDO0FBVWxDLHFCQVZHLG9CQUFVLENBVUg7QUFUZCxnRUFBd0M7QUFVcEMsc0JBVkcscUJBQVcsQ0FVSDtBQVRmLDhEQUFzQztBQVVsQyxxQkFWRyxvQkFBVSxDQVVIO0FBVGQsd0VBQWdEO0FBVTVDLDBCQVZHLHlCQUFlLENBVUg7QUFUbkIsZ0VBQXdDO0FBVXBDLHNCQVZHLHFCQUFXLENBVUgiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmlsZXNSb3V0ZXIgZnJvbSAnLi9GaWxlc1JvdXRlcic7XHJcbmltcG9ydCBJbnZpdGVzUm91dGVyIGZyb20gJy4vSW52aXRlc1JvdXRlcic7XHJcbmltcG9ydCBEb21haW5zUm91dGVyIGZyb20gJy4vRG9tYWluc1JvdXRlcic7XHJcbmltcG9ydCBBdXRoUm91dGVyIGZyb20gJy4vQXV0aFJvdXRlcic7XHJcbmltcG9ydCBVc2Vyc1JvdXRlciBmcm9tICcuL1VzZXJzUm91dGVyJztcclxuaW1wb3J0IEJhc2VSb3V0ZXIgZnJvbSAnLi9CYXNlUm91dGVyJztcclxuaW1wb3J0IFNob3J0ZW5lclJvdXRlciBmcm9tICcuL1Nob3J0ZW5lclJvdXRlcic7XHJcbmltcG9ydCBBZG1pblJvdXRlciBmcm9tICcuL0FkbWluUm91dGVyJztcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBGaWxlc1JvdXRlcixcclxuICAgIEludml0ZXNSb3V0ZXIsXHJcbiAgICBEb21haW5zUm91dGVyLFxyXG4gICAgQXV0aFJvdXRlcixcclxuICAgIFVzZXJzUm91dGVyLFxyXG4gICAgQmFzZVJvdXRlcixcclxuICAgIFNob3J0ZW5lclJvdXRlcixcclxuICAgIEFkbWluUm91dGVyXHJcbn07XHJcbiJdfQ==