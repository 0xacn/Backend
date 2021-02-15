"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delInterval = exports.intervals = void 0;
/**
 * The intervals array.
 */
let intervals = [];
exports.intervals = intervals;
/**
 * Delete a interval.
 * @param {string} uuid The user's uuid.
 */
function delInterval(uuid) {
    exports.intervals = intervals = intervals.filter((i) => i.uuid !== uuid);
}
exports.delInterval = delInterval;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJ2YWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL0ludGVydmFscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7R0FFRztBQUNILElBQUksU0FBUyxHQUF1QyxFQUFFLENBQUM7QUFXbkQsOEJBQVM7QUFUYjs7O0dBR0c7QUFDSCxTQUFTLFdBQVcsQ0FBQyxJQUFZO0lBQzdCLG9CQUFBLFNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFJRyxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBUaGUgaW50ZXJ2YWxzIGFycmF5LlxyXG4gKi9cclxubGV0IGludGVydmFsczogQXJyYXk8eyBpZD86IGFueTsgdXVpZDogc3RyaW5nOyB9PiA9IFtdO1xyXG5cclxuLyoqXHJcbiAqIERlbGV0ZSBhIGludGVydmFsLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdXVpZCBUaGUgdXNlcidzIHV1aWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWxJbnRlcnZhbCh1dWlkOiBzdHJpbmcpIHtcclxuICAgIGludGVydmFscyA9IGludGVydmFscy5maWx0ZXIoKGkpID0+IGkudXVpZCAhPT0gdXVpZCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBpbnRlcnZhbHMsXHJcbiAgICBkZWxJbnRlcnZhbFxyXG59O1xyXG4iXX0=