"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ms_1 = __importDefault(require("ms"));
const ValidationMiddleware_1 = __importDefault(require("../../middlewares/ValidationMiddleware"));
const DomainModel_1 = __importDefault(require("../../models/DomainModel"));
const FileModel_1 = __importDefault(require("../../models/FileModel"));
const InvisibleUrlModel_1 = __importDefault(require("../../models/InvisibleUrlModel"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const EmbedSchema_1 = __importDefault(require("../../schemas/EmbedSchema"));
const PreferencesSchema_1 = __importDefault(require("../../schemas/PreferencesSchema"));
const RandomDomainSchema_1 = __importDefault(require("../../schemas/RandomDomainSchema"));
const UpdateDomainSchema_1 = __importDefault(require("../../schemas/UpdateDomainSchema"));
const WipeIntervalSchema_1 = __importDefault(require("../../schemas/WipeIntervalSchema"));
const Intervals_1 = require("../../utils/Intervals");
const S3Util_1 = require("../../utils/S3Util");
const router = express_1.Router();
router.put('/domain', ValidationMiddleware_1.default(UpdateDomainSchema_1.default), async (req, res) => {
    const { user } = req;
    let { domain, subdomain } = req.body;
    try {
        const validDomain = await DomainModel_1.default.findOne({ name: domain });
        if (!validDomain)
            return res.status(400).json({
                success: false,
                error: 'invalid domain name',
            });
        if (validDomain.userOnly && validDomain.donatedBy !== user._id)
            return res.status(400).json({
                success: false,
                error: 'you do not have permission to use this domain',
            });
        if (!validDomain.wildcard)
            subdomain = null;
        await UserModel_1.default.findByIdAndUpdate(user._id, {
            'settings.domain': {
                name: domain,
                subdomain: subdomain || null,
            },
        });
        res.status(200).json({
            success: true,
            message: 'updated domain successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
router.post('/random_domain', ValidationMiddleware_1.default(RandomDomainSchema_1.default), async (req, res) => {
    const { user } = req;
    const { domain } = req.body;
    const { domains } = user.settings.randomDomain;
    try {
        if (domains.find((d) => d === domain))
            return res.status(400).json({
                success: false,
                error: 'this domain is already in use',
            });
        await UserModel_1.default.findByIdAndUpdate(user._id, {
            $push: {
                'settings.randomDomain.domains': domain,
            },
        });
        res.status(200).json({
            success: true,
            message: 'added domain successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
router.delete('/random_domain', ValidationMiddleware_1.default(RandomDomainSchema_1.default), async (req, res) => {
    const { user } = req;
    const { domain } = req.body;
    const { domains } = user.settings.randomDomain;
    try {
        if (!domains.find((d) => d === domain))
            return res.status(404).json({
                success: false,
                error: 'invalid domain',
            });
        await UserModel_1.default.findByIdAndUpdate(user._id, {
            'settings.randomDomain.domains': domains.filter((d) => d !== domain),
        });
        res.status(200).json({
            success: true,
            message: 'deleted domain successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
router.put('/preferences', ValidationMiddleware_1.default(PreferencesSchema_1.default), async (req, res) => {
    const { user } = req;
    try {
        const toUpdate = {};
        for (const entry of Object.entries(req.body)) {
            switch (entry[0]) {
                case 'randomDomain':
                    toUpdate['settings.randomDomain.enabled'] = entry[1];
                    break;
                case 'autoWipe':
                    const findInterval = Intervals_1.intervals.find((i) => i.uuid === user._id);
                    if (findInterval) {
                        clearInterval(findInterval.id);
                        Intervals_1.delInterval(user._id);
                    }
                    if (entry[1] === true) {
                        const interval = setInterval(async () => {
                            try {
                                await S3Util_1.wipeFiles(user);
                                await FileModel_1.default.deleteMany({
                                    'uploader.uuid': user._id,
                                });
                                await InvisibleUrlModel_1.default.deleteMany({
                                    uploader: user._id,
                                });
                                await UserModel_1.default.findByIdAndUpdate(user._id, {
                                    uploads: 0,
                                });
                            }
                            catch (err) { }
                        }, user.settings.autoWipe.interval);
                        Intervals_1.intervals.push({
                            id: interval,
                            uuid: user._id,
                        });
                    }
                    toUpdate['settings.autoWipe.enabled'] = entry[1];
                    break;
                case 'embeds':
                    toUpdate['settings.embed.enabled'] = entry[1];
                    break;
                default:
                    toUpdate[`settings.${entry[0]}`] = entry[1];
                    break;
            }
        }
        await UserModel_1.default.findByIdAndUpdate(user._id, toUpdate);
        res.status(200).json({
            success: true,
            message: 'updated preferences successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
router.put('/embed', ValidationMiddleware_1.default(EmbedSchema_1.default), async (req, res) => {
    const { color, title, description, author, randomColor } = req.body;
    const { user } = req;
    try {
        await UserModel_1.default.findByIdAndUpdate(user._id, {
            settings: {
                ...user.settings,
                embed: {
                    ...user.settings.embed,
                    title,
                    description,
                    color,
                    author,
                    randomColor,
                },
            },
        });
        res.status(200).json({
            success: true,
            message: 'updated embed successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
router.put('/wipe_interval', ValidationMiddleware_1.default(WipeIntervalSchema_1.default), async (req, res) => {
    const { value } = req.body;
    const { user } = req;
    try {
        const validIntervals = [ms_1.default('1h'), ms_1.default('2h'), ms_1.default('12h'), ms_1.default('24h'), ms_1.default('1w'), ms_1.default('2w'), 2147483647];
        if (!validIntervals.includes(value))
            return res.status(400).json({
                success: false,
                error: 'invalid interval',
            });
        await UserModel_1.default.findByIdAndUpdate(user._id, {
            'settings.autoWipe.interval': value,
        });
        if (user.settings.autoWipe.enabled) {
            const findInterval = Intervals_1.intervals.find((i) => i.uuid === user._id);
            if (findInterval) {
                clearInterval(findInterval.id);
                Intervals_1.delInterval(user._id);
            }
            const interval = setInterval(async () => {
                try {
                    await S3Util_1.wipeFiles(user);
                    await FileModel_1.default.deleteMany({
                        'uploader.uuid': user._id,
                    });
                    await InvisibleUrlModel_1.default.deleteMany({
                        uploader: user._id,
                    });
                    await UserModel_1.default.findByIdAndUpdate(user._id, {
                        uploads: 0,
                    });
                }
                catch (err) { }
            }, value);
            Intervals_1.intervals.push({
                id: interval,
                uuid: user._id,
            });
        }
        res.status(200).json({
            success: true,
            message: 'update interval successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ3NSb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL1VzZXJzUm91dGVyL1NldHRpbmdzUm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUNBQW9EO0FBQ3BELDRDQUFvQjtBQUNwQixrR0FBMEU7QUFDMUUsMkVBQW1EO0FBQ25ELHVFQUErQztBQUMvQyx1RkFBK0Q7QUFDL0QsdUVBQStDO0FBQy9DLDRFQUFvRDtBQUNwRCx3RkFBZ0U7QUFDaEUsMEZBQWtFO0FBQ2xFLDBGQUFrRTtBQUNsRSwwRkFBa0U7QUFDbEUscURBQStEO0FBQy9ELCtDQUErQztBQUMvQyxNQUFNLE1BQU0sR0FBRyxnQkFBTSxFQUFFLENBQUM7QUFFeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsOEJBQW9CLENBQUMsNEJBQWtCLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQ2xHLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDckIsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBRXJDLElBQUk7UUFDQSxNQUFNLFdBQVcsR0FBRyxNQUFNLHFCQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFFaEUsSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUMxQyxPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUscUJBQXFCO2FBQy9CLENBQUMsQ0FBQztRQUVILElBQUksV0FBVyxDQUFDLFFBQVEsSUFBSSxXQUFXLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxHQUFHO1lBQUUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FB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QUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNqQixPQUFPLEVBQUUsSUFBSTtZQUNiLE9BQU8sRUFBRSw4QkFBOEI7U0FDMUMsQ0FBQyxDQUFDO0tBQ047SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2pCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsS0FBSyxFQUFFLEdBQUcsQ0FBQyxPQUFPO1NBQ3JCLENBQUMsQ0FBQztLQUNOO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxrQkFBZSxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCBtcyBmcm9tICdtcyc7XHJcbmltcG9ydCBWYWxpZGF0aW9uTWlkZGxld2FyZSBmcm9tICcuLi8uLi9taWRkbGV3YXJlcy9WYWxpZGF0aW9uTWlkZGxld2FyZSc7XHJcbmltcG9ydCBEb21haW5Nb2RlbCBmcm9tICcuLi8uLi9tb2RlbHMvRG9tYWluTW9kZWwnO1xyXG5pbXBvcnQgRmlsZU1vZGVsIGZyb20gJy4uLy4uL21vZGVscy9GaWxlTW9kZWwnO1xyXG5pbXBvcnQgSW52aXNpYmxlVXJsTW9kZWwgZnJvbSAnLi4vLi4vbW9kZWxzL0ludmlzaWJsZVVybE1vZGVsJztcclxuaW1wb3J0IFVzZXJNb2RlbCBmcm9tICcuLi8uLi9tb2RlbHMvVXNlck1vZGVsJztcclxuaW1wb3J0IEVtYmVkU2NoZW1hIGZyb20gJy4uLy4uL3NjaGVtYXMvRW1iZWRTY2hlbWEnO1xyXG5pbXBvcnQgUHJlZmVyZW5jZXNTY2hlbWEgZnJvbSAnLi4vLi4vc2NoZW1hcy9QcmVmZXJlbmNlc1NjaGVtYSc7XHJcbmltcG9ydCBSYW5kb21Eb21haW5TY2hlbWEgZnJvbSAnLi4vLi4vc2NoZW1hcy9SYW5kb21Eb21haW5TY2hlbWEnO1xyXG5pbXBvcnQgVXBkYXRlRG9tYWluU2NoZW1hIGZyb20gJy4uLy4uL3NjaGVtYXMvVXBkYXRlRG9tYWluU2NoZW1hJztcclxuaW1wb3J0IFdpcGVJbnRlcnZhbFNjaGVtYSBmcm9tICcuLi8uLi9zY2hlbWFzL1dpcGVJbnRlcnZhbFNjaGVtYSc7XHJcbmltcG9ydCB7IGRlbEludGVydmFsLCBpbnRlcnZhbHMgfSBmcm9tICcuLi8uLi91dGlscy9JbnRlcnZhbHMnO1xyXG5pbXBvcnQgeyB3aXBlRmlsZXMgfSBmcm9tICcuLi8uLi91dGlscy9TM1V0aWwnO1xyXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcclxuXHJcbnJvdXRlci5wdXQoJy9kb21haW4nLCBWYWxpZGF0aW9uTWlkZGxld2FyZShVcGRhdGVEb21haW5TY2hlbWEpLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICBjb25zdCB7IHVzZXIgfSA9IHJlcTtcclxuICAgIGxldCB7IGRvbWFpbiwgc3ViZG9tYWluIH0gPSByZXEuYm9keTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHZhbGlkRG9tYWluID0gYXdhaXQgRG9tYWluTW9kZWwuZmluZE9uZSh7IG5hbWU6IGRvbWFpbiB9KTtcclxuXHJcbiAgICAgICAgaWYgKCF2YWxpZERvbWFpbikgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yOiAnaW52YWxpZCBkb21haW4gbmFtZScsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh2YWxpZERvbWFpbi51c2VyT25seSAmJiB2YWxpZERvbWFpbi5kb25hdGVkQnkgIT09IHVzZXIuX2lkKSByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICAgICAgZXJyb3I6ICd5b3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byB1c2UgdGhpcyBkb21haW4nLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXZhbGlkRG9tYWluLndpbGRjYXJkKSBzdWJkb21haW4gPSBudWxsO1xyXG5cclxuICAgICAgICBhd2FpdCBVc2VyTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodXNlci5faWQsIHtcclxuICAgICAgICAgICAgJ3NldHRpbmdzLmRvbWFpbic6IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGRvbWFpbixcclxuICAgICAgICAgICAgICAgIHN1YmRvbWFpbjogc3ViZG9tYWluIHx8IG51bGwsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgICAgbWVzc2FnZTogJ3VwZGF0ZWQgZG9tYWluIHN1Y2Nlc3NmdWxseScsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxucm91dGVyLnBvc3QoJy9yYW5kb21fZG9tYWluJywgVmFsaWRhdGlvbk1pZGRsZXdhcmUoUmFuZG9tRG9tYWluU2NoZW1hKSwgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgY29uc3QgeyB1c2VyIH0gPSByZXE7XHJcbiAgICBjb25zdCB7IGRvbWFpbiB9ID0gcmVxLmJvZHk7XHJcbiAgICBjb25zdCB7IGRvbWFpbnMgfSA9IHVzZXIuc2V0dGluZ3MucmFuZG9tRG9tYWluO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKGRvbWFpbnMuZmluZCgoZCkgPT4gZCA9PT0gZG9tYWluKSkgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yOiAndGhpcyBkb21haW4gaXMgYWxyZWFkeSBpbiB1c2UnLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhd2FpdCBVc2VyTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodXNlci5faWQsIHtcclxuICAgICAgICAgICAgJHB1c2g6IHtcclxuICAgICAgICAgICAgICAgICdzZXR0aW5ncy5yYW5kb21Eb21haW4uZG9tYWlucyc6IGRvbWFpbixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiAnYWRkZWQgZG9tYWluIHN1Y2Nlc3NmdWxseScsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxucm91dGVyLmRlbGV0ZSgnL3JhbmRvbV9kb21haW4nLCBWYWxpZGF0aW9uTWlkZGxld2FyZShSYW5kb21Eb21haW5TY2hlbWEpLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICBjb25zdCB7IHVzZXIgfSA9IHJlcTtcclxuICAgIGNvbnN0IHsgZG9tYWluIH0gPSByZXEuYm9keTtcclxuICAgIGNvbnN0IHsgZG9tYWlucyB9ID0gdXNlci5zZXR0aW5ncy5yYW5kb21Eb21haW47XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAoIWRvbWFpbnMuZmluZCgoZCkgPT4gZCA9PT0gZG9tYWluKSkgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yOiAnaW52YWxpZCBkb21haW4nLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhd2FpdCBVc2VyTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodXNlci5faWQsIHtcclxuICAgICAgICAgICAgJ3NldHRpbmdzLnJhbmRvbURvbWFpbi5kb21haW5zJzogZG9tYWlucy5maWx0ZXIoKGQpID0+IGQgIT09IGRvbWFpbiksXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgICAgbWVzc2FnZTogJ2RlbGV0ZWQgZG9tYWluIHN1Y2Nlc3NmdWxseScsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxucm91dGVyLnB1dCgnL3ByZWZlcmVuY2VzJywgVmFsaWRhdGlvbk1pZGRsZXdhcmUoUHJlZmVyZW5jZXNTY2hlbWEpLCBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICBjb25zdCB7IHVzZXIgfSA9IHJlcTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHRvVXBkYXRlOiBhbnkgPSB7fTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBPYmplY3QuZW50cmllcyhyZXEuYm9keSkpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChlbnRyeVswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAncmFuZG9tRG9tYWluJzpcclxuICAgICAgICAgICAgICAgICAgICB0b1VwZGF0ZVsnc2V0dGluZ3MucmFuZG9tRG9tYWluLmVuYWJsZWQnXSA9IGVudHJ5WzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnYXV0b1dpcGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbmRJbnRlcnZhbCA9IGludGVydmFscy5maW5kKChpKSA9PiBpLnV1aWQgPT09IHVzZXIuX2lkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmRJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGZpbmRJbnRlcnZhbC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbEludGVydmFsKHVzZXIuX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeVsxXSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgd2lwZUZpbGVzKHVzZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBGaWxlTW9kZWwuZGVsZXRlTWFueSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd1cGxvYWRlci51dWlkJzogdXNlci5faWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IEludmlzaWJsZVVybE1vZGVsLmRlbGV0ZU1hbnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRlcjogdXNlci5faWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IFVzZXJNb2RlbC5maW5kQnlJZEFuZFVwZGF0ZSh1c2VyLl9pZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRzOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB1c2VyLnNldHRpbmdzLmF1dG9XaXBlLmludGVydmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVydmFscy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpbnRlcnZhbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQ6IHVzZXIuX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRvVXBkYXRlWydzZXR0aW5ncy5hdXRvV2lwZS5lbmFibGVkJ10gPSBlbnRyeVsxXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VtYmVkcyc6XHJcbiAgICAgICAgICAgICAgICAgICAgdG9VcGRhdGVbJ3NldHRpbmdzLmVtYmVkLmVuYWJsZWQnXSA9IGVudHJ5WzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0b1VwZGF0ZVtgc2V0dGluZ3MuJHtlbnRyeVswXX1gXSA9IGVudHJ5WzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCBVc2VyTW9kZWwuZmluZEJ5SWRBbmRVcGRhdGUodXNlci5faWQsIHRvVXBkYXRlKTtcclxuXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiAndXBkYXRlZCBwcmVmZXJlbmNlcyBzdWNjZXNzZnVsbHknLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbnJvdXRlci5wdXQoJy9lbWJlZCcsIFZhbGlkYXRpb25NaWRkbGV3YXJlKEVtYmVkU2NoZW1hKSwgYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgY29uc3QgeyBjb2xvciwgdGl0bGUsIGRlc2NyaXB0aW9uLCBhdXRob3IsIHJhbmRvbUNvbG9yIH0gPSByZXEuYm9keTtcclxuICAgIGNvbnN0IHsgdXNlciB9ID0gcmVxO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHVzZXIuX2lkLCB7XHJcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAuLi51c2VyLnNldHRpbmdzLFxyXG4gICAgICAgICAgICAgICAgZW1iZWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAuLi51c2VyLnNldHRpbmdzLmVtYmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dGhvcixcclxuICAgICAgICAgICAgICAgICAgICByYW5kb21Db2xvcixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgICAgbWVzc2FnZTogJ3VwZGF0ZWQgZW1iZWQgc3VjY2Vzc2Z1bGx5JyxcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5yb3V0ZXIucHV0KCcvd2lwZV9pbnRlcnZhbCcsIFZhbGlkYXRpb25NaWRkbGV3YXJlKFdpcGVJbnRlcnZhbFNjaGVtYSksIGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIGNvbnN0IHsgdmFsdWUgfSA9IHJlcS5ib2R5O1xyXG4gICAgY29uc3QgeyB1c2VyIH0gPSByZXE7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB2YWxpZEludGVydmFscyA9IFttcygnMWgnKSwgbXMoJzJoJyksIG1zKCcxMmgnKSwgbXMoJzI0aCcpLCBtcygnMXcnKSwgbXMoJzJ3JyksIDIxNDc0ODM2NDddO1xyXG5cclxuICAgICAgICBpZiAoIXZhbGlkSW50ZXJ2YWxzLmluY2x1ZGVzKHZhbHVlKSkgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIGVycm9yOiAnaW52YWxpZCBpbnRlcnZhbCcsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGF3YWl0IFVzZXJNb2RlbC5maW5kQnlJZEFuZFVwZGF0ZSh1c2VyLl9pZCwge1xyXG4gICAgICAgICAgICAnc2V0dGluZ3MuYXV0b1dpcGUuaW50ZXJ2YWwnOiB2YWx1ZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHVzZXIuc2V0dGluZ3MuYXV0b1dpcGUuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBjb25zdCBmaW5kSW50ZXJ2YWwgPSBpbnRlcnZhbHMuZmluZCgoaSkgPT4gaS51dWlkID09PSB1c2VyLl9pZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmluZEludGVydmFsKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGZpbmRJbnRlcnZhbC5pZCk7XHJcbiAgICAgICAgICAgICAgICBkZWxJbnRlcnZhbCh1c2VyLl9pZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB3aXBlRmlsZXModXNlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgRmlsZU1vZGVsLmRlbGV0ZU1hbnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAndXBsb2FkZXIudXVpZCc6IHVzZXIuX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IEludmlzaWJsZVVybE1vZGVsLmRlbGV0ZU1hbnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRlcjogdXNlci5faWQsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgVXNlck1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKHVzZXIuX2lkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwbG9hZHM6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHt9XHJcbiAgICAgICAgICAgIH0sIHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIGludGVydmFscy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGlkOiBpbnRlcnZhbCxcclxuICAgICAgICAgICAgICAgIHV1aWQ6IHVzZXIuX2lkLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgICAgbWVzc2FnZTogJ3VwZGF0ZSBpbnRlcnZhbCBzdWNjZXNzZnVsbHknLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIl19