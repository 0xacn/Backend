"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/', (_req, res) => {
    res.json({
        status: 200,
        message: 'Hello there ( ͡° ͜ʖ ͡°)',
    });
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVJvdXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvQmFzZVJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFvRDtBQUNwRCxNQUFNLE1BQU0sR0FBRyxnQkFBTSxFQUFFLENBQUM7QUFFeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFhLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDN0MsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNMLE1BQU0sRUFBRSxHQUFHO1FBQ1gsT0FBTyxFQUFFLHlCQUF5QjtLQUNyQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQztBQUVILGtCQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlLCBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcclxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XHJcblxyXG5yb3V0ZXIuZ2V0KCcvJywgKF9yZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHJlcy5qc29uKHtcclxuICAgICAgICBzdGF0dXM6IDIwMCxcclxuICAgICAgICBtZXNzYWdlOiAnSGVsbG8gdGhlcmUgKCDNocKwIM2cypYgzaHCsCknLFxyXG4gICAgfSlcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiJdfQ==